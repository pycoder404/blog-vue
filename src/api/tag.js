import request from '@/utils/request'

export function getTagList(queryParams) {
    return request({
        url: '/api/tag/',
        method: 'get',
        params: queryParams
    })
}

export function getTagDetail(tagId, queryParams) {
    return request({
        url: '/api/tag/' + tagId + '/',
        method: 'get',
        params: queryParams
    })
}

export function createTag(data) {
    return request({
        url: '/api/tag/',
        method: 'post',
        data: data
    })
}

export function UpdateTag(tagId, data) {
    return request({
        url: '/api/tag/' + tagId + '/',
        method: 'put',
        data: data
    })
}
