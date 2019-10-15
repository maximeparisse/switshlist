import Vue from 'vue'
import Vuex from 'vuex'

import App from './App.vue'

import games from './games'

Vue.use(Vuex)

Vue.use(require('vue-moment'));

const store = new Vuex.Store({
  state: {
    games,
  },
  // mutations: {
  //   increment (state) {
  //     state.count++
  //   }
  // }
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
