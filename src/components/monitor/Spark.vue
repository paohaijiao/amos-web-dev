<template>
  <div >
    <dash-header ></dash-header>
    <sidebar />
    <div class="content-wrapper" style="min-height: 1200px">
      <section class="content-header">
        <h1>
          Spark日志
          <small>列表</small>
        </h1>
        <ol class="breadcrumb">
          <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
          <li><a href="#">任务监控</a></li>
          <li class="active">Spark日志</li>
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
                    <th>序列</th>
                    <th>日志日期</th>
                    <th>日志信息</th>
                    <th>描述</th>
                    <th>采集名称</th>
                    <th>操作用户</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(item)  in tableData">
                    <td>{{item.id}}</td>
                    <td> {{ item.logDate | formatDate }}</td>
                    <td>{{item.logInfo}}</td>
                    <td>{{item.jobDesc}}</td>
                    <td>{{item.gatherName}}</td>
                    <td>{{item.optUser}}</td>
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
  name: 'monitor',
    components: {DashHeader,DashFooter,Sidebar},
  data() {
    return {
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
      getList() {
          let option=new Object();
          option.size=this.pagination.size;
          option.page=this.pagination.page;
          option.name=this.search ? this.search : null;
          let that=this;
      this.$axios
        .get('/api/taskManager/getSparkJobLogList',option)
        .then(res => {
            if (res.data.code === 200) {
                that.tableData = res.data.data.content
                that.pagination.total = res.data.data.totalElements
            }else{
            }
        })
    }
  },
  created() {
    this.getList({})
  }
}
</script>

<style >
.basic-style{
  height: 100%;
}
.coll-h {
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  .search {
    display: flex;
  }
}
.pagination {
  padding: 20px 0;
  text-align: right;
}
</style>
