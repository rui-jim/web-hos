
<template>
  <div>
    <el-tag
      :key="tag.fullPath"
      v-for="tag in tags"
      closable
      :disable-transitions="false"
      @close="handleClose(tag.fullPath)"
    >
      {{ tag.meta.title }}
    </el-tag>

    <!-- <el-tag
      v-for="tag in tags"
      :key="tag.meta.name"
      closable
      :disable-transitions="false"
      @close="handleClose"
    >
      {{ tag.meta.title }}
    </el-tag> -->
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    handleClose(fullPath) {
      this.$store.dispatch("tagTest/drop_tag", fullPath);
    },
  },
  computed: {
    ...mapGetters(["tags"]),
  },
};
</script>
<style scoped>
.el-tag {
  margin: 0 0.3vw;
}
</style>