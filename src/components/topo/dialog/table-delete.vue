<template>
  <div style="min-height: 400px" :visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">删除 </h4>
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
      <label  >模式</label>
      <input type="text" class="form-control"    v-model="form.schema" placeholder="请输入模式内容">
    </div>
    <div class="form-group">
      <label  >目标表</label>
      <input type="text" class="form-control"    v-model="form.table" placeholder="请输入目标表">
    </div>
    <div class="box">
      <div class="box-header with-border">
        <label  style="line-height: 35px;">字段</label>
        <button  class="form-control mybutton btn btn-danger " @click="addList" style="width:100px">新增</button>
        <button  class="form-control mybutton btn btn-primary " @click="getField" style="width:100px">获取字段</button>
      </div>
      <!-- /.box-header -->
      <div class="box-body">
        <table class="table table-bordered"  >
          <thead>
          <tr>
            <th>源字段</th>
            <th>目标字段</th>
            <th>条件</th>
            <th >操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in tableData">
            <td>
              <input type="text" class="form-control" v-model="item.key_name">
            </td>
            <td>
              <input type="text" class="form-control" v-model="item.key_field">
            </td>
            <td>
              <select  v-model="item.key_condition" class="form-control select2 select2-hidden-accessible">
                <option v-for="item in  options1"  :key="item.value" :label="item.name" :value="item.value"></option>
              </select>
            </td>
            <td>
              <button type="button" class="btn btn-info" @click="handleDelete(index, item)">删除</button>
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
  name: 'table-delete',
  props: ['item','title'],
  data() {
    return {
      form: _.cloneDeep(this.item.data) || {},
      dialogVisible: true,
      options: [],
      tableData:[],
      options1: [
        {
          name: '=',
          value: '='
        },
        {
          name: '<>',
          value: '<>'
        },
        {
          name: '<',
          value: '<'
        },
        {
          name: '<=',
          value: '<='
        },
        {
          name: '>',
          value: '>'
        },
        {
          name: '>=',
          value: '>='
        },
        {
          name: 'LIKE',
          value: 'LIKE'
        },
        {
          name: 'BETWEEN',
          value: 'BETWEEN'
        },
        {
          name: 'IS NULL',
          value: 'IS NULL'
        },
        {
          name: 'IS NOT NULL',
          value: 'IS NOT NULL'
        }
      ]
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
    getField(){
          let param=new Object();
          param.transName=this.title;
          param.stepName=this.form.name
          this.form.field = this.tableData
          let that=this;
          this.$api.getFieldFromPreviousStep(param,res => {
              if (res.code === 200) {
                  this.dialogVisible=false;
                  that.tableData=[];
                  let array=res.data.data;
                  for(var i=0;i<array.length;i++){
                      let ele=new Object();
                      ele.key_name=array[i].name;
                      ele.key_field=array[i].name;
                      ele.key_condition='=';
                      that.tableData.push(ele);
                  }
                  this.dialogVisible=true;
              }
          })
    },
    addList() {
          this.dialogVisible=false;
          let obj = {};
          this.tableData.push(obj);
          this.dialogVisible=true;
    },
    handleDelete(index) {
        debugger;
          this.tableData.splice(index, 1)

    },
    getSource() {
        let param=new Object();
      this.$api.getListAllDatabaseNotPage(param,res => {
        if (res.code === 200) {
          this.options = res.data
        }
      })
    }
  },
  created() {
    this.tableData = this.form.field ? this.form.field : []
    this.getSource()
  }
}
</script>
