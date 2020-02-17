<template>
  <div style="min-height: 400px" :visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">字段选择</h4>
    </div>
    <div class="form-group">
      <label  >步骤名称</label>
      <input type="text" class="form-control"    v-model="form.name" placeholder="请输入步骤名称">
    </div>
    <div class="form-group">
      <label >选择方式</label>
      <select  v-model="form.method" class="form-control select2 select2-hidden-accessible">
        <option v-for="item in  options"  :key="item.value" :label="item.name" :value="item.value"></option>
      </select>
    </div>
    <div class="box-body">
      <div><span>选择字段方式</span>&nbsp;
        <button  class="form-control mybutton btn btn-danger " @click="addList" style="width:100px">新增</button>
      </div>
      <table class="table table-bordered"   v-if="form.method=='unSelected'">
      <thead>
      <tr>
        <th>移除的字段</th>
        <th >操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in tableData">
        <td>
          <input type="text" class="form-control" v-model="item.remove_name">
        </td>
        <td>
          <button type="button" class="btn btn-info" @click="handleDelete($index, item)">删除</button>
        </td>
      </tr>
      </tbody>
    </table>
      <table class="table table-bordered"   v-if="form.method=='selected'">
        <thead>
        <tr>
          <th>字段名</th>
          <th>新字段名</th>
          <th >操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in tableData">
          <td>
            <input type="text" class="form-control" v-model="item.field_name">
          </td>
          <td>
            <input type="text" class="form-control" v-model="item.field_rename">
          </td>
          <td>
            <button type="button" class="btn btn-info" @click="handleDelete($index, item)">删除</button>
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
        method:'',
        option: [
          {name: 'Y', value: 'Y' },
          {name: 'N', value: 'N' }
        ],
          options: [
              {name: '选择字段', value: 'selected' },
              {name: '移除字段', value: 'unSelected' }
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
      addList() {
          if(null==this.form.method){
              this.$message({
                  type: 'error',
                  message: '请选择方式!'
              })
              return;
          }
          if(''==this.form.method){
              this.$message({
                  type: 'error',
                  message: '请选择方式!'
              })
              return;
          }
          let current=this.form.method;
          if(this.method==null||this.method==''){//首次
              this.method=current;
              let obj = {}
              this.tableData=[];
              this.tableData.push(obj)
          }else if(current==this.method){//继续添加
              let obj = {}
              this.tableData.push(obj)
          }else{//切换选项卡
              this.method=current;
              this.tableData=[];
              let obj = {}
              this.tableData.push(obj)
          }

      },
      handleDelete(index) {
        this.tableData.splice(index, 1)
      }
    },
    created() {
      this.tableData = this.form.field ? this.form.field : []
    }
  }
</script>

