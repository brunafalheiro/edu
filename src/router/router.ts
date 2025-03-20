import { createRouter, createWebHistory } from 'vue-router';
import Home from '@ui/Home/Home.vue';
import HelloWorld from '@ui/HelloWorld.vue';
import LessonInfo from '@/ui/LessonInfo/LessonInfo.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/hello', name: 'hello', component: HelloWorld },
  { path: '/lesson/:id/info', name: 'lessonInfo', component: LessonInfo },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
