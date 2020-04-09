<template>
  <div >
    <dash-header ></dash-header>
    <sidebar />
    <div class="content-wrapper" >
      <section class="content-header">
        <h1>
          集群管理
          <small>集群列表</small>
        </h1>
        <ol class="breadcrumb">
          <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
          <li><a href="#">集群管理</a></li>
          <li class="active">集群列表</li>
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
                <div><button class="btn btn-primary" @click="add()" style="width: 100px;">新增集群</button></div>
                <table id="example1" class="table table-bordered table-striped">
                  <thead>
                  <tr>
                    <th>集群名称</th>
                    <th>端口</th>
                    <th>sockets 缓存大小</th>
                    <th>socket 刷新间隔</th>
                    <th>是否压缩</th>
                    <th>是否是Dynamic Cluster</th>
                    <th>操作</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(item)  in lists">
                    <td>{{item.name}}</td>
                    <td>{{item.basePort}}</td>
                    <td>{{item.socketsBufferSize}}</td>
                    <td>{{item.socketsFlushInterval}}</td>
                    <td>{{item.socketsCompressed}}</td>
                    <td>{{item.dynamicCluster}}</td>
                    <td>
                        <button type="submit" class="btn btn-primary" @click="update(item)">修改</button>
                        <button type="submit" class="btn btn-info" @click="cluster(item)">配置子节点</button>
                        <button type="submit" class="btn btn-danger" @click="deleteRow(item)">删除</button>
                    </td>
                  </tr>
                  </tbody>
                  <pagination :records="pagination.total" :per-page="pagination.size" v-model="pagination.page" @paginate="getList"></pagination>
                </table>
                <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">添加集群</h4>
                      </div>
                        <div class="box-body">
                          <div class="form-group">
                            <label for="name">集群名</label>
                            <input type="text" class="form-control" v-model="item.name" id="name" placeholder="请输入节点名">
                          </div>
                          <div class="form-group">
                            <label >端口</label>
                            <input type="text" class="form-control"  v-model="item.basePort" placeholder="请输入端口号">
                          </div>
                          <div class="form-group">
                            <label >sockets 缓存大小	</label>
                            <input type="text" class="form-control" id="port" v-model="item.socketsBufferSize" placeholder="请输入sockets 缓存大小">
                          </div>
                          <div class="form-group">
                            <label >socket 刷新间隔	</label>
                            <input type="text" class="form-control" v-model="item.socketsFlushInterval" placeholder="请输入socket 刷新间隔	">
                          </div>
                          <div class="form-group">
                            <label >是否压缩	</label>
                            <select style="width:100%;height:34px" v-model="item.socketsCompressed" >
                              <option :value="item.key" v-for="item in types" >{{item.value}}</option>
                            </select>
                          </div>
                          <div class="form-group">
                            <label >是否是Dynamic Cluster</label>
                            <select style="width:100%;height:34px" v-model="item.dynamicCluster" >
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
                <div class="modal fade" id="clusterModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" >添加节点</h4>
                      </div>
                      <div class="box-body">
                        <div class="form-group">
                          <button  class="form-control mybutton btn btn-danger " @click="addList" style="width:100px">新增节点</button>
                          <button  class="form-control mybutton btn btn-primary " @click="initTableData" style="width:150px">一键生成节点</button>
                        </div>
                        <table class="table table-bordered"  >
                          <thead>
                          <tr>
                            <th>节点名称</th>
                            <th >操作</th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr v-for="(list,index) in tableData">
                            <td>
                              <select  v-model="list.idSlave" class="form-control select2 select2-hidden-accessible">
                                <option v-for="list in  nodes"  :key="list.idSlave" :label="list.name" :value="list.idSlave"></option>
                              </select>
                            </td>
                            <td>
                              <button type="button" class="btn btn-info" @click="handleDelete(index, list)">删除</button>
                            </td>

                          </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="box-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary" @click="submitCluster()">提交</button>
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
        basePort:null,
        socketsBufferSize:null,
        socketsFlushInterval:null,
        socketsCompressed:null,
        dynamicCluster:null,
        idCluster:null
      },
      search: '',
      tableData: [],
      lists: [],
      nodes:[],
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
      this.item.idCluster=null
      this.item.name=null,
      this.item.basePort=null,
      this.item.socketsBufferSize=null,
      this.item.socketsFlushInterval=null,
      this.item.socketsCompressed=null,
      this.item.dynamicCluster=null
      $('#myModal').modal('show');
    },
    submitCluster(){
      let params=new Object();
      params.slaves=this.tableData;
      params.clusterId=this.item.idCluster;
      debugger;
      this.$api.rClusterSlaveSave( params,res => {
          if (res.code === 200) {
            this.$alert('操作成功');
            this.getList()
            $('#clusterModal').modal('hide');
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
    cluster(item){
      this.item.idCluster=item.idCluster;
      $('#clusterModal').modal('show');
    },
    addList() {
      debugger;
      let obj = {}
      this.tableData.push(obj)
    },
    handleDelete(index) {
      this.tableData.splice(index, 1)
    },
    submitForm() {
      if(null==this.item.name||''==this.item.name){
        this.$alert('集群名称不能为空');
        return;
      }
      if(null==this.item.basePort||''==this.item.basePort){
        this.$alert('端口不能为空');
        return;
      }
      if(null==this.item.socketsBufferSize||''==this.item.socketsBufferSize){
        this.$alert('socket缓存大小');
        return;
      }
      if(null==this.item.socketsFlushInterval||''==this.item.socketsFlushInterval){
        this.$alert('socket刷新间隔不能为空');
        return;
      }
      if(null==this.item.socketsCompressed){
        this.$alert('是否是压缩必填');
        return;
      }
      if(null==this.item.dynamicCluster){
        this.$alert('是否是动态节点');
        return;
      }
      let params = {
        name: this.item.name,
        basePort: this.item.basePort,
        socketsBufferSize: this.item.socketsBufferSize,
        socketsFlushInterval: this.item.socketsFlushInterval,
        socketsCompressed: this.item.socketsCompressed,
        dynamicCluster: this.item.dynamicCluster,
        idCluster: this.item.idCluster
      }
      this.$api.clusterSave( params,res => {
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
      this.$api.clusterFindAll( option ,res=> {
          if (res.code === 200) {
            that.lists = res.data.content
            that.pagination.total = res.data.totalElements
          }
        })
    },
    initNodes() {
      let option=new Object();
      let that=this;
      this.$api.findNode( option ,res=> {
        if (res.code === 200) {
          that.nodes = res.data;
        }
      })
    },
    initTableData() {
      let option=new Object();
      option.idCluster=this.item.idCluster
      let that=this;
      this.$api.findNode( option ,res=> {
        if (res.code === 200) {
          that.tableData = res.data;
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
        idCluster: item.idCluster
      }
      this.$confirm('确认删除?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          this.$api.clusterDelete(param,res => {
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
    this.initNodes();
  },
  watch: {
    $route(to,from) {
      this.getList()
    }
  }
}
</script>


