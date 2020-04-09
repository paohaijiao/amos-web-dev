<template>
  <div >
    <dash-header ></dash-header>
    <sidebar />
    <div class="content-wrapper" >
      <section class="content-header">
        <h1>
          集群管理
          <small>节点列表</small>
        </h1>
        <ol class="breadcrumb">
          <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
          <li><a href="#">集群管理</a></li>
          <li class="active">节点列表</li>
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
                <div><button class="btn btn-primary" @click="add()" style="width: 100px;">新增节点</button></div>
                <table id="example1" class="table table-bordered table-striped">
                  <thead>
                  <tr>
                    <th>节点名</th>
                    <th>主机名或者ip</th>
                    <th>端口</th>
                    <th>应用名</th>
                    <th>用户名</th>
                    <th>密码</th>
                    <th>是否是主服务器</th>
                    <th>操作</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(item)  in tableData">
                    <td>{{item.name}}</td>
                    <td>{{item.hostName}}</td>
                    <td>{{item.port}}</td>
                    <td>{{item.webAppName}}</td>
                    <td>{{item.username}}</td>
                    <td>******</td>
                    <td>{{item.master}}</td>
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
                        <h4 class="modal-title" id="myModalLabel">添加节点</h4>
                      </div>
                        <div class="box-body">
                          <div class="form-group">
                            <label for="name">节点名</label>
                            <input type="text" class="form-control" v-model="item.name" id="name" placeholder="请输入节点名">
                          </div>
                          <div class="form-group">
                            <label >主机名或者ip	</label>
                            <input type="text" class="form-control" v-model="item.hostName" placeholder="请输入主机名或者ip	">
                          </div>
                          <div class="form-group">
                            <label >端口</label>
                            <input type="text" class="form-control"  v-model="item.port" placeholder="请输入端口号">
                          </div>
                          <div class="form-group">
                            <label >应用名</label>
                            <input type="text" class="form-control" id="port" v-model="item.webAppName" placeholder="请输入应用名">
                          </div>
                          <div class="form-group">
                            <label >用户名</label>
                            <input type="text" class="form-control" v-model="item.username" placeholder="请输入用户名">
                          </div>
                          <div class="form-group">
                            <label for="password">密码</label>
                            <input type="password" class="form-control" id="password" placeholder="请输入密码" v-model="item.password">
                          </div>
                          <div class="form-group">
                            <label for="password">是否是master节点</label>
                            <select style="width:100%;height:34px" v-model="item.master" >
                              <option :value="item.key" v-for="item in types" >{{item.value}}</option>
                            </select>
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
        hostName:null,
        master:null,
        pid:null,
        port:null,
        username:null,
        password:null,
        idSlave:null
      },
      search: '',
      tableData: [],
      types:[{"key":true,"value":true},{"key":false,"value":false}],
      pagination: {
        total:0,
        page:1,
        size:10
      }
    }
  },
  methods: {
    add(){
      this.item.idSlave=null
      this.item.name=null,
      this.item.hostName=null,
      this.item.port=null,
      this.item.webAppName=null,
      this.item.username=null,
      this.item.password=null,
      this.item.proxyHostName=null,
      this.item.proxyPort=null,
      this.item.nonProxyHosts=null,
      this.item.master=null,

      $('#myModal').modal('show');
    },
    submitForm() {
      if(null==this.item.name||''==this.item.name){
        this.$alert('节点名称不能为空');
        return;
      }
      if(null==this.item.hostName||''==this.item.hostName){
        this.$alert('主机名或者ip不能为空');
        return;
      }
      if(null==this.item.username||''==this.item.username){
        this.$alert('用户名不能为空');
        return;
      }
      if(null==this.item.password||''==this.item.password){
        this.$alert('密码不能为空');
        return;
      }
      if(null==this.item.master){
        this.$alert('是否是主服务器必填');
        return;
      }
      debugger;
      let params = {
        name: this.item.name,
        hostName: this.item.hostName,
        port: this.item.port,
        webAppName: this.item.webAppName,
        username: this.item.username,
        password: this.item.password,
        master: this.item.master,
        idSlave: this.item.idSlave
      }
      this.$api.rSlaveSave( params,res => {
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
      this.$api.rSlaveFindAll( option ,res=> {
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
        idSlave: item.idSlave
      }
      this.$confirm('确认删除?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          this.$api.rSlaveDelete(param,res => {
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
  },
  watch: {
    $route(to,from) {
      this.getList()
    }
  }
}
</script>


