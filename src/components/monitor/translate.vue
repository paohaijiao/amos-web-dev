<template>
  <div >
    <dash-header ></dash-header>
    <sidebar />
    <div class="content-wrapper" >
      <section class="content-header">
        <h1>
          转换日志
          <small>列表</small>
        </h1>
        <ol class="breadcrumb">
          <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
          <li><a href="#">任务监控</a></li>
          <li class="active">转换日志</li>
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
                    <th style="width:10px">批次</th>
                    <th style="width:50px">转换名称</th>
                    <th style="width:20px">阅读量</th>
                    <th style="width:20px">写入量</th>
                    <th style="width:20px">修改量</th>
                    <th style="width:20px">输入量</th>
                    <th style="width:20px">输出量</th>
                    <th style="width:20px">拒绝量</th>
                    <th style="width:20px">错误量</th>
                    <th style="width:20px">开始时间</th>
                    <th style="width:20px">结束时间</th>
                    <th>日志详细内容</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(item)  in tableData">
                    <td>{{item.id}}</td>
                    <td>{{item.transName}}</td>
                    <td>{{item.linesRead}}</td>
                    <td>{{item.linesWritten}}</td>
                    <td>{{item.linesUpdated}}</td>
                    <td>{{item.linesUpdated}}</td>
                    <td>{{item.linesOutput}}</td>
                    <td>{{item.linesRejected}}</td>
                    <td>{{item.errors}}</td>
                    <td>{{item.startDate | formatDate}}</td>
                    <td>{{item.endDate | formatDate}}</td>
                    <td style="width: 100px;"><a :title="item.logField">{{item.logField}}</a></td>
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
      this.$api.getTransLogList(option,res => {
          if (res.code === 200) {
              that.tableData = res.data.content
              that.pagination.total = res.data.totalElements
          }
        })
    },
    doDownload() {
      window.open('/api/logDownload/transLog')
    },
    searchList() {
      this.pagination.page = 1
      this.init()
    }
  },
  created() {
    this.getList({})
  }
}
</script>

<style>

  a{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
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
