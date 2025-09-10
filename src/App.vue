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
    position: absolute;
    left: 0;
    top: 0;
    right: 0;

    gap: .5rem;
    padding: .25rem;

    display: flex;

    border-bottom: 1px solid#333a3f;
  }

  .rl {
    padding: .5rem;
    color: #8c8c8c;
    font-weight: 600;
    border-radius: .5rem;

    position: relative;
  }

  .rl:hover {
    background-color: #8c8c8c50;
  }

  .rl-selected {
    color: white;
  }

  .rl-selected::after {
    content: '';
    position: absolute;
    width: 100%;
    border: 2px solid transparent;
    border-bottom: 2px solid white;
    bottom: -0.25rem;
    left: 0;
  }
</style>
