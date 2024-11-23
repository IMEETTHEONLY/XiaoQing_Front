import { createApp } from "vue";
import AppComponent from "./App.vue";
import router from './router';
import store from './store';

const app = createApp(AppComponent)
app.use(router)
app.use(store)
app.mount("#app");

