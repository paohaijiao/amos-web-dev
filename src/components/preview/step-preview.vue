<template>
  <div >
    <dash-header ></dash-header>
    <sidebar />
    <div class="content-wrapper" style="min-height: 1200px">
      <section class="content-header">
        <h1>
          数据预览
          <small>列表</small>
        </h1>
        <ol class="breadcrumb">
          <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
          <li><a href="#">数据预览</a></li>
          <li class="active">步骤预览</li>
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
                <div>
                  <label>转换名</label>
                  <select style="width:100%;height:34px" v-model="transId"  @change="initStep()">
                    <option>请选择转换名</option>
                    <option :value="item.id" v-for="item in option" >{{item.name}}</option>
                  </select>
                </div>
                <div>
                  <label>节点名称</label>
                  <select style="width:100%;height:34px" v-model="stepName" >
                    <option>请选择节点名</option>
                    <option :value="item.name" v-for="item in stetpOption" :key="item.name">{{item.name}}</option>
                  </select>
                </div>
                <div>
                  <label>预览数量</label>
                  <input type="text" class="form-control" placeholder="请输入预览数量" v-model="row" >
                </div>

                <div style="margin-top: 10px">
                  <button class="btn btn-primary"  style="width: 100%;" @click="preview()">查询</button>
                </div>
                <table  class="table table-bordered table-striped" id="example">
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
        name: 'addSche',
        props: {},
        components: {DashHeader,DashFooter,Sidebar},
        data() {
            return {
                transName:'',
                transId:null,
                row:10,
                option:[],
                stetpOption:[],
                tables: [],
                cols: []
            }
        },
        methods: {
            preview () {
                this.cols=[];
                this.tables=[];
                let that=this;
                var param=new Object();
                if(this.transId==null||this.transId==''){
                  this.$alert('请选择一个转换')
                    return
                }
                if(this.stepName==null||this.stepName==''){
                    this.$alert('请选择一个步骤')
                    return
                }
                if(this.row==null||this.row<=0){
                  this.$alert('请输入需要预览的条数')
                    return
                }
                param.transId=this.transId;
                param.stepName=this.stepName;
                param.row=this.row;
                this.$api.getPreview(param,res => {
                    if (res.code === 200) {
                        // that.cols=res.data.data.data.rowBufferMeta;
                        let totalLine=res.data.data.rowBuffer.length;
                        let lines=[];
                        for (var index=0;index<totalLine;index++) {
                            let line=res.data.data.rowBuffer[index];
                            var obj=new Object() ;
                            for (var col=0;col<res.data.data.rowBufferMeta.length;col++) {
                                let key=res.data.data.rowBufferMeta[col].name;
                                obj[key] = line[col];
                            }
                            lines.push(obj);

                        }
                        that.tables=lines;
                        let columnLength=res.data.data.rowBufferMeta.length;
                        for (var i=0;i<columnLength;i++) {
                            let temp=res.data.data.rowBufferMeta[i]
                            if(null!=temp){
                                var o=new Object() ;
                                o.field=res.data.data.rowBufferMeta[i].name;
                                o.title=res.data.data.rowBufferMeta[i].name;
                                that.cols.push(o)
                            }
                        }
                      $('#example').bootstrapTable("destroy");
                       $("#example").bootstrapTable({
                        data:that.tables,
                        columns:that.cols})
                        }else{
                      this.$alert('预览失败')
                        return
                    }
                })
              let array=that.cols

            },
            init(){
                let that=this;
                var param=new Object();
                param.taskType='KettleJob';
                this.$api.getTaskConfigList(param,res => {
                    if (res.code === 200) {
                        that.option = res.data
                    }
                })
            },
            initStep(){
                let transId=this.transId;
                if(transId==null){
                  this.$alert('转换名称不能为空')
                    return;
                }
                let that=this;
                let param=new Object();
                param.transId=transId;
                this.$api.getStepByTransId( param,res => {
                    if (res.code === 200) {
                        that.stetpOption = res.data
                    }
                })
            }
        },
        created(){
            this.init();
        }
    }
</script>

<style >
    .paging-box {
      margin-top: 20px;
      text-align: right;
    }

</style>
