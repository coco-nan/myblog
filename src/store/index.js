import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 仓库
  // 用this.$store.state.userInfo获取
  state: {
    userInfo: JSON.parse(localStorage.getItem('userInfo'))  
  },

  // 计算属性
  // this.$store.getters.getUserInfo
  getters:{
    getUserInfo(state){
      return state.userInfo
    }
  },

  // 同步改变store值
  //setter(this.$store.commit('updateUserInfo',user))
  mutations: {
    updateUserInfo(state,user){
      state.userInfo = user;
    }
  },
  // 异步执行
  // this.$store.dispatch('asyncupdateUserInfo',user)
  actions: {
    asyncupdateUserInfo(context,user){
       context.commit('updateUserInfo',user)
    }
  },
  // 模块引入
  modules: {
  }
})
