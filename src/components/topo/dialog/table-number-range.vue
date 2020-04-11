<template>
  <div style="min-height: 400px" :visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">数值范围</h4>
    </div>
    <div class="form-group">
      <label  >步骤名称</label>
      <input type="text" class="form-control"    v-model="form.name" placeholder="请输入步骤名称">
    </div>
    <div class="form-group">
      <label  >输入字段</label>
      <input type="text" class="form-control"    v-model="form.inputField" placeholder="请输入输入字段">
    </div>
    <div class="form-group">
      <label  >输出字段</label>
      <input type="text" class="form-control"    v-model="form.outputField" placeholder="请输出字段">
    </div>
    <div class="form-group">
      <label  >缺省值（如果没有匹配到输入结果）</label>
      <input type="text" class="form-control"    v-model="form.fallBackValue" placeholder="请输入缺省值">
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
    <div class="box-body">
      <div><span>范围（最小<=x<最大）</span>&nbsp;
        <button  class="form-control mybutton btn btn-danger " @click="addList" style="width:100px">新增</button>
      </div>
      <table class="table table-bordered"  >
        <thead>
        <tr>
          <th>下限</th>
          <th>上限</th>
          <th>值</th>
          <th >操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in tableData">
          <td>
            <input type="text" class="form-control" v-model="item.lower_bound">
          </td>
          <td>
            <input type="text" class="form-control" v-model="item.upper_bound">
          </td>
          <td>
            <input type="text" class="form-control" v-model="item.value">
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
  name: 'table-delete',
  props: ['item','title'],
  data() {
    return {
      form: _.cloneDeep(this.item.data) || {},
      dialogVisible: true,
      options: [],
      optionsCondition: [
        { name: '=', value: '=' },
        { name: '= ~NULL', value: '= ~NULL' },
        { name: '<>', value: '<>' },
        { name: '<', value: '<' },
        { name: '<=', value: '<=' },
        { name: '>', value: '>' },
        { name: '>=', value: '>=' },
        { name: 'like', value: 'like' },
        { name: 'BETWEEN', value: 'BETWEEN' },
        { name: 'IS NULL', value: 'IS NULL' },
        { name: 'IS NOT NULL', value: 'IS NOT NULL' }
      ],
      tableData: [],
      tablelist:[],
      clusters:[],
      partionType:[],
      partionNode:[],
    }
  },
  methods: {
    onConfirm() {
      this.form.field = this.tableData
      this.item.data = this.form
      this.form.list = this.tablelist
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
    handleDelete(index) {
      this.tableData.splice(index, 1)
    }
  },
  created() {
    this.getSource()
    this.initCluster()
    this.tableData = this.form.field ? this.form.field : []
    this.tablelist = this.form.list?this.form.list : []
  }
}
</script>
