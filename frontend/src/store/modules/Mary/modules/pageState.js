export default {
  namespaced: true,
  state: {
    // 是否初始化
    initFlag: false
  },
  actions: {
    /**
     * @description 进入该模块
     * @param {Object} state vuex state
     * @param {*} info info
     */
    in ({ state, dispatch }) {
      return new Promise(async resolve => {
        state.initFlag = true
        // end
        resolve()
      })
    },
    out ({ state, dispatch }) {
      return new Promise(async resolve => {
        state.initFlag = false
        // end
        resolve()
      })
    }
  }
}
