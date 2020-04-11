<template>
  <div style="min-height: 400px" :visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">设置字段值</h4>
    </div>
    <div class="form-group">
      <label for="name" >步骤名称</label>
      <input type="text" class="form-control" id="name"   v-model="form.name" placeholder="请输入步骤名称">
    </div>
    <div class="form-group">
      <label for="name" >字段名</label>
      <input type="text" class="form-control" id="name"   v-model="field_name" placeholder="请输入字段名">
    </div>
    <div class="form-group">
      <label for="name" >替换字段</label>
      <input type="text" class="form-control" id="name"   v-model="replace_by" placeholder="请输入替换字段">
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
      field_name: '',
      replace_by: '',
      clusters:[],
      partionType:[],
      partionNode:[],
      dialogVisible: true
    }
  },
  methods: {
    onConfirm() {

          let obj = {}
          let arr = []
          obj.field_name = this.field_name
          obj.replace_by = this.replace_by
          arr.push(obj)
          this.form.field = arr
          this.item.data = this.form
          console.log(this.item.data)
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
    this.field_name = this.form.field[0].field_name
    this.replace_by = this.form.field[0].replace_by
  }

}
</script>
