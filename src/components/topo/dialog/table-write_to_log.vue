<template>

  <div style="min-height: 400px" :visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">写日志</h4>
    </div>
    <div class="form-group">
      <label for="name" >步骤名称</label>
      <input type="text" class="form-control" id="name"   v-model="form.name"   value="写日志"
             placeholder="写日志" disabled>
    </div>
    <div class="form-group">
      <label for="name" >消息</label>
      <input type="text" class="form-control"    v-model="form.logmessage"   value="请输入消息"
             placeholder="请输入消息" >
    </div>
    <div class="form-group">
      <label for="name" >主题</label>
      <input type="text" class="form-control"    v-model="form.logsubject"
             placeholder="请输入主题" >
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
          var obj=new Object();
          obj.taskType='KettleJob';
        this.$axios.get('/api/sysTaskConfigApi/taskList',obj).then(res => {
          if (res.data.code === 200) {
              that.list = res.data.data;
          }
        })
      },
      handleDelete(index) {
        this.tableData.splice(index, 1)
      },
        getLogLevel(){
          let that=this;
            this.$axios.get('/api/kettleJobApi/getLogLevel').then(res => {
                if (res.data.code === 200) {
                    that.loglist = res.data.data;
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
