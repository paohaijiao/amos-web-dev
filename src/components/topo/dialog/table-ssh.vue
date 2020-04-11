<template>
  <div style="min-height: 400px" :visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">运行SSH命令</h4>
    </div>
    <div class="form-group">
      <label >步骤名称</label>
      <input type="text" class="form-control"    v-model="form.name" placeholder="请输入步骤名称">
    </div>
    <div class="form-group">
      <label  >主机名</label>
      <input type="text" class="form-control"   v-model="form.servername" placeholder="请输入主机名">
    </div>
    <div class="form-group">
      <label >端口号</label>
      <input type="text" class="form-control"    v-model="form.port" placeholder="请输入端口号">
    </div>
    <div class="form-group">
      <label  >用户名</label>
      <input type="text" class="form-control" v-model="form.userName" placeholder="请输入用户名">
    </div>

    <div class="form-group">
      <label  >密码</label>
      <input type="text" class="form-control" v-model="form.password" placeholder="请输入密码">
    </div>
    <div class="form-group">
      <label  >命令</label>
      <input type="text" class="form-control" v-model="form.command" placeholder="请输入命令行">
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
      addList() {
        let obj = {}
        this.tableData.push(obj)
      },
      handleDelete(index) {
        this.tableData.splice(index, 1)
      }
    },
    created() {
      this.initCluster();
      this.tableData = this.form.field ? this.form.field : []
    }
  }
</script>
