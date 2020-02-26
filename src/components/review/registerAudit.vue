<template>
  <div >
    <dash-header ></dash-header>
    <sidebar />
    <div class="content-wrapper">
      <section class="content-header">
        <h1>
          注册待审核
          <small>列表</small>
        </h1>
        <ol class="breadcrumb">
          <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
          <li><a href="#">审核</a></li>
          <li class="active">注册待审核</li>
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
                    <td><button type="submit" class="btn btn-primary" @click="update(item)">审核</button> <button type="submit" class="btn btn-danger" @click="deleteRow(item.id)">删除</button></td>
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
                          <input type="password" class="form-control" v-model="item.password"  placeholder="请输入密码" disabled>
                        </div>
                        <div class="form-group">
                          <label >昵称</label>
                          <input type="text" class="form-control" v-model="item.name"  placeholder="请输入昵称" disabled>
                        </div>
                        <div class="form-group">
                          <label >个性签名</label>
                          <input type="text" class="form-control" v-model="item.description"  placeholder="请输入个性签名" disabled>
                        </div>
                        <div class="form-group">
                          <label >手机号</label>
                          <input type="text" class="form-control" v-model="item.phone"  placeholder="请输入手机号码" disabled>
                        </div>
                        <div class="form-group">
                          <label >邮箱</label>
                          <input type="text" class="form-control"  v-model="item.email" disabled>
                        </div>
                        <div class="form-group has-feedback">
                          <label >城市</label>
                          <input type="text" class="form-control" v-model="item.city"   disabled>
                        </div>
                        <div class="form-group has-feedback">
                          <label >角色</label>
                          <select  style="width:100%;height:34px" v-model="item.roleId">
                            <option :value="item1.id" v-for="item1 in roles" >{{item1.roleName}}</option>
                          </select>
                        </div>
                      </div>
                      <div class="box-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary" @click="submitForm()">审核通过</button>
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
                roles:[],
                item:{
                    id:null,
                    email:null,
                    phone:null,
                    login:null,
                    password:null,
                    name:null,
                    description:null,
                    province:null,
                    location:null,
                    roleId:null
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
            initRole(){
                let that =this;
                this.$api.getSelectDropDown({},res => {
                        if (res.code === 200) {
                            that.roles = res.data
                        }else{
                            this.$alert(res.message);
                        }
                    })

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
                option.status=false;
                let that =this;
                this.$api.getUserAll(option,res => {
                        if (res.code === 200) {
                            that.tableData = res.data.content
                            that.pagination.total = res.data.totalElements
                        }else{
                            this.$alert(res.message);
                        }
                    })
            },
            initProvince() {
                this.level1 = [];
                let that = this;
                let param=new Object();
                param.level=1
                this.$api.getLocation(param,res => {
                        if (res.code == 200) {
                            that.level1 = res.data;
                        }
                    });

            },
            deleteRow(id){
            let obj=new Object();
            obj.id=id;
            this.$confirm('确认删除?', '', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$api
                .getDeleteUser(obj,res => {
                  if (res.code === 200) {
                    this.getList();
                    this.$alert('删除成功');
                  }else{
                    this.$alert('删除失败');
                  }
                })
            }).catch(() => {
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
                if (null == this.item.roleId || '' == this.item.roleId) {
                    this.$alert('请选择角色');
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
                obj.status=true;
                obj.id=this.item.id;
                obj.roleId=this.item.roleId;
                let that=this
                this.$api.getAuditUser(obj,res => {
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
            this.initRole();
        },
        watch: {
            $route(to,from) {
                this.getList()
            }
        }
    }
</script>

<style>
    .paging-box {
      margin-top: 20px;
      text-align: right;
    }
</style>
