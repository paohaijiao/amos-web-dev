<template>
  <div style="min-height: 400px" :visible="dialogVisible">
  <div class="modal-header">
    <h4 class="modal-title">DB join</h4>
  </div>
  <div class="form-group">
    <label for="name" >步骤名称</label>
    <input type="text" class="form-control" id="name"   v-model="form.name" placeholder="请输入步骤名称">
  </div>
  <div class="form-group">
    <label >数据源</label>
    <select  v-model="form.id_connection" class="form-control select2 select2-hidden-accessible">
      <option v-for="item in  options"  :key="item.id" :label="item.name" :value="item.id"></option>
    </select>
  </div>
  <div class="form-group">
    <label  >sql</label>
    <input type="text" class="form-control"    v-model="form.sql" placeholder="sql">
  </div>
  <div class="box">
    <div class="box-header with-border">
      <label  style="line-height: 35px;">Db join</label>
      <button  class="form-control mybutton btn btn-danger " @click="addList" style="width:100px">新增</button>
    </div>
    <!-- /.box-header -->
    <div class="box-body">
      <table class="table table-bordered"  >
        <thead>
        <tr>
          <th>参数字段</th>
          <th>参数类型</th>

          <th >操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in tableData">
          <td><input type="text" class="form-control" v-model="item.parameter_field"></td>
          <td>
            <select class="form-control select2 select2-hidden-accessible" v-model="item.parameter_type">
              <option v-for="item1 in typeoptions" :key="item1.value" :label="item1.name" :value="item1.value"></option>
            </select>
          </td>
          <td>
            <button type="button" class="btn btn-info" @click="handleDelete($index, item)">删除</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <!-- /.box-body -->
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
          options:[]

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
         let that=this;
              this.$axios.get('/api/dataAdminPlatform/listAllDatabase').then(res => {
                  if (res.data.code === 200) {
                      that.options = res.data.data
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
