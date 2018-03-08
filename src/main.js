import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import './common/stylus/index.styl'
import Vuelazyload from  'vue-lazyload'
import Loading from 'base/loading/loading'
import store from './store'

Vue.config.productionTip = false
/*解决body中内容延迟300毫秒*/
fastclick.attach(document.body)
/*图片懒加载*/
Vue.use(Vuelazyload,{
  preload:1.3,//预加载的宽高
  loading:require("common/image/default.png"),
  error:require("common/image/default.png"),
  attempt:3,//尝试加载的次数
  listenEvents:['scroll','wheel','mousewheel','resize','animationend','transitionend','touchmove'] //vue监听的事件
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
