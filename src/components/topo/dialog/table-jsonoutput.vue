<template>
  <div style="min-height: 400px" :visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">JSon output</h4>
    </div>
    <div class="form-group">
      <label  >步骤名称</label>
      <input type="text" class="form-control"    v-model="form.name" placeholder="请输入步骤名称">
    </div>
    <div class="form-group">
      <label  >操作</label>
      <select class="form-control select2 select2-hidden-accessible" v-model="form.operation_type">
        <option v-for="item1 in jsonOperateType" :key="item1.key" :label="item1.value" :value="item1.key"></option>
      </select>
    </div>


    <div class="form-group">
      <label  >文件名</label>
      <input type="text" class="form-control"    v-model="form.file_name" placeholder="请输入文件名">
    </div>
    <div class="form-group">
      <label  >jsonBloc</label>
      <input type="text" class="form-control"    v-model="form.jsonBloc" placeholder="请输入jsonBloc">
    </div>
    <div class="form-group">
      <label  >文件扩展名</label>
      <input type="text" class="form-control"    v-model="form.file_extention" placeholder="请输入文件扩展名">
    </div>
    <div class="box">
      <div class="box-header with-border">
        <label  style="line-height: 35px;">字段</label>
        <button  class="form-control mybutton btn btn-danger " @click="addList" style="width:100px">新增</button>
      </div>
      <!-- /.box-header -->
      <div class="box-body">
        <table class="table table-bordered"  >
          <thead>
          <tr>
            <th>字段名称</th>
            <th>字段类型</th>
            <th >操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in tableData">
            <td><input type="text" class="form-control" v-model="item.field_name"></td>
            <td>
              <select class="form-control select2 select2-hidden-accessible" v-model="item.field_element">
                <option v-for="item1 in typeoptions" :key="item1.key" :label="item1.value" :value="item1.key"></option>
              </select>
            </td>
            <td>
              <button type="button" class="btn btn-info" @click="handleDelete($index, item)">删除</button>
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
  props: ['item'],
  data() {
    return {
      form: _.cloneDeep(this.item.data) || {file_required: 'N', include_subfolders: 'N'},
      dialogVisible: true,
      typeoptions: [],
      tableData: [],
      jsonOperateType:[]
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
    getSource() {
        let param=new Object();
        let that=this;
        that.$api.getTransDataType(param,res => {
        if (res.code === 200) {
          let retdata = res.data;
          retdata.forEach((item, index, arr) => {
            let o = {};
            o.key = item;
            o.value = item;
            that.typeoptions.push(o);
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
    },
     getJsonOperateType() {
          let param=new Object();
          this.$api.getJsonOperateType(param,res => {
              if (res.code === 200) {
                  let retdata = res.data;
                  retdata.forEach((item, index, arr) => {
                      let o = {};
                      o.key = item.key;
                      o.value = item.value;
                      this.jsonOperateType.push(o);
                  })
              }
          })
      }
  },
  created() {
    this.getSource()
    this.getJsonOperateType();
    this.tableData = this.form.field ? this.form.field : []
  }
}
</script>
