import { createStore } from 'vuex'

const mutations = {
    increase(state) {
      state.points++
    }
  },
  state = {
    points: 0
  }
export default createStore({ mutations, state, strict: true })
