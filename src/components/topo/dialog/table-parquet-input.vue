<template>
  <div style="min-height: 400px" :visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">ParquetInput</h4>
    </div>
    <div class="form-group">
      <label for="name" >步骤名称</label>
      <input type="text" class="form-control" id="name"   v-model="form.name" placeholder="请输入步骤名称">
    </div>
    <div class="form-group">
      <label for="name" >文件名<span style="color:red;font-size:12px;"> (样例: hdfs://root:13579admin@hadoop:9000/haha.parquet)</span></label>
      <input type="text" class="form-control"   v-model="form.file_name" placeholder="请输入文件名">
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
            <th>字段路径</th>
            <th>字段名称</th>
            <th>字段类型</th>
            <th >操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in tableData">
            <td><input type="text" class="form-control" v-model="item.path"></td>
            <td><input type="text" class="form-control" v-model="item.field_name"></td>
            <td>
              <select class="form-control select2 select2-hidden-accessible" v-model="item.field_type">
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
