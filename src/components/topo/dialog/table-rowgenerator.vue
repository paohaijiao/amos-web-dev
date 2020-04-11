<template>
  <div style="min-height: 400px" :visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">生成记录</h4>
    </div>
    <div class="form-group">
      <label  >步骤名称</label>
      <input type="text" class="form-control"   v-model="form.name" placeholder="请输入步骤名称">
    </div>
    <div class="form-group">
      <label >限制</label>
      <input type="text" class="form-control"    v-model="form.limit" placeholder="请输入生成数目（数字）">
    </div>
    <div class="form-group" v-if="form.file_required=='N'">
      <label >字段名</label>
      <input type="text" class="form-control"   v-model="form.valueField" placeholder="请输入字段名">
    </div>
    <div class="form-group">
      <label  >线程数(1或更多)</label>
      <input type="number" class="form-control" min="1"  v-model="form.copy" placeholder="请输入需要使用的线程数"></input>
    </div>
    <div class="form-group">
      <label>执行集群<span style="color:red">(可选)</span></label>
      <select  v-model="form.cluster_schema" class="form-control select2 select2-hidden-accessible">
        <option v-for="item in clusters"  :key="item.name" :label="item.name" :value="item.name"></option>
      </select>
    </div>
    <div class="form-group">
      <label>分区方式<span style="color:red">(可选)</span></label>
      <select  v-model="form.PARTITIONING_METHOD" class="form-control select2 select2-hidden-accessible">
        <option v-for="item in partionType"  :key="item.key" :label="item.value" :value="item.key"></option>
      </select>
    </div>
    <div class="form-group" v-if="form.PARTITIONING_METHOD=='Mirror'">
      <label>分区节点<span style="color:red">(可选)</span></label>
      <select  v-model="form.PARTITIONING_SCHEMA" class="form-control select2 select2-hidden-accessible">
        <option v-for="item in partionNode"  :key="item.name" :label="item.name" :value="item.name"></option>
      </select>
    </div>
    <div class="form-group" v-if="form.PARTITIONING_METHOD=='ModPartitioner'">
      <label>分区字段<span style="color:red">(可选)</span></label>
      <input type="text" class="form-control" min="1"  v-model="form.PARTITIONING_SCHEMA" placeholder="请输入分区字段"></input>
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
            <th>字段名称</th>
            <th>字段类型</th>
            <th>值</th>
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
            <td><input type="text" class="form-control" v-model="item.field_nullif"></td>
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
    name: 'table-delete',
    props: ['item'],
    data() {
      return {
        form: _.cloneDeep(this.item.data) || {},
        dialogVisible: true,
        tableData: [],
        typeoptions: [],
        clusters:[],
        partionType:[],
        partionNode:[]
      }
    },
    methods: {
      onConfirm() {
        this.form.field = this.tableData
          let a=this.item;
          debugger;
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
        addList() {
          debugger;
            let obj = {}
            this.tableData.push(obj)
        },
        handleDelete(index) {
            this.tableData.splice(index, 1)
        },
      initCluster() {
        let param=new Object();
        this.$api.getClusterNotPage(param,res => {
          if (res.code === 200) {
            this.clusters = res.data
          }
        })
        this.$api.getPartionType(param,res => {
          if (res.code === 200) {
            this.partionType = res.data
          }
        })
        this.$api.getPartitionNode(param,res => {
          if (res.code === 200) {
            this.partionNode= res.data
          }
        })

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

    },
    created() {
      this.getSource();
      this.initCluster();
      this.tableData = this.form.field ? this.form.field : []
    }
  }
</script>
