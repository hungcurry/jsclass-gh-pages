// 外部資源 nod_modules 沒有.的
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
// 內部資源 src 的資料夾
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;
// 套件加入在vue的藍圖（原型）
Vue.use(VueAxios, axios);
// 全域註冊 Loading 並標籤設定為 loading
Vue.component('Loading', Loading);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
