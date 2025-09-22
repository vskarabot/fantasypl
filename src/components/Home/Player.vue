<script setup lang="ts">
    import { computed } from 'vue';
    import type { Bootstrap } from '../../types/bootstrap';
    import type { Pick } from '../../types/team';

    const props = defineProps<{
        player: Pick,
        bootstrap: Bootstrap
    }>();

    const playerPoints = computed(() => {
        const basePoints = props.bootstrap.players[props.player.element].event_points;
        return props.player.multiplier > 0 ? basePoints * props.player.multiplier : basePoints;
    });

    const playerBackground = computed(() => {
        switch (props.bootstrap.players[props.player.element].chance_of_playing_next_round) {
            case 0:
                return '#b2002d';
            case 50:
                return '#ffab1b';
            case 75:
                return '#fbe772';
            default:
                return '#fff';
        }
    });

</script>

<template>
    <div class="player-card">
        <img :src="props.bootstrap.players[player.element].photo" alt="" />
        <div 
            class="match-points"
            :style="{
                color: playerBackground
            }"
        >
            <p style="font-style: normal;">
                {{ props.bootstrap.players[props.player.element].web_name }}
                <span class="cap" v-if="props.player.is_captain || props.player.is_vice_captain">
                    {{ props.player.is_captain ? 'C' : 'vc' }}
                </span>
            </p>
           
            <hr>
            <p class="player-points">
                {{ playerPoints }}
            </p>
        </div>
    </div>
</template>

<style scoped>
    .player-card {
        display: flex;
        flex-direction: column;
        align-items: center;

        background: 
            linear-gradient(#05090b, #333a3f, #05090b);

        border-radius: .5rem;
        padding-top: .5rem;

        width: clamp(5rem, 10vw, 8rem);
        white-space: nowrap;
        overflow: hidden;

        position: relative;
    }

    img {
        width: auto;
        height: clamp(2rem, 10vw, 6rem);
    }

    .match-points {
        align-self: stretch;
        text-align: center;
        color: white;
        background: #05090b;
        
        display: flex;
        flex-direction: column;
        padding: .375rem 0;
        gap: .375rem;

        font-size: clamp(.5rem, 2vw, 1rem);
        font-weight: 600;
    }

    .player-points {
        border-radius: 0 0 .3rem .3rem;
    }


    .cap, .bench-pos {
        font-weight: 600;
        padding: .25rem .5rem;
        text-decoration: underline;
    }

    .cap {
        position: absolute;
        top: 0;
        left: 0;
    }

    .bench-pos {
        align-self: flex-start;
        font-size: .75rem;
        font-weight: 600;
    }

</style>