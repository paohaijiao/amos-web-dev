<template>
  <div style="min-height: 400px" :visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">值映射</h4>
    </div>
    <div class="form-group">
      <label  >步骤名称</label>
      <input type="text" class="form-control"    v-model="form.name" placeholder="请输入步骤名称">
    </div>
    <div class="form-group">
      <label  >使用字段名</label>
      <input type="text" class="form-control"    v-model="form.field_to_use" placeholder="请输入使用字段名">
    </div>
    <div class="form-group">
      <label  >目标字段名</label>
      <input type="text" class="form-control"    v-model="form.target_field" placeholder="请输入目标字段名">
    </div>
    <div class="form-group">
      <label  >不匹配时的默认值</label>
      <input type="text" class="form-control"    v-model="form.non_match_default" placeholder="请输入不匹配时的默认值">
    </div>
    <div class="form-group">
      <label  >源值</label>
      <input type="text" class="form-control"    v-model="form.source_value" placeholder="请输入源值">
    </div>
    <div class="form-group">
      <label  >目标值</label>
      <input type="text" class="form-control"    v-model="form.target_value" placeholder="请输入目标值">
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
  name: 'table-delete',
  props: ['item'],
  data() {
    return {
      form: _.cloneDeep(this.item.data) || {},
      dialogVisible: true,
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
    }
  },
  created() {
    this.initCluster();
  }

}
</script>
