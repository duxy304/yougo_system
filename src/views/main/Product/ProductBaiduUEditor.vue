<template>
  <vue-ueditor-wrap v-model="msg" :config="myConfig"></vue-ueditor-wrap>
</template>

<script>
import VueUeditorWrap from 'vue-ueditor-wrap'

export default {
  data() {
    return {
      msg: 'Hello World!',
      myConfig: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始化容器高度
        initialFrameHeight: 240,
        // 初始化容器宽度
        initialFramewidth: '100%',
        // 访问 UEditor 静态资源的根路径，可参考 https://hc199421.gitee.io/vue-ueditor-wrap/#/faq
        UEDITOR_HOME_URL: '/UEditor/',
        // 服务端接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        serverUrl: 'http://localhost:3000/api/upload'
      }
    }
  },
  components: {
    VueUeditorWrap
  }
}
</script>

<style>
</style>
