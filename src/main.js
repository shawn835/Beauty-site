import "./assets/main.css";
import router from "./router/router";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import FontAwesomeIcon from "./Plugins/fontawesome";

import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

const app = createApp(App);

app.use(pinia);
app.use(router);

// register globally
app.component("FontAwesomeIcon", FontAwesomeIcon);

app.mount("#app");
