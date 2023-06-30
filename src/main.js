import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import "./plugins/apexcharts";
import axios from 'axios';
import { Configuration, OpenAIApi } from "openai";

Vue.prototype.$axios = axios.create({
  baseURL:  "http://52.15.199.102:8080/api/v1/",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});

const apiKey = process.env.VUE_APP_OPENAI_API_KEY;

const configuration = new Configuration({
  organization: "org-gUhDidDoVgyVBKgfSp6l1Js3",
  apiKey,
});

const openai = new OpenAIApi(configuration);

Vue.prototype.$openai = openai;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
