import router from './router'
import store from './store'
import { Message } from 'element-ui'
import { getToken } from './utils/auth'

const whiteList = ['/']

router.beforeEach(async(to, from, next) => {
  const hasToken = getToken()
 
  if (hasToken) {
    if (to.path === '/') {
      next()
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          const { roles } = await store.dispatch('getInfo',store.state.token)
          next({ ...to, replace: true })
        } catch (error) {
          Message.error(error || 'Has Error')
          next(`/?redirect=${to.path}`)
        }
      }
    }
  } else {
      next(`/?redirect=${to.path}`)
  }
})
