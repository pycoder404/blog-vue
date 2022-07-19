import request from '@/utils/request'

export function getArticleList(queryParams) {
    return request({
        url: '/api/article/list/',
        method: 'get',
        params: queryParams
    })
}

export function getArticleDetail(articleId, queryParams) {
    return request({
        url: '/api/article/detail/' + articleId + '/',
        method: 'get',
        params: queryParams
    })
}

export function createArticle(data) {
    return request({
        url: '/api/article/create/',
        method: 'post',
        data: data
    })
}

export function UpdateArticle(articleId, data) {
    return request({
        url: '/api/article/update/' + articleId + '/',
        method: 'put',
        data: data
    })
}


export function getTagList(queryParams) {
    return request({
        url: '/api/tag/',
        method: 'get',
        params: queryParams
    })
}

export function getCategoryList(queryParams) {
    return request({
        url: '/api/category/',
        method: 'get',
        params: queryParams
    })
}

