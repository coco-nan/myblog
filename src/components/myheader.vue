<template>
  <div class="nav">
    <span>BLOG 后台管理</span>
    <div class="user-box" slot="reference">
      <el-avatar
        :src="user.avatar"
      ></el-avatar>
      <span class="username">{{user.nickname}}</span>
      <span class="exit" @click="exit">/ 注销</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user:{}
    };
  },
  methods: {
    exit(){
      localStorage.clear();
      this.$router.push('/login')
    }
  },
  created(){
    this.user = this.$store.getters.getUserInfo
  
  }
};
</script>

<style lang="scss" scoped>
.nav {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.nav > span {
  margin-left: 20px;
  font-size: 20px;
  color: #6cc47d;
  font-weight: 700;
}
.user-box {
  align-items: center;
  display: flex;
}
.username ,.exit{
  margin-left: 10px;
  color: white;
  font-size: 16px;
  cursor: pointer;
}
.el-popover {
  min-width: 0 !important;
}
</style>