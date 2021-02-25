import Vue from 'vue';
import Vuex from 'vuex';
import { getToken, setToken, removeToken } from '../utils/auth';
import userOperation from '../api/user';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
  },
  actions: {
    // user login
    login({ commit }, userInfo) {
      const { userLoginId, userLoginPwd } = userInfo;
      return new Promise((resolve, reject) => {
        userOperation
          .login({ userLoginId: userLoginId.trim(), userLoginPwd: userLoginPwd })
          .then(response => {
            const { data } = response;
            commit('SET_TOKEN', data.token);
            setToken(data.token);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // get user info
    getInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        userOperation
          .getInfo(state.token)
          .then(response => {
            const { data } = response;
            if (!data) {
              reject('Verification failed, please Login again.');
            }
            const { roles, name, avatar } = data;
            // roles must be a non-empty array
            if (!roles || roles.length <= 0) {
              reject('getInfo: roles must be a non-null array!');
            }

            commit('SET_ROLES', roles);
            commit('SET_NAME', name);
            commit('SET_AVATAR', avatar);
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // user logout
    logout({ commit, state }) {
      return new Promise((resolve, reject) => {
        userOperation
        .logout(state.token)
          .then(() => {
            removeToken(); // must remove  token  first
            // resetRouter();
            commit('RESET_STATE');
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
  },
  modules: {},
});
