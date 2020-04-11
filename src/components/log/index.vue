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
                <div class="row" style="display: flex;">

                  <label style="line-height: 35px;font-size:19px;margin-left:13px">类型:</label>
                    <select  id="type" v-model="optType" class="form-control select2 select2-hidden-accessible"  style="width:250px">
                      <option v-for="item in op"  :key="item" :label="item" :value="item"></option>
                    </select>
                    <label for="user" style="line-height: 35px;font-size:19px;"> 操作人:</label>
                    <input id="user" type="text" class="form-control"   style="width:250px" v-model="search" placeholder="请输入操作人">
                    <button class="btn btn-primary" @click="getList()" style="width: 100px;margin-left: 50px;height: 35px;">查询</button>
                </div>



                <table id="example1" class="table table-bordered table-striped">
                  <thead>
                  <tr>
                    <th>用户名</th>
                    <th>操作类型</th>
                    <th>操作时间</th>
                    <th>创建时间</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(item)  in tableData">
                    <td>{{item.username}}</td>
                    <td>{{item.optType}}</td>
                    <td>{{item.optRemark}}</td>
                    <td>{{item.createtime | formatDate }}</td>
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
      optType:'',
      search: null,
      tableData: [],
      baseTypeList:[],
      databaseList:[],
      op:[],
      pagination: {
        total:0,
        page:1,
        size:10
      }
    }
  },
  methods: {
      getLogType(){
          let option=new Object();
          let that=this;
          this.$api.getLogType( option ,res=> {
              if (res.code === 200) {
                  that.op = res.data
              }
          })
      },
    getList() {
      let option=new Object();
        option.size=this.pagination.size;
        option.page=this.pagination.page;
        option.username=this.search ? this.search : null;
        option.optType=this.optType ? this.optType : null;
       let that=this;
      this.$api.getLog( option ,res=> {
          if (res.code === 200) {
            that.tableData = res.data.list
            that.pagination.total = res.data.total
          }
        })
    },

  },
  created() {
    this.getList()
    this.getLogType();
  },
  watch: {
    $route(to,from) {
      this.getList()
    }
  }
}
</script>


