<template>
  <div style="min-height: 400px":visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">映射输入规范</h4>
    </div>
    <div class="form-group">
      <label  >步骤名称</label>
      <input type="text" class="form-control"    v-model="form.name" placeholder="请输入步骤名称">
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" @click="cancel">取消</button>
      <button type="button" class="btn btn-secondary" @click="onConfirm">确定</button>
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
      dialogVisible: true
    }
  },
  methods: {
    onConfirm() {
      this.form.field = this.tableData
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
     getField(){
          let param=new Object();
          param.transName=this.title;
          param.stepName=this.form.name
          this.form.field = this.tableData
          let that=this;

          this.$api.getFieldFromPreviousStep(param,res => {
              if (res.code === 200) {
                  this.dialogVisible=false;
                  that.tableData=[];
                  let array=res.data.data;

                  for(var i=0;i<array.length;i++){
                      let ele=new Object();
                      ele.field_name=array[i].name;
                      ele.field_type=array[i].type;
                      that.tableData.push(ele);
                  }
                  this.dialogVisible=true;
              }
          })
      },
    addList() {
      this.dialogVisible=false;
      let obj = {};
      this.tableData.push(obj);
      this.dialogVisible=true;
    },
    handleDelete(index) {
        this.dialogVisible=false;
        this.tableData.splice(index, 1)
        this.dialogVisible=true;
    }
  },
  created() {
    this.tableData = this.form.field ? this.form.field : []
  }

}
</script>
