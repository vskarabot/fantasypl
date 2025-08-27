<script setup lang="ts">
    import { computed } from 'vue';    
    import type { Bootstrap } from '../types/bootstrap';
    import type { MyTeamInterface } from '../types/team';

    const props = defineProps<{
        bootstrap: Bootstrap,
        myTeam: MyTeamInterface
    }>();

    // computed
    const bestValForMoney = computed(() => {
        let maxVal = 0;
        let player = null;
        for (const p of Object.values(props.bootstrap.players)) {
            const price = p.now_cost / 10;
            const points = p.event_points;
            if (points / price > maxVal) {
                maxVal = points / price;
                player = p;
            }
        }

        return {
            player: player,
            maxVal: maxVal.toFixed(2) + " pts/£"
        };
    })

    const worstValForMoney = computed(() => {
        let minVal = Infinity;
        let player = null;
        for (const p of Object.values(props.bootstrap.players)) {
            const price = p.now_cost / 10;
            const points = p.event_points;
            if (points / price < minVal) {
                minVal = points / price;
                player = p;
            }
        }

        return {
            player: player,
            minVal: minVal.toFixed(2) + " pts/£"
        };
    })

    const differential = computed(() => {
        let maxVal = 0;
        let player = null;
        for (const p of Object.values(props.bootstrap.players)) {
            const ownership = parseInt(p.selected_by_percent);
            const points = p.event_points;
            if (ownership > 0 && points / ownership > maxVal) {
                maxVal = points / ownership;
                player = p;
            }
        }

        return { maxVal: '+' + maxVal + ' pts', player }
    })

</script>

<template>
    <div class="section-title">
        <h2>Gameweek {{ props.bootstrap.currentGW?.id }}</h2>
    </div>

    <h4>Points</h4>
    <div class="card">
         <div class="row-stat-item">
            <h3>{{ props.bootstrap.currentGW?.average_entry_score }} </h3>
            <span>Average Points</span>
        </div>
        <div class="row-stat-item">
            <h3>{{ props.bootstrap.currentGW?.highest_score }}</h3>
            <span>Highest points</span>
        </div>
    </div>

    <h4>Standout Players</h4>
    <div class="card" v-if="bootstrap.currentGW">
        <div class="row-stat-item">
            <h3>{{ bootstrap.players[bootstrap.currentGW.most_captained].web_name }}</h3>
            <img :src="bootstrap.players[bootstrap.currentGW.most_captained].photo">
            <div class="points-holder white">
                {{ bootstrap.players[bootstrap.currentGW.most_captained].event_points }} pts
            </div>
            <span>Most Captained</span>
        </div>
        <div class="row-stat-item">
            <h3>{{ bootstrap.players[bootstrap.currentGW.most_selected].web_name }}</h3>
            <img :src="bootstrap.players[bootstrap.currentGW.most_selected].photo">
            <div class="points-holder white">{{ bootstrap.players[bootstrap.currentGW.most_selected].event_points }} pts</div>
            <span>Highest Ownership</span>
        </div>

        <div class="row-stat-item">
            <h3>{{ bestValForMoney?.player?.web_name }}</h3>
            <img :src="bestValForMoney.player?.photo">
            <div class="points-holder">{{ bestValForMoney?.maxVal }}</div>
            <span>Best Value for Money</span>
        </div>

        <div class="row-stat-item">
            <h3>{{ worstValForMoney?.player?.web_name }}</h3>
            <img :src="worstValForMoney.player?.photo">
            <div class="points-holder orange">{{ worstValForMoney?.minVal }}</div>
            <span>Worst Value</span>
        </div>
        <div class="row-stat-item">
            <h3>{{ bootstrap.players[bootstrap.currentGW.top_element_info.id].web_name }}</h3>
            <img :src="bootstrap.players[bootstrap.currentGW.top_element_info.id].photo">
            <div class="points-holder">{{ bootstrap.currentGW.top_element_info.points }} pts</div>
            <span><span style="color: #00FF87">&#10026;</span> Player Of The Week</span>
        </div>
        <div class="row-stat-item">
            <h3>{{ differential?.player?.web_name }}</h3>
            <img :src="differential.player?.photo">
            <div class="points-holder">{{ differential?.maxVal }}</div>
            <span>Biggest Differential</span>
        </div>
    </div>
</template>