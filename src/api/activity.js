import request from '../utils/request'

export default{
  // 活动列表
  getActivityListPage(current,limit,activityBody) {
    return request({
      url: `/activity/activitylist/${current}/${limit}`,
      method: 'post',
      data: activityBody
    });
  },
  // 申请某个活动
  applyActivity(id){
    return request({
      url: `/orders/applyactivity/${id}`,
      method: 'get',
    });
  },
}