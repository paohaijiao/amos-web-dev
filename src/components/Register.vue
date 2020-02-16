<template>
  <div class="register-box">
    <div class="register-logo">
      <a ><b>数据</b>治理</a>
    </div>

    <div class="register-box-body">
      <p class="login-box-msg">注册一个新账户</p>

        <div class="form-group has-feedback">
          <input type="text" class="form-control" placeholder="昵称"  v-model="name">
          <span class="glyphicon glyphicon-user form-control-feedback"></span>
        </div>
      <div class="form-group has-feedback">
        <input type="text" class="form-control" placeholder="登录名"  v-model="login">
        <span class="glyphicon glyphicon-link form-control-feedback"></span>
      </div>
        <div class="form-group has-feedback">
          <input type="email" class="form-control" placeholder="邮箱" v-model="email">
          <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
        </div>
      <div class="form-group has-feedback">
        <input type="email" class="form-control" placeholder="手机号"  v-model="phone">

       <span class="glyphicon  form-control-feedback">
          <i class="fa fa-phone"></i>
       </span>
      </div>

      <div class="form-group has-feedback">
        <input type="email" class="form-control" placeholder="个性签名" v-model="description">
        <span class="glyphicon glyphicon-collapse-down form-control-feedback"></span>
      </div>
      <div class="form-group has-feedback">
        <select style="width:100%;height:34px" v-model="province" >
          <option>请选择所在省份</option>
          <option :value="item" v-for="item in level1" >{{item.district}}</option>
        </select>
      </div>
      <div class="form-group has-feedback">
        <select  style="width:100%;height:34px" v-model="location">
          <option :value="item1.id" v-for="item1 in province.city" >{{item1.district}}</option>
        </select>
      </div>
        <div class="form-group has-feedback">
          <input type="password" class="form-control" placeholder="密码" v-model="password">
          <span class="glyphicon glyphicon-lock form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback">
          <input type="password" class="form-control" placeholder="重输密码" v-model="pass">
          <span class="glyphicon glyphicon-log-in form-control-feedback"></span>
        </div>
      <div class="form-group">
        <label for="exampleInputFile">头像 :</label>
        <input type="file" id="exampleInputFile" @change="upload" accept="image/*">
        <p class="help-block">{{message}}</p>
      </div>
      <div class="form-group" >
        <button @click="submitImg()" class="btn btn-primary" style="width:100%">上传头像</button>
      </div>
        <div class="row">
          <div class="col-xs-8">
            <div class="checkbox icheck">
              <label>
                <input type="checkbox" v-model="checkStatus"> 我同意协议 <a href="#"></a>
              </label>
            </div>
          </div>
          <!-- /.col -->
          <div class="col-xs-4">
            <button type="submit" class="btn btn-primary btn-block btn-flat" @click="register()">注册</button>
          </div>
        </div>

      <a @click="loginIndex()" class="text-center">已经有了账户?登录</a>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'Register',
        data() {
            return {
                checkStatus: true,
                name: '',
                login: '',
                email: '',
                phone: '',
                description: '',
                location: '',
                password: '',
                pass: '',
                level1: [],
                province: '',
                message: '',
                file:'',
                imageId:''
            }
        },
        methods: {
            loginIndex(){
                this.$router.push({ path: '/' })
            },
            upload(e) {
                this.file = e.target.files[0];
            },
            submitImg() {
                let that=this;
                let formData = new FormData();
                formData.append('file',this.file);
                this.$axios
                    .post('/api/publicApi/upload',formData,'form-data')
                    .then(res => {
                        if (res.data.code == 200) {
                            that.imageId = res.data.data;
                            that.message = res.data.message;
                        }
                    });
            },
            initProvince() {
                this.level1 = [];
                let that = this;
                this.$axios
                    .get('/api/publicApi/getLocation', {
                        level: 1
                    })
                    .then(res => {
                        if (res.data.code == 200) {
                            that.level1 = res.data.data;
                        }
                    });

            },
            register() {
              debugger;
                if (!this.checkStatus) {
                    this.$alert('必须先同意协议')
                    return;
                }
                if (null == this.name || '' == this.name) {
                  this.$alert('必须填写昵称');
                    return;
                }
                if (null == this.login || '' == this.login) {
                  this.$alert('必须填写登录名');
                    return;
                }
                if (null == this.email || '' == this.email) {
                  this.$alert('必须填写邮箱');
                    return;
                }
                if (null == this.phone || '' == this.phone) {
                  this.$alert('必须填写手机号码');
                    return;
                }
                if (null == this.description || '' == this.description) {
                  this.$alert('必须填写个性签名');
                    return;
                }
                if (null == this.province) {
                  this.$alert('必须选择省级');
                    return;
                }
                if (null == this.location || '' == this.location) {
                  this.$alert('必须选择市级');
                    return;
                }
                if (null == this.password || '' == this.password) {
                  this.$alert('密码不能为空');
                    return;
                }
                if (null == this.pass || '' == this.pass) {
                  this.$alert('重输密码不能为空');
                    return;
                }
                if (this.pass != this.password) {
                  this.$alert('两次密码不一致');
                    return;
                }
                if(null == this.imageId || '' == this.imageId){
                  this.$alert('先上传头像');
                    return;
                }
                let obj=new Object();
                obj.name=this.name;
                obj.login=this.login;
                obj.email=this.email;
                obj.phone=this.phone;
                obj.description=this.description;
                obj.location=this.location;
                obj.password=this.password;
                obj.image=this.imageId
                let that=this
                this.$axios
                    .post('/api/publicApi/register',obj)
                    .then(res => {
                        if (res.data.code == 200) {
                          that.$alert("注册成功,等待管理员审核")
                        }else{
                          that.$alert(res.data.message)
                        }
                    });
            }

        },
        created() {
            this.initProvince();
        }
    }
</script>

<style>
  .dropdown-menu{
    min-width: 300px !important;
  }
#login {
  padding: 10em;
}
.bs3{
  width:100% !important;;
}
html,
body,
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
