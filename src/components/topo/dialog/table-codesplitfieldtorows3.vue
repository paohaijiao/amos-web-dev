<template>

  <div style="min-height: 400px" :visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">列拆分多行</h4>
    </div>
    <div class="form-group">
      <label  >步骤名称</label>
      <input type="text" class="form-control"    v-model="form.name" placeholder="请输入步骤名称">
    </div>
    <div class="form-group">
      <label  >要拆分的字段</label>
      <input type="text" class="form-control"    v-model="form.splitfield" placeholder="请输入要拆分的字段">
    </div>
    <div class="form-group">
      <label  >分隔符</label>
      <input type="text" class="form-control"    v-model="form.delimiter" placeholder="请输入分隔符">
    </div>
    <div class="form-group">
      <label  >新字段</label>
      <input type="text" class="form-control"    v-model="form.newfield" placeholder="请输入新字段">
    </div>
    <div class="form-group">
      <label  >是否正则表达式</label>
        <select  v-model="form.delimiter_is_regex" class="form-control select2 select2-hidden-accessible">
          <option v-for="item in  options"  :key="item.value" :label="item.name" :value="item.value"></option>
        </select>
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
      dialogVisible: true,
      options: [
        {
          name: 'yes',
          value: 'yes'
        },{
          name: 'no',
          value: 'no'
        }
      ]
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
    }
  },
  created() {

  }

}
</script>
