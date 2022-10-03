<template>
  <div class="product">
    <ProductHeader></ProductHeader>
    <ProductList></ProductList>
    <ProductPagination></ProductPagination>
    <ProductAdd></ProductAdd>
    <ProductEditor></ProductEditor>
  </div>
</template>

<script>
import ProductList from './ProductList.vue'
import ProductPagination from './ProductPagination.vue'
import ProductHeader from './ProductHeader.vue'
import ProductAdd from './ProductAdd.vue'
import ProductEditor from './ProductEditor.vue'

export default {
  components: {
    ProductList,
    ProductPagination,
    ProductHeader,
    ProductAdd,
    ProductEditor
  }
}
</script>

<style scoped>
.product {
  width: 1200px;
  margin: 0 auto;
}
</style>
