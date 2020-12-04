<template>
  <el-menu
    :default-active="onRoutes"
    class="el-menu-vertical-demo menu"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
  >
    <el-submenu index="home">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>博客管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="bloglist">博客列表</el-menu-item>
        <el-menu-item index="blogsub">博客发布</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="sort">
      <i class="el-icon-menu"></i>
      <span slot="title">分类管理</span>
    </el-menu-item>
    <el-menu-item index="tag">
      <i class="el-icon-document"></i>
      <span slot="title">标签管理</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    },
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.menu {
  height: 100%;
}
</style>

