import request from '../utils/request'

export default{
  // 通知公告列表
  getElegantListPage(current,limit) {
    return request({
      url: `/elegant/elegantlist/${current}/${limit}`,
      method: 'post',
    });
  },
}