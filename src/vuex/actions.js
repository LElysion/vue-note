import Vue from 'vue'

export default {
  addTestAction ({commit}, text) {
    var data = text
    console.log(data)
    if (data) {
      Vue.http.post('/v1/vuex/addtext', data, { emulateJSON: true }).then(function (Response) {
        return Response.json()
      }).then(function (Response) {
        console.log(Response)
        commit('getText', Response.data.list)
      })
    } else {
      console.log('falsy data')
    }
  },
  getTestListAtion ({commit}) {
    Vue.http.post('/v1/vuex/gettextlist').then(function (Response) {
      return Response.json()
    }).then(function (Response) {
      console.log(Response)
      commit('getText', Response.data.list)
    })
  },
  getTestAction ({commit}, id) {
    var data = {
      id: id
    }
    Vue.http.post('/v1/vuex/gettext', data, { emulateJSON: true }).then(function (Response) {
      return Response.json()
    }).then(function (Response) {
      console.log(Response)
      if (Response.data.text) {
        commit('nowText', Response.data.text)
      } else {
        commit('nowText', {
          text: '',
          id: 0
        }) // 置空
      }
    })
  },
  delTestAction ({commit}, id) {
    var data = {
      id: id
    }
    console.log(data)
    Vue.http.post('/v1/vuex/deltext', data, { emulateJSON: true }).then(function (Response) {
      return Response.json()
    }).then(function (Response) {
      console.log(Response)
      if (Response.success === true) {
        console.log('success')
      } else {
        console.log('fail')
      }
    })
  }
}
