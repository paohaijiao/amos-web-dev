<template>
  <div >
    <dash-header ></dash-header>
    <sidebar />
    <div class="content-wrapper" >
      <section class="content-header">
        <h1>
          操作日志
          <small>列表</small>
        </h1>
        <ol class="breadcrumb">
          <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
          <li><a href="#">操作日志</a></li>
          <li class="active">数据源列表</li>
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
                    <th>用户名</th>
                    <th>操作类型</th>
                    <th>操作时间</th>
                    <th>创建人</th>
                    <th>操作</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(item)  in tableData">
                    <td>{{item.sysUserId}}</td>
                    <td>{{item.optType}}</td>
                    <td>{{item.optRemark}}</td>
                    <td>{{item.createtime | formatDate }}</td>
                    <td> <button type="submit" class="btn btn-danger" @click="deleteRow(item)">删除</button></td>
                  </tr>
                  </tbody>
                  <pagination :records="pagination.total" :per-page="pagination.size" v-model="pagination.page" @paginate="getList"></pagination>
                </table>
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
  name: 'log',
  components: {DashHeader,DashFooter,Sidebar},

  data() {
    return {
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


    getList() {
      let option=new Object();
        option.size=this.pagination.size;
        option.page=this.pagination.page;
        option.name=this.search ? this.search : null;
       let that=this;
      this.$api.getLog( option ,res=> {
          debugger;
          if (res.code === 200) {
            that.tableData = res.data.content
            that.pagination.total = res.data.totalElements
          }
        })
    },

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


