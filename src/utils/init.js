import store from '../store'

if (localStorage.getItem('yougo')) {
  store.commit('login/setUser', JSON.parse(localStorage.getItem('yougo')))
}
