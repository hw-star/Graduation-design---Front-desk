import request from '../utils/request.js';

export default {
  // 登录
  login(data) {
    return request({
      url: '/user/login',
      method: 'post',
      data,
    });
  },

  //获取个人信息
  getInfo(token) {
    return request({
      url: '/user/info',
      method: 'get',
      params: { token },
    });
  },

  getInfoMsg(){
    return request({
      url: '/user/infomsg',
      method: 'get',
    });
  },

  // 退出
  logout() {
    return request({
      url: '/user/logout',
      method: 'post',
    });
  },

  // 注册用户
  add(data) {
    return request({
      url: '/user/adduser',
      method: 'post',
      data,
    });
  },

  // 更新用户信息
  updateUser(user){
    return request({
      url: `/user/updateuser`,
      method: 'post',
      data: user
    })
  },

  // 用户密码找回
  FindPwd(data){
    return request({
      url: `/user/findpwd`,
      method: 'post',
      data
    })
  }
};
