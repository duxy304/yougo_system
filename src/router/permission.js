import router from './index.js'
import store from '../store'

router.beforeEach((to, from, next) => {
  if (to.meta.isLogin) {
    const token = store.state.login.user.token
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
