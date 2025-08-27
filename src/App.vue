<script setup lang="ts">
  import axios from 'axios';
  import { onMounted, ref } from 'vue';

  import type { Bootstrap, Gameweek, Player, Team } from './types/bootstrap';
  import type { MyTeamInterface } from './types/team';

  import MyTeam from './components/MyTeam.vue';
  import Overview from './components/Overview.vue';
  import Leagues from './components/Leagues.vue';
  import type { TIDChip } from './types/chiptid';

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
    const res = await axios.get(import.meta.env.VITE_PROXY_URL + `https://fantasy.premierleague.com/api/entry/${id}/event/${bootstrap.value.currentGW?.id}/picks/`);
    
    if (res.data.detail) {
      error.value = `No team with input ID of ${id}`;
      return;
    }
    selectedTeam.value.id = id;
    myTeam.value = res.data;
  }

  const changeTeamID = (id: string) => {
      const regx = /^[0-9]{1,8}$/;
      if (!regx.test(id)) {
        error.value = 'Team ID is always a positive integer.';
        return;
      }

      error.value = '';
      loadMyTeam(id);
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

  <h2>Explore Teams</h2>
  <div class="card">
    <div class="creators">
      <h4>Selected Team ID</h4>
      <h3 class="team-title">{{ selectedTeam.id ? selectedTeam.id : '/' }}</h3>

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

  <MyTeam :bootstrap="bootstrap" :myTeam="myTeam" />

  <br>
  <Leagues />
  
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
