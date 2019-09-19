import request from '@/plugin/axios'

export function getBlogGroup () {
  return request({
    url: 'blog/',
    method: 'get'
  })
}

export function getBlogItem (data) {
  return request({
    url: 'blog/',
    method: 'post',
    data
  })
}

export function getBlogContent (data) {
  return request({
    url: 'content/',
    method: 'post',
    data
  })
}

export function search (data) {
  return request({
    url: 'search/',
    method: 'post',
    data
  })
}
