<template>
  <div style="min-height: 400px" :visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">属性文件输出</h4>
    </div>
    <div class="form-group">
      <label  >步骤名称</label>
      <input type="text" class="form-control"    v-model="form.name" placeholder="请输入步骤名称">
    </div>
    <div class="form-group">
      <label >key字段</label>
      <input type="text" class="form-control"    v-model="form.keyfield" placeholder="请输入key字段">
    </div>
    <div class="form-group">
      <label >value字段</label>
      <input type="text" class="form-control"    v-model="form.valuefield" placeholder="请输入value字段">
    </div>
    <div class="form-group">
      <label >文件路徑</label>
      <input type="text" class="form-control"    v-model="form.file_name" placeholder="请输入文件路徑">
    </div>
    <div class="form-group">
      <label >扩展名</label>
      <select  v-model="form.file_extention" class="form-control select2 select2-hidden-accessible">
        <option v-for="item in  types"  :key="item.key" :label="item.value" :value="item.key"></option>
      </select>
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
      resultType:[],
      types:[{"key":"properties","value":"properties"}]

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
