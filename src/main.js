import Vue from 'vue'
// @ts-ignore
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'


Vue.use( VueAxios , axios)
Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.prototype.$keyBoard = function (vm, methodName, code) {
  document.onkeydown = function () {
    let key = window.event.keyCode;
    if (key == code) {
      vm[methodName](code); // 触发methodName事件
    }
  };
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
