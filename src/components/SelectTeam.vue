<script setup lang="ts">
    import { ref } from 'vue';
    import type { TIDChip } from '../types/chiptid';

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
    <h2>Explore Teams</h2>
  <div class="card">
    <div class="creators">
      <h4>{{ props.selectedTeam.id ? 'Selected Team' : 'Select a team' }}</h4>
      <h3 class="team-title" v-if="selectedTeam.id">{{ selectedTeam.id }}</h3>

      <hr>
      <div class="youtubers">
        <span v-for="team of teamShortcuts" :key="team.id" @click="changeTeamID(team.id)">
          {{ team.name }}
        </span>
      </div>

      <br>

      <span style="text-align: center;">or</span>
      <div class="id-setup">
        <input id="input" type="text" v-model="selectedTeam.inputText" placeholder="Enter team ID" maxlength="8">
        <button @click="changeTeamID(selectedTeam.inputText)">
            Confirm
        </button>
      </div>

      <label for="input">{{ error }}</label>

    </div>
  </div>
</template>

<style scoped>
  .creators {
    flex: 1;
    display: flex;
    flex-direction: column;

    gap: .5rem;
  }

  .id-setup, .youtubers {
    display: flex;
    justify-content: center;
    gap: .5rem;
  }

  .youtubers span {
    padding: .5rem;
    border-radius: .5rem;
    border: 1px solid #00FF87;
  }

  .youtubers span:hover {
    cursor: pointer;
    box-shadow: 0 0 5px #00FF87;
  }

  .team-title {
    background: #00FF87;
    align-self: flex-start;
    color: #28002b;
    padding: 0.25rem;
  }

  label {
    color: red;
    text-align: center;
    font-size: .75rem;
  }
</style>