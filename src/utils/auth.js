import Cookies from 'js-cookie'
import defaultSettings from '@/settings'

const accessExpire = defaultSettings.accessTokenExpire || 1
const refreshExpire = defaultSettings.refreshTokenExpire || 7

//保存在cookie里的token名称
const accessTokenKey = 'access_token'
const refreshTokenKey = 'refresh_token'

export function getAccessToken() {
    return Cookies.get(accessTokenKey)
}

export function setAccessToken(token) {
    return Cookies.set(accessTokenKey, token, {expires: accessExpire})
}

export function removeAccessToken() {
    return Cookies.remove(accessTokenKey)
}


export function getRefreshToken() {
    return Cookies.get(refreshTokenKey)
}

export function setRefreshToken(token) {
    return Cookies.set(refreshTokenKey, token, {expires: refreshExpire})
}

export function removeRefreshToken() {
    return Cookies.remove(refreshTokenKey)
}
