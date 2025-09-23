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
import { ref, watch } from 'vue';
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

    // chart data
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
                ticks: {
                    stepSize: 100000,
                }
            }
        }
    }

    const chartData = ref(
        {
            labels: ['GW1', 'GW2', 'GW3', 'GW4', 'GW5', 'GW6', 'GW7'],
            datasets: [
                {
                    label: 'Rank',
                    data: [10000, 200000, 150000, 1000, 60000, 500000, 4000],
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

    const numOfGw = ref<number>(5);
    const gws = ref({
        5: 'Last 5',
        10: 'Last 10',
        38: 'Season',
    });

    watch(() => props.selectedTeamId, async (id) => {
        // !!! also contains previous seasons but ignored for now
        const res = await axios.get(import.meta.env.VITE_PROXY_URL + `https://fantasy.premierleague.com/api/entry/${id}/history`);

        if (res.status === 200) {
            chartData.value = {
                labels: res.data.current.map((gw: any) => gw.event),
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
            }
            console.log(chartData.value)
        }
    }, {immediate: true});

</script>

<template>
    <br>
    <hr>
    <h5>Rank Progression</h5>
    <div class="button-container">
        <div v-for="(value, key) in gws" class="show" @click="() => numOfGw = key">
            {{ value }}
        </div>
    </div>
    <div style="height: 250px; width: 100%;">
        <Line :data="chartData" :options="chartOptions" />
    </div>
    
</template>

<style scoped>
    .button-container {
        display: flex;
        gap: .5rem;
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