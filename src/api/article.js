import request from '@/utils/request'

export function getArticleList(queryParams) {
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

export function UpdateArticle(articleId, data) {
    return request({
        url: '/article/update/' + articleId + '/',
        method: 'put',
        data: data
    })
}


export function getTagList(queryParams) {
    return request({
        url: '/tag/',
        method: 'get',
        params: queryParams
    })
}

export function getCategoryList(queryParams) {
    return request({
        url: '/category/',
        method: 'get',
        params: queryParams
    })
}

