<template>
  <div style="min-height: 400px" :visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">获取变量</h4>
    </div>
    <div class="form-group">
      <label  >步骤名称</label>
      <input type="text" class="form-control"    v-model="form.name" placeholder="请输入步骤名称">
    </div>
    <div class="box-body">
      <div class="box-header with-border">
        <label style="line-height: 35px;">字段</label>
        <button  class="form-control mybutton btn btn-danger " @click="addList" style="width:100px">新增</button>
      </div>
      <table class="table table-bordered"  >
        <thead>
        <tr>
          <th>新字段</th>
          <th>字段类型</th>
          <th >操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in tableData">
          <td><input type="text" class="form-control" v-model="item.field_name"></td>
          <td>
            <select class="form-control select2 select2-hidden-accessible" v-model="item.field_type">
              <option v-for="item1 in typeoptions" :key="item1.key" :label="item1.value" :value="item1.value"></option>
            </select>
          </td>
          <td>
            <button type="button" class="btn btn-info" @click="handleDelete(index, item)">删除</button>
          </td>
        </tr>
        </tbody>
      </table>
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
          let param=new Object();
          let that=this;
          this.$api.getFileType(param,res => {
          if (res.code === 200) {
            let retdata = res.data;
              that.typeoptions=retdata;
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
