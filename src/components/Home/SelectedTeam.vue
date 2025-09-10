<script setup lang="ts">
    import { computed } from 'vue';
    import type { Bootstrap } from '../../types/bootstrap';
    import type { MyTeamInterface, Pick } from '../../types/team';
    import Player from './Player.vue';

    const props = defineProps<{
        bootstrap: Bootstrap,
        myTeam: MyTeamInterface,
        selectedTeamId: string
    }>();

    const playersByPosition = computed(() => {
        
        const pbp: Pick[][] = [[],[],[],[],[]];
        props.myTeam.picks.map((pick: Pick) => {
            if (pick.position <= 11) {
                pbp[pick.element_type - 1].push(pick);
            }
            else {
                pbp[4].push(pick);
            }
        })

        return pbp;
    });

    const rankFormat = (rank: number) => {
        return rank.toLocaleString('de-DE');
    };
    
</script>

<template>
    <div class="card card-team" v-if="props.myTeam.entry_history">
        <div class="field">
            <div class="half-circle"></div>
            <div class="half-line"></div>
            <div class="box-16"></div>
        </div>
        <div class="details">
            <div class="row-stat-item">
                <h3>{{ props.myTeam.entry_history.points }}</h3>
                <span v-if="!props.bootstrap.currentGW?.finished" class="live-dot"></span>
                <span>{{ !props.bootstrap.currentGW?.finished ? 'Live Points' : 'Final Points' }}</span>
            </div>
            <div class="row-stat-item">
                <h3>{{ props.myTeam.entry_history.points_on_bench }}</h3>
                <span>Bench Points</span>
            </div>
            <div class="row-stat-item">
                <h3>{{ props.myTeam.active_chip ? props.myTeam.active_chip : '/' }}</h3>
                <span>Chip Used</span>
            </div>
            <div class="row-stat-item">
                <h3>{{ rankFormat(props.myTeam.entry_history.rank) }}</h3>
                <span>GW Rank</span>
            </div>
        </div>
        <div class="squad-canvas">
            <div v-for="(pick, i) in playersByPosition" class="position" :key="i">
                <Player v-for="player in pick" :player="player" :bootstrap="bootstrap" />
            </div>
        </div>
    </div>
</template>

<style scoped>
    .card-team {
        position: relative;
        flex-direction: column;

        overflow: hidden;
        flex: 3;
    }

    .field {
        position: absolute;
        box-sizing: border-box;
        left: 0;
        width: 100%;
        top: 0;
        height: 100%;
        background: radial-gradient(circle at 50% 200%, green, rgb(0, 44, 0));
        border: 5px solid white;
        transform: translateY(-15%) perspective(200px) rotateX(20deg);
    }

    .half-line, .half-circle {
        position: absolute;
        bottom: 30%;
    }

    .half-line {
        height: 2px;
        width: 100%;
        background-color: white;
    }

    .half-circle {
        left: 50%;
        transform: translate(-50%, 50%);
        width: 20%;
        height: 10%;
        border: 3px solid white;
        border-radius: 50%;
    }

    .box-16 {
        position: absolute;
        left: 50%;
        top: 0;
        transform: translate(-50%, 0);
        height: 20%;
        width: 45%;
        border: 5px solid white;
    }

    .squad-canvas {
        opacity: .95;

        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .details {
        align-self: center;
        height: max-content;

        display: flex;
        flex-direction: row;
        gap: 1rem;

        z-index: 10;
    }

    /** each position row (gk, df, mid, st, bench) */
    .position {
        flex: 1;

        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }

    .position:last-child {
        border-radius: 1rem 1rem 0rem 0rem;
        background: linear-gradient(#ffffffc0, transparent);
    }

</style>