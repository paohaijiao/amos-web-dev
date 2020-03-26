<template>
  <div style="min-height: 400px" :visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">MongoDbOutput</h4>
    </div>
    <div class="form-group">
      <label  >步骤名称</label>
      <input type="text" class="form-control"    v-model="form.name" placeholder="请输入步骤名称">
    </div>
    <div class="form-group">
      <label >mongohost</label>
      <input type="text" class="form-control"    v-model="form.mongo_host" placeholder="请输入mongohost">
    </div>
    <div class="form-group">
      <label  >mongo端口</label>
      <input type="text" class="form-control"    v-model="form.mongo_port" placeholder="请输入mongo端口">
    </div>
    <div class="form-group">
      <label  >mongo Auth Database</label>
      <input type="text" class="form-control"    v-model="form.mongo_auth_database" placeholder="请输入mongo Auth Database">
    </div>
    <div class="form-group">
      <label  >用户名</label>
      <input type="text" class="form-control"    v-model="form.mongo_user" placeholder="请输入用户名">
    </div>
    <div class="form-group">
      <label  >密码</label>
      <input type="password" class="form-control"    v-model="form.mongo_password" placeholder="请输入密码">
    </div>
    <div class="form-group">
      <label  >mongo db</label>
      <input type="text" class="form-control"    v-model="form.mongo_db" placeholder="请输入mongo db">
    </div>
    <div class="form-group">
      <label  >collection</label>
      <input type="text" class="form-control"    v-model="form.mongo_collection" placeholder="请输入collection">
    </div>


    <div class="box-body">
      <div><span>参数</span>&nbsp;
        <button  class="form-control mybutton btn btn-danger " @click="addList" style="width:100px">新增</button>
        <button  class="form-control mybutton btn btn-primary " @click="getField" style="width:100px">获取字段</button>
      </div>
      <table class="table table-bordered"  >
        <thead>
        <tr>
          <th>字段名称</th>
          <th>使用字段名称</th>
          <th>match field for match</th>
          <th>modifier operation</th>
          <th>更新策略</th>
          <th>JSON</th>
          <th >操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in tableData">
          <td>
            <input type="text" class="form-control" v-model="item.incoming_field_name">
          </td>
          <td>
            <select  v-model="item.use_incoming_field_name_as_mongo_field_name" class="form-control select2 select2-hidden-accessible">
              <option v-for="item in  yn"  :key="item.key" :label="item.value" :value="item.key"></option>
            </select>
          </td>
          <td>
            <select  v-model="item.update_match_field" class="form-control select2 select2-hidden-accessible">
              <option v-for="item in  yn"  :key="item.key" :label="item.value" :value="item.key"></option>
            </select>
          </td>
          <td>
            <select  v-model="item.modifier_update_operation" class="form-control select2 select2-hidden-accessible">
              <option v-for="item in  operateType "  :key="item.key" :label="item.value" :value="item.key"></option>
            </select>
          </td>
          <td>
            <select  v-model="item.modifier_policy" class="form-control select2 select2-hidden-accessible">
              <option v-for="item in  policeType"  :key="item.key" :label="item.value" :value="item.key"></option>
            </select>
          </td>
          <td>
            <select  v-model="item.json_field" class="form-control select2 select2-hidden-accessible">
              <option v-for="item in  yn"  :key="item.key" :label="item.value" :value="item.key"></option>
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
  name: 'table-delete',
  props: ['item','title'],
  data() {
    return {
      form: _.cloneDeep(this.item.data) || {},
      dialogVisible: true,
      options: [],
      tableData: [],
      policeType:[],
      operateType:[],
      yn:[{"key":"Y","value":"Y"},{"key":"N","value":"N"}]
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
          debugger;
          this.$api.getFieldFromPreviousStep(param,res => {
              if (res.code === 200) {
                  that.tableData=[];
                  let array=res.data.data;
                  for(var i=0;i<array.length;i++){
                      let ele=new Object();
                      ele.incoming_field_name=array[i].name;
                      ele.use_incoming_field_name_as_mongo_field_name='Y';
                      ele.update_match_field='Y';
                      ele.modifier_update_operation='$set';
                      ele.modifier_policy='Insert&Update';
                      ele.json_field='Y';
                      that.tableData.push(ele);
                  }
              }
          })
      },
    initMongoOperateType() {
          let param=new Object();
          this.$api.getMongoOperateType(param,res => {
              if (res.code === 200) {
                  this.operateType = res.data
              }
          })
      },
    initPoliceType() {
          let param=new Object();
          this.$api.getPoliceType(param,res => {
              if (res.code === 200) {
                  this.policeType = res.data
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
    this.initMongoOperateType();
    this.initPoliceType();
    this.tableData = this.form.field ? this.form.field : []
    this.tablelist = this.form.list?this.form.list : []
  }
}
</script>
