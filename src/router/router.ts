import { createRouter, createWebHistory } from 'vue-router';
import Home from '@ui/Home.vue';
import CourseInfo from '@/ui/CourseInfo.vue';
import BinaryTreeSimulator from '@ui/BinaryTreeSimulator.vue';
import Course from '@ui/Course.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/course/:courseId/info', name: 'courseInfo', component: CourseInfo },
  { path: '/course/:courseId/:classId/:topicId', name: 'course', component: Course },
  { path: '/binary-tree-simulator', name: 'binaryTreeSimulator', component: BinaryTreeSimulator },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
