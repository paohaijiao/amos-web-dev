<template>
  <div style="min-height: 400px" :visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">克隆行</h4>
    </div>
    <div class="form-group">
      <label for="name" >步骤名称</label>
      <input type="text" class="form-control" id="name"   v-model="form.name" placeholder="请输入步骤名称">
    </div>
    <div class="form-group">
      <label  >克隆次数</label>
      <input type="text" class="form-control"   v-model="form.nrclones" placeholder="请输入克隆次数">
    </div>
    <div>
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
        scaleType:[],
        clusters:[],
        partionType:[],
        partionNode:[],

      }
    },
    methods: {
      onConfirm() {
            this.form.field = this.tableData
            this.item.data = this.form
            $('#myModal').modal('hide')
             this.onClose()
      },
      onClose() {
        this.dialogVisible = false
        this.$emit('on-close', this.item)
      },
      cancel() {
        $('#myModal').modal('hide')
        this.onClose()
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
      addList() {
        let obj = {}
        this.tableData.push(obj)
      },
      initScaleType() {
        let param=new Object();
        this.$api.scaleType(param,res => {
          if (res.code === 200) {
            this.scaleType = res.data
          }
        })
      },
      handleDelete(index) {
        this.tableData.splice(index, 1)
      }
    },
    created() {
      this.initScaleType();
      this.initCluster();
      this.tableData = this.form.field ? this.form.field : []
    }
  }
</script>
