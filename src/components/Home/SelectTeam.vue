<script setup lang="ts">
  import { ref, watch } from 'vue';
  import type { IdPlayerName } from '../../types/idplayername';
  import axios from 'axios';
  import type { LeagueEntry } from '../../types/leagues';
  import RankProgress from '../Base/RankProgress.vue';

    const emit = defineEmits(['changeTeam']);

    const props = defineProps<{
        selectedTeam: {
            id: string,
            inputText: string
        },
        error: string
    }>();

    const userTeamData = ref<LeagueEntry>();

    /**
     * yt creator ids:
     * - ltfpl -> 44
     * - focal -> 200
     * - harry -> 1320 
     * - raptor -> 1587
    */
    const teamShortcuts = ref<IdPlayerName[]>([
        { id: "2776065", name: "Me"},
        { id: "7656299", name: "Nik"},
        { id: "44", name: "Let's Talk FPL" },
        { id: "200", name: "FPL Focal" },
        { id: "1320", name: "FPL Harry"},
        { id: "1587", name: "FPL Raptor"},
    ]);

    const changeTeamID = (id: string) => {
      emit("changeTeam", id);
    }

    watch(() => props.selectedTeam.id, async (id) => {
      if (id) {
        const userData = await axios.get(import.meta.env.VITE_PROXY_URL + `https://fantasy.premierleague.com/api/entry/${id}/`);
        if (userData.data) {
          userTeamData.value = {
            ...userData.data,
            leagues: userData.data.leagues.classic
          };
        }
      }
    });

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

    <hr v-if="userTeamData">


    <div class="card" style="border: none;" v-if="userTeamData">
      <div class="title">
        <h4>{{ userTeamData.player_first_name  + " " + userTeamData.player_last_name }}</h4>
        <span>{{ userTeamData.player_region_name }}</span>
      </div>

      <br>
      <hr>

      <h5>Points Overview</h5>
      <div class="row-stat-item details">
        <span>Event points</span>
        <span>{{ userTeamData.summary_event_points }}</span>
      </div>
      <div class="row-stat-item details">
        <span>Overall points</span>
        <span>{{ userTeamData.summary_overall_points }}</span>
      </div>
      <div class="row-stat-item details">
        <span>Event rank</span>
        <span>{{ userTeamData.summary_event_rank.toLocaleString('de-DE') }}</span>
      </div>
      <div class="row-stat-item details">
        <span>Overall rank</span>
        <span>{{ userTeamData.summary_overall_rank.toLocaleString('de-DE') }}</span>
      </div>

      <br>
      <hr>
      <h5>League Standings</h5>
      <div v-for="league of userTeamData.leagues" class="row-stat-item details">
        <div class="arrow-lname">
          <RankProgress :rank="league.entry_rank - league.entry_last_rank" />
          <span>{{ league.name }}</span>
        </div>
        <span>
          <span style="color: #a0a0a0; font-size: .75rem;">{{ league.entry_last_rank.toLocaleString('de-DE') }}</span>
          →
          {{ league.entry_rank.toLocaleString('de-DE') }} 
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>

  .details {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .arrow-lname {
    display: flex;
    gap: .5rem;
    align-items: center;
  }

  .title {
    background-color: transparent;
    align-self: flex-start;
    padding: 0;
  }

  .card {
    flex-direction: column;

    justify-content: flex-start;
    flex: 2;

    max-width: 768px;
  }

  .creators {
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