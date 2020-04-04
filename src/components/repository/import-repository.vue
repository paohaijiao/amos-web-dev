<template>
  <div >
    <dash-header ></dash-header>
    <sidebar />
    <div class="content-wrapper" >
      <section class="content-header">
        <h1>
          资源库
          <small>导出资源库到本地</small>
        </h1>
        <ol class="breadcrumb">
          <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
          <li><a href="#">资源库</a></li>
          <li class="active">导入本地资源到系统</li>
        </ol>
      </section>
      <section class="content">
        <div class="row">
          <div class="col-xs-12">
            <div class="box">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel">导入本地资源到系统</h4>
                  </div>
                  <div class="box-body">
                    <div class="form-group">
                      <label for="exportPath">本地目录</label>
                      <input type="text" class="form-control" v-model="item.filepath" id="exportPath" placeholder="导入路径">
                    </div>
                    <div class="form-group">
                      <label for="dir">资源库目录(默认是/)</label>
                      <input type="text" class="form-control" v-model="item.dir" id="dir" placeholder="资源库目录">
                    </div>
                  </div>
                  <div class="box-footer">
                    <button type="button" class="btn btn-primary" @click="submitForm()">导入</button>
                  </div>
                  <!-- /.box-body -->
                  <div class="modal-footer">

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
        filepath:null,
        dir:null
      },
      search: '',
      tableData: [],
      baseTypeList:[],
      databaseList:[],
      pagination: {
        total:0,
        page:1,
        size:10
      }
    }
  },
  methods: {
    submitForm() {
      if(null==this.item.filepath||''==this.item.filepath){
        this.$alert('导入路径');
        return;
      }
      if(null==this.item.dir||''==this.item.dir){
        this.$alert('资源库目录');
        return;
      }

      let params = {
          filepath: this.item.filepath,
          dir: this.item.dir,
      }
      this.$api.getImport( params,res => {
          debugger;
          if (res.code === 200) {
            this.$alert('操作成功');
            this.getList()
            $('#myModal').modal('hide');
          }else{
              this.$alert('系统错误');
            }
          }
        )
    }
  },
  created() {
  },
  watch: {
    $route(to,from) {
      this.getList()
    }
  }
}
</script>


