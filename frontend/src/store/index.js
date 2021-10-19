import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogged: localStorage.getItem('token'),
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
