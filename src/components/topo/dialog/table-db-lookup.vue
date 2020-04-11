<template>
  <div style="min-height: 400px" :visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">
        数据库查询</h4>
    </div>
    <div class="form-group">
      <label  >步骤名称</label>
      <input type="text" class="form-control"    v-model="form.name" placeholder="请输入步骤名称">
    </div>
    <div class="form-group">
      <label >数据源</label>
      <select  v-model="form.id_connection" class="form-control select2 select2-hidden-accessible">
        <option v-for="item in  options"  :key="item.id" :label="item.name" :value="item.id"></option>
      </select>
    </div>
    <div class="form-group">
      <label  >模式名</label>
      <input type="text" class="form-control"    v-model="form.lookup_schema" placeholder="请输入模式名">
    </div>


    <div class="form-group">
      <label  >表名</label>
      <input type="text" class="form-control"    v-model="form.lookup_table" placeholder="请输入表名">
    </div>
    <div>
      <div class="form-group">
        <label  >线程数(1或更多)</label>
        <input type="number" class="form-control" min="1"  v-model="form.copy" placeholder="请输入需要使用的线程数"></input>
      </div>
      <div class="form-group">
        <label>执行集群<span style="color:red">(可选)</span></label>
        <select  v-model="form.cluster_schema" class="form-control select2 select2-hidden-accessible">
          <option v-for="item in clusters"  :key="item.name" :label="item.name" :value="item.name"></option>
        </select>
      </div>
      <div class="form-group">
        <label>分区方式<span style="color:red">(可选)</span></label>
        <select  v-model="form.PARTITIONING_METHOD" class="form-control select2 select2-hidden-accessible">
          <option v-for="item in partionType"  :key="item.key" :label="item.value" :value="item.key"></option>
        </select>
      </div>
      <div class="form-group" v-if="form.PARTITIONING_METHOD=='Mirror'">
        <label>分区节点<span style="color:red">(可选)</span></label>
        <select  v-model="form.PARTITIONING_SCHEMA" class="form-control select2 select2-hidden-accessible">
          <option v-for="item in partionNode"  :key="item.name" :label="item.name" :value="item.name"></option>
        </select>
      </div>
      <div class="form-group" v-if="form.PARTITIONING_METHOD=='ModPartitioner'">
        <label>分区字段<span style="color:red">(可选)</span></label>
        <input type="text" class="form-control" min="1"  v-model="form.PARTITIONING_SCHEMA" placeholder="请输入分区字段"></input>
      </div>
    </div>
    <div class="box">
      <div>
        <span>查询关键字</span>&nbsp;
        <button  class="form-control mybutton btn btn-danger " @click="addQueryList" style="width:100px">新增</button>
        <button  class="form-control mybutton btn btn-primary " @click="getQueryField" style="width:100px">获取字段</button>
      </div>
      <table class="table table-bordered"  >
        <thead>
        <tr>
          <th>表字段</th>
          <th>比较符</th>
          <th >流字段</th>
          <th >操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(list,index) in tablelist">
          <td><input type="text" class="form-control" v-model="list.lookup_key_name"></td>
          <td>
            <select class="form-control select2 select2-hidden-accessible" v-model="list.lookup_key_condition">
              <option v-for="item1 in compares " :key="item1.value" :label="item1.value" :value="item1.value"></option>
            </select>
          </td>
          <td>
            <input type="text" class="form-control" v-model="list.lookup_key_field">
          </td>
          <td>
            <button type="button" class="btn btn-info" @click="handleListDelete(index, item)">删除</button>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="box-header with-border">
        <label style="line-height: 35px;">字段</label>
        <button  class="form-control mybutton btn btn-danger " @click="addList" style="width:100px">新增</button>
        <button  class="form-control mybutton btn btn-primary " @click="getField" style="width:100px">获取字段</button>
      </div>
      <!-- /.box-header -->
      <div class="box-body">
        <table class="table table-bordered"  >
          <thead>
          <tr>
            <th>字段</th>
            <th>新的名称</th>
            <th>默认</th>
            <th>类型</th>
            <th>是否升序</th>
            <th >操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in tableData">
            <td><input type="text" class="form-control" v-model="item.return_value_name"></td>
            <td><input type="text" class="form-control" v-model="item.return_value_rename"></td>
            <td><input type="text" class="form-control" v-model="item.return_value_default"></td>
            <td>
              <select class="form-control select2 select2-hidden-accessible" v-model="item.return_value_type">
                <option v-for="item1 in types" :key="item1.key" :label="item1.value" :value="item1.key"></option>
              </select>
            </td>
            <td>
              <button type="button" class="btn btn-info" @click="handleDelete(index, item)">删除</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <!-- /.box-body -->
    </div>

    <div class="modal-footer">
      <button type="button" class="btn btn-primary" @click="cancel">取消</button>
      <button type="button" class="btn btn-danger" @click="onConfirm">确定</button>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  props: ['item','title'],
  data() {
    return {
      form: _.cloneDeep(this.item.data) || {},
      dialogVisible: true,
      types: [],
      tableData: [],
      tablelist:[],
      options:[],
      compares:[],
      clusters:[],
      partionType:[],
      partionNode:[],
    }
  },
  methods: {
    onConfirm() {
      this.form.field = this.tableData
      this.form.list = this.tablelist
      this.item.data = this.form
      $('#myModal').modal('hide')
      this.onClose();
    },
    cancel() {
      $('#myModal').modal('hide')
      this.onClose()
    },
    onClose() {
      this.dialogVisible = false
      this.$emit('on-close', this.item)
      // this.item.updateItem({
      //     text: this.form.title
      // })
    },
    addList() {
      let obj = {}
      this.tableData.push(obj)
    },
    handleDelete(index) {
      this.tableData.splice(index, 1)
    },
    getField(){
          let param=new Object();
          param.transName=this.title;
          param.stepName=this.form.name
          this.form.field = this.tableData
          let that=this;
          debugger;
          this.$api.getFieldFromPreviousStep(param,res => {
              if (res.code === 200) {
                  this.dialogVisible=false;
                  that.tableData=[];
                  let array=res.data.data;
                  for(var i=0;i<array.length;i++){
                      let ele=new Object();
                      ele.return_value_name=array[i].name;
                      ele.return_value_rename=array[i].name;
                      ele.return_value_default='';
                      ele.return_value_type=array[i].type;
                      that.tableData.push(ele);
                  }
                  this.dialogVisible=true;
              }
          })
      },
    initCluster() {
      let param=new Object();
      this.$api.getClusterNotPage(param,res => {
        if (res.code === 200) {
          this.clusters = res.data
        }
      })
      this.$api.getPartionType(param,res => {
        if (res.code === 200) {
          this.partionType = res.data
        }
      })
      this.$api.getPartitionNode(param,res => {
        if (res.code === 200) {
          this.partionNode= res.data
        }
      })

    },
    getSource() {
          let param=new Object();
          this.$api.getCompareType(param,res => {
              if (res.code === 200) {
                  let retdata = res.data;
                  retdata.forEach((item, index, arr) => {
                      this.compares.push(item);
                  })
              }
          })
          this.$api.getTransDataType(param,res => {
              if (res.code === 200) {
                  let retdata = res.data;
                  retdata.forEach((item, index, arr) => {
                      let obj=new Object();
                      obj.key=item
                      obj.value=item
                      this.types.push(obj);
                  })
              }
          })
          let that=this;
          this.$api.getListAllDatabaseNotPage(param,res => {
              if (res.code === 200) {
                  that.options = res.data
              }
          })
      },
      addQueryList(){
          let obj = {}
          this.tablelist.push(obj)
      },
      handleListDelete(index){
          this.tablelist.splice(index, 1)
      },
      getQueryField(){
          let param=new Object();
          param.transName=this.title;
          param.stepName=this.form.name
          let that=this;
          debugger;
          this.$api.getFieldFromPreviousStep(param,res => {
              if (res.code === 200) {
                  that.tablelist=[];
                  let array=res.data.data;
                  for(var i=0;i<array.length;i++){
                      let ele=new Object();
                      ele.lookup_key_name=array[i].name;
                      ele.lookup_key_field=array[i].name;
                      ele.lookup_key_condition='=';
                      that.tablelist.push(ele);
                  }
              }
          })
      },
  },
  created() {
    this.tableData = this.form.field ? this.form.field : []
    this.tablelist = this.form.list?this.form.list : []
      debugger;
    this.getSource();
    this.initCluster();
  }
}
</script>
