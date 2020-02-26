<template>
  <div >
    <dash-header ></dash-header>
    <sidebar />
    <div class="content-wrapper" >
      <!--<section class="content-header">-->
        <!--<h1>-->
          <!--数据服务-->
          <!--<small>列表</small>-->
        <!--</h1>-->
        <!--<ol class="breadcrumb">-->
          <!--<li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>-->
          <!--<li><a href="#">数据服务</a></li>-->
          <!--<li class="active">秘钥生成</li>-->
        <!--</ol>-->
      <!--</section>-->
      <section class="content">
        <div class="row">
          <div class="col-xs-12">
            <div class="box">
              <div class="box-header">
                <h3 class="box-title">列表详情</h3>
              </div>
              <div class="box-body">
                <div><button class="btn btn-primary"  @click="batchGenerate">批量生成</button></div>
                <table  class="table table-bordered table-striped">
                  <thead>
                  <tr>
                    <th>序列</th>
                    <th>状态</th>
                    <th >私钥</th>
                    <th >公钥</th>

                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(item)  in tableData">
                    <td>{{item.id}}</td>
                    <td>{{dealStatus(item.status)}}</td>
                    <td ><a :title="item.privateKey" @click="show(item.privateKey)">{{item.privateKey}}</a></td>
                    <td ><a :title="item.publicKey" @click="show(item.publicKey)">{{item.publicKey}}</a></td>

                    <!--                    <td> <button type="submit" class="btn btn-danger" @click="deleteRow(item)">删除</button></td>-->
                  </tr>
                  </tbody>
                </table>
                <pagination :records="pagination.total" :per-page="pagination.size" v-model="pagination.page" @paginate="getList"></pagination>
                <div class="modal fade" id="myModal">
                  <div class="modal-dialog">
                    <div class="modal-content">

                      <!-- 模态框头部 -->
                      <div class="modal-header">
                        <h4 class="modal-title">生成秘钥</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                      </div>

                      <!-- 模态框主体 -->
                      <div class="modal-body">
                        <div class="form-group">
                          <label for="name">生成密钥数量</label>
                          <input type="text" class="form-control" v-model="count" id="name" placeholder="请输入生成密钥数量">
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary" @click="submitForm()">提交</button>
                      </div>

                    </div>
                  </div>
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
    components: {DashHeader,DashFooter,Sidebar},
  data() {
    return {
      search: '',
      status: '',
      count:null,
      msg:null,
      options: [
        {
          name: '已使用',
          value: 1
        },{
          name: '未使用',
          value: 0
        },
      ],
        tableData: [],
        pagination: {
            total:0,
            page:1,
            size:10
        }
    }
  },
  methods: {
    //js实现，文本超出两行...效果
    show(msg) {
      this.msg=msg;
      $('#content').modal('show')
    },
    dealStatus(status) {
      let retval = ''
      if (status == '0') {
        retval = '未使用'
      } else if (status == '1') {
        retval = '已使用'
      }
      return retval
    },
    submitForm() {
        if(this.count==null){
            this.$alert('数量不能为空');
            return
        }
      let param = {
        size: this.count
      }
      let that=this;
      this.$api
        .batchGenerateKeyPair(param,res => {
            if (res&& res.code == 200) {
                this.$alert('生成成功');
                that.getList()
                $('#myModal').modal('hide')
            } else {
                this.$alert(res.message);
            }
        })
    },
    batchGenerate() {
        $('#myModal').modal('show')
    },
    getList() {
        let option=new Object();
        option.size=this.pagination.size;
        option.page=this.pagination.page;
        option.name=this.search ? this.search : null;
        option.status=this.status ? this.status : null;;
        let that=this;
      this.$api.getKeyPairList( option,res => {
          if (res.code === 200) {
              that.tableData = res.data.content
              that.pagination.total = res.data.totalElements
          }
        })
    }
  },
  created() {
    this.getList()
  }
}
</script>

<style>
  .paging-box {
    margin-top: 20px;
    text-align: right;
  }
</style>
