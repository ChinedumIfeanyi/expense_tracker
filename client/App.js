import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import VueSwal from "vue-swal"

Vue.use(VueSwal)


new Vue({
  render: h => h(App),
  router
}).$mount('#app')