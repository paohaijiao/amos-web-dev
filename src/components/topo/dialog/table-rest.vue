<template>
  <div style="min-height: 400px" :visible="dialogVisible">
    <div class="modal-header">
      <h4 class="modal-title">Rest</h4>
    </div>
    <div class="form-group">
      <label for="name" >步骤名称</label>
      <input type="text" class="form-control" id="name"   v-model="form.name" placeholder="请输入步骤名称">
    </div>
    <div class="form-group">
      <label  >result_name</label>
      <input type="text" class="form-control"   v-model="form.result_name" placeholder="请输入result_name">
    </div>
    <div class="form-group">
      <label  >上一步的字段作为urlField</label>
      <input type="text" class="form-control"   v-model="form.urlField" placeholder="请输入urlField">
    </div>
    <div class="form-group">
      <label  >上一步的字段作为bodyField</label>
      <input type="text" class="form-control"   v-model="form.bodyField" placeholder="请输入bodyField">
    </div>
    <div class="form-group" v-if="null!=form.bodyField">
      <label  >applicationType</label>
      <select  v-model="form.applicationType" class="form-control select2 select2-hidden-accessible">
        <option v-for="item in applicationType"  :key="item.key" :label="item.value" :value="item.value"></option>
      </select>
    </div>

    <div class="form-group">
      <label  >method</label>
      <select  v-model="form.method" class="form-control select2 select2-hidden-accessible">
        <option v-for="item in optionb"  :key="item.value" :label="item.name" :value="item.value"></option>
      </select>
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
      const myreg = /^[A-Za-z]+$/; //英文验证
      var validregRes = (rule, value, callback) => {
        if (!myreg.test(value)) {
          callback(new Error("只能输入英文"));
        } else {
          callback();
        }
      };
      return {
        form: _.cloneDeep(this.item.data) || {},
        dialogVisible: true,
        applicationType:[],
        optiona: [
          {name: 'TEXT PLAIN', value: 'TEXT PLAIN' },
          {name: 'XML', value: 'XML' },
          {name: 'JSON', value: 'JSON' },
          {name: 'OCTET STREAM', value: 'OCTET STREAM' },
          {name: 'XHTML', value: 'XHTML' },
          {name: 'FORM URLENCODED', value: 'FORM URLENCODED' },
          {name: 'ATOM XML', value: 'ATOM XML' },
          {name: 'SVG XML', value: 'SVG XML' },
          {name: 'TEXT XML', value: 'TEXT XML' }
        ],
        optionb: [
          {name: 'GET', value: 'GET' },
          {name: 'POST', value: 'POST' },
          {name: 'PUT', value: 'PUT' },
          {name: 'DELETE', value: 'DELETE' },
          {name: 'HEAD', value: 'HEAD' },
          {name: 'OPTIONS', value: 'OPTIONS' },
          {name: 'PATCH', value: 'PATCH' }
        ],

        rules: {
          result_name: [
                  { validator: validregRes, trigger: "blur" }
          ]
        }
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
      getApplicationType() {
            let param=new Object();
            this.$api.getApplicationType(param,res => {
                if (res.code === 200) {
                    let retdata = res.data;
                    retdata.forEach((item, index, arr) => {
                        let o = {};
                        o.key = item.key;
                        o.value = item.value;
                        this.applicationType.push(o);
                    })
                }
            })
        },
    },
    created() {
        this.getApplicationType();
    }
  }
</script>
