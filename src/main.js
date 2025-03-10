import "./assets/main.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import router from "./router";
import AosPlugin from "./plugins/Aos";
import VueLazyload from "vue-lazyload";
import { injectSpeedInsights } from "@vercel/speed-insights"; // ✅ Correct Import

import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

app.use(VueLazyload, {
  preload: 1.3,
  error: "/images/facial.jpg",
  loading: "/images/gallery-5.jpg",
  attempt: 1,
});

app.use(router);
app.use(AosPlugin);
app.use(Toast);

injectSpeedInsights();

app.mount("#app");
