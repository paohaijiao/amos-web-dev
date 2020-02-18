<template>
  <div >
    <dash-header ></dash-header>
    <sidebar />
    <div class="content-wrapper" style="min-height: 1200px">
      <section class="content-header">
        <h1>
          用户
          <small>列表</small>
        </h1>
        <ol class="breadcrumb">
          <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
          <li><a href="#">系统管理</a></li>
          <li class="active">用户列表</li>
        </ol>
      </section>
      <section class="content">
        <div class="row">
          <div class="col-xs-12">
            <div class="box">
              <div class="box-header">
                <h3 class="box-title">列表详情</h3>
              </div>
              <div class="box-body">
<!--                <div><button class="btn btn-primary" data-toggle="modal" data-target="#myModal" style="width: 100px;">新增</button></div>-->
                <table id="example1" class="table table-bordered table-striped">
                  <thead>
                  <tr>
                    <th>用户id</th>
                    <th>登录名</th>
                    <th>密码</th>
                    <th>昵称</th>
                    <th>个性签名</th>
                    <th>电话</th>
                    <th>邮箱</th>
                    <th>地区</th>
                    <th>头像</th>
                    <th>是否有效</th>
                    <th>角色</th>
                    <th>操作</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(item)  in tableData">
                    <td>{{item.id}}</td>
                    <td>{{item.login}}</td>
                    <td >*****</td>
                    <td>{{item.name}}</td>
                    <td >{{item.description}}</td>
                    <td >{{item.phone}}</td>
                    <td >{{item.email}}</td>
                    <td >{{item.city}}</td>
                    <td >{{item.avatar}}</td>
                    <td>{{item.status == '1' ? '有效' : '无效'}}</td>
                    <td >{{item.roleName}}</td>
                    <td><button type="submit" class="btn btn-primary" @click="update(item)">修改</button> <button type="submit" class="btn btn-danger" @click="deleteRow(item.id)">删除</button></td>
                  </tr>
                  </tbody>
                  <pagination :records="pagination.total" :per-page="pagination.size" v-model="pagination.page" @paginate="getList"></pagination>
                </table>
                <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">用户管理</h4>
                      </div>
                      <div class="box-body">
                        <div class="form-group">
                          <label >登录名</label>
                          <input type="text" class="form-control" v-model="item.login"  placeholder="请输入登录名" disabled>
                        </div>
                        <div class="form-group">
                          <label >密码</label>
                          <input type="password" class="form-control" v-model="item.password"  placeholder="请输入密码">
                        </div>
                        <div class="form-group">
                          <label >昵称</label>
                          <input type="text" class="form-control" v-model="item.name"  placeholder="请输入昵称">
                        </div>
                        <div class="form-group">
                          <label >个性签名</label>
                          <input type="text" class="form-control" v-model="item.description"  placeholder="请输入个性签名">
                        </div>
                        <div class="form-group">
                          <label >手机号</label>
                          <input type="text" class="form-control" v-model="item.phone"  placeholder="请输入手机号码">
                        </div>
                        <div class="form-group">
                          <label >邮箱</label>
                          <input type="text" class="form-control"  v-model="item.email" >
                        </div>
                        <div class="form-group has-feedback">
                          <label >城市</label>
                          <input type="text" class="form-control" v-model="item.city"  placeholder="请输入登录名" disabled>
                        </div>
                      </div>
                      <div class="box-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary" @click="submitForm()">提交</button>
                      </div>
                      <!-- /.box-body -->
                      <div class="modal-footer">

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
      <router-view></router-view>
    </div>
    <dash-footer></dash-footer>
  </div>
</template>

<script>
  import DashFooter from '../layout/DashFooter'
  import DashHeader from '../layout/DashHeader'
  import Sidebar from '../layout/Sidebar'
export default {
  name: 'users',
  components: {
    DashFooter,
    DashHeader,
    Sidebar
  },
  props: {},
  data() {
    return {
        item:{
            email:null,
            phone:null,
            login:null,
            password:null,
            name:null,
            description:null,
            province:null,
            location:null
        },
      level1: [],
      search: null,
      tableData: [],
      pagination: {
        total:0,
        page:1,
        size:10
      }
    }
  },
  methods: {
    upload(e) {
      this.file = e.target.files[0];
    },
    submitImg() {
      let that=this;
      let formData = new FormData();
      formData.append('file',this.file);
      this.$api.getUpload(formData,res => {
          if (res.code == 200) {
            that.item.imageId = res.data;
            that.item.message = res.message;
          }
        });
    },
    update(item){
        this.item=item;
      $('#myModal').modal('show')

    },
    getList() {
      let option=new Object();
      option.size=this.pagination.size;
      option.page=this.pagination.page;
      option.name=this.search ? this.search : null;
      option.status=true;
      let that =this;
      this.$api
        .getUserAll(option,res => {
          if (res.code === 200) {
              that.tableData = res.data.content
              that.pagination.total = res.data.totalElements
              $('#myModal').modal('hide')
          }else{
            this.$alert(res.message);
          }
        })
    },
    initProvince() {
      this.level1 = [];
      let that = this;
      this.$api.getLocation({
          level: 1
        },res => {
          if (res.code == 200) {
            that.level1 = res.data;
          }
        });

    },
      deleteRow(id) {
      let param = {
        id: id
      }

      this.$api.getDeleteUser(param,res => {
          if (res.code === 200) {
              this.getList()
              this.$alert(res.message);
          } else {
              this.$alert(res.message);
          }
        })
    },
    submitForm() {
      if (null == this.item.name || '' == this.item.name) {
        this.$alert('必须填写昵称');
        return;
      }
      if (null == this.item.login || '' == this.item.login) {
        this.$alert('必须填写登录名');
        return;
      }
      if (null == this.item.email || '' == this.item.email) {
        this.$alert('必须填写邮箱');
        return;
      }
      if (null == this.item.phone || '' == this.item.phone) {
        this.$alert('必须填写手机号码');
        return;
      }
      if (null == this.item.description || '' == this.item.description) {
        this.$alert('必须填写个性签名');
        return;
      }
      if (null == this.item.password || '' == this.item.password) {
        this.$alert('密码不能为空');
        return;
      }
      let obj=new Object();
      obj.name=this.item.name;
      obj.login=this.item.login;
      obj.email=this.item.email;
      obj.phone=this.item.phone;
      obj.description=this.item.description;
      obj.location=this.item.location;
      obj.password=this.item.password;
      obj.image=this.item.image
      obj.enabled=false
      obj.id=this.item.id;
        debugger;
      let that=this
      this.$api.getUserDeleteOrUpdate(obj,res => {
          if (res.code == 200) {
            that.$alert(res.message);
            that.getList();
            $('#myModal').modal('hide')
          }else if(res.status==400){
            let message='';
            let errors=res.errors;
            for(var i=0;i<errors.length;i++){
              message+=errors[i].defaultMessage;
            }
            that.$alert(message)
          }else{
            that.$alert(res.message)
          }
        });
    }
  },
  created() {
    this.getList()
    this.initProvince();
  },
  watch: {
    $route(to,from) {
      this.getList()
    }
  }
}
</script>

<style >
  .paging-box {
    margin-top: 20px;
    text-align: right;
  }
</style>
