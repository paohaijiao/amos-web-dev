<template>
  <ul class="sidebar-menu" data-widget="tree">
  <li class=" treeview" v-for="(menu,index) in menuList">
    <a href="#">
      <i class="fa" :class="iconLIst[index+1]"></i> <span style="font-size: 16px">{{menu.name}}</span>
      <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
    </a>
    <ul class="treeview-menu">
      <router-link tag="li" class="pageLink" :to="item.url" :index="item.url" v-for="item in menu.children" :key="item.id">
        <a >
          <i class="fa fa-circle-o"></i><span style="font-size: 14px">{{ item.menuName }}</span>
        </a>
      </router-link>

    </ul>
  </li>
</ul>
</template>
<script>
    export default {
        name: 'SidebarMenu',
        data() {
            return {
                fa:'fa',
                isCollapse: false,
                routeActiveMenu: this.$route.path,
                menuList: [],
                iconLIst: ['fa-dashboard', 'fa-files-o', 'fa-th', 'fa-laptop', 'fa-edit', 'fa-table', 'fa-calendar', 'fa-envelope',
                  'fa-folder', 'fa-trash-o', 'fa-book','fa-apple','fa-gavel','fa-krw','fa-tasks','fa-search']
            }
        },
      methods:{
          handleMenu(item)
          {
            this.$router.push({ path: item.url })
          }
        },
        mounted() {
          this.menuList=[];
          let str=window.localStorage.getItem('menuList');
          this.menuList=JSON.parse(str);
        },
        watch: {
            $route(to, from) {
                if (this.$route.query.child) {
                    this.routeActiveMenu = '/index/' + this.$route.path.split('/')[1]
                } else {
                    this.routeActiveMenu = to.path
                }
            }
        }
    }
</script>
<style>
  .header{
    color: #4b646f;
    background: #1a2226;
  }
  .sidebar-menu > li > a {
    padding: 12px 15px 12px 15px;
  }
  .skin-blue .sidebar a {
    color: #b8c7ce !important;
  }

  .sidebar-menu li.active > a > .fa-angle-left,
  .sidebar-menu li.active > a > .pull-right-container > .fa-angle-left {
    animation-name: rotate;
    animation-duration: 0.2s;
    animation-fill-mode: forwards;
  }

  .treeview-title {
    z-index: 1;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(-90deg);
    }
  }
</style>
