<template>
  <div style="min-height: 400px" :visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">增加常量</h4>
    </div>
    <div class="form-group">
      <label  >步骤名称</label>
      <input type="text" class="form-control"    v-model="form.name" placeholder="请输入步骤名称">
    </div>
    <div class="box-body">
      <div><span>字段</span>&nbsp;
        <button  class="form-control mybutton btn btn-danger " @click="addList" style="width:100px">新增</button>
      </div>

      <table class="table table-bordered"  >
        <thead>
        <tr>
          <th>字段名</th>
          <th>字段类型</th>
          <th>设置字段值</th>
          <th >操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in tableData">
          <td>
            <input type="text" class="form-control" v-model="item.field_name">
          </td>
          <td>
            <select  v-model="item.field_type" class="form-control select2 select2-hidden-accessible">
              <option v-for="item in  options"  :key="item.value" :label="item.label" :value="item.value"></option>
            </select>
          </td>
          <td>
            <input type="text" class="form-control" v-model="item.field_nullif">
          </td>
          <td>
            <button type="button" class="btn btn-info" @click="handleDelete(index, item)">删除</button>
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
  name: 'table-delete',
  props: ['item'],
  data() {
    return {
      form: _.cloneDeep(this.item.data) || {},
      dialogVisible: true,
      options: [
        {
          label: 'String',
          value: 'String'
        },{
          label: 'BigNumber',
          value: 'BigNumber'
        },{
          label: 'Boolean',
          value: 'Boolean'
        },{
          label: 'Number',
          value: 'Number'
        },{
          label: 'Integer',
          value: 'Integer'
        },{
          label: 'Date',
          value: 'Date'
        },{
          label: 'TimeStamp',
          value: 'TimeStamp'
        }
      ],
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
