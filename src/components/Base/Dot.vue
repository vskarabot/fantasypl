<script setup lang="ts">
import { computed } from 'vue';

    const props = defineProps<{
        newRank: number,
        oldRank: number
    }>();

    const shape = computed(() => {
        if (props.newRank > props.oldRank) {
            return -1;
        }
        else if (props.newRank < props.oldRank) {
            return 1;
        }
    });
</script>

<template>
    <div v-if="shape === -1" class="triangle down"></div>
    <div v-else-if="shape === 1" class="triangle up"></div>
    <div v-else class="stagnate"></div>
</template>

<style scoped>
    .triangle {
        width: 0;
        height: 0;
        border-left: .5rem solid transparent;
        border-right: .5rem solid transparent;
    }

    .down {
        border-top: .5rem solid red;
    }

    .up {
        border-bottom: .5rem solid lime;
    }

    .stagnate {
        width: 1rem;
        aspect-ratio: 3 / 1;
        background-color: gray;
    }
</style>
