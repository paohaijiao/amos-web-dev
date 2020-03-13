<template>
  <div style="min-height: 400px" :visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">记录集连接</h4>
    </div>
    <div class="form-group">
      <label  >步骤名称</label>
      <input type="text" class="form-control"    v-model="form.name" placeholder="请输入步骤名称">
    </div>
    <div class="form-group">
      <label  >第一个步骤</label>
      <input type="text" class="form-control"    v-model="form.step1" placeholder="请输入排序目录">
    </div>
    <div class="form-group">
      <label  >第二个步骤</label>
      <input type="text" class="form-control"    v-model="form.step2" placeholder="请输入临时文件前缀">
    </div>
    <div class="form-group">
      <label  >第一个步骤连接字段</label>
      <input type="text" class="form-control"    v-model="form.keys_1" placeholder="请输入第一个步骤连接字段">
    </div>
    <div class="form-group">
      <label  >第二个步骤连接字段</label>
      <input type="text" class="form-control"    v-model="form.keys_2" placeholder="请输入第二个步骤连接字段">
    </div>
    <div class="form-group">
      <label >连接类型</label>
      <select  v-model="form.join_type" class="form-control select2 select2-hidden-accessible">
        <option v-for="item in  types"  :key="item.key" :label="item.value" :value="item.key"></option>
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
  props: ['item'],
  data() {
    return {
      form: _.cloneDeep(this.item.data) || {},
      dialogVisible: true,
      types: [],
      tableData: [],
      options:[],
      types:[]
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
    },
      getSource() {

          let param=new Object();

          let that=this;
          this.$api.getJoinType(param,res => {
              if (res.code === 200) {
                  that.types = res.data
              }
          })
      },
  },
  created() {
    this.tableData = this.form.field ? this.form.field : []
    this.getSource();
  }
}
</script>
