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
          <li><a href="#">采集数据</a></li>
          <li class="active">Spark同步数据采集</li>
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
                    <th>采集名称</th>
                    <th>源数据库</th>
                    <th>存储数据库</th>
                    <th>来源表名</th>
                    <th>存储表名</th>
                    <th>备注</th>
                    <th>操作</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(item)  in tableData">
                    <td>{{item.jobName}}</td>
                    <td v-html="item.sourceText"></td>
                    <td v-html="item.toText"></td>
                    <td >{{item.sourceTable}}</td>
                    <td >{{item.toTable}}</td>
                    <td >{{item.mark}}</td>
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
                        <h4 class="modal-title" id="myModalLabel">数据采集</h4>
                      </div>
                      <div class="box-body">
                        <div class="form-group">
                          <label for="name">采集名称</label>
                          <input type="text" class="form-control" v-model="item.jobName" id="name" placeholder="请输入采集名称">
                        </div>
                        <div class="form-group">
                          <label >数据来源库</label>
                          <select style="width:100%;height:34px" v-model="item.sourceId" >
                           <option :value="item.id" v-for="item in databaseList" >{{item.name}}</option>
                          </select>
                        </div>
                        <div class="form-group">
                          <label >数据存储库</label>
                          <select style="width:100%;height:34px" v-model="item.toId" >
                            <option :value="item.id" v-for="item in databaseList" >{{item.name}}</option>
                          </select>
                        </div>
                        <div class="form-group">
                          <label for="sourceTable">来源表名称</label>
                          <input type="text" class="form-control" id="sourceTable" v-model="item.sourceTable" placeholder="请输入来源表名称">
                        </div>
                        <div class="form-group">
                          <label for="toTable">存储表名称</label>
                          <input type="text" class="form-control" id="toTable" v-model="item.toTable" placeholder="请输入存储表名称">
                        </div>
                        <div class="form-group">
                          <label for="mark">备注</label>
                          <input type="text" class="form-control" id="mark" v-model="item.mark" placeholder="请输入备注">
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
    name: 'Dash',
    components: {
      DashFooter,
      DashHeader,
      Sidebar
    },
    data() {
      return {
        item: {
          id: null,
          sourceId: null,
          jobName: null,
          sourceTable: null,
          toTable: null,
          toId: null,
          mark: null,
          status: null
        },
        statusOption: [
          {'key': '1', 'value': '有效'},
          {'key': '0', 'value': '无效'}
        ],
        search: '',
        tableData: [],
        databaseList: [],
        pagination: {
          total: 0,
          page: 1,
          size: 10
        }
      }
    },
    methods: {
      add() {
        this.item.id = null,
          this.item.sourceId = null,
          this.item.jobName = null,
          this.item.sourceTable = null,
          this.item.toTable = null,
          this.item.toId = null,
          this.item.mark = null,
          this.item.status = null
        $('#myModal').modal('show')
      },
      submitForm() {
        if (this.item.sourceId == null) {
          this.$alert('先选择数据源')
          return
        }
        if (this.item.jobName == null) {
          this.$alert('采集名称必须填写')
          return
        }
        if (this.item.sourceTable == null) {
          this.$alert('来源表必须填写')
          return
        }
        if (this.item.toTable == null) {
          this.$alert('存储表必须填写')
          return
        }
        if (this.item.toId == null) {
          this.$alert('先选择存储数据库')
          return
        }
        if (this.item.mark == null) {
          this.$alert('备注必填')
          return
        }
        let params = {
          sourceId: this.item.sourceId,
          jobName: this.item.jobName,
          sourceTable: this.item.sourceTable,
          toTable: this.item.toTable,
          toId: this.item.toId,
          mark: this.item.mark,
          status: 1,
          id: this.item.id ? this.item.id : null
        }
        let that = this
        this.$api.getGatherSave(params,res => {
          if (res.code === 200) {
            that.$alert(res.message)
            that.pagination.page = 1
            that.getList()
            $('#myModal').modal('hide')
          } else {
            that.$alert('新增失败')
          }
        })
      },
      getAllCollection() {
        let that = this
          let param=new Object();
        this.$api.getListAllDatabase(param,res => {
          if (res.code === 200) {
            that.databaseList = res.data
          }
        })
      },
      getList() {
        let option = new Object()
        option.size = this.pagination.size
        option.page = this.pagination.page
        option.name = this.search ? this.search : null
        let that = this
        this.$api
          .getGatherList( option,res => {
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
      update(item) {
        $('#myModal').modal('show')
        this.item = item
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
          this.$api.getGatherDelete( param,res => {
              if (res.code === 200) {
                this.$alert(res.message)
                this.pagination.page = 1
                this.getList()
              } else {
                this.$alert(res.message)
              }
            })
        }).catch(() => {
        })
      }
    },
    created() {
      this.getList()
      this.getAllCollection()
    },
    watch: {
      $route(to, from) {
        this.getCollectionDataList({})
      }
    }
  }
</script>

<style>
  .wrapper.fixed_layout .main-header {
    position: fixed;
    width: 100%;
  }
  .wrapper.fixed_layout .content-wrapper {
    padding-top: 50px;
  }
  .wrapper.fixed_layout .main-sidebar {
    position: fixed;
    height: 100vh;
  }

  @media (max-width: 767px) {
    .wrapper.hide_logo .main-header .logo {
      display: none;
    }
  }

  .logo-mini,
  .logo-lg {
    text-align: left;
  }
  .logo-mini img,
  .logo-lg img {
    padding: 0.4em !important;
  }

  .logo-lg img {
    display: -webkit-inline-box;
    width: 25%;
  }

  .user-panel {
    height: 4em;
  }

  hr.visible-xs-block {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.17);
    height: 1px;
    border-color: transparent;
  }


</style>








<style >

</style>
