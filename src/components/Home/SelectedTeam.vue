<script setup lang="ts">
    import { computed } from 'vue';
    import type { Bootstrap } from '../../types/bootstrap';
    import type { MyTeamInterface, Pick } from '../../types/team';
    import Player from './Player.vue';
import { chips } from '../../constants';

    const props = defineProps<{
        bootstrap: Bootstrap,
        myTeam: MyTeamInterface,
        selectedTeamId: string
    }>();

    const playersByPosition = computed(() => {
        
        const pbp: Pick[][] = [[],[],[],[],[]];
        props.myTeam.picks.map((pick: Pick) => {
            if (props.myTeam.active_chip && props.myTeam.active_chip === 'bboost' || pick.position <= 11) {
                pbp[pick.element_type - 1].push(pick);
            }
            else {
                pbp[4].push(pick);
            }
        })

        return pbp;
    });
    
</script>

<template>
    <div class="my-team">
        <div class="card" v-if="props.myTeam.entry_history">
            <div v-if="props.myTeam.active_chip && chips[props.myTeam.active_chip]" class="row-stat-item">
                <img class="chip-icon" :src=chips[props.myTeam.active_chip].icon>
                <span>{{ chips[props.myTeam.active_chip].name }} Played</span>
            </div>
            <div class="row-stat-item">
                <h4>{{ props.myTeam.entry_history.points }}</h4>
                <span>Event Points</span>
            </div>
            <div class="row-stat-item">
                <h4>{{ props.myTeam.entry_history.value / 10 }}£</h4>
                <span>Team Value</span>
            </div>
            <div class="row-stat-item">
                <h4>{{ props.myTeam.entry_history.bank / 10 }}£</h4>
                <span>In the Bank</span>
            </div>
            <div class="row-stat-item">
                <h4>{{ props.myTeam.entry_history.event_transfers }}</h4>
                <span>Event Transfers</span>
            </div>
            <div
                class="row-stat-item"
            >
                <h4>{{ props.myTeam.entry_history.event_transfers_cost }}</h4>
                <span>Transfers Cost</span>
            </div>
        </div>

        <div class="card card-team" v-if="props.myTeam.entry_history">
            <div class="field">
                <div class="half-circle"></div>
                <div class="half-line"></div>
                <div class="box-16"></div>
            </div>

            <div class="squad-canvas">
                <div v-for="(pick, i) in playersByPosition" class="position" :key="i">
                    <Player v-for="player in pick" :player="player" :bootstrap="bootstrap" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

    .my-team {
        flex: 3;
        display: flex;
        flex-direction: column;
        gap: .5rem;
    }

    .row-stat-item {
        border: 1px solid #333a3f;
    }

    .card-team {
        background: 
            linear-gradient(rgb(69, 181, 225)) padding-box,
            linear-gradient(#333a3f) border-box;
        position: relative;
        flex-direction: column;
        height: max-content;
        justify-content: flex-start;

        overflow: hidden;
    }

    .field {
        position: absolute;
        box-sizing: border-box;
        left: 0;
        width: 100%;
        top: 0;
        height: 100%;
        background: radial-gradient(circle at 50% 200%, rgb(111, 195, 111), rgb(0, 101, 0));
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
        gap: 1rem;
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
        background: linear-gradient(white, transparent);
        padding: .5rem;
    }



    .chip-icon {
        max-width: 1rem;
        aspect-ratio: 1 / 1;
    }

</style>