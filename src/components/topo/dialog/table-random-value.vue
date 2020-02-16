<template>
  <div style="min-height: 400px" :visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">生成随机数</h4>
    </div>

    <div class="form-group">
      <label  >步骤名称</label>
      <input type="text" class="form-control"   v-model="form.name" placeholder="请输入步骤名称">
    </div>
    <div class="form-group">
      <label >字段名称</label>
      <input type="text" class="form-control"    v-model="form.field_name" placeholder="请输入字段名称">
    </div>
    <div class="form-group">
      <label >字段类型</label>
      <select  v-model="form.field_type" class="form-control select2 select2-hidden-accessible">
        <option v-for="item in typeoptions"  :key="item.key" :label="item.value" :value="item.key"></option>
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
      getSource() {
          let that=this;
        this.$axios.get('/api/kettleApi/randomType').then(res => {
          if (res.data.code === 200) {
              that.typeoptions = res.data.data;
              debugger;
          }
        })
          this.$axios.get('/api/kettleApi/calcType').then(res => {
              if (res.data.code === 200) {
                  that.types = res.data.data;
              }
          })
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
      this.getSource()
      this.tableData = this.form.field ? this.form.field : []
    }
  }
</script>
