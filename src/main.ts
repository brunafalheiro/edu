import { createApp } from 'vue';
import { nextTick } from 'vue';
import App from './App.vue';
import router from './router/router';
import './style.css';
import './demos/ipc';

const app = createApp(App);
app.use(router);
app.mount('#app');

nextTick(() => {
  postMessage({ payload: 'removeLoading' }, '*');
});
