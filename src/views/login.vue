<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Yougo商城后台管理系统</span>
      </div>
      <div>
        <el-tabs v-model="currentIndex" stretch @tab-click="handleTabClick">
          <el-tab-pane label="登录" name="login">
            <el-form :model="loginForm" :rules="rules" status-icon ref="loginForm" label-width="80px">
              <el-form-item label="用户名" prop="username">
                <el-input type="text" v-model="loginForm.username" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="注册" name="register">
            <el-form :model="registerForm" :rules="rules" status-icon ref="registerForm" label-width="80px">
              <el-form-item label="用户名" prop="username">
                <el-input type="text" v-model="registerForm.username" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email" :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] }
    ]">
                <el-input type="text" v-model="registerForm.email" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="registerForm.password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="configurePassword">
                <el-input type="password" v-model="registerForm.configurePassword" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script>
import api from '../api'
import { mapMutations } from 'vuex'

export default {
  data() {
    // 验证规则
    const validateUserName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      }
      if (value.length < 3) {
        return callback(new Error('用户名长度必须大于3'))
      }
      callback()
    }
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    const validateConfigurePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      currentIndex: 'login',
      activeTab: 'login',
      loginForm: {
        username: '',
        password: ''
      },
      registerForm: {
        username: '',
        password: '',
        configurePassword: '',
        email: ''
      },
      rules: {
        username: [{ validator: validateUserName, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }],
        configurePassword: [{ validator: validateConfigurePassword, trigger: 'blur' }]
      }
    }
  },
  methods: {
    ...mapMutations('login', ['setUser']),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 登录
          if (this.activeTab === 'login') {
            api.login(this.loginForm).then(res => {
              if (res.data.status === 200) {
                this.setUser(res.data)
                localStorage.setItem('yougo', JSON.stringify(res.data))
                this.$router.push('/')
              } else {
                const h = this.$createElement
                this.$notify({
                  title: '登陆失败',
                  message: h('i', '用户名或密码错误')
                })
              }
            })
          }
          // 注册
          if (this.activeTab === 'register') {
            api.register(this.registerForm).then(res => {
              if (res.data.status === 200) {
                const h = this.$createElement
                this.$notify({
                  title: '注册成功',
                  message: h('i', '请前往登陆页面登陆')
                })
              } else {
                const h = this.$createElement
                this.$notify({
                  title: '注册失败',
                  message: h('i', '请重新注册')
                })
              }
            })
          }
        }
      })
    },
    handleTabClick(tab) {
      this.activeTab = tab.name
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  width: 1200px;
  margin: 0 auto;
  .box-card {
    width: 500px;
    margin: 100px auto;
  }
}
</style>
