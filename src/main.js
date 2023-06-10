import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import "./plugins/apexcharts";
import axios from 'axios';

Vue.prototype.$axiosAuth = axios.create({
  baseURL:  "http://localhost:8085/api/auth",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});

Vue.prototype.$axios = axios.create({
  baseURL:  "http://localhost:8080/api/v1/",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});

Vue.prototype.$axiosGPT = axios.create({
  baseURL:  "https://api.openai.com/v1",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer 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'
  }
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
