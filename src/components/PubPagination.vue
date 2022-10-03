<template>
  <div class="pagination-container">
    <el-pagination layout="prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" :current-page.sync="currentPage" @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1
    }
  },
  props: {
    total: {
      type: [String, Number],
      default: 0
    }
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange(val) {
      this.$bus.$emit('page', val)
    }
  }
}
</script>

<style scoped>
.pagination-container {
  margin-top: 40px;
}
</style>
