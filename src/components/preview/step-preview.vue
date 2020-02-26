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
                  <select style="width:100%;height:34px" v-model="transName"  @change="initStep()">
                    <option>请选择转换名</option>
                    <option :value="item.name" v-for="item in option" >{{item.name}}</option>
                  </select>
                </div>
                <div>
                  <label>步骤名</label>
                  <select style="width:100%;height:34px" v-model="stepName" >
                    <option>请选择步骤名</option>
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
  import DashFooter from '../../layout/DashFooter'
  import DashHeader from '../../layout/DashHeader'
  import Sidebar from '../../layout/Sidebar'
  import 'bootstrap-table/dist/bootstrap-table.min.js'
    export default {
        name: 'addSche',
        props: {},
        components: {DashHeader,DashFooter,Sidebar},
        data() {
            return {
                transName:'',
                stepName:'',
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
                if(this.transName==null||this.transName==''){
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
                param.transName=this.transName;
                param.stepName=this.stepName;
                param.row=this.row;
                this.$axios.get('/api/kettlePreview/preview', param).then(res => {
                    if (res.data.code === 200) {
                        // that.cols=res.data.data.data.rowBufferMeta;
                        let totalLine=res.data.data.data.rowBuffer.length;
                        let lines=[];
                        for (var index=0;index<totalLine;index++) {
                            let line=res.data.data.data.rowBuffer[index];
                            var obj=new Object() ;
                            for (var col=0;col<res.data.data.data.rowBufferMeta.length;col++) {
                                let key=res.data.data.data.rowBufferMeta[col].name;
                                obj[key] = line[col];
                            }
                            lines.push(obj);

                        }
                        that.tables=lines;
                        let columnLength=res.data.data.data.rowBufferMeta.length;
                        for (var i=0;i<columnLength;i++) {
                            let temp=res.data.data.data.rowBufferMeta[i]
                            if(null!=temp){
                                var o=new Object() ;
                                o.field=res.data.data.data.rowBufferMeta[i].name;
                                o.title=res.data.data.data.rowBufferMeta[i].name;
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
                this.$axios.get('/api/sysTaskConfigApi/taskList', param).then(res => {
                    if (res.data.code === 200) {
                        that.option = res.data.data
                    }
                })
            },
            initStep(){
                let transName=this.transName;
                if(transName==null){
                  this.$alert('转换名称不能为空')
                    return;
                }
                let that=this;
                let param=new Object();
                param.transName=transName;
                this.$axios.get('/api/kettlePreview/getStepByTransId', param).then(res => {
                    if (res.data.code === 200) {
                        that.stetpOption = res.data.data
                    }
                })
            }
        },
        created(){
            this.init();
        }
    }
</script>

<style lang="scss" scoped>
  .inner {
    width: 100%;
    min-height: 500px;
    box-sizing: border-box;
    .table-outer {
      .query-btns {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: nowrap;
        align-content: center;
        align-items: center;
        font-size: 14px;
        margin-bottom: 15px;
      }
      .form-box {
        .outerdiv {
          width: 670px;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-content: flex-start;
          align-items: center;
          flex-wrap: nowrap;
          margin-bottom: 20px;
          .conditions-query {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-content: flex-start;
            align-items: center;
            flex-wrap: nowrap;
            font-size: 14px;
            flex: 1;
            .btn-query {
              background-color: #4ac4e3;
              border: 1px solid #4ac4e3;
              color: #ffffff;
            }
            .field-aligned {
              width: 130px;
              text-align: right;
              margin-right: 10px;
              white-space: nowrap;
              b {
                color: #ff0000;
                font-weight: normal;
              }
            }
            .vail-box-align {
              display: flex;
              flex-direction: column;
              align-content: center;
              justify-content: flex-start;
              align-items: flex-start;
              min-height: 70px;
              flex: 1;
              .vail-font-color {
                color: #666666;
                text-align: left;
                line-height: 20px;
                display: block;
              }
              .arrangement {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-content: center;
                align-items: center;
              }
            }
          }
        }
      }
    }

    .query-btn-com {
      background: #5578ff;
      border-radius: 5px;
      color: #ffffff;
      font-size: 13px;
      border-color: #5578ff;
      height: 30px;
      line-height: 30px;
      padding: 0 15px;
    }
    .query-btn-com:hover,
    .query-btn-com:active,
    .query-btn-com:focus {
      background: #6e8bfb;
      border-color: #6e8bfb;
    }

    .query-btn-plain {
      background: #ffffff;
      border-radius: 5px;
      color: #5578ff;
      font-size: 13px;
      border-color: #5578ff;
      height: 30px;
      line-height: 30px;
      padding: 0 15px;
    }
    .query-btn-plain:hover,
    .query-btn-plain:active,
    .query-btn-plain:focus {
      background: #f0f0f0;
    }

    .paging-box {
      margin-top: 20px;
      text-align: right;
    }
  }
</style>
