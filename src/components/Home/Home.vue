<script setup lang="ts">
  import axios from 'axios';
  import { onMounted, ref } from 'vue';

  import type { Bootstrap, Gameweek, Player, Team } from '../../types/bootstrap';
  import type { MyTeamInterface } from '../../types/team';

  import SelectedTeam from './SelectedTeam.vue';
  import SelectTeam from './SelectTeam.vue';

  /** 
   *   bootstrap data i didnt use:
   * - chips (names),
   * - element_stats -> only label and names - wont need (probably),
   * - element_types -> same,
   * - phases - wont need,
   */
  const bootstrap = ref<Bootstrap>({
    total_managers: 0,
    players: {},
    gameweeks: [],
    currentGW: null,
    teams: {}
  });

  const myTeam = ref<MyTeamInterface>({
    active_chip: null,
    automatic_subs: [],
    entry_history: null,
    picks: []
  });

  const selectedTeam = ref<{
      id: string,
      inputText: string
  }>({
      id: '',
      inputText: ''
  });

  const error = ref<string>('');

  const loadMyTeam = async(id: string) => {
    try {
      const res = await axios.get(import.meta.env.VITE_PROXY_URL + `https://fantasy.premierleague.com/api/entry/${id}/event/${bootstrap.value.currentGW?.id}/picks/`);

      if (res.data.detail) {
        error.value = `No team with input ID of ${id}`;
        return;
      }

      error.value = '';
      selectedTeam.value.id = id;
      myTeam.value = res.data;
    } catch (err: any) {
      error.value = `No team with input ID of '${id}'. ID can only be a digit [0-9]`;
    }
  }

  onMounted(async () => {
    const res = await axios.get(import.meta.env.VITE_PROXY_URL + 'https://fantasy.premierleague.com/api/bootstrap-static/');
    if (res.status === 200) {
      bootstrap.value.total_managers = res.data.total_players;

      bootstrap.value.gameweeks = res.data.events;
      // current gw
      bootstrap.value.currentGW = bootstrap.value.gameweeks.find((week: Gameweek) => week.is_current);

      // alter data to use key: val instead of array of objects
      // for some reason fpl returns jpg but uses png
      bootstrap.value.players = Object.fromEntries(
        res.data.elements.map((player: Player) => [
          player.id, {
            ...player, 
            photo: 'https://resources.premierleague.com/premierleague25/photos/players/110x140/' + player.photo.split('.')[0] + '.png'
          }
        ])
      );
      
      bootstrap.value.teams = Object.fromEntries(
        res.data.teams.map((team: Team) => [team.id, team])
      );
    }
    else {
      console.log("Error fetching data from https://fantasy.premierleague.com/api/");
    }

  });

</script>

<template>
  <div class="container">
    <SelectTeam
      :error="error"
      :selectedTeam="selectedTeam" 
      @changeTeam="loadMyTeam" 
    />
    <SelectedTeam 
      v-if="!error && selectedTeam.id" 
      :bootstrap="bootstrap" 
      :myTeam="myTeam" 
      :selectedTeamId="selectedTeam.id"
    />  
  </div>
</template>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  @media screen and (min-width: 768px) {
    .container {
      flex-direction: row;
    }
  }
</style>
