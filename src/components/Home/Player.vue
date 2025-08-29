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
                return 'white';
        }
    });

</script>

<template>
    <div class="player-card">
        <img :src="props.bootstrap.players[player.element].photo" alt="" />
        <div 
            class="match-points"
            :style="{
                backgroundColor: playerBackground
            }"
        >
            <div class="cap" v-if="props.player.is_captain || props.player.is_vice_captain">
                {{ props.player.is_captain ? 'C' : 'V' }}
            </div>
            <span>{{ props.bootstrap.players[props.player.element].web_name }}</span>
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
        align-self: flex-end;
        gap: .5rem;
        width: 15%;
    }

    img {
        width: 50%;
        height: auto;
    }

    .match-points {
        position: relative;
        align-self: stretch;
        text-align: center;
        color: black;
        padding: .25rem;
        border-radius: .5rem;
        
        display: flex;
        flex-direction: column;
        gap: .5rem;
    }

    .player-points {
        background-color: #28002b;
        color: white;
        padding: .25rem;
        font-weight: 600;
        border-radius: 0 0 .3rem .3rem;
    }

    .cap {
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(50%, -50%);
        
        font-size: .75rem;
        font-weight: 900;
        color: white;

        background: #28002b;

        padding: .275rem;
    }
</style>