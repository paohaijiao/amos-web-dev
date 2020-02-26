<template>
  <div >
    <dash-header ></dash-header>
    <sidebar />
    <div class="content-wrapper" >
      <section class="content-header">
        <h1>
          系统管理
          <small>列表</small>
        </h1>
        <ol class="breadcrumb">
          <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
          <li><a href="#">系统管理</a></li>
          <li class="active">角色管理</li>
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
                <div><button class="btn btn-primary" data-toggle="modal" data-target="#insert" style="width: 100px;" @click="add()">新增</button></div>
                <table id="example1" class="table table-bordered table-striped">
                  <thead>
                  <tr>
                    <th>角色名称</th>
                    <th>角色描述</th>
                    <th>操作</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(item)  in tableData">
                    <td>{{item.roleName}}</td>
                    <td>{{item.describe}}</td>
                    <td>
                      <button type="submit" class="btn btn-primary" @click="update(item)">修改</button>
                      <button type="submit" class="btn btn-danger" @click="deleteRow(item)">删除</button>
                      <button type="submit" class="btn btn-danger" @click="updateMenu(item)">修改权限</button></td>
                  </tr>
                  </tbody>
                  <pagination :records="pagination.total" :per-page="pagination.size" v-model="pagination.page" @paginate="getList"></pagination>
                </table>
                <div class="modal fade" id="editRole" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" >角色管理</h4>
                      </div>
                      <div class="form-group has-feedback">
                        <label>角色名称</label>
                        <input type="text" class="form-control" placeholder="请输入角色名称" v-model="roleName">
                        <span class="glyphicon  glyphicon-pencil form-control-feedback"></span>
                      </div>
                      <div class="form-group has-feedback">
                        <label>描述</label>
                        <input type="text" class="form-control" placeholder="请输入描述信息" v-model="describe">
                        <span class="glyphicon  glyphicon-book form-control-feedback"></span>
                      </div>
                      <div class="box-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary" @click="submitRole()">提交</button>
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
                        <h4 class="modal-title" id="myModalLabel">菜单管理</h4>
                      </div>
                      <div class="container">
                        <h1>菜单管理列表</h1>
                        <br/>
                        <div class="row">
                          <div class="col-sm-12">
                            <label for="treeview"></label>
                            <div id="treeview"/>
                          </div>
                        </div>
                      </div>
                      <div class="box-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary" @click="submitMenu()">提交</button>
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
  name: 'character',
  props: {},
  components: {
    DashFooter,
    DashHeader,
    Sidebar
  },
  data() {
    return {
      id:null,
      roleName:'',
      describe:'',
      search: '',
      menus:[],
      tableData: [],
      treeData:[],
      pagination: {
        total:0,
        page:1,
        size:10
      }
    }
  },
  methods: {
    nodeChecked(event, node) {
      this.menus.push(node.id);
    },
    getMenuTree(roleId){
      let that =this;
      this.$api.getTreeView({roleId:roleId},res => {
          debugger;
          if (res.code === 200) {
            $('#myModal').modal('show')
              that.treeData=res.data.list;
              that.menus=res.data.menus;
            var options = {
              bootstrap2: false,
              showTags: true,
              levels: 1,
              data: that.treeData,
              multiSelect:true,
              showCheckbox:true,
              selectedColor:'#fff',
              hierarchicalCheck:true,
              onNodeChecked: function(event, node){
                that.menus.push(node.id);
              },
                onNodeUnchecked:function(event, node){
                  for(var i=0;i<that.menus.length;i++){
                      if(node.id==that.menus[i]){
                          that.menus.splice(i, 1)
                      }
                  }
              }
            };
            $('#treeview').treeview(options);

          }else{
            this.$alert(res.message);
          }
        })
    },

    getList() {
      let option=new Object();
      option.size=this.pagination.size;
      option.page=this.pagination.page;
      option.name=this.search ? this.search : null;
      let that =this;
      this.$api.getSelectRoleAll( option,res => {
          if (res.code === 200) {
            that.tableData = res.data.content
            that.pagination.total = res.data.totalElements
          }else{
            this.$alert(res.message);
          }
        })
    },
    updateMenu(item){
        this.id=item.id;
      this.getMenuTree(item.id);
    },
      add(){
        this.id=null;
        this.roleName=null;
        this.describe=null;
        this.menus=[];
          $('#editRole').modal('show')
      },
      update(item){
          this.id=item.id;
          this.roleName=item.roleName;
          this.describe=item.describe;
          $('#editRole').modal('show')
  },
    submitRole(){
      if(null==this.roleName){
        this.$alert('角色名称不能为空');
        return;
      }
      if(null==this.describe){
        this.$alert('角色描述不能为空');
        return;
      }
      let param=new Object();
      param.roleName=this.roleName;
      param.describe=this.describe;
      param.id=this.id==null?null:this.id
      this.$api.getSaveRole(param,res => {
          if (res.code === 200) {
            this.$alert(res.message);
              this.getList();
            $('#editRole').modal('hide')
          } else {
              this.$alert(res.message);
              $('#editRole').modal('hide')
          }
        })
    },
    submitMenu(item){
      if(0==this.menus.length){
        this.$alert('不允许为空提交');
        return;
      }
      if(null==this.id||''==this.id){
        this.$alert('id不能为空');
        return;
      }
      let param=new Object();
      param.roleId=this.id;
      param.menuIds=this.menus.join(',');
      this.$api.getSaveRoleMenu( param,res => {
          if (res.code === 200) {
            this.$alert(res.message);
            this.getList();
            $('#myModal').modal('hide')
          } else {
            this.$alert(res.message);
          }
        })

    },

      deleteRow(item) {
      let param = {
        id: item.id
      }

      this.$api
        .getDeleteRole(param,res => {
          if (res.code === 200) {
              this.$alert(res.message);
              this.getList();
          } else {
              this.$alert(res.message);
          }
        })
    }
  },
  mounted(){

  },
  created() {
    this.getList()
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
