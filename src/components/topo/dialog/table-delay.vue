<template>
  <div style="min-height: 400px" :visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">空操作</h4>
    </div>
    <div class="form-group">
      <label for="name" >步骤名称</label>
      <input type="text" class="form-control" id="name"   v-model="form.name" placeholder="请输入步骤名称">
    </div>
    <div class="form-group">
      <label  >超时</label>
      <input type="text" class="form-control"   v-model="form.timeout" placeholder="请输入超时">
    </div>
    <div class="form-group">
      <label  >单位</label>
      <select  v-model="form.scaletime" class="form-control select2 select2-hidden-accessible">
        <option v-for="item in  scaleType"  :key="item.key" :label="item.value" :value="item.key"></option>
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
        option: [
          {name: 'Y', value: 'Y' },
          {name: 'N', value: 'N' }
        ],
          types: [],
        typeoptions: [],
        tableData: [],
        scaleType:[]

      }
    },
    methods: {
      onConfirm() {
            this.form.field = this.tableData
            this.item.data = this.form
            $('#myModal').modal('hide')
             this.onClose()
      },
      onClose() {
        this.dialogVisible = false
        this.$emit('on-close', this.item)
      },
      cancel() {
        $('#myModal').modal('hide')
        this.onClose()
      },
      addList() {
        let obj = {}
        this.tableData.push(obj)
      },
      initScaleType() {
        let param=new Object();
        this.$api.scaleType(param,res => {
          if (res.code === 200) {
            this.scaleType = res.data
          }
        })
      },
      handleDelete(index) {
        this.tableData.splice(index, 1)
      }
    },
    created() {
      this.initScaleType();
      this.tableData = this.form.field ? this.form.field : []
    }
  }
</script>
