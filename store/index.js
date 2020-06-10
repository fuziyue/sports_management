// 该vuex传统写法Nuxt3会废弃(不推荐使用)
// import Vuex from 'vuex';

// let store = () => new Vuex.Store({
//   state: {
//     token: ''
//   },
//   mutations: {
//     setToken (state, token) {
//        state.token = token;
//     }
//   },
//   actions: {
//     nuxtServerInit({ commit }, { req }) {
//       const cookie = req.headers.cookie;
//       console.log(cookie,'cookie');
//       // 将cookie转成json对象（自己实现该方法）
//       // const token = cookieparse(cookie).token;

//       // 推荐使用cookie-universal-nuxt插件
//       // nuxt.config.js 配置modules
//       // ['cookie-universal-nuxt', { parseJSON: false }],
//       // 然后通过下面方式获取cookie
//       // const token = app.$cookies.get('token')

//       // commit('setToken', token);
//     },
//   }
// })

// export default store;

// 设定需要储存的数据及其默认值
export const state = () => ({
  token: ''
})

// 获取数据方法
export const getters = {
  getToken (state) {
    return state.token
  }
}

//更新数据方法
export const mutations = {
  setToken (state, token) {
     state.token = token;
  }
}

// 初始化数据方法
export const actions = {
  nuxtServerInit({ commit }, { req }) {
    const token = req.headers.cookie;
    // console.log(token,'cookie');

    if(token){
      commit('setToken', token);
    }

  },
}
