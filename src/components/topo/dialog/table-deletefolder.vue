<template>
  <div style="min-height: 400px" :visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">删除目录(此组件文件名绑定组件名)</h4>
    </div>
    <div class="form-group">
      <label for="name" >步骤名称</label>
      <input type="text" class="form-control" id="name"   v-model="form.name"   value="DELETE_FILES"
             placeholder="DELETE_FILES" disabled>
    </div>
    <div class="form-group">
      <label for="name" >文件名</label>
      <input type="text" class="form-control"    v-model="form.name"       placeholder="请输入文件名" >
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
        form: _.cloneDeep(this.item.data) || {},
        dialogVisible: true,
        typeoptions: [],
        tableData: [],
          list:[],
          loglist:[],
          name:''
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
