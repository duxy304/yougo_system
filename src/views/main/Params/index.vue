<template>
  <div class="params">
    <ParamsHeader :searchHandle="$api.paramsSearch"></ParamsHeader>
    <ParamsList></ParamsList>
    <ParamsPagination :total="2"></ParamsPagination>
  </div>
</template>

<script>
import ParamsList from './ParamsList.vue'
import ParamsPagination from '@/components/PubPagination.vue'
import ParamsHeader from '@/components/PubHeader.vue'

export default {
  components: {
    ParamsList,
    ParamsPagination,
    ParamsHeader
  }
}
</script>

<style scoped>
  .params {
    width: 1200px;
    margin: 0 auto;
  }
</style>
