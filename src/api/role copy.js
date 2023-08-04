import request from '@/utils/request'

//获取角色列表
export function getList(params) {
  return request({
    url: '/sys/role',
    method: 'get',
    params
  })
}
 //获取详情
 export function getRoleDetail(id) {
  return request({
    url: `/sys/role/${id}`
  })
}
// 添加角色
export function addList(data) {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}
// 获取角色权限
export function getPrem(params) {
  return request({
    url: '/sys/permission',
    params
  })
}
// 分配角色权限
export function assignList(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data
  })
}

// 删除角色
export function delList(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete',
  })
}

//根据ID更新角色
export function updateList(obj) {
  return request({
    url: `/sys/role/${obj.id}`,
    method: 'put',
    data: {
      'id': obj.id,
      'name': obj.name,
      'state': +obj.state,
      'description': obj.description
    }
  })
}
