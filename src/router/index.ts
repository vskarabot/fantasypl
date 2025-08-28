import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home/Home.vue';

const routes = [
    { path: '/', name: 'Home', component: Home},
    { path: '/teams', name: 'Teams', component: () => import('../components/Teams/LeagueTable.vue')}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;