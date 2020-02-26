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
          <li class="active">ElasticSearch预览</li>
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
                  <label>主机名</label>
                  <input type="text" class="form-control" placeholder="请输入主机名或者IP" v-model="item.host" >
                </div>
                <div>
                  <label>端口号</label>
                  <input type="text" class="form-control" placeholder="请输入端口号" v-model="item.port" >
                </div>
                <div>
                  <label>索引名称</label>
                  <input type="text" class="form-control" placeholder="请输入索引名称" v-model="item.indexName" >
                </div>
                <div>
                  <label>类型名称</label>
                  <input type="text" class="form-control" placeholder="请输入类型名称" v-model="item.type" >
                </div>
                <div>
                  <label>字段名称</label>
                  <input type="text" class="form-control" placeholder="请输入字段名称" v-model="item.fieldName" >
                </div>
                <div>
                  <label>关键字</label>
                  <input type="text" class="form-control" placeholder="请输入关键字" v-model="item.keyword" >
                </div>
                <div>
                  <label>起始数</label>
                  <input type="text" class="form-control" placeholder="请输入起始数" v-model="item.start" >
                </div>
                <div>
                  <label>条数</label>
                  <input type="text" class="form-control" placeholder="请输入条数" v-model="item.count" >
                </div>

                <div style="margin-top: 10px">
                  <button class="btn btn-primary"  style="width: 100%;" @click="toSearch()">查询</button>
                </div>
                <div >
                  <json-viewer
                    :value="item.jsonData"
                    :expand-depth=5
                    copyable
                    boxed
                    sort></json-viewer>
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
  import DashFooter from '../../layout/DashFooter'
  import DashHeader from '../../layout/DashHeader'
  import Sidebar from '../../layout/Sidebar'
    export default {
        name: 'addSche',
        props: {},
        components: {DashHeader,DashFooter,Sidebar},
        data() {
            return {
                item: {
                    host: null,
                    port: null,
                    indexName: null,
                    fieldName: null,
                    keyword: null,
                    type:null,
                    start:null,
                    count:null,
                    jsonData: {
                    }
                }
            }
        },
        methods: {
            toSearch () {
                let that=this;
                var param=new Object();
                param.host=this.item.host;
                param.port=this.item.port;
                param.indexName=this.item.indexName;
                param.fieldName=this.item.fieldName;
                param.keyword=this.item.keyword;
                param.type=this.item.type;
                param.start=this.item.start;
                param.count=this.item.count;
                this.$axios.get('/api/elasticSearchApi/elasticSearchPreview', param).then(res => {
                  debugger;
                    if (res.data.code === 200) {
                        that.item.jsonData = res.data.data
                    }else{
                      that.$alert('加载数据出错')
                        return
                    }
                })

            }
        },
        created(){
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
