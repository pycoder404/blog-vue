import Cookies from 'js-cookie'

//保存在cookie里的token名称
const accessTokenKey = 'access_token'
const refreshTokenKey = 'refresh_token'

export function getAccessToken() {
    return Cookies.get(accessTokenKey)
}

export function setAccessToken(token) {
    return Cookies.set(accessTokenKey, token)
}

export function removeAccessToken() {
    return Cookies.remove(accessTokenKey)
}


export function getRefreshToken() {
    return Cookies.get(refreshTokenKey)
}

export function setRefreshToken(token) {
    return Cookies.set(refreshTokenKey, token)
}

export function removeRefreshToken() {
    return Cookies.remove(refreshTokenKey)
}
