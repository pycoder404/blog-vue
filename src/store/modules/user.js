import { login, logout, getInfo } from '@/api/user'
import { getAccessToken, setAccessToken, removeAccessToken } from '@/utils/auth'
import { getRefreshToken, setRefreshToken, removeRefreshToken } from '@/utils/auth'
import router from '@/router'


const getDefaultState = () => {
    return {
        token: getAccessToken(),
        refreshToken: getRefreshToken(),
        name: '',
        avatar: '',
        introduction: '',
        roles: []
    }
}

const state = {
    accessToken: getAccessToken(),
    refreshToken: getRefreshToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: []
}

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_ACCESS_TOKEN: (state, token) => {
        state.accessToken = token
    },
    SET_REFRESH_TOKEN: (state, token) => {
        state.refreshToken = token
    },
    SET_INTRODUCTION: (state, introduction) => {
        state.introduction = introduction
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    }
}

const actions = {
    // user login
    login({ commit }, userInfo) {
        console.info("login in store")
        const { username, password } = userInfo
        return new Promise((resolve, reject) => {
            login({ username: username.trim(), password: password }).then(response => {
                const data  = response
                console.log("login done")
                commit('SET_ACCESS_TOKEN', data.access)
                commit('SET_REFRESH_TOKEN', data.refresh)
                // token保存在cookie和store中
                setAccessToken(data.access)
                setRefreshToken(data.refresh)
                console.log("set access token done")
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },


    // todo 为啥vue-element-admin框架中F5刷新界面会重新获取info，如何实现的？
    // todo 是permission中的限制吗？
    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo(state.accessToken).then(response => {
                // console.log('response is:',response)
                // const { data } = response
                const data = response
                // console.log('data is:',data)

                if (!data) {
                    reject('Verification failed, please Login again.')
                }

                const { roles, name, avatar, introduction } = data
                // console.log("roles in getinfo is: ",roles)
                // roles must be a non-empty array
                if (!roles || roles.length <= 0) {
                    reject('getInfo: roles must be a non-null array!')
                }

                commit('SET_ROLES', roles)
                commit('SET_NAME', name)
                commit('SET_AVATAR', avatar)
                commit('SET_INTRODUCTION', introduction)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({ commit, state, dispatch }) {
        return new Promise((resolve, reject) => {

            logout(state.token).then(() => {
                // 保存了两份，一份是store， 一份是cookie
                commit('SET_ACCESS_TOKEN', '')
                commit('SET_REFRESH_TOKEN', '')
                commit('SET_ROLES', [])
                removeAccessToken()
                removeRefreshToken()

                // reset visited views and cached views
                // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
                dispatch('tagsView/delAllViews', null, { root: true })

                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('RESET_STATE')
            removeAccessToken()
            removeRefreshToken()
            resolve()
        })
    },

    // dynamically modify permissions
    async changeRoles({ commit, dispatch }, role) {
        const token = role + '-token'

        commit('SET_ACCESS_TOKEN', token)
        setAccessToken(token)

        const { roles } = await dispatch('getInfo')


        // generate accessible routes map based on roles
        const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
        // dynamically add accessible routes
        router.addRoutes(accessRoutes)

        // reset visited views and cached views
        dispatch('tagsView/delAllViews', null, { root: true })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
