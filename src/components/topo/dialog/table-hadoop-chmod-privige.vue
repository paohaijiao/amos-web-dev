<template>
  <div style="min-height: 400px" :visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">修改hdfs权限</h4>
    </div>
    <div class="form-group">
      <label  >步骤名称</label>
      <input type="text" class="form-control"   v-model="form.name" placeholder="请输入步骤名称">
    </div>

    <div class="form-group">
      <label  >拥有hdfs权限的用户名字段</label>
      <input type="text" class="form-control"    v-model="form.user" placeholder="请输入拥有hdfs权限的用户名字段">
    </div>

    <div class="form-group">
      <label  >权限字段</label>
      <input type="text" class="form-control"    v-model="form.privige" placeholder="请输入权限字段">
    </div>

    <div class="form-group">
      <label  >路径字段</label>
      <input type="text" class="form-control"    v-model="form.path" placeholder="请输入路径字段">
    </div>
    <div class="form-group">
      <label  >fs.defaultFS 字段</label>
      <input type="text" class="form-control"    v-model="form.uri" placeholder="请输入fs.defaultFS 字段">
    </div>
    <div class="form-group">
      <label  >结果输出字段</label>
      <input type="text" class="form-control"    v-model="form.output" placeholder="请输入结果输出字段">
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
            this.onClose()
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
