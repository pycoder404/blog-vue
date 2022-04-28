import request from '@/utils/request'

export function fetchArticleList(queryParams) {
    return request({
        url: '/article/list/',
        method: 'get',
        params: queryParams
    })
}

export function getArticleDetail(queryParams) {
    return request({
        url: '/article/detail/',
        method: 'get',
        params: queryParams
    })
}

export function createArticle(data) {
    return request({
        url: '/article/create/',
        method: 'post',
        params: data
    })
}
