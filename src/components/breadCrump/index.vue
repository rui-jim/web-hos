<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ content.name }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ content.meta.title }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      content: {},
    };
  },
  components: {},
  created() {
    console.log("breacumb ", this.$route);
    this.content = this.$route;
  },
  computed: {
    ...mapGetters([""]),
  },
};
</script>

<style>
.el-breadcrumb {
}
</style>
