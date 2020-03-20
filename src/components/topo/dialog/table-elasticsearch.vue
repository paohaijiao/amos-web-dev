<template>

  <div style="min-height: 400px" :visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">ElasticSearch bulk</h4>
    </div>
    <div class="form-group">
      <label for="name" >步骤名称</label>
      <input type="text" class="form-control" id="name"   v-model="form.name" placeholder="请输入步骤名称">
    </div>
    <div class="form-group">
      <label for="name" >主机名 </label>
      <input type="text" class="form-control"   v-model="form.server_address" placeholder="请输入文件名">
    </div>
    <div class="form-group">
      <label for="name" >端口号 </label>
      <input type="text" class="form-control"   v-model="form.server_port" placeholder="请输入端口号">
    </div>
    <div class="form-group">
      <label for="name" >参数名 </label>
      <input type="text" class="form-control"   v-model="form.setting_name" placeholder="请输入参数名">
    </div>

    <div class="form-group">
      <label for="name" >参数值</label>
      <input type="text" class="form-control"   v-model="form.setting_value" placeholder="请输入参数值">
    </div>
    <div class="form-group">
      <label for="name" >索引名</label>
      <input type="text" class="form-control"   v-model="form.general_index" placeholder="请输入索引名">
    </div>
    <div class="form-group">
      <label for="name" >索引类型</label>
      <input type="text" class="form-control"   v-model="form.general_type" placeholder="请输入索引名">
    </div>
    <div class="form-group">
      <label for="name" >主键</label>
      <input type="text" class="form-control"   v-model="form.general_idField" placeholder="请输入主键">
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
            <th>字段名</th>
            <th>字段列</th>
            <th >操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in tableData">
            <td><input type="text" class="form-control" v-model="item.field_columnName"></td>
            <td><input type="text" class="form-control" v-model="item.field_targetName"></td>
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
      typeoptions: [],
      tableData: []
    }
  },
  methods: {
    onConfirm() {
      this.form.field = this.tableData
      this.item.data = this.form
      $('#myModal').modal('hide')
      this.onClose();
    },
    getField(){
          let param=new Object();
          param.transName=this.title;
          param.stepName=this.form.name
          this.form.field = this.tableData
          let that=this;
          this.$api.getFieldFromPreviousStep(param,res => {
              if (res.code === 200) {
                  that.tableData=[];
                  let array=res.data.data;
                  for(var i=0;i<array.length;i++){
                      let ele=new Object();
                      ele.field_columnName=array[i].name;
                      ele.field_targetName=array[i].type;
                      that.tableData.push(ele);
                  }
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
    cancel() {
      $('#myModal').modal('hide')
      this.onClose()
    },
    getSource() {
        let param=new Object();
      this.$api.getTransDataType(param,res => {
        if (res.code === 200) {
          let retdata = res.data;
          retdata.forEach((item, index, arr) => {
            let o = {};
            o.name = item;
            o.value = item;
            this.typeoptions.push(o);
          })
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
    this.getSource()
    this.tableData = this.form.field ? this.form.field : []
  }
}
</script>
