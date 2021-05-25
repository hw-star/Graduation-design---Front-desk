import request from '../utils/request'

export default{
  // 通知公告列表
  getNoticeListPage(current,limit) {
    return request({
      url: `/notice/noticelist/${current}/${limit}`,
      method: 'post',
    });
  },
  // 获取某一个通知公告
  getOneNotice(id){
    return request({
      url: `/notice/noticelist/${id}`,
      method: 'get',
    });
  },
}