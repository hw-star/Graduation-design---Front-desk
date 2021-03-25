import request from '../utils/request'

export default{
  // 活动列表
  getUserOrdersListPage(current,limit,fuzzyquery) {
    return request({
      url: `/orders/userorderslist/${current}/${limit}`,
      method: 'get',
      params:{ fuzzyquery }
    });
  },
  // 取消报名某个活动
  cancelActivity(id){
    return request({
      url: `/orders/cancelactivity/${id}`,
      method: 'get',
    });
  },
}