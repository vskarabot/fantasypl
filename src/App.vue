<template>
  <nav class="card">
    <router-link class="rl" to="/" active-class="rl-selected">Home</router-link>
    <router-link class="rl" to="/teams" active-class="rl-selected">Teams</router-link>
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
      linear-gradient(to top right, #05f0ff, #943cff 60%);

    display: flex;
  }

  .rl {
    padding: .75rem;
    color: black;
    font-weight: 600;
    border-radius: 5rem;
    border: 2px solid transparent;
  }

  .rl-selected {
    color: #ffffff;
    border-color: #ffffff;
  }
</style>
