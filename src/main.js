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
    // @ts-ignore
    let key = window.event.keyCode;
    if (key == code) {
      vm[methodName](code); // 触发methodName事件
    }
  };
}
Vue.prototype.$keyBoardbg = function (vm, methodNameH, methodNameW, codeH, codeW) {
  document.onkeyup = function () {
    // @ts-ignore
    let key = window.event.keyCode;
    if (key == codeH) {
      vm[methodNameH](codeH);
    }else if(key == codeW) {
      vm[methodNameW](codeW);
    }
  };
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
