import Vue from 'vue'
import Router from 'vue-router'
import ChartManager from "./components/ChartManager";
import ClockManager from "./components/ClockManager";
import WorkingTime from "./components/WorkingTime";
import WorkingTimes from "./components/WorkingTimes";

Vue.use(Router);

export default new Router({
    routes: [
        {path: '/chartManager/:id', name: 'ChartManager', component: ChartManager},
        {path: '/clock/:id', name: 'ClockManager', component: ClockManager},
        {path: '/workingTime/:userid/:workingtimeid', name: 'WorkingTime', component: WorkingTime},
        {path: '/workingTime/:userid', name: 'WorkingTime', component: WorkingTime},
        {path: '/workingTimes/:id', name: 'WorkingTimes', component: WorkingTimes},
    ]
})
