import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import instance from './utils/http.js'



Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(mavonEditor)

Vue.prototype.$axios = instance;

Vue.prototype.bus = new Vue();

 new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


