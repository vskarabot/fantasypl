<script setup lang="ts">
import { Line } from 'vue-chartjs';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
} from 'chart.js';
import { ref, computed, watch } from 'vue';
import axios from 'axios';
import type { ChartData, RegressionResult } from '../../types/charts';

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale);

const props = defineProps<{
    selectedTeamId: string
}>();

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        x: { grid: { lineWidth: 0 } },
        y: { grid: { color: '#333a3f', lineWidth: 0.2 }, reverse: true, min: 1 }
    }
};

const chartData = ref<ChartData>({
    labels: [],
    datasets: [
        { label: 'Rank', data: [], borderColor: 'purple', backgroundColor: 'magenta', pointRadius: 2, borderWidth: 1 },
        { label: 'Rank Projection', data: [], pointRadius: 0, borderWidth: 1 }
    ]
});

const selectedGWs = ref<number>(38);
const gwNumOptions = ref<{[key: string]: number}>({
    'Season': 38,
    'Last 5': 5,
    'Last 10': 10,
});

const reg = (yValues: number[]): RegressionResult => {
    const n = yValues.length;
    if (n === 0) return { predictedY: [], slope: 0 };

    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
    yValues.forEach((y, i) => { sumX += i; sumY += y; sumXY += i * y; sumXX += i * i });

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    const predictedY = yValues.map((_, i) => slope * i + intercept);

    return { predictedY, slope };
};

watch(() => props.selectedTeamId, async (id) => {
    const res = await axios.get(`${import.meta.env.VITE_PROXY_URL}https://fantasy.premierleague.com/api/entry/${id}/history`);
    if (res.status !== 200) return;

    const ranks: number[] = res.data.current.map((gw: any) => gw.overall_rank);
    const { predictedY, slope } = reg(ranks);

    chartData.value = {
        labels: res.data.current.map((gw: any) => 'GW' + gw.event),
        datasets: [
            { ...chartData.value.datasets[0], data: ranks },
            { ...chartData.value.datasets[1], data: predictedY, borderColor: slope <= 0 ? 'lime' : 'red' }
        ]
    };
}, { immediate: true });

const computedData = computed(() => {
    const n = selectedGWs.value;
    const { labels, datasets } = chartData.value;
    if (!labels.length) return { labels: [], datasets: [] };

    const start = Math.max(0, labels.length - n);
    const sliceRanks = datasets[0].data.slice(start);
    const { predictedY, slope } = reg(sliceRanks);

    return {
        labels: labels.slice(start),
        datasets: [
            { ...datasets[0], data: sliceRanks },
            { ...datasets[1], data: predictedY, borderColor: slope <= 0 ? 'lime' : 'red' }
        ]
    };
});
</script>

<template>
    <br>
    <hr>
    <h5>Rank Progression</h5>
    <div class="button-container">
        <div v-for="(gws, label) in gwNumOptions" @click="selectedGWs = gws" class="button"
            :class="{ selected: selectedGWs === gws }">
            {{ label }}
        </div>
    </div>

    <div class="chart-container">
        <Line :data="computedData" :options="chartOptions" />
    </div>
</template>

<style scoped>
.button-container {
    display: flex;
    gap: .5rem;
    align-items: center;
}

.button {
    border: 1px solid #333a3f;
    padding: .4rem .25rem;
    border-radius: .5rem;
    font-weight: 100;
    font-size: .75rem;
}

.button:hover,
.selected {
    background-color: #333a3f;
    cursor: pointer;
}

.chart-container {
    flex: 1;
    min-height: 250px;
}
</style>
