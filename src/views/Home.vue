<template>
<el-container class="home">
  <el-header>
    <myheader></myheader>
  </el-header>
  <el-container class="wapper">
    <el-aside width="210px">
      <slide></slide>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import slide from "@/components/slide.vue";
import myheader from "@/components/myheader.vue"
export default {
  data() {
    return {};
  },
  components: {
    slide,
    myheader
    
  },
  methods: {},

};
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.wapper{
  overflow: hidden;
}
.el-header {
  background-color: #343a40;
  height: 100px;
  
}
.el-aside {
  height: 100%;
}

.el-main {
  background-image: url('../assets/css/geometric-leaves.png');
  color: #333;
  height: auto;
  overflow: auto;
}

</style>