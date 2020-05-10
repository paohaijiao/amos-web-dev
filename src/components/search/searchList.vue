<template>
  <div >
    <dash-header ></dash-header>
    <sidebar />
    <div class="content-wrapper">
      <div >
        <div >
          <div class="input-group input-group-lg" >
            <input type="text" class="form-control amosbutton" v-model="keyword" placeholder="请输入需要搜索的内容" onkeydown="onKeyDown(event)" style="width:800px"/>
            <span >
              <button type="button" class="btn btn-danger dropdown-toggle " data-toggle="dropdown" aria-expanded="false" style="line-height: 32px;width:100px">搜索元数据
              </button>
            </span>
          </div>


        </div>
      </div>
      <div>

      </div>
      <div>
        全部 转换 作业
      </div>
      <div>
        全部 最近一周 最近一月 最近一年
      </div>
      <div>
        全部 名称 类型 数据库  步骤 步骤属性
      </div>
      <div class="col-md-12">

        <div class="box">
          <div class="box-header">
            <h3 class="box-title">搜索列表</h3>
          </div>
          <!-- /.box-header -->
          <div class="box-body no-padding">
            <table class="table">
              <tr>
                <th style="width: 5%">编号</th>
                <th style="width: 15%">名称</th>
                <th style="width: 20%">类型</th>
                <th style="width: 20%">创建人</th>
                <th style="width: 20%">创建时间</th>
                <th style="width: 20%">注释</th>
              </tr>
              <tr>
                <td>1.</td>
                <td>Update software</td>
                <td>
                  <div class="progress progress-xs">
                    <div class="progress-bar progress-bar-danger" style="width: 55%"></div>
                  </div>
                </td>
                <td><span class="badge bg-red">55%</span></td>
              </tr>
              <tr>
                <td>2.</td>
                <td>Clean database</td>
                <td>
                  <div class="progress progress-xs">
                    <div class="progress-bar progress-bar-yellow" style="width: 70%"></div>
                  </div>
                </td>
                <td><span class="badge bg-yellow">70%</span></td>
              </tr>
              <tr>
                <td>3.</td>
                <td>Cron job running</td>
                <td>
                  <div class="progress progress-xs progress-striped active">
                    <div class="progress-bar progress-bar-primary" style="width: 30%"></div>
                  </div>
                </td>
                <td><span class="badge bg-light-blue">30%</span></td>
              </tr>
              <tr>
                <td>4.</td>
                <td>Fix and squish bugs</td>
                <td>
                  <div class="progress progress-xs progress-striped active">
                    <div class="progress-bar progress-bar-success" style="width: 90%"></div>
                  </div>
                </td>
                <td><span class="badge bg-green">90%</span></td>
              </tr>
            </table>
          </div>
          <div class="box-tools">
            <ul class="pagination pagination-sm no-margin pull-right">
              <li><a href="#">&laquo;</a></li>
              <li><a href="#">1</a></li>
              <li><a href="#">2</a></li>
              <li><a href="#">3</a></li>
              <li><a href="#">&raquo;</a></li>
            </ul>
          </div>
          <!-- /.box-body -->
        </div>
    </div>
    <dash-footer></dash-footer>
  </div>
  </div>
</template>

<script>
    import DashFooter from '../layout/DashFooter'
    import DashHeader from '../layout/DashHeader'
    import Sidebar from '../layout/Sidebar'
export default {
  name: 'collection',
  components: {DashFooter,DashHeader,Sidebar},

  data() {
    return {
        keyword:null
    }
  },
  methods: {
      search(){
          let option=new Object();
          option.keyword='*';
          option.during="week";
          option.page=1;
          option.size=10;
          let that =this;
          this.$api.search( option,res=> {
              if (res.code === 200) {
                  that.tableData = res.data.list
                  that.pagination.total = res.data.total
              } else{
                  this.$alert(res.message);
              }
          })
      }



  },
  created() {
      this.search()
      this.keyword = this.$route.query.key
      debugger;

  },
  watch: {

  }
}
</script>
<style>
  .text-center {
    text-align: center;
  }
  .amosbutton{
    margin-left: 250px;

  }
  .featurette {
    display: table;
    width: 100%;
    height: 30%;
    vertical-align: middle;
    color: #fff;
    position: absolute;
    top: 40%;
  }

</style>

