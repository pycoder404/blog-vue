import request from '@/utils/request'


export function uploadFile(data) {
    return request({
        url: '/api/article/upload/',
        method: 'post',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: data
    })
}
