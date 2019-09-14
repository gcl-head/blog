import Vue from 'vue'
import Vuex from 'vuex'

import Mary from './modules/Mary'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Mary
  }
})
