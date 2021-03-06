import router from './router'
import store from './store'
import {ElMessage} from 'element-plus'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {getAccessToken} from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({showSpinner: false}) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start()
    // console.log("before route change")
    // console.log(to.path)
    // set page title
    document.title = getPageTitle(to.meta.title)

    // determine whether the user has logged in
    const hasAccessToken = getAccessToken()
    // console.log("check is has access token: ",hasAccessToken)
    if (hasAccessToken) {
        // console.log("has access token:",hasAccessToken)
        // FIXME  添加对accessToken的过期检查和refresh
        if (to.path === '/login') {
            // if is logged in, redirect to the home page
            next({path: '/'})
            NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
        } else {
            // determine whether the user has obtained his permission roles through getInfo
            // console.log("check is has roles")
            // console.log(store.getters.roles)
            // FIXME Ctrl + F5强制刷新界面，对store有啥影响吗，为啥会导致没有roles，重新获取Info？
            const hasRoles = store.getters.roles && store.getters.roles.length > 0
            if (hasRoles) {
                // console.log("yes has roles")
                next()
                // console.log('next done')
            } else {
                // console.log('can not get roles from store')
                try {
                    // get user info
                    // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
                    // FIXME  这里的roles是user/GetInfo如何反馈的，如何只反馈roles的
                    // console.log("get info")
                    const { roles } = await store.dispatch('user/getInfo')
                    console.log(roles)
                    // // generate accessible routes map based on roles
                    // const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
                    //
                    // // dynamically add accessible routes
                    // router.addRoutes(accessRoutes)

                    // hack method to ensure that addRoutes is complete
                    // set the replace: true, so the navigation will not leave a history record
                    next({...to, replace: true})
                } catch (error) {
                    // remove token and go to login page to re-login
                    await store.dispatch('user/resetToken')
                    ElMessage.error(error || 'Has Error')
                    next(`/login?redirect=${to.path}`)
                    NProgress.done()
                }
            }
        }
    } else {
        /* has no token*/

        if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly
            next()
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})
