import request from '../utils/request'

export default{
  // 文件列表
  getPolicyListPage(current,limit) {
    return request({
      url: `/policy/policylist/${current}/${limit}`,
      method: 'post',
    });
  },
  // 获取某一个文件信息
  getOnePolicy(id){
    return request({
      url: `/policy/policylist/${id}`,
      method: 'get',
    });
  },
}