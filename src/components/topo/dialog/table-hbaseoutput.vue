<template>
  <div style="min-height: 400px" :visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">Hbase output</h4>
    </div>
    <div class="form-group">
      <label for="name" >步骤名称</label>
      <input type="text" class="form-control" id="name"   v-model="form.name" placeholder="请输入步骤名称">
    </div>
    <div class="form-group">
      <label for="name" >集群名称</label>
      <input type="text" class="form-control"   v-model="form.cluster_name" placeholder="请输入集群名称">
    </div>
    <div class="form-group">
      <label for="name" >zookeeper url</label>
      <input type="text" class="form-control"   v-model="form.zookeeper_hosts" placeholder="请输入zookeeper url">
    </div>
    <div class="form-group">
      <label for="name" >zookeeper port</label>
      <input type="text" class="form-control"   v-model="form.zookeeper_port" placeholder="请输入zookeeper port">
    </div>
    <div class="form-group">
      <label for="name" >hbase-site.xml url</label>
      <input type="text" class="form-control"   v-model="form.core_config_url" placeholder="请输入hbase-site.xml url">
    </div>
    <div class="form-group">
      <label for="name" >hbase-deaflut.xml url</label>
      <input type="text" class="form-control"   v-model="form.default_config_url" placeholder="请输入hbase-deaflut.xml url">
    </div>

    <div class="form-group">
      <label for="name" >目标表名</label>
      <input type="text" class="form-control"   v-model="form.target_table_name" placeholder="请输入目标表名">
    </div>
    <div class="form-group">
      <label for="name" >映射名称</label>
      <input type="text" class="form-control"   v-model="form.mapping_name" placeholder="请输入映射名称">
    </div>

    <div class="form-group">
      <label for="name" >表名称</label>
      <input type="text" class="form-control"   v-model="form.table_name" placeholder="请输入表名称">
    </div>
    <div class="form-group">
      <label for="name" >主键</label>
      <input type="text" class="form-control"   v-model="form.key" placeholder="请输入主键">
    </div>
    <div class="form-group">
      <label for="name" >主键类型</label>
      <input type="text" class="form-control"   v-model="form.key_type" placeholder="请输入主键类型">
    </div>
    <div class="box">
      <div class="box-header with-border">
        <label  style="line-height: 35px;">字段</label>
        <button  class="form-control mybutton btn btn-danger " @click="addList" style="width:100px">新增</button>
      </div>
      <!-- /.box-header -->
      <div class="box-body">
        <table class="table table-bordered"  >
          <thead>
          <tr>
            <th>别名</th>
            <th>列族</th>
            <th>列名</th>
            <th>字段类型</th>
            <th >操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in tableData">
            <td><input type="text" class="form-control" v-model="item.alias"></td>
            <td><input type="text" class="form-control" v-model="item.column_family"></td>
            <td><input type="text" class="form-control" v-model="item.column_name"></td>
            <td>
              <select class="form-control select2 select2-hidden-accessible" v-model="item.type">
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
