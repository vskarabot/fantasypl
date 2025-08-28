import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home/Home.vue';

const routes = [
    { path: '/', name: 'Home', component: Home},
    { path: '/teams', name: 'Teams', component: () => import('../components/Teams/LeagueTable.vue')},
    { path: '/players', name: 'Players', component: () => import('../components/Footballers/Stats.vue')},
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;