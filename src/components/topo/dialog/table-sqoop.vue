<template>
  <div style="min-height: 400px" :visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">Sqoop</h4>
    </div>
    <div class="form-group">
      <label for="name" >步骤名称</label>
      <input type="text" class="form-control" id="name"   v-model="form.name" placeholder="请输入步骤名称">
    </div>
    <div class="form-group">
      <label for="name" >方式字段</label>
      <input type="text" class="form-control" id="name"   v-model="form.method" placeholder="请输入方式字段">
    </div>
    <div class="form-group">
      <label for="name" >fs.defaultFS 字段</label>
      <input type="text" class="form-control" id="name"   v-model="form.uri" placeholder="请输入fs.defaultFS 字段">
    </div>
    <div class="form-group">
      <label for="name" >输出字段</label>
      <input type="text" class="form-control" id="name"   v-model="form.output" placeholder="请输入输出字段">
    </div>
    <div class="form-group">
      <label for="name" >yarn 字段</label>
      <input type="text" class="form-control" id="name"   v-model="form.yarn" placeholder="请输入yarn 字段">
    </div>
    <div class="form-group">
      <label for="name" >参数字段</label>
      <input type="text" class="form-control" id="name"   v-model="form.argument" placeholder="请输入参数字段">
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
      options: [{'key':'import','value':'import'},{'key':'export','value':'export'}]
    }
  },
  methods: {
    onConfirm() {
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
    }
  },
  created() {

  }
}
</script>
