import { createApp } from 'vue';
import { nextTick } from 'vue';
import App from './App.vue';
import router from './router/router';
import './demos/ipc';
import '@/assets/index.scss';

const app = createApp(App);
app.use(router);
app.mount('#app');

nextTick(() => {
  postMessage({ payload: 'removeLoading' }, '*');
});
