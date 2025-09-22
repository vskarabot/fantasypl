<script setup lang="ts">
    import { ref } from 'vue';

    const noGW = ref(5);

    const data = ref({
        13: 10,
        14: 12,
        15: 8,
        16: 2,
        17: 4,
    });

</script>

<template>
    <br>
    <hr>
    <h5>Rank Progression</h5>
    
</template>

<style scoped>
    .show {
        border: 1px solid #333a3f;
        padding: 0.5rem;
        border-radius: .5rem;
        width: fit-content;
    }

    .show:hover {
        background-color: #333a3f;
        cursor: pointer;
    }

    
    
</style>