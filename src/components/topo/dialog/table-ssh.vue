<template>
  <div style="min-height: 400px" :visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">运行SSH命令</h4>
    </div>
    <div class="form-group">
      <label >步骤名称</label>
      <input type="text" class="form-control"    v-model="form.name" placeholder="请输入步骤名称">
    </div>
    <div class="form-group">
      <label  >主机名</label>
      <input type="text" class="form-control"   v-model="form.servername" placeholder="请输入主机名">
    </div>
    <div class="form-group">
      <label >端口号</label>
      <input type="text" class="form-control"    v-model="form.port" placeholder="请输入端口号">
    </div>
    <div class="form-group">
      <label  >用户名</label>
      <input type="text" class="form-control" v-model="form.userName" placeholder="请输入用户名">
    </div>

    <div class="form-group">
      <label  >密码</label>
      <input type="text" class="form-control" v-model="form.password" placeholder="请输入密码">
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
        option: [
          {name: 'Y', value: 'Y' },
          {name: 'N', value: 'N' }
        ],
          types: [],
        typeoptions: [],
        tableData: [],

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
      addList() {
        let obj = {}
        this.tableData.push(obj)
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
