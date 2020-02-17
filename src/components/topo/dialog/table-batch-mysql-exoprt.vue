<template>

  <div style="min-height: 400px" :visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">从 MySQL 批量导出到文件</h4>
    </div>
    <div class="form-group">
      <label for="name" >步骤名称</label>
      <input type="text" class="form-control" id="name"   v-model="form.name"   value="MYSQL_BULK_FILE"
             placeholder="MYSQL_BULK_FILE" disabled>
    </div>
    <div class="form-group">
      <label >数据源</label>
      <select  v-model="form.id_database" class="form-control select2 select2-hidden-accessible">
        <option v-for="item in list"  :key="item.id" :label="item.name" :value="item.id"></option>
      </select>
    </div>
    <div class="form-group">
      <label for="name" >模式</label>
      <input type="text" class="form-control"    v-model="form.schemaname"   value="请输入模式"
             placeholder="请输入模式" >
    </div>
    <div class="form-group">
      <label for="name" >表名称</label>
      <input type="text" class="form-control"    v-model="form.tablename"   value="请输入表名称"
             placeholder="表名称" >
    </div>
    <div class="form-group">
      <label for="name" >有权限导出的目录</label>
      <input type="text" class="form-control"    v-model="form.filename"   value="请输入有权限导出的目录"
             placeholder="有权限导出的目录" >
    </div>
    <div class="form-group">
      <label for="name" >字段分隔符</label>
      <input type="text" class="form-control"    v-model="form.separator"   value="请输入字段分隔符"
             placeholder="字段分隔符" >
    </div>
    <div class="form-group">
      <label for="name" >字段封闭符</label>
      <input type="text" class="form-control"    v-model="form.enclosed"   value="请输入字段封闭符"
             placeholder="字段封闭符" >
    </div>
    <div class="form-group">
      <label for="name" >行分隔符</label>
      <input type="text" class="form-control"    v-model="form.lineterminated"   value="行分隔符"
             placeholder="行分隔符" >
    </div>
    <div class="form-group">
      <label for="name" >字段</label>
      <input type="text" class="form-control"    v-model="form.listcolumn"   value="字段"
             placeholder="字段" >
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
      cancel() {
        $('#myModal').modal('hide')
        this.onClose()
      },
      onClose() {
        this.dialogVisible = false
        this.$emit('on-close', this.item)
      },
      getSource() {
          let that=this;
          var obj=new Object();
          obj.taskType='KettleJob';
          this.$api.getListAllDatabaseNotPage(obj,res => {
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
        this.getSource();
        this.tableData = this.form.field ? this.form.field : []
    }
  }
</script>
