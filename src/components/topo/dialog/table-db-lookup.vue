<template>
  <div style="min-height: 400px" :visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">数据库查询</h4>
    </div>
    <div class="form-group">
      <label  >步骤名称</label>
      <input type="text" class="form-control"    v-model="form.name" placeholder="请输入步骤名称">
    </div>
    <div class="form-group">
      <label >数据源</label>
      <select  v-model="form.id_connection" class="form-control select2 select2-hidden-accessible">
        <option v-for="item in  options"  :key="item.id" :label="item.name" :value="item.id"></option>
      </select>
    </div>
    <div class="form-group">
      <label  >模式名</label>
      <input type="text" class="form-control"    v-model="form.lookup_schema" placeholder="请输入模式名">
    </div>
    <div class="form-group">
      <label  >表字段</label>
      <input type="text" class="form-control"    v-model="form.lookup_key_name" placeholder="请输入表名">
    </div>
    <div class="form-group">
      <label >比较操作符</label>
      <select  v-model="form.lookup_key_condition" class="form-control select2 select2-hidden-accessible">
        <option v-for="item in  compares"  :key="item.key" :label="item.value" :value="item.key"></option>
      </select>
    </div>
    <div class="form-group">
      <label  >流字段</label>
      <input type="text" class="form-control"    v-model="form.lookup_key_field" placeholder="请输入表名">
    </div>

    <div class="form-group">
      <label  >表名</label>
      <input type="text" class="form-control"    v-model="form.lookup_table" placeholder="请输入表名">
    </div>

    <div class="box">
      <div class="box-header with-border">
        <label style="line-height: 35px;">字段</label>
        <button  class="form-control mybutton btn btn-danger " @click="addList" style="width:100px">新增</button>
      </div>
      <!-- /.box-header -->
      <div class="box-body">
        <table class="table table-bordered"  >
          <thead>
          <tr>
            <th>字段</th>
            <th>新的名称</th>
            <th>默认</th>
            <th>类型</th>
            <th>是否升序</th>
            <th >操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in tableData">
            <td><input type="text" class="form-control" v-model="item.return_value_name"></td>
            <td><input type="text" class="form-control" v-model="item.return_value_rename"></td>
            <td><input type="text" class="form-control" v-model="item.return_value_default"></td>
            <td>
              <select class="form-control select2 select2-hidden-accessible" v-model="item.return_value_type">
                <option v-for="item1 in types" :key="item1.key" :label="item1.value" :value="item1.key"></option>
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
      types: [],
      tableData: [],
      options:[],
      compares:[]
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
    addList() {
      let obj = {}
      this.tableData.push(obj)
    },
    handleDelete(index) {
      this.tableData.splice(index, 1)
    },
      getSource() {
          let param=new Object();
          this.$api.getCompareType(param,res => {
              if (res.code === 200) {
                  let retdata = res.data;
                  retdata.forEach((item, index, arr) => {
                      this.compares.push(item);
                  })
              }
          })
          this.$api.getTransDataType(param,res => {
              if (res.code === 200) {
                  let retdata = res.data;
                  retdata.forEach((item, index, arr) => {
                      let obj=new Object();
                      obj.key=item
                      obj.value=item
                      this.types.push(obj);
                  })
              }
          })
          let that=this;
          this.$api.getListAllDatabaseNotPage(param,res => {
              if (res.code === 200) {
                  that.options = res.data
              }
          })
      },
  },
  created() {
    this.tableData = this.form.field ? this.form.field : []
    this.getSource();
  }
}
</script>
