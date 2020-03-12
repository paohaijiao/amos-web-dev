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
      <label  >排序目录</label>
      <input type="text" class="form-control"    v-model="form.directory" placeholder="请输入排序目录%%java.io.tmpdir%%">
    </div>
    <div class="form-group">
      <label  >临时文件前缀</label>
      <input type="text" class="form-control"    v-model="form.prefix" placeholder="请输入临时文件前缀out">
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
            <th>字段名称</th>
            <th>升序</th>
            <th >操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in tableData">
            <td><input type="text" class="form-control" v-model="item.field_name"></td>
            <td>
              <select class="form-control select2 select2-hidden-accessible" v-model="item.field_ascending">
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
          let obj=new Object();
          obj.key='N'
          obj.value='否'
          this.types.push(obj);
          let obj1=new Object();
          obj1.key='Y'
          obj1.value='是'
          this.types.push(obj1);

          let param=new Object();

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
