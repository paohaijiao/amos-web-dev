<template>
  <div style="min-height: 400px" :visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">记录集连接</h4>
    </div>
    <div class="form-group">
      <label  >步骤名称</label>
      <input type="text" class="form-control"    v-model="form.name" placeholder="请输入步骤名称">
    </div>
    <div class="form-group">
      <label  >第一个步骤</label>
      <input type="text" class="form-control"    v-model="form.step1" placeholder="请输入排序目录">
    </div>
    <div class="form-group">
      <label  >第二个步骤</label>
      <input type="text" class="form-control"    v-model="form.step2" placeholder="请输入临时文件前缀">
    </div>
    <div class="form-group">
      <label  >第一个步骤连接字段</label>
      <input type="text" class="form-control"    v-model="form.keys_1" placeholder="请输入第一个步骤连接字段">
    </div>
    <div class="form-group">
      <label  >第二个步骤连接字段</label>
      <input type="text" class="form-control"    v-model="form.keys_2" placeholder="请输入第二个步骤连接字段">
    </div>
    <div class="form-group">
      <label >连接类型</label>
      <select  v-model="form.join_type" class="form-control select2 select2-hidden-accessible">
        <option v-for="item in  types"  :key="item.key" :label="item.value" :value="item.key"></option>
      </select>
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
      types: [],
      tableData: [],
      options:[],
      types:[],
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
      this.onClose();
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
    onClose() {
      this.dialogVisible = false
      this.$emit('on-close', this.item)
      // this.item.updateItem({
      //     text: this.form.title
      // })
    },
    addList() {
      let obj = {}
      this.tableData.push(obj)
    },
    handleDelete(index) {
      this.tableData.splice(index, 1)
    },
      getSource() {

          let param=new Object();

          let that=this;
          this.$api.getJoinType(param,res => {
              if (res.code === 200) {
                  that.types = res.data
              }
          })
      },
  },
  created() {
    this.tableData = this.form.field ? this.form.field : []
    this.getSource();
    this.initCluster();
  }
}
</script>
