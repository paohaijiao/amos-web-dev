<template>
  <div >
    <dash-header ></dash-header>
    <sidebar />
    <div class="content-wrapper" style="min-height: 1200px">
      <section class="content-header">
        <h1>
          数据治理
          <small>列表</small>
        </h1>
        <ol class="breadcrumb">
          <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
          <li><a href="#">数据治理</a></li>
          <li class="active">转换列表</li>
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
                <div><button class="btn btn-primary" data-toggle="modal"  @click="add()" style="width: 100px;">新增</button></div>
                <table  class="table table-bordered table-striped">
                  <thead>
                  <tr>
                    <th>id</th>
                    <th>作业名称</th>
                    <th>描述</th>
                    <th>转换状态</th>
                    <th>创建人</th>
                    <th>创建时间</th>
                    <th>操作</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(item)  in tableData">
                    <td>{{item.id}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.description}}</td>
                    <td>{{item.jobStatus}}</td>
                    <td>{{item.modifiedUser}}</td>
                    <td>{{item.createdDate|formatDate}}</td>
                    <td><button type="submit" class="btn btn-primary" @click="detail(item.id)">修改</button> <button type="submit" class="btn btn-danger" @click="deleteRow(item)">删除</button></td>
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
  name: 'menus',
  props: {},
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
    add(){
      this.$router.push({
        path: '/index/job'
      })
    },
    detail(id) {
      this.$router.push({
        path: '/index/job',
        query: {
          child1: true,
          id
        }
      })
    },
    getList() {
        let option=new Object();
        option.size=this.pagination.size;
        option.page=this.pagination.page;
        option.name=this.search ? this.search : null;
        let that =this;
      this.$api.getJobList( option,res => {
            if (res.code === 200) {
                that.tableData = res.data.content
                that.pagination.total = res.data.totalElements
            } else{
                this.$alert(res.message);
            }
        })
    },
      deleteRow(item) {
        let param = {
          id: item.id
        }
        this.$confirm('确认删除?', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.getDeleteKettleJob( param,res => {
              if (res.code === 200) {
                this.$alert('删除成功');
                this.getList();
              } else {
                this.$alert('删除失败');
              }
            })
        }).catch(() => {
        })
      }
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

<style>
.paging-box {
  margin-top: 20px;
  text-align: right;
}
</style>
