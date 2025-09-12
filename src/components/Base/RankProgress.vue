<script setup lang="ts">
    const props = defineProps<{
        rank: number
    }>();
</script>

<template>
    <span v-if="props.rank > 0" class="down"></span>
    <span v-else-if="props.rank < 0" class="up"></span>
    <span v-else class="no-change"></span>
</template>

<style scoped>
    span {
        display: inline-block;
        width: 0;
        height: 0;
    }

    .up {
        border-left: .25rem solid transparent;
        border-right: .25rem solid transparent;
        border-bottom: .25rem solid lime;
    }

    .down {
        border-left: .25rem solid transparent;
        border-right: .25rem solid transparent;
        border-top: .25rem solid red;
    }

    .no-change {
        height: .125rem;
        width: .5rem;
        background-color: gray;
    }
</style>