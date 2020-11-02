import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { isNumber } from './utils/utils.js';
console.log(isNumber('vv'));
Vue.config.productionTip = false;
window.EVENT_E = 'event_e';
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
//# sourceMappingURL=main.js.map