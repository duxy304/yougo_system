<template>
  <el-dialog title="编辑产品" :visible.sync="dialogEditorVisible" width="70%" @before-close="handleClose">
    <el-form width="70%" :model="editorForm" ref="editorForm">
      <el-form-item label="商品类目">
        <el-button type="primary" class="location" @click="dialogCategoryHandle">类目选择</el-button>
        <span class="tree"> {{ treeData.name }}</span>
        <el-dialog width="50%" append-to-body title="类目选择" :visible.sync="dialogCategoryVisible">
          <ProductTree @onTree="getTreeData"></ProductTree>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogCategoryVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input v-model="editorForm.name"></el-input>
      </el-form-item>
      <el-form-item label="商品卖点">
        <el-input v-model="editorForm.sellPoint"></el-input>
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input v-model="editorForm.price"></el-input>
      </el-form-item>
      <el-form-item label="商品数量">
        <el-input v-model="editorForm.num"></el-input>
      </el-form-item>
      <el-form-item label="商品图片">
        <el-button class="location" type="primary" @click="dialogUploadHandle">图片上传</el-button>
        <img class="upload-img" :src="uploadData.url" alt="">
        <el-dialog width="50%" append-to-body title="图片上传" :visible.sync="dialogUploadVisible">
          <ProductUpload @onUpload="getOnUpload"></ProductUpload>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogUploadVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </el-form-item>
      <el-form-item label="商品描述">
        <ProductWangEditor @onEditor="getEditor" :currentEditorData="editorData"></ProductWangEditor>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogEditorVisible = false">取 消</el-button>
      <el-button type="primary" @click="editorProductHandle">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import ProductTree from '@/views/main/Product/ProductTree.vue'
import ProductUpload from './ProductUpload.vue'
import ProductWangEditor from './ProductWangEditor.vue'

export default {
  components: {
    ProductTree,
    ProductUpload,
    ProductWangEditor
  },
  data() {
    return {
      dialogEditorVisible: false,
      editorForm: {
        name: '',
        sellPoint: '',
        price: '',
        num: ''
      },
      dialogCategoryVisible: false,
      dialogUploadVisible: false,
      treeData: {
        cid: '',
        name: ''
      }, // 类目选择
      uploadData: {
        url: ''
      }, // 存储图片
      editorData: '', // 富文本
      currentData: {}
    }
  },
  methods: {
    handleClose() {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
          this.dialogEditorVisible = false
        })
        .catch(_ => {})
    },
    dialogCategoryHandle() {
      this.dialogCategoryVisible = true
    },
    dialogUploadHandle() {
      this.dialogUploadVisible = true
    },
    // 读取类目数据
    getTreeData(data) {
      this.treeData = data
    },
    // 读取图片地址
    getOnUpload(data) {
      if (data.url) {
        data.url = data.url.replace('upload', 'http://localhost:3000')
      }
      this.uploadData = data
    },
    // 接收富文本数据
    getEditor(data) {
      this.editorData = data
    },
    // 编辑产品，重新提交数据
    editorProductHandle() {
      this.$api
        .updateTbItem({
          id: this.currentData.id,
          cid: this.treeData.cid,
          title: this.editorForm.name,
          sellPoint: this.editorForm.sellPoint,
          price: this.editorForm.price,
          num: this.editorForm.num,
          desc: this.editorData,
          image: this.uploadData.url
        })
        .then(res => {
          if (res.data.status === 200) {
            this.dialogEditorVisible = false
            this.$bus.$emit('refresh', true)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted() {
    this.$bus.$on('onEditorEvent', row => {
      this.dialogEditorVisible = true
      this.currentData = row
      // 获取预更新数据
      this.$api.preUpdateItem({ id: row.id }).then(res => {
        // 赋值
        this.treeData.name = res.data.result[0].cid
        this.editorForm.name = res.data.result[0].title
        this.editorForm.price = res.data.result[0].price
        this.editorForm.sellPoint = res.data.result[0].sellPoint
        this.editorForm.num = res.data.result[0].num
        this.uploadData.url = res.data.result[0].image
        this.editorData = res.data.result[0].descs
      })
    })
  }
}
</script>

<style scoped>
.location {
  float: left;
}
.tree {
  float: left;
  margin-left: 10px;
}
.upload-img {
  float: left;
  width: 300px;
  margin-left: 10px;
}
</style>
