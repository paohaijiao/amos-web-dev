<template>
  <div style="min-height: 400px" :visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">数据库查询</h4>
    </div>
    <div class="form-group">
      <label  >步骤名称</label>
      <input type="text" class="form-control"    v-model="form.name" placeholder="请输入步骤名称">
    </div>
    <div class="form-group">
      <label  >排序目录(示例：%%java.io.tmpdir%%)</label>
      <input type="text" class="form-control"    v-model="form.directory" placeholder="请输入排序目录">
    </div>
    <div class="form-group">
      <label  >临时文件前缀(示例：out)</label>
      <input type="text" class="form-control"    v-model="form.prefix" placeholder="请输入临时文件前缀">
    </div>
    <div class="form-group">
      <label  >以上一步的哪一个步骤为主</label>
      <input type="text" class="form-control"    v-model="form.main" placeholder="请输入步骤名称">
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
      compares:[]
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
          let obj=new Object();
          obj.key='N'
          obj.value='否'
          this.types.push(obj);
          let obj1=new Object();
          obj1.key='Y'
          obj1.value='是'
          this.types.push(obj1);

          let param=new Object();

          let that=this;
          this.$api.getListAllDatabaseNotPage(param,res => {
              if (res.code === 200) {
                  that.options = res.data
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
