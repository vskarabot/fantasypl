<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref, watch } from 'vue';
import NoData from '../Base/NoData.vue';
import type { LeagueEntry } from '../../types/leagues';
import Dot from '../Base/Dot.vue';

    const props = defineProps<{
        selectedTeamId: string
    }>();

    const error = ref('');
    const leaguesData = ref<LeagueEntry>();

    onMounted(() => {
        fetchData(props.selectedTeamId);
    });

    watch(
        () => props.selectedTeamId, 
        async (newId) => {
            fetchData(newId);
    });

    // fetch
    const fetchData = async (newId: string) => {
        try {
            const res = await axios.get(import.meta.env.VITE_PROXY_URL + `https://fantasy.premierleague.com/api/entry/${newId}/`);
            
            // i only need classic league so we simplify object structure
            if (res.data) {
                res.data.leagues = res.data.leagues.classic;
                leaguesData.value = res.data;
                console.log(leaguesData.value);
                error.value = '';
            }
            else {
                error.value = 'No data to show.'
            }


        } catch(err: any) {
            error.value = "Oops! We're having trouble fetching leagues data. Please try again later!";
        }
    }

</script>

<template>
    <h4>Team Details</h4>
    <div v-if="!error && leaguesData" class="card">
        <div class="row-stat-item" style="background-color: #1e0021;">
            <h4>{{ leaguesData.player_first_name + " " + leaguesData.player_last_name }}</h4>
        </div>
        <div class="row-stat-item">
            <h4>{{ leaguesData.summary_overall_points }}</h4>
            <span>Overall Points</span>
        </div>
        <div class="row-stat-item">
            <h4>{{ leaguesData.summary_overall_rank.toLocaleString('de-DE') }}</h4>
            <span>Overall Rank</span>
        </div>
        <div class="row-stat-item">
            <h4>{{ leaguesData.years_active }}</h4>
            <span>Years Active</span>
        </div>
    </div>
    
    <h4>League Ranks</h4>
    <div v-if="!error && leaguesData" class="card">
        <div v-for="league in leaguesData.leagues" class="row-stat-item">
            <h4>{{ league.entry_rank ? league.entry_rank.toLocaleString('de-DE') : 'TBA' }}</h4>
            <Dot :newRank="league.entry_rank" :oldRank="league.entry_last_rank" />
            <span>{{ league.name }}</span>
        </div>
    </div>
    <NoData v-if="error">{{ error }}</NoData>
</template>