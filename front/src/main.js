import Vue from 'vue'
import App from './App.vue'

import router from './router'

Vue.config.productionTip = false;

window.$ = window.jQuery = require('jquery');

new Vue({
    router,
    install: function(Vue, options){
        Vue.prototype.$jQuery = require('jquery'); // you'll have this.$jQuery anywhere in your vue project
    },
    render: h => h(App),
}).$mount('#app');
