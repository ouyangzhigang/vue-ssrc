import Vuex from 'vuex'

export default () => {
  return new Vuex.Store({
    state: {
      user: '',
      greeting: 'hello'
    }
  })
}