<template>

  <div style="min-height: 400px" :visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">PGPDecryptStream</h4>
    </div>
    <div class="form-group">
      <label  >步骤名称</label>
      <input type="text" class="form-control"    v-model="form.name" placeholder="请输入步骤名称">
    </div>
    <div class="form-group">
      <label  >pgp程序所在路径</label>
      <input type="text" class="form-control"    v-model="form.gpglocation" placeholder="请输入pgp程序所在路径">
    </div>
    <div class="form-group">
      <label  >pgp秘钥</label>
      <input type="text" class="form-control"    v-model="form.passhrase" placeholder="请输入pgp秘钥">
    </div>
    <div class="form-group">
      <label  >数据流字段</label>
      <input type="text" class="form-control"    v-model="form.streamfield" placeholder="请输入数据流字段">
    </div>
    <div class="form-group">
      <label  >结果流字段</label>
      <input type="text" class="form-control"    v-model="form.resultfieldname" placeholder="请输入结果流字段">
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
            this.tableData = this.form.field ? this.form.field : []
        }
    }
</script>

