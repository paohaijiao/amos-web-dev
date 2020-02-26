<template>
  <div >
    <dash-header ></dash-header>
    <sidebar />
    <div class="content-wrapper">
      <section class="content-header">
        <h1>
          数据服务
          <small>列表</small>
        </h1>
        <ol class="breadcrumb">
          <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
          <li><a href="#">数据服务</a></li>
          <li class="active">接口维护</li>
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
                <div><button class="btn btn-primary" data-toggle="modal" data-target="#myModal" style="width: 100px;">接口申请</button></div>
                <table id="example1" class="table table-bordered table-striped">
                  <thead>
                  <tr>
                    <th>序列</th>
                    <th>接口编码</th>
                    <th>数据源id</th>
                    <th>sql</th>
                    <th>创建人</th>
                    <th>创建时间</th>
                    <th>修改人</th>
                    <th>修改时间</th>
                    <th>操作</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(item)  in tableData">
                    <td>{{item.id}}</td>
                    <td>{{item.interfaceCode}}</td>
                    <td >{{item.dataSourceId}}</td>
                    <td>{{item.sql}}</td>
                    <td >{{item.createBy}}</td>
                    <td >{{item.dateCreated | formatDate}}</td>
                    <td >{{item.updateBy}}</td>
                    <td >{{item.dateUpdated | formatDate}}</td>
                    <td><button type="submit" class="btn btn-primary" @click="update(item)">修改</button></td>
                  </tr>
                  </tbody>
                  <pagination :records="pagination.total" :per-page="pagination.size" v-model="pagination.page" @paginate="getList"></pagination>
                </table>
                <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">接口维护</h4>
                      </div>
                      <div class="form-group has-feedback">
                        <label>接口编码：</label>
                        <input type="text" class="form-control" placeholder="请输入接口编码"  v-model="item.interfaceCode">
                        <span class="glyphicon glyphicon-fire form-control-feedback"></span>
                      </div>
                      <div class="form-group has-feedback">
                        <label>数据源</label>
                        <select  style="width:100%;height:34px" v-model="item.dataSourceId">
                          <option :value="item1.id" v-for="item1 in connections" >{{item1.name}}</option>
                        </select>
                      </div>
                      <div class="form-group has-feedback">
                        <label>SQL语句</label>
                        <input type="text" class="form-control" placeholder="请输入SQL语句"  v-model="item.sql" >
                        <span class="glyphicon glyphicon-eye-close form-control-feedback"></span>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary" @click="submitForm()">提交更改</button>
                      </div>
                    </div><!-- /.modal-content -->
                  </div><!-- /.modal -->
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
  name: 'apply',
  props: {},
  components: {
    DashFooter,
    DashHeader,
    Sidebar
  },
  data() {
    return {
      item:{
        interfaceCode:null,
        sql:null,
        datasource_id:null
      },
      connections:[],
      search: '',
      tableData: [],
      pagination: {
        total:0,
        page:1,
        size:10
      }
    }
  },
  methods: {
    submitForm(){
      if (this.item.interfaceCode === null) {
        this.$alert('interfaceCode 不能为空')
        return
      }
      if (this.item.dataSourceId ===null) {
        this.$alert('先选择数据源')
        return
      }
      if (this.item.sql === null) {
        this.$alert('sql 不能为空')
        return
      }
      let param = {
        id:this.item.id,
        interfaceCode: this.item.interfaceCode,
        dataSourceId: this.item.dataSourceId,
        sql: this.item.sql
      }
      let that=this;
      this.$api.getSaveInterfaceMaintain(param,res => {
          if (res.code === 200) {
            this.$alert('保存成功')
            that.getList();
            $('#myModal').modal('hide')
          } else {
            this.$alert('保存失败')
          }
        })
    },
    update(item){
      this.item=item;
      $('#myModal').modal('show')
    },
    initConneection(){
        let param=new Object();
      this.$api.getListAllDatabaseNotPage(param,res => {
        if (res.code === 200) {
          this.connections = res.data
        }
      })
    },
    getList() {
      let option=new Object();
      option.size=this.pagination.size;
      option.page=this.pagination.page;
      option.name=this.search ? this.search : null;
      let that=this;
      this.$api.getInterfaceMaintainList(option,res => {
          if (res.code === 200) {
            debugger;
            that.tableData = res.data.content
            that.pagination.total = res.data.totalElements
          }else{
            this.$alert(res.message);
          }
        })
    },
    doDelete(id) {
      let param = {
        id: id
      }
      this.$axios
        .post('/api/interfaceMaintain/deleteInterfaceMaintain', param, {
          type: 'json'
        })
        .then(res => {
          if (res.data.code === 200) {
            this.$message({
              message: res.data.message,
              type: 'success',
              duration: 1000,
              onClose: () => {
                let searchText = this.search ? this.search : null
                this.getList(searchText, this.pagingTerm.currentPage)
              }
            })
          } else {
            this.$message({
              message: res.data.message,
              type: 'error',
              duration: 1000
            })
          }
        })
    }


  },
  created() {
    this.getList()
    this.initConneection()
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
