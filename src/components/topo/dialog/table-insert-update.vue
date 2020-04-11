<template>
  <div style="min-height: 400px" :visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">插入/更新 </h4>
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
      <label  >目标模式</label>
      <input type="text" class="form-control"    v-model="form.schema" placeholder="请输入模式内容">
    </div>
    <div class="form-group">
      <label  >目标表</label>
      <input type="text" class="form-control"    v-model="form.table" placeholder="请输入目标表">
    </div>
    <div class="form-group">
      <label  >提交记录数量</label>
      <input type="text" class="form-control"    v-model="form.commit" placeholder="请输入提交记录数量">
    </div>
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
    <div class="box-body">
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
          <td><input type="text" class="form-control" v-model="list.key_name"></td>
          <td>
            <select class="form-control select2 select2-hidden-accessible" v-model="list.key_condition">
              <option v-for="item1 in options1 " :key="item1.value" :label="item1.value" :value="item1.value"></option>
            </select>
          </td>
          <td>
            <input type="text" class="form-control" v-model="list.key_field">
          </td>
          <td>
            <button type="button" class="btn btn-info" @click="handleListDelete(index, item)">删除</button>
          </td>
        </tr>
        </tbody>
      </table>
      <div><span>数据库字段</span>&nbsp;
        <button  class="form-control mybutton btn btn-danger " @click="addList" style="width:100px">新增</button>
        <button  class="form-control mybutton btn btn-primary " @click="getField" style="width:100px">获取字段</button>
      </div>
      <table class="table table-bordered"  >
        <thead>
        <tr>
          <th>表字段</th>
          <th>流字段</th>
          <th >操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in tableData">
          <td>
              <input type="text" class="form-control" v-model="item.value_name">
          </td>
          <td>
             <input type="text" class="form-control" v-model="item.value_rename">
          </td>
          <td>
            <button type="button" class="btn btn-info" @click="handleDelete(index, item)">删除</button>
          </td>

        </tr>
        </tbody>
      </table>
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
      options: [],
      tableData: [],
      tablelist: [],
      options1: [
        { value: '=' },
        { value: '= ~NULL' },
        { value: '<>' },
        { value: '<' },
        { value: '<=' },
        { value: '>' },
        { value: '>=' },
        { value: 'like' },
        { value: 'BETWEEN' },
        { value: 'IS NULL' },
        { value: 'IS NOT NULL' }
      ],
      clusters:[],
      partionType:[],
      partionNode:[]
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
    getField(){
          let param=new Object();
          param.transName=this.title;
          param.stepName=this.form.name
          this.form.field = this.tableData
          let that=this;
          debugger;
          this.$api.getFieldFromPreviousStep(param,res => {
              if (res.code === 200) {
                  that.tableData=[];
                  let array=res.data.data;
                  for(var i=0;i<array.length;i++){
                      let ele=new Object();
                      ele.value_name=array[i].name;
                      ele.value_rename=array[i].name;
                      that.tableData.push(ele);
                  }
              }
          })
      },
    onClose() {
      this.dialogVisible = false
      this.$emit('on-close', this.item)

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
        this.$api.getListAllDatabaseNotPage(param,res => {
        if (res.code === 200) {
          this.options = res.data
        }
      })
    },
    addList() {
      let obj = {}
      this.tableData.push(obj)
    },
    handleDelete(index) {
      this.tableData.splice(index, 1)
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
                      ele.key_field=array[i].name;
                      ele.key_name=array[i].name;
                      ele.key_condition='=';
                      that.tablelist.push(ele);
                  }
              }
          })
      },
  },
  created() {
      this.getSource()
      this.initCluster()
      this.tableData = this.form.field ? this.form.field : []
      this.tablelist = this.form.list ? this.form.list : []
  }
}
</script>
