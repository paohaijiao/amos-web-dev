<template>
  <div style="min-height: 400px" :visible="dialogVisible">
  <div class="modal-header">
    <h4 class="modal-title">转换</h4>
  </div>
  <div class="form-group">
    <label >步骤名称</label>
    <select  v-model="form.name" class="form-control select2 select2-hidden-accessible">
      <option v-for="item in  list"  :key="item.name" :label="item.name" :value="item.name"></option>
    </select>
  </div>

  <div class="form-group">
    <label >日志级别</label>
    <select  v-model="form.loglevel" class="form-control select2 select2-hidden-accessible">
      <option v-for="item in  loglist"  :key="item.code" :label="item.description" :value="item.code"></option>
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
          var param=new Object();
          param.taskType='KettleJob';
        this.$api.getTaskConfigList(param,res => {
          if (res.code === 200) {
              that.list = res.data;
          }
        })
      },
      handleDelete(index) {
        this.tableData.splice(index, 1)
      },
        getLogLevel(){
          let that=this;
            let param=new Object();
            this.$api.getLogLevel(param,res => {
                if (res.code === 200) {
                    that.loglist = res.data;
                }
            })
        }
    },
    created() {
        this.getSource()
        this.getLogLevel();
        this.tableData = this.form.field ? this.form.field : []
    }
  }
</script>

