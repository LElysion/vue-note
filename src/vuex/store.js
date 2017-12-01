import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
  textlist: [],
  nowtext: {
    text: '',
    id: 0
  }
}

const getters = {
  // textlist: function (state) {
  //   Vue.http.post('/v1/vuex/gettextlist').then(function (Response) {
  //     console.log(Response)
  //     return Response.json()
  //   }).then(function (Response) {
  //     console.log(Response)
  //     state.textlist = Response.data.list
  //   })
  // }
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
