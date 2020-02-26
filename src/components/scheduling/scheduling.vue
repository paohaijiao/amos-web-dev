<template>
  <div >
    <dash-header ></dash-header>
    <sidebar />
    <div class="content-wrapper">
      <section class="content-header">
        <h1>
          任务调度
          <small>列表</small>
        </h1>
        <ol class="breadcrumb">
          <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
          <li><a href="#">任务调度</a></li>
          <li class="active">任务调度</li>
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
                <div><button class="btn btn-primary"  @click="add()" style="width: 100px;">新增</button></div>
                <table  class="table table-bordered table-striped">
                  <thead>
                  <tr>
                    <th>序列</th>
                    <th>任务名称</th>
                    <th>调度名称</th>
                    <th>采集任务</th>
                    <th>频率</th>
                    <th>状态</th>
                    <th>操作</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(item)  in tableData">
                    <td>{{item.id}}</td>
                    <td>{{item.taskName}}</td>
                    <td>{{item.jobName}}</td>
                    <td>{{item.taskType}}</td>
                    <td>{{item.cron}}</td>
                    <td>{{item.status === '1' ? '启动' : '暂停' }}</td>
                    <td>
                      <button type="submit" class="btn btn-danger" @click="toExecuteNow(item)">立即执行</button>
                      <button type="submit" class="btn btn-danger"  v-show="item.status == '1'" @click="toStopOrStart(item)">暂停</button>
                      <button type="submit" class="btn btn-danger"  v-show="item.status == '0'" @click="toStopOrStart(item)">启动</button>
                      <button type="submit" class="btn btn-primary" @click="update(item)">修改</button>
                      <button type="submit" class="btn btn-danger" @click="deleteRow(item.id)">删除</button>
                    </td>
                  </tr>
                  </tbody>
                  <pagination :records="pagination.total" :per-page="pagination.size" v-model="pagination.page" @paginate="getList"></pagination>
                </table>
                <div class="modal fade" id="myModal">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h4 class="modal-title">任务调度</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                      </div>
                      <div class="form-group">
                        <label >任务名称</label>
                        <input type="text" class="form-control" v-model="item.jobName"  placeholder="请输入任务名称">
                      </div>
                      <div class="form-group">
                        <label >任务类型</label>
                        <select class="form-control select2 select2-hidden-accessible" v-model="item.taskType"   @change="changeType">
                          <option v-for="item1 in type" :key="item1.value" :label="item1.label" :value="item1.value"></option>
                        </select>
                      </div>
                      <div class="form-group">
                        <label >频率(Cron表达式)</label>
                        <input type="text" class="form-control" v-model="item.cron"      value="0/30 * * * * ? "
                               placeholder="0/30 * * * * ? ">
                      </div>
                      <div class="form-group">
                        <label >任务名称</label>
                        <select class="form-control select2 select2-hidden-accessible" v-model="item.taskId">
                          <option v-for="item1 in idOptions" :key="item1.id" :label="item1.jobName" :value="item1.id"></option>
                        </select>
                      </div>
                      <div class="form-group">
                        <label >备注：</label>
                        <input type="text" class="form-control" v-model="item.jobDesc"  placeholder="请输入备注">
                      </div>

                      <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-warning" @click="submitForm()">提交</button>
                      </div>

                    </div>
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
  name: 'scheduling',
  props: {},
    components: {DashHeader,DashFooter,Sidebar},
  data() {
    return {
        item:{
            jobName: null,
            taskType: null,
            taskId: null,
            cron: '0/30 * * * * ?',
            status: 0,
            jobDesc: null
        },
      search: '',
        statusOptions: [
            {
                label: '有效',
                value: '1'
            },
            {
                label: '无效',
                value: '0'
            }
        ],
        idOptions: [],
        type:[],
        tableData: [],
        pagination: {
            total:0,
            page:1,
            size:10
        }
    }
  },
  methods: {
    add() {
      this.item.id = null;
      this.item.jobName = null;
      this.item.taskType = null;
      this.item.taskId = null;
      this.item.cron = '0/30 * * * * ?';
      this.item.status = 1;
      this.item.jobDesc = null;
      $('#myModal').modal('show')
    },
    update(item) {
      this.item = item;
      $('#myModal').modal('show')
    },
    getTaskType() {
        let params=new Object();
      this.$api.getListTaskType(params,res => {
        if (res.code === 200) {
          this.type = res.data
        }
      })
    },
    submitForm() {
        debugger;
      if (this.item.jobName === null) {
        this.$alert('请输入任务名称');
        return
      } else if (this.item.taskType === null) {
        this.$alert('请选择任务类型');
        return
      } else if (this.item.cron === null) {
        this.$alert('请输入频率');
        return
      } else if (this.item.status === null) {
        this.$alert('请输入状态');
        return
      } else if (this.item.taskId === null) {
        this.$alert('请输入状态');
        return
      } else if (this.item.jobDesc === null) {
        this.$alert('请输入备注');
        return
      }
      this.$api.getTaskConfigCreateOrUpdate({
          id: this.item.id == null ? null : this.item.id,
          taskId: this.item.taskId,
          jobName: this.item.jobName,
          taskType: this.item.taskType,
          cron: this.item.cron,
          status: this.item.status,
          jobDesc: this.item.jobDesc
        },res => {
          if (res.code === 200) {
            this.$alert('操作成功');
            this.getList();
            $('#myModal').modal('hide')
          } else {
            this.$alert(res.message);
          }
        })
    },
    changeType() {
      let that = this;
      let param=new Object();
        param.taskType=that.item.taskType
      this.$api.getTaskConfigList(param,res => {
          if (res.code === 200) {
            let retdata = res.data
            let arr = []
            if (that.item.taskType == 'KettleJob' || that.item.taskType == 'QualityJob' || that.item.taskType == 'JOB') {
              for (let i = 0; i < retdata.length; i++) {
                let obj = {}
                obj.id = retdata[i].id
                obj.jobName = retdata[i].name
                arr.push(obj)
              }
            } else if (that.item.taskType == 'SparkJob') {
              arr = retdata
            }
            that.idOptions = arr
          }
        })
    },
    getList() {
      let option = new Object();
      option.size = this.pagination.size;
      option.page = this.pagination.page;
      option.name = this.search ? this.search : null;
      let that = this;
      this.$api.getListTask( option,res => {
        if (res.code === 200) {
          that.tableData = res.data.content
          that.pagination.total = res.data.totalElements
        } else {
          this.$alert(res.message);
        }
      })
    },
    deleteRow(id) {
      this.$confirm('确认删除?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          let param=new Object();
          param.id=id;
          debugger;
        this.$api.getTaskDelete( param,res => {
            if (res.code === 200) {
              this.$alert('删除成功');
              this.getList()
            } else {
              this.$alert(res.message);
            }
          })
      }).catch(() => {
      })
    },
    toExecuteNow(row) {
      this.$alert('已经触发了执行操作，执行结果请查看对应的日志');
      let param=new Object();
        param.taskId=row.taskId;
        param.taskType=row.taskType;

      this.$api
        .getExecTask(param,res => {
          if (res.code === 200) {
              this.getList()
          } else {
              this.$alert('执行出错了');
          }
        })
    },
    toStopOrStart(row) {
        let param=new Object();
        param.id=row.id;
        param.taskId=row.taskId;
        param.jobName=row.jobName;
        param.taskType=row.taskType;
        param.cron=row.cron;
        param.jobDesc=row.jobDesc;
        param.status=row.status === '1' ? '0' : '1';
        debugger;
      this.$api.getTaskConfigCreateOrUpdate( param,res => {
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
    this.getList();
    this.getTaskType();
  },
  watch: {
    $route(to,from) {
      this.getList('', this.pagingTerm.currentPage)
    }
  }
}
</script>
