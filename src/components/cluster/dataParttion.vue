<template>
  <div >
    <dash-header ></dash-header>
    <sidebar />
    <div class="content-wrapper" >
      <section class="content-header">
        <h1>
          集群管理
          <small>数据分区</small>
        </h1>
        <ol class="breadcrumb">
          <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
          <li><a href="#">集群管理</a></li>
          <li class="active">数据分区</li>
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
                <div><button class="btn btn-primary" @click="add()" style="width: 100px;">新增分区</button></div>
                <table id="example1" class="table table-bordered table-striped">
                  <thead>
                  <tr>
                    <th>分区名称</th>
                    <th>是否动态创建分区</th>
                    <th>每台slave server分区数</th>
                    <th>操作</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(item)  in lists">
                    <td>{{item.name}}</td>
                    <td>{{item.dynamicDefinition}}</td>
                    <td>{{item.partitionsPerSlave}}</td>
                    <td>
                        <button type="submit" class="btn btn-primary" @click="update(item)">修改</button>
                        <button type="submit" class="btn btn-info" @click="cluster(item)">配置分区</button>
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
                        <h4 class="modal-title" id="myModalLabel">添加分区</h4>
                      </div>
                        <div class="box-body">
                          <div class="form-group">
                            <label for="name">分区名称</label>
                            <input type="text" class="form-control" v-model="item.name" id="name" placeholder="请输入分区名称">
                          </div>
                          <div class="form-group">
                            <label >是否动态创建分区	</label>
                            <select style="width:100%;height:34px" v-model="item.dynamicDefinition" >
                              <option :value="item.key" v-for="item in types" >{{item.value}}</option>
                            </select>
                          </div>
                          <div class="form-group">
                            <label >每台slave server分区数		</label>
                            <input type="text" class="form-control" id="port" v-model="item.partitionsPerSlave" placeholder="请输入每台slave server分区数">
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
                        <h4 class="modal-title" >添加分区</h4>
                      </div>
                      <div class="box-body">
                        <div class="form-group">
                          <button  class="form-control mybutton btn btn-danger " @click="addList" style="width:100px">新增分区</button>
                        </div>
                        <table class="table table-bordered"  >
                          <thead>
                          <tr>
                            <th>分区#</th>
                            <th >操作</th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr v-for="(list,index) in tableData">
                            <td>
                              <input type="text" class="form-control" v-model="list.partitionId" placeholder="请输入分区id">
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
                        <button type="button" class="btn btn-primary" @click="submitPartition()">提交</button>
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
        dynamicDefinition:null,
        partitionsPerSlave:null,
        idPartitionSchema:null
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
      this.item.idPartition=null
      this.item.name=null,
      this.item.dynamicDefinition=null,
      this.item.partitionsPerSlave=null,
      this.item.idPartitionSchema=null
      $('#myModal').modal('show');
    },
    submitPartition(){
      let params=new Object();
      params.partition=this.tableData;
      params.idPartitionSchema=this.item.idPartitionSchema;
      debugger;
      this.$api.getSavePartition( params,res => {
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
        this.item=item;
        let option=new Object();
        option.idPartitionSchema=this.item.idPartitionSchema
        let that=this;
        this.$api.getPartition( option ,res=> {
          if (res.code === 200) {
            that.tableData = res.data
          }
        })
      $('#clusterModal').modal('show');
    },
    addList() {
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
      if(null==this.item.dynamicDefinition){
        this.$alert('是否动态创建分区不能为空');
        return;
      }
      if(null==this.item.partitionsPerSlave||''==this.item.partitionsPerSlave){
        this.$alert('每台slave server分区数不能为空');
        return;
      }
      let params = {
        name: this.item.name,
        dynamicDefinition: this.item.dynamicDefinition,
        partitionsPerSlave: this.item.partitionsPerSlave,
        idPartitionSchema: this.item.idPartitionSchema
      }
      this.$api.partitionSave( params,res => {
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
      this.$api.partitionList( option ,res=> {
          if (res.code === 200) {
            that.lists = res.data.content
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
        idPartitionSchema: item.idPartitionSchema
      }
      this.$confirm('确认删除?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          this.$api.partitionDelete(param,res => {
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


