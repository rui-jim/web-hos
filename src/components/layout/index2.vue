<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="184px">
        <sidebar></sidebar>
      </el-aside>
      <el-container>
        <el-main class="menu">
          <contentMenu class="line"></contentMenu>
          <tag class="line"></tag>
        </el-main>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer></el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import contentMenu from "../breadCrump/index.vue";
import tag from "../tag/index";
import sidebar from "../sidebar/index.vue";
export default {
  data() {
    return {};
  },
  components: {
    sidebar,
    contentMenu,
    tag,
  },
};
</script>
<style scoped>
.Home_container {
  height: 100%;
  overflow: hidden;
}
.el-header {
  background: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
}
.el-header img {
  height: 100px;
  width: 100px;
  transform: scale(0.5);
}
.el-header span {
  margin-left: 15px;
}
.el-header div {
  display: flex;
  align-items: center;
}

.el-aside {
  color: #333;
  text-align: center;
  line-height: 200px;
  overflow: hidden;
}
.el-container {
  width: 100%;
  height: 100%;
  background: #333744;
}
.line {
  margin: 0.5vh 0;
  padding: 5px 0 5px 0;
  border: 1px solid rgb(157, 172, 24);
  border-left: none;
}
.el-main {
  height: 50px;
  background: #fff;
  color: #333;
  padding-top: 0;
}
.menu {
  flex: 0.16;
  padding: 10px 0px 0px 20px;
}

.el-footer {
  background-color: #b3c0d1;
  color: #333;
  /* text-align: center;
  line-height: 10px; */
}
/* body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
} */
</style>