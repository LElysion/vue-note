// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import VueResource from 'vue-resource'

Vue.use(VueResource) // 使用vue-resource
Vue.config.productionTip = false
// Vue.http.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:8081'
// console.log(Vue.http)
/**
 * @method 全局导航守卫
 * @param to { object } 即将进入的目标的路由对象
 * @param from { object } 当前导航正要离开的路由
 * @param next { function } 必须执行该方法才能成功resolve这个钩子
 * next(): 直接进入下一个钩子，执行完钩子后，导航为confirmed
 * next(false): 中断当前导航
 * next('/'): 跳转到一个不同的地址，即中断当前导航并进行一个新的导航
 * next(error): 传入错误的参数(error)时， 导航终止并传入error
 */
router.beforeEach((to, form, next) => {
  // console.log('now beforeEach')
  // console.log('to', to)
  // console.log('form', form)
  // console.log('next', next)
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
