<template>
  <div >
    <dash-header ></dash-header>
    <sidebar />
    <div class="content-wrapper" >
      <section class="content-header">
        <h1>
          数据目录
        </h1>
        <ol class="breadcrumb">
          <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
          <li><a href="#">数据目录</a></li>
        </ol>
      </section>
      <section class="content">
        <div class="row">
          <div class="col-sm-12">
            <label for="treeview"></label>
            <div id="treeview"/>
            <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="myModalLabel">添加节点</h4>
                  </div>
                  <div class="box-body">
                    <div class="form-group">
                      <label >节点名称</label>
                      <input type="text" class="form-control" v-model="item.name"  placeholder="请输入节点名称">
                    </div>
                  </div>
                  <div class="box-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    <button type="button" class="btn btn-primary" @click="addFolder()">提交</button>
                  </div>
                  <!-- /.box-body -->
                  <div class="modal-footer">

                  </div>
                </div>
              </div>
            </div>
            <div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="updateModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="updateModalLabel">修改节点</h4>
                  </div>
                  <div class="box-body">
                    <div class="form-group">
                      <label >节点名称</label>
                      <input type="text" class="form-control" v-model="item.name"  placeholder="请输入节点名称">
                    </div>
                  </div>
                  <div class="box-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    <button type="button" class="btn btn-primary" @click="updateFolder()">提交</button>
                  </div>
                  <!-- /.box-body -->
                  <div class="modal-footer">

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <router-view></router-view>
    </div>
    <dash-footer></dash-footer>
  </div>
</template>

<script>
    import DashFooter from '../layout/DashFooter'
    import DashHeader from '../layout/DashHeader'
    import Sidebar from '../layout/Sidebar'
    export default {
        name: 'tree',
        components: {DashHeader,DashFooter,Sidebar},
        data() {
            return {
                item:{name:null,pid:null,id:null}
            }
        },
        methods: {
            addFolder(){
                if(null==this.item.name){
                    alert("目录名不能为空");
                    return;
                }
                if(null==this.item.pid){
                    alert("父节点不能为空");
                    return;
                }
                let obj=new Object();
                obj.name=this.item.name;
                obj.pid=this.item.pid;
                this.$api.getAddFolder(obj,res => {
                    if (res.code === 200) {
                    this.item.pid=null;
                    this.item.name=null;
                    this.getMenuTree();
                        $('#myModal').modal('hide');
                    }
                })
            },
            updateFolder(){
                if(null==this.item.name){
                    alert("目录名不能为空");
                    return;
                }
                if(null==this.item.id){
                    alert("父节点不能为空");
                    return;
                }
                let obj=new Object();
                obj.name=this.item.name;
                obj.id=this.item.id;
                this.$api.updateFolder(obj,res => {
                    if (res.code === 200) {
                        this.item.id=null;
                        this.item.name=null;
                        this.getMenuTree();
                        $('#updateModal').modal('hide');
                    }
                })
            },
            getMenuTree(){
                let that =this;
                this.$api.getKettleTreeView({},res => {
                    if (res.code === 200) {
                        that.treeData=res.data.list;
                        var options = {
                            bootstrap2: false,
                            showTags: true,
                            levels: 1,
                            data: that.treeData,
                            multiSelect:false,
                            showCheckbox:true,
                            selectedColor:'#fff',
                            hierarchicalCheck:true,
                            icon: "fa fa-calendar",
                            showLines:true,
                            onNodeChecked: function(event, node){
                                debugger;
                                let id=node.destId;
                                if("folder"==node.type){
                                    that.item.pid=node.id;
                                    $('#myModal').modal('show');
                                }else if("job"==node.type){
                                    that.$router.push({
                                        path: '/index/job',
                                        query: {
                                            child1: true,
                                            id
                                        }
                                    })
                                }else if("trans"==node.type){
                                    that.$router.push({
                                        path: '/index/governance',
                                        query: {
                                            child1: true,
                                            id
                                        }
                                    })
                                }
                            },

                            onNodeUnchecked:function(event, node){
                                if("folder"==node.type){
                                    that.item.id=node.id;
                                    $('#updateModal').modal('show');
                                }else{
                                    alert("只有目录能够添加子节点");
                                }
                            }
                        };
                        $('#treeview').treeview(options);

                    }else{
                        this.$alert(res.message);
                    }
                })
            },
            add(){
                $('#treeview').treeview('updateNode', [ node, newNode, { silent: true } ]);

            }
        },
        created() {
            this.getMenuTree();
        },
        watch: {
        }
    }
</script>


