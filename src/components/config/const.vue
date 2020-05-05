<template>
  <div >
    <dash-header ></dash-header>
    <sidebar />
    <div class="content-wrapper" >
      <section class="content-header">
        <h1>
          系统配置
          <small>配置项列表</small>
        </h1>
        <ol class="breadcrumb">
          <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
          <li><a href="#">系统配置</a></li>
          <li class="active">配置项列表</li>
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
                  <label style="line-height: 35px;font-size:19px;margin-left:13px">配置项搜索:</label>
                  <input  type="text" class="form-control"   style="width:250px" v-model="search" placeholder="请输入配置项">
                  <button class="btn btn-primary" @click="getList()" style="width: 100px;margin-left: 50px;height: 35px;">查询</button>
                </div>
                <table id="example1" class="table table-bordered table-striped">
                  <thead>
                  <tr>
                    <th style="width: 25%">健</th>
                    <th style="width: 25%">值</th>
                    <th style="width: 25%">描述</th>
                    <th style="width: 25%">操作</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(item)  in tableData">
                    <td>{{item.key}}</td>
                    <td>{{item.value}}</td>
                    <td>{{item.desc}}</td>
                    <td>
                      <button type="submit" class="btn btn-warning" @click="update(item)">修改</button>
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
                        <h4 class="modal-title" id="myModalLabel">修改配置</h4>
                      </div>
                        <div class="box-body">
                          <div class="form-group">
                            <label >健</label>
                            <input type="text" class="form-control" v-model="item.key" disabled="disabled" placeholder="请输入健">
                          </div>
                          <div class="form-group">
                            <label >值</label>
                            <input type="text" class="form-control" v-model="item.value" placeholder="请输入值	">
                          </div>
                          <div class="form-group">
                            <label >描述</label>
                            <input type="text" class="form-control"  v-model="item.desc" placeholder="请输入描述">
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
        id:null,
        key:null,
        value:null,
        desc:null
      },
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
    add(){
      this.item.id=null
      this.item.key=null,
      this.item.value=null,
      this.item.desc=null
      $('#myModal').modal('show');
    },
    submitForm() {
      if(null==this.item.key||''==this.item.key){
        this.$alert('健不能为空');
        return;
      }
      if(null==this.item.value||''==this.item.value){
        this.$alert('值不能为空');
        return;
      }
      if(null==this.item.desc||''==this.item.desc){
        this.$alert('描述不能为空');
        return;
      }
      let params = {
        key: this.item.key,
        value: this.item.value,
        desc: this.item.desc,
        id: this.item.id
      }
      this.$api.configCreateOrUpdate( params,res => {
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
        option.search=this.search ? this.search : null;
       let that=this;
      this.$api.configList( option ,res=> {
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


