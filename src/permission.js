import router from './router'
import store from './store'
import {ElMessage} from 'element-plus'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {getAccessToken} from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({showSpinner: false}) // NProgress Configuration
// todo permission，博客相对后台管理系统只需要管理部分的路由即可
const whiteList = ['/login', '/article/list','/auth-redirect','/login/github'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start()
    // console.log("before route change")
    // console.log(to.path)
    // set page title
    document.title = getPageTitle(to.meta.title)
    // console.info(to)
    const thirdPart = to.query && to.query.thirdPart
    const oauthCode = to.query && to.query.code
    // console.info(thirdPart,oauthCode)
    if (thirdPart && oauthCode) {
        try {
            // social login
            // console.info(to.query)
            delete to.query.code
            delete to.query.thirdPart
            // console.info("begin to social auth login")
            await store.dispatch('user/socialLogin',{'thirdPart': thirdPart, 'oauthCode': oauthCode})
            // console.info("social login done")
        } catch (error) {
            // remove token and go to login page to re-login
            await store.dispatch('user/resetToken')
            ElMessage.error('Error in login by ',thirdPart)
            next({...to, replace: true})
            NProgress.done()
        }

    }

    // determine whether the user has logged in
    const hasAccessToken = getAccessToken()
    if (hasAccessToken) {
        console.log("has access token:",hasAccessToken)
        // TODO  添加对accessToken的过期检查和refresh
        // fixme change to check permissions

        if (to.path === '/login') {
            // if is logged in, redirect to the home page
                const next_path = to.query && to.query.redirect ? to.query.redirect : '/'
                next({path: next_path})
            NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
        } else {
            // determine whether the user has obtained his permission roles through getInfo
            console.log("check is has roles")
            // console.log(store.getters.roles)
            // note Ctrl + F5强制刷新界面，对store有啥影响吗，为啥会导致没有roles，重新获取Info？?
            // note: 因为store是存在内存中的，所以每次刷新就会判断为空，需要重新获取数据，而cookie保存在本地，所以刷新不会丢失
            const hasRoles = store.getters.roles && store.getters.roles.length > 0
            if (hasRoles) {
                console.log("yes has roles")
                next()
                console.log('next done')
            } else {
                console.log('can not get roles from store')
                try {
                    // get user info
                    // question: roles must be a object array! such as: ['admin'] or ,['developer','editor']
                    // question  这里的roles是user/GetInfo如何反馈的，如何只反馈roles的
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
