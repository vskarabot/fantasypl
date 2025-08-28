<template>
  <nav>
    <router-link class="rl" to="/" active-class="rl-selected">Home</router-link>
    <router-link class="rl" to="/teams" active-class="rl-selected">Teams</router-link>
    <router-link class="rl" to="/players" active-class="rl-selected">Players</router-link>
  </nav>

  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<style scoped>
  nav {
    align-self: center;
    gap: .5rem;
    padding: .25rem;
    border-radius: 5rem;
    overflow: hidden; 
    background: 
      linear-gradient(to right, #00FF87, #9b59b6);
    box-shadow: 
      0 0 1rem #5f2675;
    display: flex;
  }

  .rl {
    padding: .75rem 1rem;
    color: #000000;
    font-weight: 600;
    border-radius: 5rem;
    border: 2px solid transparent;
    will-change: box-shadow;
    transition: box-shadow .1s linear;
  }

  .rl:hover {
    box-shadow: 0 0 .5rem black;
  }

  .rl-selected {
    box-shadow: 0 0 .5rem black;
    background: #28002b;
    color: white;
  }
</style>
