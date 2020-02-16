<template>
  <div >
    <dash-header ></dash-header>
    <sidebar />
    <div class="content-wrapper" style="min-height: 1200px">
      <section class="content-header">
        <h1>
          采集数据
          <small>列表</small>
        </h1>
        <ol class="breadcrumb">
          <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
          <li><a href="#">数据源</a></li>
          <li class="active">数据源列表</li>
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
                    <th>名称</th>
                    <th>数据库类型</th>
                    <th>地址</th>
                    <th>端口</th>
                    <th>用户名</th>
                    <th>密码</th>
                    <th>操作</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(item)  in tableData">
                    <td>{{item.name}}</td>
                    <td>{{dealDbName(item.databaseTypeId)}}</td>
                    <td>{{item.hostName}}</td>
                    <td>{{item.port}}</td>
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
                            <label >数据库类型</label>
                            <select style="width:100%;height:34px" v-model="item.databaseTypeId" >
                              <option :value="item.id" v-for="item in baseTypeList" >{{item.code}}</option>
                            </select>
                          </div>
                          <div class="form-group">
                            <label for="addr">地址</label>
                            <input type="text" class="form-control" id="addr" v-model="item.hostName" placeholder="请输入数据库地址">
                          </div>
                          <div class="form-group">
                            <label for="port">端口号</label>
                            <input type="text" class="form-control" id="port" v-model="item.port" placeholder="请输入端口号">
                          </div>
                          <div class="form-group">
                            <label for="databaseName">数据库名称</label>
                            <input type="text" class="form-control" id="databaseName" v-model="item.databaseName" placeholder="请输入数据库名称">
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
        databaseTypeId:null,
        databaseContypeId:null,
        hostName:null,
        databaseName:null,
        pid:null,
        port:null,
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
      this.item.databaseTypeId=null,
      this.item.databaseContypeId=null,
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
      if(null==this.item.databaseTypeId||''==this.item.databaseTypeId){
        this.$alert('数据源类型不能为空');
        return;
      }
      if(null==this.item.hostName||''==this.item.hostName){
        this.$alert('数据源主机名或者ip不能为空');
        return;
      }
      if(null==this.item.databaseName||''==this.item.databaseName){
        this.$alert('数据库名称不能为空');
        return;
      }
      if(null==this.item.port||''==this.item.port){
        this.$alert('数据库端口不能为空');
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
        hostName: this.item.hostName,
        databaseName: this.item.databaseName,
        pid:  this.item.pid ,
        port: this.item.port,
        username: this.item.username,
        password: this.item.password,
        id: this.item.id
      }
      this.$api.getCreateOrUpdate( params,res => {
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
    dealDbName(dbId) {
      let retval = ''
      if (dbId == 27) {
        retval = 'MARIADB'
      } else if (dbId == 31) {
        retval = 'MSSQL'
      } else if (dbId == 33) {
        retval = 'MYSQL'
      }  else if (dbId == 42) {
        retval = 'POSTGRESQL'
      } else {
        retval = '未知数据库'
      }
      return retval
    },
    getBaseType() {
      let that=this;
      let param=new Object()
        this.$api.getDatabaseType(param,res=> {
            if (res.code === 200) {
                that.baseTypeList = res.data
            }
            else {
                alert(res.message)
            }
        })
    },
    getList() {
      let option=new Object();
        option.size=this.pagination.size;
        option.page=this.pagination.page;
        option.name=this.search ? this.search : null;
       let that=this;
      this.$api.getListDatabase( option ,res=> {
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
          this.$api.getDeleteDatabase(param,res => {
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


