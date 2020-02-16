<template>
  <div style="min-height: 400px" :visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">设置字段值</h4>
    </div>
    <div class="form-group">
      <label for="name" >步骤名称</label>
      <input type="text" class="form-control" id="name"   v-model="form.name" placeholder="请输入步骤名称">
    </div>
    <div class="form-group">
      <label for="name" >字段名</label>
      <input type="text" class="form-control" id="name"   v-model="field_name" placeholder="请输入字段名">
    </div>
    <div class="form-group">
      <label for="name" >替换字段</label>
      <input type="text" class="form-control" id="name"   v-model="replace_by" placeholder="请输入替换字段">
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
  props: ['item'],
  data() {
    return {
      form: _.cloneDeep(this.item.data) || {},
      field_name: '',
      replace_by: '',

      dialogVisible: true
    }
  },
  methods: {
    onConfirm() {

          let obj = {}
          let arr = []
          obj.field_name = this.field_name
          obj.replace_by = this.replace_by
          arr.push(obj)
          this.form.field = arr
          this.item.data = this.form
          console.log(this.item.data)
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
    }
  },
  created() {
    this.field_name = this.form.field[0].field_name
    this.replace_by = this.form.field[0].replace_by
  }

}
</script>
