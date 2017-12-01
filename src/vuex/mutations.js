import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource) // 使用vue-resource
Vue.http.options.emulateJSON = true
export default {
  addText (state, text) {
  },
  getText (state, textlist) {
    state.textlist = textlist
  },
  nowText (state, text) {
    state.nowtext = text
    console.log(state)
  }
}
