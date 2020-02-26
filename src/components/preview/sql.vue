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
          <li class="active">SQL预览</li>
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
                  <select style="width:100%;height:34px" v-model="db" >
                    <option>请选择数据源</option>
                    <option :value="item.id" v-for="item in option" >{{item.name}}</option>
                  </select>
                </div>
                <div>
                    <textarea id="compose-textarea" class="form-control" style="height: 300px" v-model="SQL">
                    </textarea>
                </div>
                <div style="margin-top: 10px">
                  <button class="btn btn-primary"  style="width: 100%;" @click="toSearch()">查询</button>
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
                db:null,
                option:[],
                SQL:null,
                tables: [],
                data:{},
                cols: []
            }
        },
        methods: {
            toSearch () {
                this.tables=[];
                let that=this;
                var param=new Object();
                if(this.db==null){
                    this.$alert('请先选择数据源');
                    return
                }
                if(this.SQL==null){
                    this.$alert('请输入SQL语句');
                    return
                }
                param.db=this.db;
                param.SQL=this.SQL;
                this.$api.getSql( param,res => {
                    if (res.code === 200) {
                        that.tables = res.data;
                        let array = that.tables;
                        let data=[];
                        this.cols=[];
                        if(that.tables.length>0){//每个对象里面就包含了所有字段
                           var item=that.tables[0];
                           var keys =Object.keys(item)
                           for(var i=0;i<keys.length;i++){
                               var obj=new Object();
                               obj.field=keys[i];
                               obj.title=keys[i];
                               that.cols.push(obj)
                             }
                      // $('#example').bootstrapTable("destroy");
                      $("#example").bootstrapTable({
                        data:that.tables,
                        columns: that.cols})


                    }else{
                        this.$alert(res.data.message);
                    }
                }})

            },
            init(){
                let that=this;
                this.$api.getListAllDatabase({},res => {
                    if (res.code === 200) {
                        that.option = res.data
                    }
                })
            }
        },
        mounted(){
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
