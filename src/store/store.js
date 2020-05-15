import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    themeId: '',
    postFormJson: {},
    routePostJson: ''
  },
  mutations: {
    changeThemeId (state, themeId) {
      state.themeId = themeId
    },
    changePostThemeJson (state, postFormJson) {
      state.postFormJson = postFormJson
    },
    changeRoutePostJson (state, routePostJson) {
      state.routePostJson = routePostJson
    },
    changeSetting (state, {setting, value}) {
      state[setting] = value
    }
  },
  getters: {
    themeId: state => state.themeId
  }
})
