import request from '@/utils/request'
// 获取所有权限点
export function getPermission(params) {
  return request({
    url: '/sys/permission',
    method: 'get',
    params
  })
}
// 添加权限点
export function addPermission(data) {
  return request({
    url: '/sys/permission',
    method: 'post',
    data
  })
}
// 获取权限点详情
export function getPermissiondetails(params) {
  return request({
    url: `/sys/permission/${params}`,
    method: 'get',
    params
  })
}
// 更新权限点
export function setPermission(id,data) {
  return request({
    url: `/sys/permission/${id}`,
    method: 'put',
    data
  })
}
// 删除权限点
export function delPermission(params) {
  return request({
    url: `/sys/permission/${params.id}`,
    method: 'delete',
    params
  })
}
