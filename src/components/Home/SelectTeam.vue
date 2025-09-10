<script setup lang="ts">
    import { ref } from 'vue';
    import type { TIDChip } from '../../types/chiptid';

    const emit = defineEmits(['changeTeam']);

    const props = defineProps<{
        selectedTeam: {
            id: string,
            inputText: string
        },
        error: string
    }>();

    /**
     * yt creator ids:
     * - ltfpl -> 44
     * - focal -> 200
     * - harry -> 1320 
     * - raptor -> 1587
    */
    const teamShortcuts = ref<TIDChip[]>([
        { id: "2776065", name: "Me"},
        { id: "44", name: "Let's Talk FPL" },
        { id: "200", name: "FPL Focal" },
        { id: "1320", name: "FPL Harry"},
        { id: "1587", name: "FPL Raptor"},
    ]);

    const changeTeamID = (id: string) => {
      emit("changeTeam", id);
    }

</script>

<template>
  <div class="card">
    <div class="creators">
      
      <div class="youtubers">
        <p v-for="team of teamShortcuts" :key="team.id" @click="changeTeamID(team.id)">
          {{ team.name }}
        </p>
      </div>

      <br>

      <div class="id-setup">
        <input id="input" type="text" v-model="props.selectedTeam.inputText" placeholder="Enter team ID" maxlength="8">
        <button @click="changeTeamID(props.selectedTeam.inputText)">
            &#128269;
        </button>
      </div>
      <label for="input">{{ props.error }}</label>

    </div>
  </div>
</template>

<style scoped>
  .card {
    flex-direction: column;
    gap: 1rem;  

    flex: 2;
  }

  .creators {
    flex: 1;
    display: flex;
    flex-direction: column;

    gap: .5rem;
  }

  .id-setup, .youtubers {
    display: flex;
    justify-content: center;
  }

  .id-setup {
    border-radius: 1rem;
    overflow: hidden;
    max-width: max-content;
    align-self: center;
  }

  .youtubers {
    gap: .5rem;
  }

  .youtubers p {
    padding: .5rem;
    border-radius: .5rem;
    border: 1px solid #333a3f;
  }

  .youtubers p:hover {
    cursor: pointer;
    background-color: #333a3f;
  }

  label {
    text-align: center;
    font-size: .75rem;
  }

  .dark-text {
    color: #28002b;
  }
</style>