<template>
  <div >
    <dash-header ></dash-header>
    <sidebar />
    <div class="content-wrapper" >
      <section class="content-header">
        <h1>
          数据服务
          <small>列表</small>
        </h1>
        <ol class="breadcrumb">
          <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
          <li><a href="#">数据服务</a></li>
          <li class="active">调用日志</li>
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
                <table  class="table table-bordered table-striped">
                  <thead>
                  <tr>
                    <th>id</th>
                    <th>调用方</th>
                    <th>接口编码</th>
                    <th>请求参数</th>
                    <th>客户端ip</th>
                    <th>响应报文</th>
                    <th>调用耗时</th>
                    <th>错误信息</th>
                    <th>调用时间</th>
                    <th>状态</th>
<!--                    <th>操作</th>-->
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(item)  in tableData">
                    <td>{{item.id}}</td>
                    <td>{{item.clientCode}}</td>
                    <td>{{item.interfaceCode}}</td>
                    <td>{{item.requestParams}}</td>
                    <td>{{item.ip}}</td>
                    <td>{{item.responseData}}</td>
                    <td>{{item.cost}}</td>
                    <td>{{item.errorMsg}}</td>
                    <td>{{item.invokeTime|formatDate}}</td>
                    <td>{{item.status}}</td>
<!--                    <td> <button type="submit" class="btn btn-danger" @click="deleteRow(item)">删除</button></td>-->
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
  name: 'apply',
  props: {},
    components: {DashHeader,DashFooter,Sidebar},
  data() {
    return {
      search: '',
      tableData: [],
      pagination: {
            total:0,
            page:1,
            size:1
      }
    }
  },
  methods: {
    dealStatus(status) {
      let retval = ''
      if (status == 'S') {
        retval = '成功'
      } else if (status == 'F') {
        retval = '失败'
      }
      return retval
    },
    getList() {
        let option=new Object();
        option.size=this.pagination.size;
        option.page=this.pagination.page;
        option.name=this.search ? this.search : null;
        let that =this;
      this.$axios
        .get('/api/interfaceLog/getInterfaceLogList', option)
        .then(res => {
            if (res.data.code === 200) {
                that.tableData = res.data.data.content
                that.pagination.total = res.data.data.totalElements
            } else{
                this.$alert(res.data.message);
            }
        })
    }
  },
  created() {
    this.getList()
  }
}
</script>

<style >
  .paging-box {
    margin-top: 20px;
    text-align: right;
  }
</style>
