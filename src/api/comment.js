import request from '@/utils/request'

export function getCommentList(queryParams) {
    return request({
        url: '/api/comment/list/',
        method: 'get',
        params: queryParams
    })
}

export function getCommentDetail(commentId, queryParams) {
    return request({
        url: '/api/comment/' + commentId + '/',
        method: 'get',
        params: queryParams
    })
}

export function createComment(data) {
    return request({
        url: '/api/comment/create/',
        method: 'post',
        data: data
    })
}

export function UpdateComment(commentId, data) {
    return request({
        url: '/api/comment/update' + commentId + '/',
        method: 'put',
        data: data
    })
}
