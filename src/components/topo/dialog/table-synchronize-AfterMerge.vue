<template>
  <div style="min-height: 400px" :visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">数据同步</h4>
    </div>
    <div class="form-group">
      <label  >步骤名称</label>
      <input type="text" class="form-control"   v-model="form.name" placeholder="请输入步骤名称">
    </div>
    <div class="form-group">
      <label >数据源</label>
      <select  v-model="form.id_connection" class="form-control select2 select2-hidden-accessible">
        <option v-for="item in options"  :key="item.id" :label="item.name" :value="item.id"></option>
      </select>
    </div>
    <div class="form-group">
      <label  >所属模式</label>
      <input type="text" class="form-control"   v-model="form.schema" placeholder="请输入所属模式"></input>
    </div>
    <div class="form-group">
      <label  >表名称</label>
      <input type="text" class="form-control"   v-model="form.table" placeholder="请输入表名称"></input>
    </div>
    <div class="form-group">
      <label  >表名称</label>
      <input type="text" class="form-control"   v-model="form.table" placeholder="请输入表名称"></input>
    </div>
    <div class="form-group">
      <label  >操作字段名</label>
      <input type="text" class="form-control"   v-model="form.operation_order_field" placeholder="请输入操作字段名"></input>
    </div>
    <div class="form-group">
      <label  >当值相等时插入</label>
      <input type="text" class="form-control"   v-model="form.order_insert" placeholder="请输入操作字段名"></input>
    </div>
    <div class="form-group">
      <label  >当值相等时更新</label>
      <input type="text" class="form-control"   v-model="form.order_update" placeholder="请输入操作字段名"></input>
    </div>
    <div class="form-group">
      <label  >当值相等时删除</label>
      <input type="text" class="form-control"   v-model="form.order_delete" placeholder="请输入操作字段名"></input>
    </div>
    <div class="box-body">
      <div><span>查询关键字</span>&nbsp;</div>
      <table class="table table-bordered"  >
        <thead>
        <tr>
          <th>表字段</th>
          <th>比较符</th>
          <th >流字段</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in tablelist">
          <td><input type="text" class="form-control" v-model="form.key_field"></td>
          <td>
            <select class="form-control select2 select2-hidden-accessible" v-model="form.key_condition">
              <option v-for="item1 in options1 " :key="item1.value" :label="item1.value" :value="item1.value"></option>
            </select>
          </td>
          <td>
            <input type="text" class="form-control" v-model="form.key_name">
          </td>

        </tr>
        </tbody>
      </table>
      <div><span>数据库字段</span>&nbsp;
        <button  class="form-control mybutton btn btn-danger " @click="addList" style="width:100px">新增</button>
        <button  class="form-control mybutton btn btn-primary " @click="getField" style="width:100px">获取字段</button>
      </div>
      <table class="table table-bordered"  >
        <thead>
        <tr>
          <th>表字段</th>
          <th>流字段</th>
          <th>是否更新</th>
          <th >操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in tableData">
          <td>
            <input type="text" class="form-control" v-model="item.value_name">
          </td>
          <td>
            <input type="text" class="form-control" v-model="item.value_rename">
          </td>
          <td>
            <select class="form-control select2 select2-hidden-accessible" v-model="item.value_update">
              <option v-for="item1 in opt" :key="item1.key" :label="item1.value" :value="item1.key"></option>
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
      options:[],
      tablelist:[{}],
      opt:[{'key':'Y','value':'是'},{'key':'N','value':'否'}],
      options1: [
            { value: '=' },
            { value: '= ~NULL' },
            { value: '<>' },
            { value: '<' },
            { value: '<=' },
            { value: '>' },
            { value: '>=' },
            { value: 'like' },
            { value: 'BETWEEN' },
            { value: 'IS NULL' },
            { value: 'IS NOT NULL' }
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
      // this.item.updateItem({
      //     text: this.form.title
      // })
    },
    handleDelete(index) {
          this.tableData.splice(index, 1)
      },
    getField(){
          let param=new Object();
          param.transName=this.title;
          param.stepName=this.form.name
          this.form.field = this.tableData
          let that=this;
          debugger;
          this.$api.getFieldFromPreviousStep(param,res => {
              if (res.code === 200) {
                  that.tableData=[];
                  let array=res.data.data;
                  for(var i=0;i<array.length;i++){
                      let ele=new Object();
                      ele.value_name=array[i].name;
                      ele.value_rename=array[i].name;
                      ele.value_rename='Y';
                      that.tableData.push(ele);
                  }
              }
          })
      },
     addList() {
          let obj = {}
          this.tableData.push(obj)
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
    this.getSource()
      this.tableData = this.form.field ? this.form.field : []
      this.tablelist = this.form.key_condition
          ? [
              {
                  key_condition: this.form.key_condition,
                  key_field: this.form.key_field,
                  key_name: this.form.key_name
              }
          ]
          : [{}]

  }
}
</script>
