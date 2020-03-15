<template>

  <div style="min-height: 400px" :visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">数据校验</h4>
    </div>
    <div class="form-group">
      <label  >步骤名称</label>
      <input type="text" class="form-control"    v-model="form.name" placeholder="请输入步骤名称">
    </div>
    <div class="box">
      <div class="box-header with-border">
        <label  style="line-height: 35px;">检验</label>
        <button  class="form-control mybutton btn btn-danger " @click="addList" style="width:100px;">新增</button>
        <button  class="form-control mybutton btn btn-primary " @click="getField" style="width:100px">获取字段</button>
      </div>
      <!-- /.box-header -->
      <div class="box-body" style="margin-left: 0px">
        <table class="table table-bordered"   style="width:1200px">
          <thead>
          <tr>
            <th style="width:100px">校验名称</th>
            <th style="width:125px">校验错误</th>
            <th style="width:125px">校验字段</th>
            <th style="width:150px">数据类型</th>
            <th style="width:125px">允许空?</th>
            <th style="width:125px" >只允许空值</th>
            <th style="width:125px">只允许数值类型的数据</th>
            <th style="width:100px">最大字符串长度</th>
            <th style="width:100px">最小字符串长度</th>
            <th style="width:100px">最大值</th>
            <th style="width:100px">最小值</th>
            <th style="width:100px">允许开始的字符串</th>
            <th style="width:100px">允许结束的字符串</th>
            <th style="width:100px">不允许开始的字符串</th>
            <th style="width:100px">不允许结束的字符串</th>
            <th style="width:100px">合法的正则表达式</th>
            <th style="width:100px">不合法的正则表达式</th>
            <th >操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in tableData">
            <td><input type="text" class="form-control" v-model="item.validator_field_validation_name"></td>
            <td>
              <select  v-model="form.validate_all" class="form-control select2 select2-hidden-accessible">
                <option v-for="item in  option"  :key="item.value" :label="item.name" :value="item.value"></option>
              </select>
            </td>
            <td>
              <input type="text" class="form-control" v-model="item.validator_field_name">
            </td>

            <td>
              <select class="form-control select2 select2-hidden-accessible" v-model="item.validator_field_data_type">
                <option v-for="item1 in typeoptions" :key="item1.value" :label="item1.name" :value="item1.value"></option>
              </select>
            </td>
            <td>
              <select class="form-control select2 select2-hidden-accessible" v-model="item.validator_field_null_allowed">
                <option v-for="item1 in option" :key="item1.value" :label="item1.name" :value="item1.value"></option>
              </select>
            </td>
            <td>
              <select class="form-control select2 select2-hidden-accessible" v-model="item.validator_field_only_null_allowed">
                <option v-for="item1 in option" :key="item1.value" :label="item1.name" :value="item1.value"></option>
              </select>
            </td>
            <td>
              <select class="form-control select2 select2-hidden-accessible" v-model="item.validator_field_only_numeric_allowed">
                <option v-for="item1 in option" :key="item1.value" :label="item1.name" :value="item1.value"></option>
              </select>
            </td>
            <td>
              <input type="text" class="form-control" v-model="item.validator_field_max_length">
            </td>
            <td>
              <input type="text" class="form-control" v-model="item.validator_field_min_length">
            </td>
            <td>
              <input type="text" class="form-control" v-model="item.validator_field_max_value">
            </td>
            <td>
              <input type="text" class="form-control" v-model="item.validator_field_min_value">
            </td>
            <td>
              <input type="text" class="form-control" v-model="item.validator_field_start_string">
            </td>
            <td>
              <input type="text" class="form-control" v-model="item.validator_field_end_string">
            </td>
            <td>
              <input type="text" class="form-control" v-model="item.validator_field_start_string_not_allowed">
            </td>
            <td>
              <input type="text" class="form-control" v-model="item.validator_field_end_string_not_allowed">
            </td>
            <td>
              <input type="text" class="form-control" v-model="item.validator_field_regular_expression">
            </td>
            <td>
              <input type="text" class="form-control" v-model="item.validator_field_regular_expression_not_allowed">
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

    <div class="modal-footer" style="text-align: center;">
      <button type="button" class="btn btn-primary" @click="cancel">取消</button>
      <button type="button" class="btn btn-danger" @click="onConfirm">确定</button>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  export default {
    props: ['item','title'],
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
        getField(){
            let param=new Object();
            param.transName=this.title;
            param.stepName=this.form.name
            let that=this;
            this.$api.getFieldFromPreviousStep(param,res => {
                if (res.code === 200) {
                    that.tableData=[];
                    let array=res.data.data;
                    for(var i=0;i<array.length;i++){
                        let ele=new Object();
                        ele.validator_field_name=array[i].name;
                        ele.validator_field_validation_name=array[i].name;
                        that.tableData.push(ele);
                    }
                }
            })
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
