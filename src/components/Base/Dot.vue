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
</template>

<style scoped>
    .triangle {
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
    }

    .down {
        border-top: 5px solid red;
    }

    .up {
        border-bottom: 5px solid green;
    }
</style>
