import request from '@/utils/request'

export function fetchArticleList(queryParams) {
    return request({
        url: '/article/list/',
        method: 'get',
        params: queryParams
    })
}

export function getArticleDetail(articleId, queryParams) {
    return request({
        url: '/article/detail/' + articleId + '/',
        method: 'get',
        params: queryParams
    })
}

export function createArticle(data) {
    return request({
        url: '/article/create/',
        method: 'post',
        data: data
    })
}
