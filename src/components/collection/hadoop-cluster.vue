<template>
  <div >
    <dash-header ></dash-header>
    <sidebar />
    <div class="content-wrapper" >
      <section class="content-header">
        <h1>
          采集数据
          <small>列表</small>
        </h1>
        <ol class="breadcrumb">
          <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
          <li><a href="#">大数据集群信息管理</a></li>
          <li class="active">集群定义列表</li>
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
                <div></div>
                <table id="example1" class="table table-bordered table-striped">
                  <thead>
                  <tr>
                    <th>名称</th>
                    <th>storageScheme</th>
                    <th>hdfs主机</th>
                    <th>hdfs端口</th>
                    <th>hdfs用户名</th>
                    <th>hdfs密码</th>
                    <th>jobTracker主机</th>
                    <th>jobTracker端口</th>
                    <th>zooKeeper主机</th>
                    <th>zooKeeper端口</th>
                    <th>oozieUrl</th>
                    <th>mapr</th>
                    <th>kafkaBootstrapServers</th>
                    <th>操作</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(item)  in tableData">
                    <td>{{item.name}}</td>
                    <td>{{item.storageScheme}}</td>
                    <td>{{item.hdfsHost}}</td>
                    <td >{{item.hdfsPort}}</td>
                    <td>{{item.hdfsUsername}}</td>
                    <td >{{item.hdfsPassword}}</td>
                    <td >{{item.jobTrackerHost}}</td>
                    <td >{{item.jobTrackerPort}}</td>
                    <td >{{item.zooKeeperHost}}</td>
                    <td>{{item.zooKeeperPort}}</td>
                    <td>{{item.oozieUrl}}</td>
                    <td>{{item.mapr}}</td>
                    <td>{{item.kafkaBootstrapServers}}</td>
                    <td><button type="submit" class="btn btn-primary" @click="update(item)">查看</button></td>
                  </tr>
                  </tbody>
                  <pagination :records="pagination.total" :per-page="pagination.size" v-model="pagination.page" @paginate="getList"></pagination>
                </table>
                <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">大数据节点</h4>
                      </div>
                      <div class="box-body">
                        <div class="form-group">
                          <label >名称</label>
                          <input type="text" class="form-control" v-model="item.name"  placeholder="请输入名称">
                        </div>
                        <div class="form-group">
                          <label for="name">storageScheme</label>
                          <input type="text" class="form-control" v-model="item.storageScheme" id="name" placeholder="请输入storageScheme">
                        </div>
                        <div class="form-group">
                          <label >hdfs主机名</label>
                          <input type="text" class="form-control" v-model="item.hdfsHost"  placeholder="请输入hdfs主机名">
                        </div>
                        <div class="form-group">
                          <label >hdfs端口</label>
                          <input type="text" class="form-control" v-model="item.hdfsPort"  placeholder="请输入hdfs端口">
                        </div>
                        <div class="form-group">
                          <label >hdfs用户名</label>
                          <input type="text" class="form-control" v-model="item.hdfsUsername"  placeholder="请输入hdfs用户名">
                        </div>
                        <div class="form-group">
                          <label >hdfs密码</label>
                          <input type="text" class="form-control" v-model="item.hdfsPassword"  placeholder="请输入hdfs密码">
                        </div>
                        <div class="form-group">
                          <label >jobTracker主机名</label>
                          <input type="text" class="form-control" v-model="item.jobTrackerHost"  placeholder="请输入jobTracker主机名">
                        </div>
                        <div class="form-group">
                          <label >jobTracker端口</label>
                          <input type="text" class="form-control" v-model="item.jobTrackerPort"  placeholder="请输入jobTracker端口">
                        </div>
                        <div class="form-group">
                          <label >zooKeeper主机名</label>
                          <input type="text" class="form-control" v-model="item.zooKeeperHost"  placeholder="请输入zooKeeper主机名">
                        </div>
                        <div class="form-group">
                          <label >zooKeeper端口</label>
                          <input type="text" class="form-control" v-model="item.zooKeeperPort"  placeholder="请输入zooKeeper端口">
                        </div>
                        <div class="form-group">
                          <label >oozieUrl</label>
                          <input type="text" class="form-control" v-model="item.oozieUrl"  placeholder="请输入oozieUrl">
                        </div>
                        <div class="form-group">
                          <label >mapr</label>
                          <select style="width:100%;height:34px" v-model="item.mapr" >
                            <option :value="item.key" v-for="item in maprList" >{{item.value}}</option>
                          </select>
                        </div>
                        <div class="form-group">
                          <label >kafkaBootstrapServers</label>
                          <input type="text" class="form-control" v-model="item.kafkaBootstrapServers"  placeholder="请输入kafkaBootstrapServers">
                        </div>
                      </div>
                      <div class="box-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
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
  components: {
    DashFooter,
    DashHeader,
    Sidebar
  },
  data() {
    return {
      item:{
        name:null,
        storageScheme:null,
        hdfsHost:null,
        hdfsPort:null,
        hdfsUsername:null,
        hdfsPassword:null,
        jobTrackerHost:null,
        jobTrackerPort:null,
        zooKeeperHost:null,
        zooKeeperPort:null,
        oozieUrl:null,
        mapr:null,
        kafkaBootstrapServers:null,
      },
      search: '',
      tableData: [],
      maprList: [
        {key: 'N', value: 'N'},
        {key: 'Y', value: 'Y'}
      ],
      pagination: {
        total:0,
        page:1,
        size:10
      }
    }
  },
  methods: {
    add(){
      this.item.name=null;
      this.item.storageScheme=null;
      this.item.hdfsHost=null;
      this.item.hdfsPort=null;
      this.item.hdfsUsername=null;
      this.item.hdfsPassword=null;
      this.item.jobTrackerHost=null;
      this.item.jobTrackerPort=null;
      this.item.zooKeeperHost=null;
      this.item.zooKeeperPort=null;
      this.item.oozieUrl=null;
      this.item.mapr=null;
      this.item.kafkaBootstrapServers=null;
      this.item.id=null;
      $('#myModal').modal('show')
    },
    submitForm(){
      if(null==this.item.name){
        this.$alert('请填写名称');
        return;
      }
      if(null==this.item.storageScheme){
        this.$alert('请填写storageScheme');
        return;
      }
      if(null==this.item.hdfsHost){
        this.$alert('请填写hdfs主机名');
        return;
      }
      if(null==this.item.hdfsPort){
        this.$alert('请填写hdfs端口');
        return;
      }
      if(null==this.item.hdfsUsername){
        this.$alert('请填写hdfs用户名');
        return;
      }
      if(null==this.item.hdfsPassword){
        this.$alert('请填写hdfs密码');
        return;
      }
      if(null==this.item.jobTrackerHost){
        this.$alert('请填写jobTracker主机名');
        return;
      }
      if(null==this.item.jobTrackerPort){
        this.$alert('请填写jobTracker端口');
        return;
      }
      if(null==this.item.zooKeeperHost){
        this.$alert('请填写zooKeeper主机');
        return;
      }
      if(null==this.item.zooKeeperPort){
        this.$alert('请填写zooKeeper端口');
        return;
      }
      if(null==this.item.oozieUrl){
        this.$alert('请填写oozieUrl');
        return;
      }
      if(null==this.item.mapr){
        this.$alert('请选择mapr');
        return;
      }
      if(null==this.item.kafkaBootstrapServers){
        this.$alert('请填写kafkaBootstrapServers');
        return;
      }
      let params = {
        name: this.item.name,
        storageScheme: this.item.storageScheme,
        hdfsHost: this.item.hdfsHost,
        hdfsPort: this.item.hdfsPort,
        hdfsUsername: this.item.hdfsUsername,
        hdfsPassword: this.item.hdfsPassword,
        jobTrackerHost: this.item.jobTrackerHost,
        jobTrackerPort: this.item.jobTrackerPort,
        zooKeeperHost: this.item.zooKeeperHost,
        zooKeeperPort: this.item.zooKeeperPort,
        oozieUrl: this.item.oozieUrl,
        mapr: this.item.mapr,
        kafkaBootstrapServers: this.item.kafkaBootstrapServers,
        id: this.item.id ?this.item.id : null
      }
      if(null!=this.item.id){
          params.id=this.item.id;
      }
      this.$api
        .getMakeHadoopCluster(params,res => {
          if (res.code === 200) {
            this.$alert(res.message);
            this.getList();
            $('#myModal').modal('hide')
          }
        })
    },
    update(item){
      $('#myModal').modal('show')
      this.item=item;
    },
    getList() {
      let option=new Object();
      option.size=this.pagination.size;
      option.page=this.pagination.page;
      option.name=this.search ? this.search : null;
      let that=this;
      this.$api
        .getHadoopCluster(option,res => {
          if (res.code === 200) {
            that.tableData = res.data.content
            that.pagination.total = res.data.totalElements
          }
        })
    },
    searchList() {
      this.currentPage = 1
      this.getList()
    },
    currentChange(page) {
      this.getList({
        name: this.search ? this.search : null,
        page: page - 1
      })
    }
  },
  created() {
    this.getList({})
  },
  watch: {
    $route(to,from) {
      this.getList({})
    }
  }
}
</script>
