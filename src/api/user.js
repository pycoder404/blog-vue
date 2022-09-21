import request from '@/utils/request'

export function login(data) {
    return request({
        url: '/api/user/login/',
        method: 'post',
        data
    })
}

export function socialLogin(thirdPart,data) {
    return request({
        url: '/api/user/login/' + thirdPart + '/',
        method: 'post',
        data
    })
}


export function getInfo() {
    return request({
        url: '/api/user/info/',
        method: 'get',
    })
}

export function logout() {
    return request({
        url: '/api/user/logout/',
        method: 'post'
    })
}
