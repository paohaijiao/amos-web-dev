<template>
  <div style="min-height: 400px" :visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">ExcelInput</h4>
    </div>
    <div class="form-group">
      <label for="name" >步骤名称</label>
      <input type="text" class="form-control" id="name"   v-model="form.name" placeholder="请输入步骤名称">
    </div>
    <div class="form-group">
      <label >文件名</label>
      <input type="text" class="form-control"   v-model="form.file_name" placeholder="请输入文件名">
    </div>
    <div class="form-group">
      <label >头部</label>
      <select  v-model="form.header" class="form-control select2 select2-hidden-accessible">
        <option v-for="item in optiona"  :key="item.value" :label="item.name" :value="item.value"></option>
      </select>
    </div>
    <div class="form-group">
      <label >sheet_名称</label>
      <input type="text" class="form-control"    v-model="form.sheet_name" placeholder="请输入sheet_名称">
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
            <th>字段名称</th>
            <th>字段类型</th>
            <th >操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in tableData">
            <td><input type="text" class="form-control" v-model="item.field_name"></td>
            <td>
              <select class="form-control select2 select2-hidden-accessible" v-model="item.field_type">
                <option v-for="item1 in typeoptions" :key="item1.value" :label="item1.name" :value="item1.value"></option>
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
      <button type="button" class="btn btn-secondary" @click="onConfirm">确定</button>
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
        optiona: [
          {name: 'Y', value: 'Y' },
          {name: 'N', value: 'N' }
        ],
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
            this.form.field = this.tableData
            let that=this;
            this.$api.getFieldFromPreviousStep(param,res => {
                if (res.code === 200) {
                    that.tableData=[];
                    let array=res.data.data;
                    for(var i=0;i<array.length;i++){
                        let ele=new Object();
                        ele.field_name=array[i].name;
                        ele.field_attribut=array[i].name;
                        ele.field_type=array[i].type;
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
