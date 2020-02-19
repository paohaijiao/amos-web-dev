<template>
  <div >
    <dash-header ></dash-header>
    <sidebar />
    <div class="content-wrapper" style="min-height: 1200px">
      <section class="content-header">
        <h1>
          审核
          <small>列表</small>
        </h1>
        <ol class="breadcrumb">
          <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
          <li><a href="#">审核</a></li>
          <li class="active">接口申请</li>
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
                    <th>申请人</th>
                    <th>申请时间</th>
                    <th>标题</th>
                    <th>状态</th>
                    <th>操作</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(item)  in tableData">
                    <td>{{item.id}}</td>
                    <td>{{item.clientCode}}</td>
                    <td>{{item.applyTime | formatDate}}</td>
                    <td>{{item.remark}}</td>
                    <td>{{item.status=='0'?'待审核':'已审核'}}</td>
                    <td><button type="submit" class="btn btn-primary" @click="toCheckOk(item)">通过</button> <button type="submit" class="btn btn-danger" @click="toCheckNotOk(item)">不通过</button></td>
                  </tr>
                  </tbody>
                </table>
                <pagination :records="pagination.total" :per-page="pagination.size" v-model="pagination.page" @paginate="getList"></pagination>
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
  name: 'waiting',
  props: {},
    components: {
        DashFooter,
        DashHeader,
        Sidebar
    },
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
      this.$api.getPendingReviewList( option, res => {
          if (res.code === 200) {
              that.tableData = res.data.listData
              that.pagination.total = res.data.total
          }else{
              this.$alert(res.message);
          }
        })
    },
    toCheckOk(row) {
      let param = {
        id: row.id,
        reviewStatus: '1',
        applyTime: row.applyTime,
        createBy: row.createBy,
        clientCode: row.clientCode,
        dateCreated: row.dateCreated,
        dateUpdated: row.dateUpdated,
        remark: row.remark,
        reviewTime: row.reviewTime
      }

      this.$api
        .getUpdateDataApply( param,res => {
          if (res.code === 200) {
              this.$alert(res.message);
              this.getList()
          } else {
              this.$alert(res.message);
          }
        })
    },
    toCheckNotOk(row) {
      let param = {
        id: row.id,
        reviewStatus: '2',
        applyTime: row.applyTime,
        createBy: row.createBy,
        clientCode: row.clientCode,
        dateCreated: row.dateCreated,
        dateUpdated: row.dateUpdated,
        remark: row.remark,
        reviewTime: row.reviewTime
      }

      this.$api
        .getUpdateDataApply( param,res => {
          if (res.code === 200) {
              this.$alert(res.message);
              this.getList()
          } else {
              this.$alert(res.message);
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
