import { createRouter, createWebHistory } from 'vue-router';
import Home from '@ui/Home/Home.vue';
import HelloWorld from '@ui/HelloWorld.vue';

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/hello', name: 'hello', component: HelloWorld },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
