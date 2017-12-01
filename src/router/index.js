import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import addText from '@/components/addText'
import textList from '@/components/textList'

Vue.use(Router)

export default new Router({
  // mode: 'history', // 使用history模式 当服务端不支持时不要使用该模式
  routes: [
    {
      path: '/addText/:id',
      name: 'addText', // 命名路由可以更好的进行链接和导航
      component: addText,
      props: true,
      meta: { // 路由元信息， 自定义的一个对象， 用于导航守卫时控制
        requiresAuth: true
      },
      beforeEnter: (to, from, next) => { // 路由独享守卫，当导航导向该路由时调用
        console.log('beforeEnter this router')
        console.log('to', to)
        console.log('from', from)
        if (to.meta.requiresAuth) { // 导航守卫中可以使用该信息从而进行跳转控制
          next()
        } else {
          console.log('requiresAuth is false')
          next(false)
        }
        // next()
      },
      beforeRouteLeave: (to, from, next) => {
        console.log('beforeRouteLeave this router')
        console.log('to', to)
        console.log('from', from)
        next()
      }
    },
    {
      path: '/',
      name: 'textList', // 命名路由可以更好的进行链接和导航
      component: textList,
      meta: { // 路由元信息， 自定义的一个对象， 用于导航守卫时控制
        requiresAuth: true
      },
      beforeEnter: (to, from, next) => { // 路由独享守卫，当导航导向该路由时调用
        console.log('beforeEnter this router')
        console.log('to', to)
        console.log('from', from)
        if (to.meta.requiresAuth) { // 导航守卫中可以使用该信息从而进行跳转控制
          next()
        } else {
          console.log('requiresAuth is false')
          next(false)
        }
        // next()
      },
      beforeRouteLeave: (to, from, next) => {
        console.log('beforeRouteLeave this router')
        console.log('to', to)
        console.log('from', from)
        next()
      }
    }
  ]
})
