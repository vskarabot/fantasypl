<script setup lang="ts">
  import axios from 'axios';
  import { onMounted, ref } from 'vue';

  import type { Bootstrap, Gameweek, Player, Team } from './types/bootstrap';
  import type { MyTeamInterface } from './types/team';

  import MyTeam from './components/MyTeam.vue';
  import Overview from './components/Overview.vue';
import Leagues from './components/Leagues.vue';

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

  const loadMyTeam = async() => {
    if (!selectedTeam.value.id)
      return;
    const res = await axios.get(import.meta.env.VITE_PROXY_URL + `https://fantasy.premierleague.com/api/entry/${selectedTeam.value.id}/event/${bootstrap.value.currentGW?.id}/picks/`)
    myTeam.value = res.data;   
    console.log(myTeam.value) 
  }

  const changeTeamID = () => {
    if (selectedTeam.value.inputText) {
        selectedTeam.value.id = selectedTeam.value.inputText;
        loadMyTeam();
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

    loadMyTeam();

  });

</script>

<template>
  <Overview :bootstrap="bootstrap" :myTeam="myTeam" />

  <br>

  <h2>My Team</h2>
  <div class="card id-setup">
    <input type="text" v-model="selectedTeam.inputText" placeholder="Enter your FPL team ID" @keyup.enter="changeTeamID()">
    <button @click="changeTeamID()">
        Confirm
    </button>
  </div>

  <MyTeam :bootstrap="bootstrap" :myTeam="myTeam" />

  <br>
  <Leagues />
  
</template>

<style scoped>
  .id-setup {
      justify-content: center;
      gap: 0;
  }
</style>
