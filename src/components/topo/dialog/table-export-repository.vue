<template>
  <div style="min-height: 400px" :visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">导出资源库到XML文件</h4>
    </div>
    <div class="form-group">
      <label for="name" >步骤名称</label>
      <input type="text" class="form-control" id="name"   v-model="form.name"   value="EXPORT_REPOSITORY"
             placeholder="EXPORT_REPOSITORY" disabled>
    </div>
    <div class="form-group">
      <label >导出类型</label>
      <select  v-model="form.export_type" class="form-control select2 select2-hidden-accessible">
        <option v-for="item in  list"  :key="item.key" :label="item.value" :value="item.key"></option>
      </select>
    </div>
    <div class="form-group">
      <label for="name" >导出文件路径</label>
      <input type="text" class="form-control"    v-model="form.targetfilename"
             placeholder="请输入导出文件路径" >
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
        typeoptions: [],
        tableData: [],
          list:[],
          loglist:[],
          name:''
      }
    },
    methods: {
      onConfirm() {
        this.form.field = this.tableData
        this.item.data = this.form
        $('#myModal').modal('hide')
        this.onClose();
      },
      onClose() {
        this.dialogVisible = false
        this.$emit('on-close', this.item)
      },
      cancel() {
        $('#myModal').modal('hide')
        this.onClose()
      },
      getSource() {
          let that=this;
        this.$api.getExportType({},res => {
          if (res.code === 200) {
              that.list = res.data;
          }
        })
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
