<template>

  <div style="min-height: 400px" :visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">PostGresql批量加载</h4>
    </div>
    <div class="form-group">
      <label for="name" >步骤名称</label>
      <input type="text" class="form-control" id="name"   v-model="form.name" placeholder="请输入步骤名称">
    </div>
    <div class="form-group">
      <label >数据源</label>
      <select  v-model="form.id_connection" class="form-control select2 select2-hidden-accessible">
        <option v-for="item in options"  :key="item.id" :label="item.name" :value="item.id"></option>
      </select>
    </div>
    <div class="form-group">
      <label  >模式</label>
      <input type="text" class="form-control"   v-model="form.schema" placeholder="请输入模式"></input>
    </div>
    <div class="form-group">
      <label  >表名</label>
      <input type="text" class="form-control"   v-model="form.table" placeholder="请输入表名"></input>
    </div>
    <div class="form-group">
      <label  >封闭符</label>
      <input type="text" class="form-control"   v-model="form.enclosure" placeholder="请输入封闭符"></input>
    </div>
    <div class="form-group">
      <label  >分隔符</label>
      <input type="text" class="form-control"   v-model="form.delimiter" placeholder="请输入分隔符"></input>
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
            <th>表字段</th>
            <th>流字段</th>
            <th>字段类型</th>
            <th >操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in tableData">
            <td><input type="text" class="form-control" v-model="item.field_name"></td>
            <td><input type="text" class="form-control" v-model="item.stream_name"></td>
            <td>
              <select class="form-control select2 select2-hidden-accessible" v-model="item.date_mask">
                <option v-for="item1 in option" :key="item1.value" :label="item1.name" :value="item1.value"></option>
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
                options: [],
                tableData: [],
                option:[]
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
                this.$axios.get('/api/dataAdminPlatform/listAllDatabase').then(res => {
                    if (res.data.code === 200) {
                        this.options = res.data.data
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
            var obj=new Object();
            obj.id=1;
            obj.name='PASS THROUGH';
            obj.value="PASS THROUGH";
            this.option.push(obj);
            var obj1=new Object();
            obj1.name='日期';
            obj1.value="DATE";
            obj1.id=2;
            this.option.push(obj1);
            var obj2=new Object();
            obj2.name='时间戳';
            obj2.value="DATETIME";
            obj2.id=3;
            this.option.push(obj2);
            this.getSource()
            this.tableData = this.form.field ? this.form.field : []
        }
    }
</script>
