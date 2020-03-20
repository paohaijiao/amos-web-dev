<template>
  <div style="min-height: 400px" :visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">Switch Case</h4>
    </div>
    <div class="form-group">
      <label for="name" >步骤名称</label>
      <input type="text" class="form-control" id="name"   v-model="form.name" placeholder="请输入步骤名称">
    </div>
    <div class="form-group">
      <label for="name" >Switch字段</label>
      <input type="text" class="form-control" id="name"   v-model="form.fieldname" placeholder="请输入Switch字段">
    </div>
    <div class="form-group">
      <label >使用字符串包含</label>
      <select  v-model="form.use_contains" class="form-control select2 select2-hidden-accessible">
        <option v-for="item in option"  :key="item.name" :label="item.value" :value="item.name"></option>
      </select>
    </div>
    <div class="form-group">
      <label >值数据类型</label>
      <select  v-model="form.case_value_type" class="form-control select2 select2-hidden-accessible">
        <option v-for="item in typeoptions"  :key="item.value" :label="item.name" :value="item.value"></option>
      </select>
    </div>
    <div class="form-group">
      <label for="name" >值转换掩码</label>
      <input type="text" class="form-control"  v-model="form.case_value_format" placeholder="请输入值转换掩码">
    </div>
    <div class="form-group">
      <label for="name" >值小数点符号</label>
      <input type="text" class="form-control"  v-model="form.case_value_decimal" placeholder="请输入值小数点符号">
    </div>
    <div class="form-group">
      <label for="name" >值分组标志</label>
      <input type="text" class="form-control"  v-model="form.case_value_group" placeholder="请输入值分组标志">
    </div>
    <div class="form-group">
      <label for="name" >默认目标步骤</label>
      <input type="text" class="form-control"  v-model="form.default_target_step" placeholder="请输入默认目标步骤">
    </div>
    <div class="box">
      <div class="box-header with-border">
        <label  style="line-height: 35px;">Case 值</label>
        <button  class="form-control mybutton btn btn-danger " @click="addList" style="width:100px">新增</button>
      </div>
      <!-- /.box-header -->
      <div class="box-body">
        <table class="table table-bordered"  >
          <thead>
          <tr>
            <th>值</th>
            <th>目标步骤</th>
            <th >操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in tableData">
            <td><input type="text" class="form-control" v-model="item.case_value"></td>
            <td><input type="text" class="form-control" v-model="item.case_target_step"></td>
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
      onClose() {
        this.dialogVisible = false
        this.$emit('on-close', this.item)
        // this.item.updateItem({
        //     text: this.form.title
        // })
      },
      cancel() {
        $('#myModal').modal('hide')
        this.onClose()
      },
      getSource() {
          let param=new Object();
        this.$api.getTransDataType(param,res => {
            debugger;
          if (res.code === 200) {
            let retdata = res.data;
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
        this.getSource();
      this.tableData = this.form.field ? this.form.field : []
    }
  }
</script>
