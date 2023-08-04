<template>
  <div class="login-container">
    <!-- <img class="home-p" src="../../assets/left.png" alt=""> -->
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >

      <div class="title-container">
        <h3 class="title">人力资源管理系统</h3>
      </div>

      <el-form-item prop="mobile">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="mobile"
          v-model="loginForm.mobile"
          placeholder="请输入手机号"
          name="mobile"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >登录</el-button>

      <div class="tips">
        <span style="margin-right:20px;">用户名: admin</span>
        <span> 密码: any</span>
      </div>

    </el-form>
  </div>
</template>

<script>
import { validUserphone } from '@/utils/validate'
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   if (!validUsername(value)) {
    //     callback(new Error('请输入正确的名字'))
    //   } else {
    //     callback()
    //   }
    // }
    const validateUserphone = (rule, value, callback) => {
      // validUserphone(value) ?  callback() : callback(new Error('请输入正确得手机号'))

      if (!validUserphone(value)) {
        callback(new Error('请输入手机号'))
      } else {
        callback()
      }
    }
    // const validatePassword = (rule, value, callback) => {
    //   if (value.length == 0) {
    //     callback(new Error('请输入密码'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      loginForm: {
        mobile: '13800000002',
        password: 'hm#qd@23!'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '请输入正确的手机号' },
          { trigger: 'blur', validator: validateUserphone }],
        password: [{ required: true, trigger: 'blur', message: '请输入密码' },
          { min: 6, max: 16, message: '长度在6到16位密码', trigger: 'blur' }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions(['user/logins']),
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(async(valid) => {
        if (valid) {
          try {
            this.loading = true
            await this['user/logins'](this.loginForm)
            //  await this.$store.dispatch('user/logins', this.loginForm)
            this.$router.push('/')
          } catch (error) {
            console.log(error)
          } finally {
            this.loading = false
          }
        }
      })
      // this.$refs.loginForm.validate(valid => {
      //   if (valid) {
      //     this.loading = true
      //     this.$store.dispatch('user/login', this.loginForm).then(() => {
      //       this.$router.push({ path: this.redirect || '/' })
      //       this.loading = false
      //     }).catch(() => {
      //       this.loading = false
      //     })
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #2c1f1f;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$firstColor: rgba(88, 99, 88, .5);
$light_gray: #eee;
// $bu:element-aadmin\vue-admin-template-master\src\assets\what.png;

.login-container {
  min-height: 100%;
  width: 100%;
  // background-color: $bg;
  background: url(../../assets/backgogog.png) no-repeat;
  overflow: hidden;

  .login-form {
    background: url(../../assets/lef.png) no-repeat -50px -120px;
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 50px 50px;
    border-radius: 50px;
    margin: 0 auto;
    margin-top: 250px;
    // right: -100px;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #110c0c;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: #000;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .home-p {
    position: absolute;
    width: 250px;
    height: 418px;
  }
}
</style>
