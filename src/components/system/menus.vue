<template>
  <div >
    <dash-header ></dash-header>
    <sidebar />
    <div class="content-wrapper" style="min-height: 1200px">
      <section class="content-header">
        <h1>
          菜单管理
          <small>列表</small>
        </h1>
        <ol class="breadcrumb">
          <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
          <li><a href="#">系统管理</a></li>
          <li class="active">菜单管理</li>
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
                <table id="example1" class="table table-bordered table-striped">
                  <thead>
                  <tr>
                    <th>主键</th>
                    <th>菜单名称</th>
                    <th>url</th>
                    <th>父节点</th>
                    <th>描述</th>
                    <th>编码</th>
                    <th>操作</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(item)  in tableData">
                    <td>{{item.id}}</td>
                    <td>{{item.menuName}}</td>
                    <td >{{item.url}}</td>
                    <td>{{item.pid}}</td>
                    <td >{{item.describe}}</td>
                    <td >{{item.menuCode}}</td>
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
                        <h4 class="modal-title" id="myModalLabel">编辑菜单</h4>
                      </div>
                      <div class="form-group has-feedback">
                        <label>菜单名称</label>
                        <input type="text" class="form-control" placeholder="菜单名称"  v-model="item.menuName">
                        <span class="glyphicon glyphicon-print form-control-feedback"></span>
                      </div>
                      <div class="form-group has-feedback">
                        <label>父节点</label>
                        <input type="text" class="form-control" placeholder="父节点"  v-model="item.pid" readonly>
                        <span class="glyphicon glyphicon-share form-control-feedback"></span>
                      </div>
                      <div class="form-group has-feedback">
                        <label>父节点</label>
                        <input type="text" class="form-control" placeholder="菜单地址"  v-model="item.url" readonly>
                        <span class="glyphicon glyphicon-move form-control-feedback"></span>
                      </div>
                      <div class="form-group has-feedback">
                        <label>描述信息</label>
                        <input type="text" class="form-control" placeholder="描述信息"  v-model="item.describe" >
                        <span class="glyphicon glyphicon-plus-sign form-control-feedback"></span>
                      </div>
                      <div class="form-group has-feedback">
                        <label>菜单编码</label>
                        <input type="text" class="form-control" placeholder="菜单编码"  v-model="item.menuCode" readonly>
                        <span class="glyphicon glyphicon-screenshot form-control-feedback"></span>
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
  name: 'menus',
  props: {},
  components: {
    DashFooter,
    DashHeader,
    Sidebar
  },
  data() {
    return {

      item:{
        pid:null,
        menuName:null,
        id:null,
        url:null,
        describe:null,
        menuCode:null,
      },
      tableData:[],
      search: '',
      dataList: [],
      pagination: {
        total:0,
        page:1,
        size:10
      }
    }
  },
  methods: {
    update(item){
     this.item=item;
     $('#myModal').modal('show')
    },
    submitForm(){
      if(null==this.item.describe){
        this.$alert('描述不能为空');
      }
      if(null==this.item.menuName){
        this.$alert('菜单名称不能为空');
      }
      let option=this.item;
      option.children=[]
      this.$api.getSaveMenu( option,res => {
          if (res.code === 200) {
            this.$alert('保存成功');
            $('#myModal').modal('hide')
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
      let that=this;
      this.$api.getSelectMenuAll( option,res => {
          if (res.code === 200) {
            that.tableData = res.data.content
            that.pagination.total = res.data.totalElements
          }else{
            this.$alert(res.message);
          }
        })
    },


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
