<template>
  <aside class="main-sidebar" >

    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">

      <!-- Sidebar user panel (optional) -->
      <div class="user-panel">
        <div class="pull-left image">
          <img src="https://img.zcool.cn/community/01eda25ba32d76a8012099c8cbfcfb.jpg@260w_195h_1c_1e_1o_100sh.jpg"   />
        </div>
        <div class="pull-left info">
          <div>
            <p class="white">{{userInfo.name}}</p>
          </div>
          <a href="javascript:;">
            <i class="fa fa-circle text-success"></i> On
          </a>
        </div>
      </div>

      <!-- search form (Optional) -->
      <form v-on:submit.prevent class="sidebar-form" id="searchForm">
        <div class="input-group" id="searchContainer">
          <span class="input-group-btn">
            <input type="text"
            name="search"
            id="search"
            class="search form-control"
            data-toggle="hideseek" p
            laceholder="Search Menus"
            data-list=".sidebar-menu">
            <button type="submit" name="search" id="search-btn" class="btn btn-flat">
              <i class="fa fa-search"></i>
            </button>
          </span>
        </div>
      </form>
      <sidebar-menu />
    </section>
  </aside>
</template>
<script>
import SidebarMenu from './SidebarMenu'

export default {
  name: 'Sidebar',
  props: ['user'],
  components: { SidebarMenu },
  data(router) {
    return {
      userInfo:{}
    }
  },
  mounted: function() {
    window
      .jQuery('[data-toggle="hideseek"]')
      .off()
      .hideseek()
    this.userInfo={};
    let str=window.localStorage.getItem('userInfo');
    this.userInfo=JSON.parse(str);
  }
}
</script>
<style scope="local">
.user-panel .image img {
  border-radius: 50%;
}
#searchForm {
  padding-left: 0em;
  padding-right: 0em;
}
#searchContainer {
  height: 100%;
  padding-bottom: 0em;
}
#search {
  width: 80%;
  float: right;
  height: 35px;
}
.treeview{

}

#search-btn {
  width: 20%;
  height: 34px;
}
body{
  background-color: #222d32;
}
  a{
    color: #c0c4cc!important;
  }
</style>
