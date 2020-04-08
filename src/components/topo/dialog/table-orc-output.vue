<template>
  <div style="min-height: 400px" :visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">orc文件输出</h4>
    </div>
    <div class="form-group">
      <label  >步骤名称</label>
      <input type="text" class="form-control"    v-model="form.name" placeholder="请输入步骤名称">
    </div>
    <div class="form-group">
      <label >是否覆盖</label>
      <select  v-model="form.overrideOutput" class="form-control select2 select2-hidden-accessible">
        <option v-for="item in  options"  :key="item.key" :label="item.value" :value="item.key"></option>
      </select>
    </div>
    <div class="form-group">
      <label  >文件名</label>
      <input type="text" class="form-control"    v-model="form.filename" placeholder="请输入文件名">
    </div>
    <div class="box-body">
      <div><span>数据库字段</span>&nbsp;
        <button  class="form-control mybutton btn btn-danger " @click="addList" style="width:100px">新增</button>
        <button  class="form-control mybutton btn btn-primary " @click="getField" style="width:100px">获取字段</button>
      </div>
      <table class="table table-bordered"  >
        <thead>
        <tr>
          <th style="width:250px" >字段名</th>
          <th style="width:250px" >路径</th>
          <th style="width:200px">类型</th>
          <th style="width:100px">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in tableData">
          <td>
            <input type="text" class="form-control" v-model="item.path">
          </td>
          <td>
            <input type="text"  class="form-control" v-model="item.name">
          </td>
          <td>
            <div class="form-group">
              <label >数据类型</label>
              <select  v-model="item.type" class="form-control select2 select2-hidden-accessible">
                <option v-for="tt in  orcType"  :key="tt.key" :label="tt.value" :value="tt.key"></option>
              </select>
            </div>
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
  name: 'table-delete',
  props: ['item','title'],
  data() {
    return {
      form: _.cloneDeep(this.item.data) || {},
      dialogVisible: true,
      options: [{"key":"Y","value":"是"},{"key":"N","value":"否"}],
      orcType:[],
      tableData: [],
      tablelist:[]
    }
  },
  methods: {
    onConfirm() {
      this.form.field = this.tableData
      this.item.data = this.form
      this.form.list = this.tablelist
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
                      ele.name=array[i].name;
                      ele.path=array[i].name;
                      ele.type=array[i].type;
                      that.tableData.push(ele);
                  }
              }
          })
      },
    initRCtype(){
      let param=new Object();
      let that=this;
      this.$api.orcType(param,res => {
        if (res.code === 200) {
          that.orcType=res.data;
        }
      })
    },
      addQueryList(){
          let obj = {}
          this.tablelist.push(obj)
      },
      handleListDelete(index){
          this.tablelist.splice(index, 1)
      },
      getQueryField(){
          let param=new Object();
          param.transName=this.title;
          param.stepName=this.form.name
          let that=this;
          debugger;
          this.$api.getFieldFromPreviousStep(param,res => {
              if (res.code === 200) {
                  that.tablelist=[];
                  let array=res.data.data;
                  for(var i=0;i<array.length;i++){
                      let ele=new Object();
                      ele.key_field=array[i].name;
                      ele.key_name=array[i].name;
                      ele.key_condition='=';
                      that.tablelist.push(ele);
                  }
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
    this.initRCtype();
    this.tableData = this.form.field ? this.form.field : []
    this.tablelist = this.form.list?this.form.list : []
  }
}
</script>
