<template>
  <div style="min-height: 400px":visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">映射输入规范</h4>
    </div>
    <div class="form-group">
      <label  >步骤名称</label>
      <input type="text" class="form-control"    v-model="form.name" placeholder="请输入步骤名称">
    </div>


    <div class="box">
      <div class="box-header with-border">
        <label  style="line-height: 35px;">字段</label>
        <button  class="form-control mybutton btn btn-danger " @click="addList" style="width:100px">新增</button>
        <button  class="form-control mybutton btn btn-primary " @click="getField" style="width:100px">获取字段</button>
      </div>
      <!-- /.box-header -->
      <div class="box-body">
        <table class="table table-bordered"  >
          <thead>
          <tr>
            <th>名称</th>
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
              <input type="text" class="form-control" v-model="item.field_type">
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
