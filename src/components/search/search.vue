<template>
  <div >
    <dash-header ></dash-header>
    <sidebar />
    <div class="content-wrapper" style="min-height:calc(111vh - 150px);background-color: white">

      <div class="featurette">
        <div class="featurette-inner text-center">
        <div class="input-group input-group-lg">
          <input type="text" class="form-control amosbutton"  placeholder="请输入需要搜索的内容"  v-model="keyword"  style="width:800px"/>
          <span >
          <button type="button" class="btn btn-danger dropdown-toggle " data-toggle="dropdown" aria-expanded="false" style="line-height: 32px;width:100px"
                  @click="submitSearch()">
            搜索元数据
          </button>
        </span>
        </div>


      </div>
     </div>
    </div>
    <dash-footer></dash-footer>
  </div>
</template>

<script>
    import DashFooter from '../layout/DashFooter'
    import DashHeader from '../layout/DashHeader'
    import Sidebar from '../layout/Sidebar'
export default {
  name: 'collection',
  components: {DashFooter,DashHeader,Sidebar},

  data() {
    return {
        keyword:null
    }
  },
  methods: {
      submitSearch(){
          if(null==this.keyword){
              this.$alert("关键字不能为空");
              return ;
          }else{
              let str=this.keyword;
              this.$router.push({ path: '/index/searchList',query:{key:str}})
          }

      }



  },
  created() {
      //参考https://demo.demohuo.top/jquery/22/2247/demo/
  },
  watch: {

  }
}
</script>
<style>
  .text-center {
    text-align: center;
  }
  .featurette {
    display: table;
    width: 100%;
    height: 30%;
    vertical-align: middle;
    color: #fff;
    position: absolute;
    top: 40%;
  }
  .amosbutton{
    margin-left: 300px;
  }
</style>

