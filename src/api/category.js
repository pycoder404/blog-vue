import request from '@/utils/request'

export function getCategoryList(queryParams) {
    return request({
        url: '/api/category/',
        method: 'get',
        params: queryParams
    })
}

export function getCategoryDetail(categoryId, queryParams) {
    return request({
        url: '/api/category/' + categoryId + '/',
        method: 'get',
        params: queryParams
    })
}

export function createCategory(data) {
    return request({
        url: '/api/category/',
        method: 'post',
        data: data
    })
}

export function UpdateCategory(categoryId, data) {
    return request({
        url: '/api/category/' + categoryId + '/',
        method: 'put',
        data: data
    })
}
