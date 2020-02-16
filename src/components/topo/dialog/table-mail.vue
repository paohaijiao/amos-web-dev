<template>
  <div style="min-height: 400px" :visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">发送信件</h4>
    </div>
    <div class="form-group">
      <label for="name" >步骤名称</label>
      <input type="text" class="form-control" id="name"   v-model="form.name"   value="MAIL"
             placeholder="MAIL" disabled>
    </div>
    <div class="form-group">
      <label for="name" >SMTP地址</label>
      <input type="text" class="form-control"    v-model="form.server"       placeholder="SMTP地址" >
    </div>
    <div class="form-group">
      <label for="name" >端口号</label>
      <input type="text" class="form-control"    v-model="form.port"       placeholder="请输入端口号" >
    </div>
    <div class="form-group">
      <label for="name" >收件人</label>
      <input type="text" class="form-control"    v-model="form.destination"       placeholder="请输入收件人" >
    </div>
    <div class="form-group">
      <label for="name" >抄送人</label>
      <input type="text" class="form-control"    v-model="form.destinationCc"       placeholder="请输入抄送人" >
    </div>
    <div class="form-group">
      <label for="name" >暗送人</label>
      <input type="text" class="form-control"    v-model="form.destinationBCc"       placeholder="请输入暗送人" >
    </div>
    <div class="form-group">
      <label for="name" >发件人地址</label>
      <input type="text" class="form-control"    v-model="form.replyto"       placeholder="请输入发件人地址" >
    </div>
    <div class="form-group">
      <label for="name" >收件人显示的名称</label>
      <input type="text" class="form-control"    v-model="form.replytoname"       placeholder="请输入收件人显示的名称" >
    </div>
    <div class="form-group">
      <label for="name" >主题</label>
      <input type="text" class="form-control"    v-model="form.subject"       placeholder="请输入主题" >
    </div>
    <div class="form-group">
      <label for="name" >联系人</label>
      <input type="text" class="form-control"    v-model="form.contact_person"       placeholder="请输入联系人" >
    </div>
    <div class="form-group">
      <label for="name" >联系电话</label>
      <input type="text" class="form-control"    v-model="form.contact_phone"       placeholder="请输入联系电话" >
    </div>
    <div class="form-group">
      <label for="name" >评论</label>
      <input type="text" class="form-control"    v-model="form.comment"       placeholder="请输入评论" >
    </div>
    <div class="form-group">
    <label for="name" >用户名</label>
    <input type="text" class="form-control"    v-model="form.auth_user"       placeholder="请输入用户名" >
  </div>
    <div class="form-group">
      <label for="name" >密码</label>
      <input type="text" class="form-control"    v-model="form.auth_password"       placeholder="请输入密码" >
    </div>
    <div class="form-group">
      <label for="name" >回复地址</label>
      <input type="text" class="form-control"    v-model="form.replyToAddresses"       placeholder="请输入回复地址" >
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
