<template>
  <div style="min-height: 400px" :visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">getXMLData</h4>
    </div>
    <div class="form-group">
      <label  >步骤名称</label>
      <input type="text" class="form-control"    v-model="form.name" placeholder="请输入步骤名称">
    </div>
    <div class="form-group">
      <label >循环读取路径</label>
      <input type="text" class="form-control"    v-model="form.loopxpath" placeholder="请输入循环读取路径">
    </div>
    <div class="box-body">
      <div><span>参数</span>&nbsp;
        <button  class="form-control mybutton btn btn-danger " @click="addList" style="width:100px">新增</button>
        <button  class="form-control mybutton btn btn-primary " @click="getField" style="width:100px">获取字段</button>
      </div>
      <table class="table table-bordered"  >
        <thead>
        <tr>
          <th>字段名称</th>
          <th>XML路径</th>
          <th>节点</th>
          <th>结果类型</th>
          <th>类型</th>
          <th >操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in tableData">
          <td>
            <input type="text" class="form-control" v-model="item.field_name">
          </td>
          <td>
            <input type="text" class="form-control" v-model="item.field_xpath">
          </td>
          <td>
            <select  v-model="item.element_type" class="form-control select2 select2-hidden-accessible">
              <option v-for="item in  nodeType"  :key="item.key" :label="item.value" :value="item.key"></option>
            </select>
          </td>

          <td>
            <select  v-model="item.result_type" class="form-control select2 select2-hidden-accessible">
              <option v-for="item in  resultType"  :key="item.key" :label="item.value" :value="item.key"></option>
            </select>
          </td>

          <td>
            <select  v-model="item.field_type" class="form-control select2 select2-hidden-accessible">
              <option v-for="item in  dataType"  :key="item.key" :label="item.value" :value="item.key"></option>
            </select>
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
  name: 'table-getxml',
  props: ['item','title'],
  data() {
    return {
      form: _.cloneDeep(this.item.data) || {},
      dialogVisible: true,
      options: [],
      dataType:[],
      tableData: [],
      nodeType:[],
      resultType:[]

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
                      ele.field_name=array[i].name;
                      ele.field_xpath=array[i].name;
                      ele.field_type=array[i].type;
                      ele.element_type='节点';
                      ele.result_type='valueof';
                      that.tableData.push(ele);
                  }
              }
          })
      },
    initDataType() {
          let param=new Object();
          this.$api.getDataType(param,res => {
              if (res.code === 200) {
                debugger;
                  this.dataType = res.data
              }
          })
      },
    initResultType(){
      let param=new Object();
      this.$api.resultType(param,res => {
        if (res.code === 200) {
          this.resultType = res.data
        }
      })
    },
    initNodeType(){
      let param=new Object();
      this.$api.nodeType(param,res => {
        if (res.code === 200) {
          this.nodeType = res.data
        }
      })
    },
    addList() {
      let obj = {}
      this.tableData.push(obj)
    },
    handleDelete(index) {
      this.tableData.splice(index, 1)
    }
  },
  created() {
    this.initDataType();
    this.initResultType();
    this.initNodeType();
    this.tableData = this.form.field ? this.form.field : []
    this.tablelist = this.form.list?this.form.list : []
  }
}
</script>
