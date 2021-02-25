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
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const { roles } = await store.dispatch('getInfo',store.state.token)

          // generate accessible routes map based on roles
          //const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // dynamically add accessible routes
          //router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          //await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/?redirect=${to.path}`)
        }
      }
    }
  } else {
      next(`/?redirect=${to.path}`)
  }
})
