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
          <li class="active">数据申请</li>
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
                <div><button class="btn btn-primary" @click="add" style="width: 100px;">数据申请</button></div>
                <table id="example1" class="table table-bordered table-striped">
                  <thead>
                  <tr>
                    <th>序列</th>
                    <th>调用方</th>
                    <th>私钥</th>
                    <th>token</th>
                    <th>申请时间</th>
                    <th>状态</th>
                    <th>审批人</th>
                    <th>操作</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(item)  in tableData">
                    <td>{{item.id}}</td>
                    <td>{{item.clientCode}}</td>
                    <td ><a :title="item.privateKey" @click="show(item.privateKey)">{{item.privateKey}}</a></td>
                    <td><a :title="item.token" @click="show(item.token)">{{item.token}}</a></td>
                    <td >{{item.applyTime}}</td>
                    <td >{{item.status}}</td>
                    <td >{{item.reviewer}}</td>
                    <td><button type="submit" class="btn btn-primary" @click="update(item)">修改</button></td>
                  </tr>
                  </tbody>
                </table>
                <pagination :records="pagination.total" :per-page="pagination.size" v-model="pagination.page" @paginate="getList"></pagination>
                <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="mylLabel">数据申请</h4>
                      </div>
                      <div class="form-group has-feedback">
                        <label>调用方</label>
                        <input type="text" class="form-control" placeholder="调用方"  v-model="item.clientCode">
                        <span class="glyphicon glyphicon-fire form-control-feedback"></span>
                      </div>
                      <div class="form-group has-feedback">
                        <label>接口编码</label>
                        <select  style="width:100%;height:34px" v-model="item.interfaceId">
                          <option :value="item1.value" v-for="item1 in options" >{{item1.label}}</option>
                        </select>
                      </div>
                      <div class="form-group has-feedback">
                        <label>私钥</label>
                        <input type="text" class="form-control" placeholder="请先申请私钥"  v-model="item.privateKey"  >
                        <span class="glyphicon glyphicon-eye-close form-control-feedback"></span>
                      </div>
                      <div class="form-group has-feedback">
                        <label>备注</label>
                        <input type="text" class="form-control" placeholder="备注"  v-model="item.remark" >
                        <span class="glyphicon glyphicon-warning-sign form-control-feedback"></span>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary" @click="submitForm()">提交更改</button>
                      </div>
                    </div><!-- /.modal-content -->
                  </div><!-- /.modal -->
                </div>
                <div class="modal fade" id="content" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">查看</h4>
                      </div>
                      <div class="modal-body">
                        <div class="form-group">
                          <label >内容</label>
                          <textarea class="form-control" rows="10" v-model="msg" ></textarea>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                      </div>
                    </div><!-- /.modal-content -->
                  </div><!-- /.modal -->
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
  name: 'apply',
  props: {},
  components: {
    DashFooter,
    DashHeader,
    Sidebar
  },
  data() {
    return {
      item:{
        clientCode:null,
        interfaceId:null,
        privateKey:null,
        remark:null,
      },
      msg:null,
      options:[],
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
    show(msg) {
      this.msg=msg;
      $('#content').modal('show')
    },
      add(){
          $('#myModal').modal('show')
      },
    submitForm() {
      if (this.item.clientCode ===null) {
        this.$alert('必须输入clientCode')
        return
      }
      if (this.item.interfaceId === null) {
        this.$alert('必须输入clientCode')
        return
      }
      if (this.item.privateKey==null) {
        this.$alert('必须输入私钥e')
        return
      }
      if (this.item.remark === '') {
        this.$alert('必须输入备注e')
        return
      }

      let param = {
        clientCode: this.item.clientCode,
        interfaceId: this.item.interfaceId,
        privateKey: this.item.privateKey,
        remark: this.item.remark
      }

      this.$api
        .getSaveDataApply( param, res => {
          if (res.code === 200) {
            this.$alert('申请成功.请等待审核')
              $('#myModal').modal('hide')
          } else {
            this.$alert('申请失败')
          }
        })
    },

    initCode() {
      let param = {
      }
      this.$api.getSelectInterfaceApply( param,res => {
          if (res.code === 200) {
            let data = res.data.interfaceList
            this.options = []
            for(let i = 0;i < data.length;i++){
              let obj = {}
              obj.label = data[i].interfaceCode
              obj.value = data[i].id
              this.options.push(obj)
            }
          }
        })

    },
    getList() {
      let option=new Object();
      option.size=this.pagination.size;
      option.page=this.pagination.page;
      option.name=this.search ? this.search : null;
      let that=this;
      this.$api.getDataApplyList( option,res => {
        if (res.code === 200) {
            debugger;
          that.tableData = res.data.listData
          that.pagination.total = res.data.pageNum
        }else{
          this.$alert(res.message);
        }
      })
    },
    doDelete(id) {
      let param = {
        id: id
      }

      this.$axios
        .post('/api/dataService/deleteDataApply', param, {
          type: 'json'
        })
        .then(res => {
          if (res.data.code === 200) {
            this.$message({
              message: res.data.message,
              type: 'success',
              duration: 1000,
              onClose: () => {
                let searchText = this.search ? this.search : null
                this.getList(searchText, this.pagingTerm.currentPage)
              }
            })
          } else {
            this.$message({
              message: res.data.message,
              type: 'error',
              duration: 1000
            })
          }
        })
    },
  },
  created() {
    this.getList()
    this.initCode()
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
