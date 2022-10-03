<template>
  <el-dialog title="添加产品" :visible.sync="dialogAddVisible" width="70%" @before-close="handleClose">
    <el-form width="70%" :model="addForm" ref="addForm">
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
        <el-input v-model="addForm.name"></el-input>
      </el-form-item>
      <el-form-item label="商品卖点">
        <el-input v-model="addForm.sellPoint"></el-input>
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input v-model="addForm.price"></el-input>
      </el-form-item>
      <el-form-item label="商品数量">
        <el-input v-model="addForm.num"></el-input>
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
        <ProductWangEditor @onEditor="getEditor"></ProductWangEditor>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogAddVisible = false">取 消</el-button>
      <el-button type="primary" @click="addProductHandle">确 定</el-button>
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
      dialogAddVisible: false,
      addForm: {
        name: '',
        sellPoint: '',
        price: '',
        num: ''
      },
      dialogCategoryVisible: false,
      dialogUploadVisible: false,
      treeData: {}, // 类目选择
      uploadData: {}, // 存储图片
      editorData: '' // 富文本
    }
  },
  methods: {
    handleClose() {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
          this.dialogAddVisible = false
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
    // 添加产品
    addProductHandle() {
      this.$api
        .insertTbItem({
          cid: this.treeData.cid,
          title: this.addForm.name,
          sellPoint: this.addForm.sellPoint,
          price: this.addForm.price,
          num: this.addForm.num,
          desc: this.editorData,
          image: this.uploadData.url
        })
        .then(res => {
          if (res.data.status === 200) {
            this.dialogAddVisible = false
            this.$bus.$emit('refresh', true)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted() {
    this.$bus.$on('onAddEvent', flag => {
      this.dialogAddVisible = flag
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
