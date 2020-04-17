<template>
  <div >
    <dash-header ></dash-header>
    <sidebar />
    <div class="content-wrapper" >
      <section class="content-header">
        <h1>
          采集数据
          <small>数据同步</small>
        </h1>
        <ol class="breadcrumb">
          <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
          <li><a href="#">采集数据</a></li>
          <li class="active">数据同步</li>
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
                    <th>数据同步名称</th>
                    <th>源数据库</th>
                    <th>目标数据库</th>
                    <th>操作</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(item)  in tableData">
                    <td>{{item.name}}</td>
                    <td v-html="item.sourceText"></td>
                    <td v-html="item.targetText"></td>
                    <td>
                      <button type="submit" class="btn btn-primary" @click="update(item)">修改</button>
                      <button type="submit" class="btn btn-danger" @click="deleteRow(item)">删除</button>
                      <button type="submit" class="btn btn-warning" @click="sync(item)">同步</button>
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
                        <h4 class="modal-title" id="myModalLabel">数据同步</h4>
                      </div>
                      <div class="box-body">
                        <div class="form-group">
                          <label for="name">同步名称</label>
                          <input type="text" class="form-control" v-model="item.name" id="name" placeholder="请输入同步名称">
                        </div>
                        <div class="form-group">
                          <label >原始库</label>
                          <select style="width:100%;height:34px" v-model="item.source" >
                           <option :value="item.id" v-for="item in databaseList" >{{item.name}}</option>
                          </select>
                        </div>
                        <div class="form-group">
                          <label >目标库</label>
                          <select style="width:100%;height:34px" v-model="item.target" >
                            <option :value="item.id" v-for="item in databaseList" >{{item.name}}</option>
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
                <div class="modal fade" id="syncData" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" >数据同步</h4>
                      </div>
                      <div class="form-group">
                        <label >是否带有schema前缀</label>
                        <select style="width:100%;height:34px" v-model="item.schemaOption" >
                          <option :value="item.key" v-for="item in schema" >{{item.value}}</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <label >包含表数据(是：包括，否不包括)</label>
                        <select style="width:100%;height:34px" v-model="item.dataFlag" >
                          <option :value="item.key" v-for="item in schema" >{{item.value}}</option>
                        </select>
                      </div>

                      <div class="container">
                        <h1>同步表名</h1>
                        <br/>
                        <div class="row">
                          <div class="col-sm-12">
                            <label for="treeview"></label>
                            <div id="treeview" style="width: 500px;"/>
                          </div>
                        </div>
                      </div>
                      <div class="box-footer">
                        <button type="button" class="btn btn-primary" @click="getTableNames()">获取表名</button>
                        <button type="button" class="btn btn-danger" @click="syncData()">同步</button>
                        <button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>

                      </div>
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
          name: null,
          source: null,
          target: null
        },
        schema: [
          {'key': true, 'value': '是'},
          {'key': false, 'value': '否'}
        ],
        search: '',
        tableData: [],
        databaseList: [],
        tables:[],
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
          this.item.name = null,
          this.item.source = null,
          this.item.target = null
          this.item.schemaOption = null
        $('#myModal').modal('show')
      },
      sync(item){
        this.item=item;
        $('#syncData').modal('show')

      },
      getTableNames(){
        if (this.item.source == null) {
          this.$alert('先选择原始数据库')
          return
        }
        if (this.item.schemaOption == null) {
          this.$alert('请确定是否需要加schema前缀')
          return
        }
        let params = {
          source: this.item.source,
          schema: this.item.schemaOption,
        }
        let that = this
        this.$api.getTableNames(params,res => {
          that.treeData=res.data.treeViews;
          that.tables=res.data.tables;
          var options = {
            bootstrap2: false,
            showTags: true,
            levels: 1,
            data: that.treeData,
            multiSelect:false,
            showCheckbox:true,
            selectedColor:'#fff',
            hierarchicalCheck:true,
            onNodeChecked: function(event, node){
              debugger;
              that.tables.push(node.text);
            },
            onNodeUnchecked:function(event, node){
              debugger;
              that.tables.splice(that.tables.indexOf(node.text),1);
            }
          };
          $('#treeview').treeview(options);
        })
      },
      syncData(){
        if(0==this.tables.length){
          this.$alert('请获取需要同步的表名称')
          return;
        }
        this.$confirm('确定要同步?', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let param=new Object();

          if (this.item.source == null) {
            this.$alert('原始库异常')
            return
          }
          if (this.item.target == null) {
            this.$alert('目标库异常')
            return
          }
          if (this.item.dataFlag == null) {
            this.$alert('请确认是否只是同步表结构')
            return
          }
          let tables=this.tables.join(",");
          param.tables=tables;
          param.sourceId=this.item.source;
          param.targetId=this.item.target;
          param.dataFlag=this.item.dataFlag;
          this.$toast("同步可能需要很长时间,同步后请仔细核对");
          let that = this
          this.$api.transfer(param,res => {
            if (res.code === 200) {
              that.$alert("同步成功")
              $('#myModal').modal('hide')
            } else {
              that.$alert('同步失败')
            }
          })

        })

      },
      submitForm() {
        if (this.item.name == null) {
          this.$alert('同步名称必填')
          return
        }
        if (this.item.source == null) {
          this.$alert('先选择原始数据库')
          return
        }
        if (this.item.target == null) {
          this.$alert('先选择目标数据库')
          return
        }
        let params = {
          name: this.item.name,
          source: this.item.source,
          target: this.item.target,
          id: this.item.id ? this.item.id : null
        }
        let that = this
        this.$api.getSyncJobSCreateOrUpdate(params,res => {
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
          .syncList( option,res => {
            if (res.code === 200) {
              that.tableData = res.data.list
              that.pagination.total = res.data.total
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
          this.$api.synDelete( param,res => {
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
