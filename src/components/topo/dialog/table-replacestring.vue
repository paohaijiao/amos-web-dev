<template>
  <div style="min-height: 400px" :visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">字符串替换</h4>
    </div>
    <div class="form-group">
      <label  >步骤名称</label>
      <input type="text" class="form-control"    v-model="form.name" placeholder="请输入步骤名称">
    </div>
    <div class="box-body">
      <div><span>选择字段方式</span>&nbsp;
        <button  class="form-control mybutton btn btn-danger " @click="addList" style="width:100px">新增</button>
        <button  class="form-control mybutton btn btn-primary " @click="getField" style="width:100px">获取字段</button>
      </div>
      <table class="table table-bordered"   >
        <thead>
        <tr>
          <th>输入流字段</th>
          <th>搜索</th>
          <th>使用...替换</th>
          <th >操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in tableData">
          <td>
            <input type="text" class="form-control" v-model="item.in_stream_name">
          </td>
          <td>
            <input type="text" class="form-control" v-model="item.replace_string">
          </td>
          <td>
            <input type="text" class="form-control" v-model="item.replace_by_string">
          </td>
          <td>
            <button type="button" class="btn btn-info" @click="handleDelete($index, item)">删除</button>
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
                      ele.in_stream_name=array[i].name;
                      ele.replace_string='';
                      ele.replace_by_string='';
                      ele.cut_to=0;
                      that.tableData.push(ele);
                  }
                  this.dialogVisible=true;
              }
          })
      },
    onClose() {
      this.dialogVisible = false
      this.$emit('on-close', this.item)
      // this.item.updateItem({
      //     text: this.form.title
      // })
    },
    addList() {
      this.dialogVisible=false;
      let obj = {}
      this.tableData.push(obj)
      this.dialogVisible=true;
    },
    handleDelete(index) {
      this.tableData.splice(index, 1)
    }
  },
  created() {
    this.tableData = this.form.field ? this.form.field : []
  }

}
</script>
