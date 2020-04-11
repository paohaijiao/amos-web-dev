<template>
  <div style="min-height: 400px" :visible="dialogVisible">

    <div class="modal-header">
      <h4 class="modal-title">SQL文件输出 </h4>
    </div>
    <div class="form-group">
      <label  >步骤名称</label>
      <input type="text" class="form-control"    v-model="form.name" placeholder="请输入步骤名称">
    </div>
    <div class="form-group">
      <label >数据源</label>
      <select  v-model="form.id_connection" class="form-control select2 select2-hidden-accessible">
        <option v-for="item in  options"  :key="item.id" :label="item.name" :value="item.id"></option>
      </select>
    </div>
    <div class="form-group">
      <label  >模式名</label>
      <input type="text" class="form-control"    v-model="form.schema" placeholder="请输入模式名">
    </div>

    <div class="form-group">
      <label  >表名</label>
      <input type="text" class="form-control"    v-model="form.table" placeholder="请输入表名">
    </div>
    <div class="form-group">
      <label  >输出文件名</label>
      <input type="text" class="form-control"    v-model="form.file_name" placeholder="请输入输出文件名">
    </div>

    <div class="form-group">
      <label >输出文件扩展名（.sql）</label>
      <select  v-model="form.file_extention" class="form-control select2 select2-hidden-accessible">
        <option v-for="item in options1"  :key="item.value" :label="item.name" :value="item.value"></option>
      </select>
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
  props: ['item'],
  data() {
    return {
      form: _.cloneDeep(this.item.data) || {},
      dialogVisible: true,
      options: [],
      options1: [
        {
          name: 'sql',
          value: 'sql'
        }
      ],
      clusters:[],
      partionType:[],
      partionNode:[]
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
      this.$api.getListAllDatabaseNotPage(param,res => {
        if (res.code === 200) {
          this.options = res.data
        }
      })
    }
  },
  created() {
    this.getSource()
    this.initCluster()
  }
}
</script>
