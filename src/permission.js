import router from './router'
import store from './store'
import {ElMessage} from 'element-plus'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {getAccessToken} from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({showSpinner: false}) // NProgress Configuration
// todo permission，博客相对后台管理系统只需要管理部分的路由即可
// const whiteList = ['/login', '/article/list', '/login/github', '/article/detail'] // no redirect whitelist

function checkPermission(roles, to) {
    console.info("check permission")
    const permittedRoles = to.meta.roles
    let accessRoles = roles.filter(function (v) {
        permittedRoles.indexOf(v) > -1
    })
    return accessRoles.length > 0
}

router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start()
    console.log("before route change")
    console.log(to.path)
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
            await store.dispatch('user/socialLogin', {'thirdPart': thirdPart, 'oauthCode': oauthCode})
            // console.info("social login done")
        } catch (error) {
            // remove token and go to login page to re-login
            await store.dispatch('user/resetToken')
            ElMessage.error('Error in login by ', thirdPart)
            next({...to, replace: true})
            NProgress.done()
        }

    }

    // determine whether the user has logged in
    console.info("check if hastoken")
    let hasPagePermission = false
    const hasAccessToken = getAccessToken()
    if (hasAccessToken) {
        console.info("hastoken")

        let roles = store.getters.roles && store.getters.roles.length > 0
        if (roles) {
            console.info("has roles")

            hasPagePermission = checkPermission(roles, to)
        } else {
            // 对页面进行刷新后重新获取下info
            try {
                // get user info
                // question  这里的roles是user/GetInfo如何反馈的，如何只反馈roles的
                // note: await 's result and 对象解构赋值
                let {roles} = await store.dispatch('user/getInfo')
                hasPagePermission = checkPermission(roles, to)
                next({...to, replace: true})
            } catch (error) {
                // remove token and go to login page to re-login
                await store.dispatch('user/resetToken')
                ElMessage.error(error || 'Has Error')
                next({...from, replace: true})
                // NProgress.done()
            }
        }

    } else {
        /* has no token*/
        let roles = ['anonymous']
        hasPagePermission = checkPermission(roles, to)

    }
    console.info("check permission done")
    console.log(hasPagePermission)
    if (hasPagePermission) {
        console.info("has permission done")

        next({...to, replace: true})
        // NProgress.done()

    } else {
        ElMessage.error("Access denied")
        console.info("access denied permission done")

        next({...from, replace: true})
        // NProgress.done()

    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})

