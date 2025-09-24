<script setup lang="ts">
    import { Line } from 'vue-chartjs';

    // chart imports and register
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
import { computed, ref, watch } from 'vue';
import axios from 'axios';

    ChartJS.register(
        Title,
        Tooltip,
        Legend,
        LineElement,
        PointElement,
        LinearScale,
        CategoryScale
    );

    // chart options
    const chartOptions = { 
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                    color: '#333a3f',
                    lineWidth: .2
                }
            },
            y: {
                grid: {
                    color: '#333a3f',
                    lineWidth: .2
                },
                reverse: true,
                min: 1,
            }
        }
    }

    const chartData = ref(
        {
            labels: [],
            datasets: [
                {
                    label: 'Rank',
                    data: [],
                    borderColor: 'lime',
                    backgroundColor: 'lime',
                    pointRadius: 2,
                    borderWidth: .5
                }
            ]
        }
    );

    const props = defineProps<{
        selectedTeamId: string
    }>();

    const selectedGWs = ref(38);
    const gwNumOptions = ref({
        'Season': 38,
        'Last 3': 3,
        'Last 5': 5,
        'Last 10': 10,
    });

    watch(() => props.selectedTeamId, async (id) => {
        const res = await axios.get(import.meta.env.VITE_PROXY_URL + `https://fantasy.premierleague.com/api/entry/${id}/history`);

        if (res.status === 200) {
            chartData.value = {
                labels: res.data.current.map((gw: any) => 'GW' + gw.event),
                datasets: [
                    {
                        label: 'Rank',
                        data: res.data.current.map((gw: any) => gw.overall_rank),
                        borderColor: 'lime',
                        backgroundColor: 'lime',
                        pointRadius: 2,
                        borderWidth: .5
                    }
                ]
            };
        }
    }, {immediate: true});

    const computedData = computed(() => {
        if (selectedGWs.value >= chartData.value.labels.length) {
            return chartData.value;
        }
        return {
            labels: chartData.value.labels.slice(-selectedGWs.value),
            datasets: [
                {
                    ...chartData.value.datasets[0],
                    data: chartData.value.datasets[0].data.slice(-selectedGWs.value)
                }
            ]
        }
    });

</script>

<template>
    <br>
    <hr>
    <h5>Rank Progression</h5>
    <div class="button-container">
        <div class="section">
            <div 
                v-for="(gws, label) in gwNumOptions" 
                @click="selectedGWs = gws"
                class="button"
                :class="{ selected: selectedGWs === gws }"
            >
                {{ label }}
            </div>
        </div>
        <div class="section">
            <input type="checkbox"></input>
            <span>Show Line</span>
        </div>
    </div>
    <div style="height: 250px; width: 100%;">
        <Line :data="computedData" :options="chartOptions" />
    </div>
    
</template>

<style scoped>

    .button-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .section {
        display: flex;
        gap: .5rem;
    }

    .button {
        border: 1px solid #333a3f;
        padding: .4rem .25rem;
        border-radius: .5rem;
        font-weight: 100;
        font-size: .75rem;
    }

    .button:hover, .selected {
        background-color: #333a3f;
        cursor: pointer;
    }

    .show {
        border: 1px solid #333a3f;
        padding: 0.5rem;
        border-radius: .5rem;
        width: fit-content;
        font-size: .75rem;
        color: '#333a3f';
    }

    .show:hover {
        background-color: #333a3f;
        cursor: pointer;
    }

    
</style>