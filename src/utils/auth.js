import Cookies from 'js-cookie'

//保存在cookie里的token名称
const TokenKey = 'vue_django_blog_token'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}
