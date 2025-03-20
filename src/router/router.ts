import { createRouter, createWebHistory } from 'vue-router';
import Home from '@ui/Home.vue';
import HelloWorld from '@ui/HelloWorld.vue';
import CourseInfo from '@/ui/CourseInfo.vue'
import BinaryTreeSimulator from '@ui/BinaryTreeSimulator.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/hello', name: 'hello', component: HelloWorld },
  { path: '/course/:id/info', name: 'courseInfo', component: CourseInfo },
  { path: '/binary-tree-simulator', name: 'binaryTreeSimulator', component: BinaryTreeSimulator },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
