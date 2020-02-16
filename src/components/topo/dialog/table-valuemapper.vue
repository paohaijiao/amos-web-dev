<template>
  <div style="min-height: 400px" :visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">值映射</h4>
    </div>
    <div class="form-group">
      <label  >步骤名称</label>
      <input type="text" class="form-control"    v-model="form.name" placeholder="请输入步骤名称">
    </div>
    <div class="form-group">
      <label  >使用字段名</label>
      <input type="text" class="form-control"    v-model="form.field_to_use" placeholder="请输入使用字段名">
    </div>
    <div class="form-group">
      <label  >目标字段名</label>
      <input type="text" class="form-control"    v-model="form.target_field" placeholder="请输入目标字段名">
    </div>
    <div class="form-group">
      <label  >不匹配时的默认值</label>
      <input type="text" class="form-control"    v-model="form.non_match_default" placeholder="请输入不匹配时的默认值">
    </div>
    <div class="form-group">
      <label  >源值</label>
      <input type="text" class="form-control"    v-model="form.source_value" placeholder="请输入源值">
    </div>
    <div class="form-group">
      <label  >目标值</label>
      <input type="text" class="form-control"    v-model="form.target_value" placeholder="请输入目标值">
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
    }
  },
  created() {

  }

}
</script>
