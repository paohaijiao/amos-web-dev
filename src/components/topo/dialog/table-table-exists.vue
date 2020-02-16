<template>
  <div style="min-height: 400px" :visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">检查表是否存在</h4>
    </div>
    <div class="form-group">
      <label for="name" >步骤名称</label>
      <input type="text" class="form-control" id="name"   v-model="form.name" placeholder="请输入步骤名称">
    </div>
    <div class="form-group">
      <label >数据源</label>
      <select  v-model="form.id_connection" class="form-control select2 select2-hidden-accessible">
        <option v-for="item in types"  :key="item.id" :label="item.name" :value="item.id"></option>
      </select>
    </div>
    <div class="form-group">
      <label >表名字段</label>
      <input type="text" class="form-control"   v-model="form.tablenamefield" placeholder="请输入表名字段">
    </div>
    <div class="form-group">
      <label >结果名字段</label>
      <input type="text" class="form-control"   v-model="form.resultfieldname" placeholder="请输入结果名字段">
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

            }
        },
        methods: {
            onConfirm() {
              this.form.field = this.tableData
              this.item.data = this.form
              $('#myModal').modal('hide')
              this.onClose();
            },
            onClose() {
                this.dialogVisible = false
                this.$emit('on-close', this.item)
                // this.item.updateItem({
                //     text: this.form.title
                // })
            },
          cancel() {
            $('#myModal').modal('hide')
            this.onClose()
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
                let that=this;
                this.$axios.get('/api/dataAdminPlatform/listAllDatabase').then(res => {
                    if (res.data.code === 200) {
                        that.types = res.data.data;
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
