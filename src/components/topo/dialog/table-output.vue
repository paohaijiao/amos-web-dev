<template>
  <div style="min-height: 400px" :visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">表输出</h4>
    </div>
    <div class="form-group">
      <label  >步骤名称</label>
      <input type="text" class="form-control"    v-model="form.name" placeholder="请输入步骤名称">
    </div>
    <div class="form-group">
      <label >数据源</label>
      <select  v-model="form.id_connection" class="form-control select2 select2-hidden-accessible">
        <option v-for="item in  options"  :key="item.id" :label="item.name" :value="item.id"></option>
      </select>
    </div>
    <div class="form-group">
      <label  >目标模式</label>
      <input type="text" class="form-control"    v-model="form.schema" placeholder="请输入模式内容">
    </div>
    <div class="form-group">
      <label  >目标表</label>
      <input type="text" class="form-control"    v-model="form.table" placeholder="请输入目标表">
    </div>
    <div class="form-group">
      <label  >提交记录数量</label>
      <input type="text" class="form-control"    v-model="form.commit" placeholder="请输入提交记录数量">
    </div>
    <div class="box-body">
      <div><span>数据库字段</span>&nbsp;
        <button  class="form-control mybutton btn btn-danger " @click="addList" style="width:100px">新增</button>
      </div>

      <table class="table table-bordered"  >
        <thead>
        <tr>
          <th>表字段</th>
          <th>流字段</th>
          <th >操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in tableData">
          <td>
            <input type="text" class="form-control" v-model="item.columnName">
          </td>
          <td>
            <input type="text" class="form-control" v-model="item.streamName">
          </td>
          <td>
            <button type="button" class="btn btn-info" @click="handleDelete($index, item)">删除</button>
          </td>

        </tr>
        </tbody>
      </table>

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
      options: [],
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
      this.$axios.get('/api/dataAdminPlatform/listAllDatabase').then(res => {
        if (res.data.code === 200) {
          this.options = res.data.data
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
