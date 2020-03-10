<template>
  <div class="login-box">
    <div class="login-logo">
      <a style="color: #f4f4f4"><b>数据</b>中台</a>
    </div>
    <div class="login-box-body">
      <p class="login-box-msg">登录账户</p>

        <div class="form-group has-feedback">
          <input type="email" class="form-control" placeholder="登录名" v-model="loginForm.username" value="admin">
          <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback">
          <input type="password" class="form-control" placeholder="密码" v-model="loginForm.password" value="admin">
          <span class="glyphicon glyphicon-lock form-control-feedback"></span>
        </div>
        <div class="row">
          <div class="col-xs-8">
            <div class="checkbox icheck">
<!--              <label>-->
<!--                <input type="checkbox">记住密码-->
<!--              </label>-->
              <a  class="text-center" @click="register()">注册新账户</a>
            </div>
          </div>
          <!-- /.col -->
          <div class="col-xs-4">
            <button type="submit" class="btn btn-primary btn-block btn-flat" @click="handleLogin()" @keyup.enter="handleLogin()">登录</button>
          </div>
          <!-- /.col -->
        </div>
<!--      <a href="#">忘记密码</a><br>-->


    </div>
  </div>
</template>

<script>
    import common from '../config/common'
export default {
  name: 'Login',
  data() {
    return {
        loginForm: {
            username: '',
            password: ''
        },
    }
  },
  methods: {
          keyupEnter(){
              document.onkeydown = e =>{
                  if (e && e.keyCode === 13 && (e.target.baseURI.indexOf('login') !== -1)) {
                      this.handleLogin();
                  }
              }
          },
          handleLogin() {
              let that=this;
              let param=new Object();
              param.username=this.loginForm.username
              param.password= this.loginForm.password
              this.$api.getUserLogin(param,res=> {
                          if (res.code === 200) {
                              let userInfo = res.data.userInfo;
                              window.localStorage.setItem(
                                  'menuList',
                                  JSON.stringify(res.data.powerList)
                              )
                              window.localStorage.setItem(
                                  'userInfo',
                                  JSON.stringify(userInfo)
                              )
                              this.$router.push({path: "/index"});
                          }
                          else {
                              alert(res.message)
                          }
                      })
                  },
          register(){
              this.$router.push({ path: '/register' })
          }

},
created(){
}
}
</script>

<style>
#login {
  padding: 10em;
}

html,
body,
/*.login-box{*/
/*  margin: 15% auto !important;;*/
/*}*/
.container-table {
  height: 100%;
  background-color: #282b30 !important;
}
.container-table {
  display: table;
  color: white;
}
.vertical-center-row {
  display: table-cell;
  vertical-align: middle;
}
.vertical-20p {
  padding-top: 20%;
}
.vertical-10p {
  padding-top: 10%;
}
.vertical-5p {
  padding-top: 5%;
}
.logo {
  width: 15em;
  padding: 3em;
}

.input-group {
  padding-bottom: 2em;
  height: 4em;
  width: 100%;
}

.input-group span.input-group-addon {
  width: 2em;
  height: 4em;
}

@media (max-width: 1241px) {
  .input-group input {
    height: 4em;
  }
}
@media (min-width: 1242px) {
  form {
    padding-left: 20em;
    padding-right: 20em;
  }

  .input-group input {
    height: 6em;
  }
}

.input-group-addon i {
  height: 15px;
  width: 15px;
}
</style>
