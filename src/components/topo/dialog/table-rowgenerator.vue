<template>
  <div style="min-height: 400px" :visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">生成记录</h4>
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
        <option v-for="item in typeoptions"  :key="item.value" :label="item.name" :value="item.value"></option>
      </select>
    </div>
    <div class="form-group">
      <label >值</label>
      <input type="text" class="form-control"    v-model="form.field_nullif" placeholder="请输入值">
    </div>
    <div class="form-group">
      <label >限制</label>
      <input type="text" class="form-control"    v-model="form.limit" placeholder="请输入生成数目（数字）">
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" @click="cancel">取消</button>
      <button type="button" class="btn btn-secondary" @click="onConfirm">确定</button>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  export default {
    name: 'table-delete',
    props: ['item'],
    data() {
      return {
        form: _.cloneDeep(this.item.data) || {},
        dialogVisible: true,
        typeoptions: []
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
        this.$axios.get('/api/dataAdminPlatform/getDataType').then(res => {
          if (res.data.code === 200) {
            let retdata = res.data.data;
            retdata.forEach((item, index, arr) => {
              let o = {};
              o.name = item;
              o.value = item;
              this.typeoptions.push(o);
            })
          }
        })
      }
    },
    created() {
      this.getSource()
    }
  }
</script>
