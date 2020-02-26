<template>
  <div >
    <dash-header ></dash-header>
    <sidebar />
    <div class="content-wrapper" >
      <section class="content-header">
        <h1>
          通用数据源jdbc
          <small>列表</small>
        </h1>
        <ol class="breadcrumb">
          <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
          <li><a href="#">数据源</a></li>
          <li class="active">通用数据源节点</li>
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
                <div><button class="btn btn-primary" @click="add()" style="width: 100px;">新增</button></div>
                <table id="example1" class="table table-bordered table-striped">
                  <thead>
                  <tr>
                    <th>数据源名称</th>
                    <th>驱动类</th>
                    <th>url</th>
                    <th>用户名</th>
                    <th>密码</th>
                    <th>操作</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(item)  in tableData">
                    <td>{{item.name}}</td>
                    <td>{{item.driverClass}}</td>
                    <td>{{item.url}}</td>
                    <td>{{item.username}}</td>
                    <td>{{item.password}}</td>
                    <td><button type="submit" class="btn btn-primary" @click="update(item)">修改</button> <button type="submit" class="btn btn-danger" @click="deleteRow(item)">删除</button></td>
                  </tr>
                  </tbody>
                  <pagination :records="pagination.total" :per-page="pagination.size" v-model="pagination.page" @paginate="getList"></pagination>
                </table>
                <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">添加数据源</h4>
                      </div>
                        <div class="box-body">
                          <div class="form-group">
                            <label for="name">数据源名称</label>
                            <input type="text" class="form-control" v-model="item.name" id="name" placeholder="请输入数据源名称">
                          </div>
                          <div class="form-group">
                            <label for="addr">驱动类</label>
                            <input type="text" class="form-control" id="addr" v-model="item.driverClass" placeholder="请输入驱动类">
                          </div>
                          <div class="form-group">
                            <label for="port">url</label>
                            <input type="text" class="form-control" id="port" v-model="item.url" placeholder="请输入Url">
                          </div>
                          <div class="form-group">
                            <label for="user">用户名</label>
                            <input type="text" class="form-control" id="user" placeholder="请输入用户名"  v-model="item.username">
                          </div>
                          <div class="form-group">
                            <label for="password">密码</label>
                            <input type="password" class="form-control" id="password" placeholder="请输入密码" v-model="item.password">
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
  name: 'collection',
  components: {DashHeader,DashFooter,Sidebar},

  data() {
    return {
      item:{
        name:null,
        databaseTypeId:10,
        databaseContypeId:null,
        driverClass:null,
        url:null,
        username:null,
        password:null,
        id:null
      },
      search: '',
      tableData: [],
      baseTypeList:[],
      databaseList:[],
      pagination: {
        total:0,
        page:1,
        size:10
      }
    }
  },
  methods: {
    add(){
      this.item.name=null,
      this.item.hostName=null,
      this.item.databaseName=null,
      this.item.pid=null,
      this.item.port=null,
      this.item.username=null,
      this.item.password=null,
      this.item.id=null
      $('#myModal').modal('show');
    },
    getAllCollection() {
      this.$api.getListAllDatabase(res => {
        if (res.code === 200) {
          this.databaseList = res.data
        }
      })
    },
    submitForm() {
      if(null==this.item.name||''==this.item.name){
        this.$alert('数据源名称不能为空');
        return;
      }
        if(null==this.item.driverClass||''==this.item.driverClass){
            this.$alert('驱动类不能为空');
            return;
        }
        if(null==this.item.url||''==this.item.url){
            this.$alert('url不能为空');
            return;
        }

      if(null==this.item.username||''==this.item.username){
        this.$alert('数据库用户不能为空');
        return;
      }
      if(null==this.item.password||''==this.item.password){
        this.$alert('数据库密码不能为空');
        return;
      }
      let params = {
        name: this.item.name,
        databaseTypeId: this.item.databaseTypeId,
        databaseContypeId: 1,
        url: this.item.url,
        driverClass: this.item.driverClass,
        username: this.item.username,
        password: this.item.password,
        id: this.item.id
      }
      this.$api.getMakeGenericDataSource( params,res => {
          if (res.code === 200) {
            this.$alert('操作成功');
            this.getList()
            $('#myModal').modal('hide');
          }else if(null!=res.errors){
            let array=res.errors;
            let msge='';
            array.forEach(e=>{
              msge+=e.defaultMessage;
            })
            this.$alert(msge);
          }else if(res.message!=null) {
            this.$alert(res.message);
          }else{
              this.$alert('系统错误');
            }
          }
        )
    },

    getList() {
      let option=new Object();
        option.size=this.pagination.size;
        option.page=this.pagination.page;
        option.name=this.search ? this.search : null;
       let that=this;
      this.$api.getGenericDataSourceList( option ,res=> {
          if (res.code === 200) {
            that.tableData = res.data.content
            that.pagination.total = res.data.totalElements
          }
        })
    },
    searchList() {
      this.pagination.page = 1
      this.getList()
    },
    update(item){
      $('#myModal').modal('show')
      this.item=item;
    },
    deleteRow(item) {
      let param = {
        id: item.id
      }
      this.$confirm('确认删除?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          this.$api.getDeleteDataSource(param,res => {
            if (res.code === 200) {
              this.$alert('删除成功');
              this.getList()
            } else {
              this.$alert(res.message);
            }
          })

      }).catch(() => {
      })
    }
  },
  created() {
    this.getList({})
    this.getBaseType()
    this.getAllCollection();
  },
  watch: {
    $route(to,from) {
      this.getList()
    }
  }
}
</script>


