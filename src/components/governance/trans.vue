<template>
  <div >
    <dash-header ></dash-header>
    <sidebar />
    <div class="content-wrapper" >
      <section class="content-header">
        <h1>
          数据治理
          <small>列表</small>
        </h1>
        <ol class="breadcrumb">
          <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
          <li><a href="#">数据治理</a></li>
          <li class="active">转换列表</li>
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
                <div class="row" style="display: flex;">

                  <label style="line-height: 35px;font-size:19px;margin-left:13px">转换名:</label>
                  <input  type="text" class="form-control"   style="width:250px" v-model="search" placeholder="请输入转换名称">

                  <label for="user" style="line-height: 35px;font-size:19px;"> 创建人:</label>
                  <input id="user" type="text" class="form-control"   style="width:250px" v-model="modifiedUser" placeholder="请输入操作人">

                  <button class="btn btn-primary" data-toggle="modal" @click="add()" style="width: 100px;margin-left: 50px;height: 35px;">新增</button>
                  <button class="btn btn-primary" @click="getList()" style="width: 100px;margin-left: 50px;height: 35px;">查询</button>
                </div>
                <table  class="table table-bordered table-striped">
                  <thead>
                  <tr>
                    <th>id</th>
                    <th>转换名称</th>
                    <th>描述</th>
                    <th>转换状态</th>
                    <th>是否支持事务</th>
                    <th>创建人</th>
                    <th>创建时间</th>
                    <th>操作</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(item)  in tableData">
                    <td>{{item.id}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.description}}</td>
                    <td>{{item.transStatus}}</td>
                    <td>{{item.transation}}</td>
                    <td>{{item.modifiedUser}}</td>
                    <td>{{item.createdDate|formatDate}}</td>
                    <td>
                        <button type="submit" class="btn btn-primary" @click="detail(item.id)">修改</button>
                        <button type="submit" class="btn btn-warning" @click="changeDirectory(item)">数据目录</button>
                        <button type="submit" class="btn  btn-info" @click="openTransation(item)">修改事务</button>
                        <button type="submit" class="btn btn-danger" @click="deleteRow(item)">删除</button>
                        <button type="submit" class="btn btn-success" @click="exploreMeta(item)">探索元数据</button>
                    </td>
                  </tr>
                  </tbody>
                  <pagination :records="pagination.total" :per-page="pagination.size" v-model="pagination.page" @paginate="getList"></pagination>
                </table>
              </div>
            </div>
          </div>

        </div>

        <div class="modal fade" id="transaction" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">修改事务</h4>
              </div>
              <div class="form-group">
                <label >支持事务</label>
                <select style="width:100%;height:34px" v-model="valueStr" >
                  <option :value="item.key" v-for="item in option" >{{item.value}}</option>
                </select>
              </div>
              <div class="box-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" @click="submitTransation()">提交</button>
              </div>
              <div class="modal-footer">

              </div>
            </div>
          </div>
        </div>
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">变更挂载点</h4>
              </div>
              <div class="container">
                <h1>节点列表</h1>
                <br/>
                <div class="row">
                  <div class="col-sm-12">
                    <label for="treeview"></label>
                    <div id="treeview"/>
                  </div>
                </div>
              </div>
              <div class="box-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">关闭</button>

              </div>
              <div class="modal-footer">

              </div>
            </div>
          </div>
        </div>
        <div class="modal fade" id="meta" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">探索元数据</h4>
              </div>
              <table  class="table table-bordered table-striped">
                <thead>
                <tr>
                  <th>转换/作业</th>
                  <th>步骤/数据库连接/注释</th>
                  <th>字符串</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item  in tableList">
                  <td>{{item[0]}}</td>
                  <td>{{item[1]}}</td>
                  <td>{{item[2]}}</td>
                </tr>
                </tbody>
              </table>
              <div class="box-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">关闭</button>
              </div>
              <div class="modal-footer">

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
  name: 'menus',
  props: {},
  components: {DashHeader,DashFooter,Sidebar},
  data() {
    return {
      search: null,
      modifiedUser: null,
      valueStr:null,
      item:{id:null},
      tableData: [],
      tableList:[],
      option:[{"key":"N","value":"否"},{"key":"Y","value":"是"}],
      pagination: {
            total:0,
            page:1,
            size:10
        }
    }
  },
  methods: {
    getList() {
        let option=new Object();
        option.size=this.pagination.size;
        option.page=this.pagination.page;
        option.name=this.search ? this.search : null;
        option.modifiedUser=this.search ? this.modifiedUser : null;
        let that =this;
      this.$api.getTransList( option,res=> {
          if (res.code === 200) {
              that.tableData = res.data.list
              that.pagination.total = res.data.total
          } else{
              this.$alert(res.message);
          }
        })
    },
      exploreMeta(item) {
          $('#meta').modal('show')
          let option=new Object();
          option.transName=item.name;

          let that =this;
          this.$api.exploreMeta( option,res=> {
              if (res.code === 200) {
                  that.tableList = res.data.data
                  debugger;
              } else{
                  this.$alert(res.message);
              }
          })
      },

    changeDirectory(item){
        let that =this;
        this.$api.getTreeViewFolder({},res => {
            if (res.code === 200) {
                $('#myModal').modal('show')
                that.treeData=res.data.list;
                that.menus=res.data.menus;
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
                        let obj=new Object()
                        obj.transId=item.id;
                        obj.dirId=node.id
                        that.$confirm('变更挂载目录?', '', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            debugger;
                            that.$api.updateTransDir( obj,res => {
                                if (res.code === 200) {
                                    $('#myModal').modal('hide')
                                    that.$alert('变更成功');
                                    that.$router.push({path: "/index/datadirectorymanage"});
                                } else {
                                    that.$alert('变更挂载点失败');
                                }
                            })
                        }).catch(() => {
                        })
                    },
                    onNodeUnchecked:function(event, node){
                    }
                };
                $('#treeview').treeview(options);

            }else{
                this.$alert(res.message);
            }
        })
     },
    add(){
      this.$router.push({
        path: '/index/governance'
      })
    },
    detail(id) {
      this.$router.push({
        path: '/index/governance',
        query: {
          child1: true,
          id
        }
      })
    },
    openTransation(item){
      this.item=item;
      $('#transaction').modal('show')
    },
    submitTransation(){
      let param=new Object();
      if(null==this.valueStr){
        this.$alert('请选择是否支持事务');
        return;
      }
      param.transformationId=this.item.id;
      param.code="UNIQUE_CONNECTIONS";
      param.valueStr=this.valueStr;
      this.$api.updateTransStatus( param,res => {
        if (res.code === 200) {
          this.$alert('修改成功');
          this.getList();
        } else {
          this.$alert('修改失败');
        }
      })
      $('#transaction').modal('hide')
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
      this.$api.getDeleteTransById( param,res => {
          if (res.code === 200) {
              this.$alert('删除成功');
              this.getList();
          } else {
              this.$alert('删除失败');
          }
        })
    }).catch(() => {
      })
    }
  },
  created() {
    this.getList()
  },
  watch: {
    $route(to,from) {
      this.getList()
    }
  },
}
</script>

<style >
.paging-box {
  margin-top: 20px;
  text-align: right;
}
.container {
  width: 601px !important;
}
</style>
