<template>
  <div >
    <dash-header ></dash-header>
    <sidebar />
    <div class="content-wrapper" >
      <section class="content-header">
        <h1>
          作业日志
          <small>列表</small>
        </h1>
        <ol class="breadcrumb">
          <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
          <li><a href="#">任务监控</a></li>
          <li class="active">作业日志</li>
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
                    <th>批次</th>
                    <th>作业名称</th>
                    <th>抽取标志</th>
                    <th>阅读量</th>
                    <th>写入量</th>
                    <th>修改量</th>
                    <th>输入量</th>
                    <th>输出量</th>
                    <th>拒绝量</th>
                    <th>错误量</th>
                    <th>开始时间</th>
                    <th>结束时间</th>
                    <th>日志详细内容</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(item)  in tableData">
                    <td>{{item.id}}</td>
                    <td>{{item.jobName}}</td>
                    <td>{{item.status}}</td>
                    <td>{{item.linesRead}}</td>
                    <td>{{item.linesWritten}}</td>
                    <td>{{item.linesUpdated}}</td>
                    <td>{{item.linesUpdated}}</td>
                    <td>{{item.linesOutput}}</td>
                    <td>{{item.linesRejected}}</td>
                    <td>{{item.errors}}</td>
                    <td>{{item.startDate | formatDate}}</td>
                    <td>{{item.endDate | formatDate}}</td>
                    <td ><a :title="item.logField">{{item.logField}}</a></td>
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
                this.$api
                    .getJobLog(option,res => {
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
                this.currentPage = 1
                this.init({ name: this.search ? this.search : null })
            }
        },
        created() {
            this.getList()
        }
    }
</script>

<style >
  a{
    width:300px;
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
