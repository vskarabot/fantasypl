<script setup lang="ts">
    import { computed } from 'vue';    
    import type { Bootstrap } from '../../types/bootstrap';
    import type { MyTeamInterface } from '../../types/team';

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

</script>

<template>
    <div class="section-title">
        <h2>Gameweek {{ props.bootstrap.currentGW?.id }}</h2>
    </div>

    <div class="card" v-if="bootstrap.currentGW">
        <div class="row-stat-item">
            <h3>{{ props.bootstrap.currentGW?.average_entry_score }} </h3>
            <span>Average Points</span>
        </div>
        <div class="row-stat-item">
            <h3>{{ props.bootstrap.currentGW?.highest_score }}</h3>
            <span>Highest points</span>
        </div>

        <div class="row-stat-item">
            <h4 style="color: #00FF87;">POTW &#10026;</h4>
            <img :src="bootstrap.players[bootstrap.currentGW.top_element_info.id].photo">
            <div class="points-holder">{{ bootstrap.currentGW.top_element_info.points }} pts</div>
            {{ bootstrap.players[bootstrap.currentGW.top_element_info.id].web_name }}
        </div>
        <div class="row-stat-item">
            <h4>BEST VALUE</h4>
            <img :src="bestValForMoney.player?.photo">
            <div class="points-holder">{{ bestValForMoney.maxVal }}</div>
            {{ bestValForMoney.player?.web_name }}
        </div>

        <div class="row-stat-item">
            <h4>MOST (C)</h4>
            <img :src="bootstrap.players[bootstrap.currentGW.most_captained].photo">
            <div class="points-holder white">
                {{ bootstrap.players[bootstrap.currentGW.most_captained].event_points }} pts
            </div>
            {{ bootstrap.players[bootstrap.currentGW.most_captained].web_name }}
        </div>
        <div class="row-stat-item">
            <h4>MOST OWNED</h4>
            <img :src="bootstrap.players[bootstrap.currentGW.most_selected].photo">
            <div class="points-holder white">{{ bootstrap.players[bootstrap.currentGW.most_selected].event_points }} pts</div>
            {{ bootstrap.players[bootstrap.currentGW.most_selected].web_name }}
        </div>
    </div>
</template>