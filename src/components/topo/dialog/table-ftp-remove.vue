<template>
  <div style="min-height: 400px" :visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">Ftp删除</h4>
    </div>
    <div class="form-group">
      <label for="name" >步骤名称</label>
      <input type="text" class="form-control" id="name"   v-model="form.name"   value="FTP_DELETE"
             placeholder="FTP_DELETE" disabled>
    </div>
    <div class="form-group">
      <label for="name" >主机名</label>
      <input type="text" class="form-control"    v-model="form.servername"
             placeholder="请输入主机名" >
    </div>

    <div class="form-group">
      <label for="name" >端口名</label>
      <input type="text" class="form-control"    v-model="form.port"
             placeholder="请输入端口名" >
    </div>
    <div class="form-group">
      <label for="name" >用户名</label>
      <input type="text" class="form-control"    v-model="form.username"
             placeholder="请输入用户名" >
    </div>
    <div class="form-group">
      <label for="name" >密码</label>
      <input type="text" class="form-control"    v-model="form.password"
             placeholder="请输入密码" >
    </div>
    <div class="form-group">
      <label for="name" >目录</label>
      <input type="text" class="form-control"    v-model="form.ftpdirectory"
             placeholder="请输入目录" >
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
