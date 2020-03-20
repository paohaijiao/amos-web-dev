<template>
  <div style="min-height: 400px" :visible="dialogVisible" >
    <div class="modal-header">
      <h4 class="modal-title">计算器</h4>
    </div>
    <div class="form-group">
      <label  >步骤名称</label>
      <input type="text" class="form-control"    v-model="form.name" placeholder="请输入步骤名称">
    </div>
    <div class="box">
      <div class="box-header with-border">
        <label  style="line-height: 35px;">计算器</label>
        <button  class="form-control mybutton btn btn-danger " @click="addList" style="width:100px">新增</button>
      </div>
      <!-- /.box-header -->
      <div class="box-body">
        <table class="table table-bordered"  >
          <thead>
          <tr>
            <th style="width:100px">新字段</th>
            <th style="width:100px">计算类型</th>
            <th style="width:100px">字段A</th>
            <th style="width:100px">字段B</th>
            <th style="width:100px">字段C</th>
            <th style="width:100px">值类型</th>
            <th style="width:100px">移除</th>
            <th style="width:100px">转换掩码</th>
            <th style="width:100px">小数点符号</th>
            <th style="width:100px">分组符号</th>
            <th style="width:100px">货币符号</th>
            <th style="width:100px">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in tableData">
            <td><input type="text" class="form-control" v-model="item.field_name"></td>
            <td>
              <select class="form-control select2 select2-hidden-accessible" v-model="item.calc_type">
                <option v-for="item1 in types" :key="item1.key" :label="item1.value" :value="item1.key"></option>
              </select>
            </td>
            <td><input type="text" class="form-control" v-model="item.field_a"></td>
            <td><input type="text" class="form-control" v-model="item.field_b"></td>
            <td><input type="text" class="form-control" v-model="item.field_c"></td>
            <td>
              <select class="form-control select2 select2-hidden-accessible" v-model="item.value_type">
                <option v-for="item1 in typeoptions" :key="item1.value" :label="item1.name" :value="item1.value"></option>
              </select>
            </td>
            <td>
              <select class="form-control select2 select2-hidden-accessible" v-model="item.remove">
                <option v-for="item1 in option" :key="item1.value" :label="item1.name" :value="item1.value"></option>
              </select>
            </td>
            <td><input type="text" class="form-control" v-model="item.conversion_mask"></td>
            <td><input type="text" class="form-control" v-model="item.decimal_symbol"></td>
            <td><input type="text" class="form-control" v-model="item.grouping_symbol"></td>
            <td><input type="text" class="form-control" v-model="item.currency_symbol"></td>
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
      <button type="button" class="btn btn-secondary" @click="onConfirm">确定</button>
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
        this.$api.getTransDataType(param,res => {
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
         let that=this;
          this.$api.getCalcTypee(param,res => {
              if (res.code === 200) {
                  that.types = res.data;
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
