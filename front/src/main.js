import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import Router from 'vue-router'
import WorkingTime from './components/WorkingTime.vue'
import WorkingTimes from './components/WorkingTimes.vue'
import ClockManager from './components/ClockManager.vue'
import ChartManager from './components/ChartManager.vue'



Vue.use(Router)
Vue.use(BootstrapVue)
Vue.config.productionTip = false

// 1. Define route components.


// 2. Define some routes
const routes = [
  { path: '/workingTimes/:userID', component: WorkingTimes }, //Show all
  { path: '/workingTime/:userID', component: WorkingTime }, //Creation
  { path: '/workingTime/:userID/:workingtimeID', component: WorkingTimes }, //Delete and Update
  { path: '/clock/:userID', component: ClockManager }, //Clock status
  { path: '/chartManager/:userID', component: ChartManager } //Show graphs
]

// 3. Create the router instance and pass the `routes` option
const router = new Router({
  routes // short for `routes: routes`
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
