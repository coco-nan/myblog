<template>
  <div class="login-box">
    <el-form
      label-width="80px"
      :model="form"
      class="containerbox"
    >
      <div class="name">Blog后台系统</div>
      <div class="login-center">
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
      </div>
      <el-button class="sign" @click="submit">登 陆</el-button>
    </el-form>
  </div>
</template>
<script>

import api from '../utils/base.js'

export default {
  data() {
    return {
      form: {},
    };
  },
  methods: {
    submit() {
      this.$axios.post(api.user.login,this.form)
      .then(res =>{
         if(res.code == 200){
           let userInfo = res.data[0]
           localStorage.setItem('userInfo',JSON.stringify(userInfo))
           this.$store.commit('updateUserInfo',userInfo)
           localStorage.setItem("token",res.token)
           this.$router.push('/')
         }else if(res.code == 400){
          alert('账号密码有误，请检查！')
         }
      },err=>{
        console.log(err)
      })
    }

  },
};
</script>
<style lang="scss" scoped>
.login-box {
  width: 100%;
  height: 100%;
  background-image: url("../assets/css/geometric-leaves.png");
  display: flex;
  justify-content: center;
  align-items: center;
}
.containerbox {
  background-color: rgba(246, 241, 241, 0.945);
  border-top: 10px solid #6cc47d;
  border-radius: 5px;
  width: 500px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 30px;
}
.name {
  font-size: 35px;
  font-weight: 600;
  color: #4ba05c;
  text-align: center;
  margin-bottom: 40px;
}
.login-center {
  margin-left: -70px;
}
.sign {
  background-color: #4ba05c;
  color: white;
  font-size: 16px;
}
</style>

