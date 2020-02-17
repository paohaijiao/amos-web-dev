<template>
  <div class="wrapper" style="height: auto; min-height: 100%;">
    <dash-header ></dash-header>
    <sidebar  />
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <section class="content-header">
        <ol class="breadcrumb">
          <li>
            <a href="javascript:;">
              <i class="fa fa-home"></i>Home</a>
          </li>
          <li class="active">{{$route.name.toUpperCase()}}</li>
        </ol>
      </section>
      <dashboard></dashboard>
      <router-view></router-view>
    </div>
    <dash-footer></dash-footer>
  </div>
</template>

<script>
import faker from 'faker'
import DashFooter from './layout/DashFooter'
import DashHeader from './layout/DashHeader'
import Sidebar from './layout/Sidebar'
import 'hideseek'
import Dashboard from "./layout/Dashboard";

export default {
  name: 'Dash',
  components: {
      Dashboard,
    DashFooter,
    DashHeader,
    Sidebar
  },
  data: function () {
    return {
      userInfo:{},
      classes: {
        fixed_layout: false,
        hide_logo: false
      }
    }
  },
  computed: {
    user () {
      return {
        displayName: faker.name.findName(),
        avatar: faker.image.avatar(),
        roles: [faker.name.jobTitle(), faker.name.jobTitle()]
      }
    }
  },
    methods: {
        init(){

        }
    },
    created() {
      this.userInfo={};
      let str=window.localStorage.getItem('userInfo');
      this.userInfo=JSON.parse(str);
        this.init();
    }
}
</script>

<style>
.wrapper.fixed_layout .main-header {
  position: fixed;
  width: 100%;
}
.wrapper.fixed_layout .content-wrapper {
  padding-top: 50px;
}
.wrapper.fixed_layout .main-sidebar {
  position: fixed;
  height: 100vh;
}

@media (max-width: 767px) {
  .wrapper.hide_logo .main-header .logo {
    display: none;
  }
}

.logo-mini,
.logo-lg {
  text-align: left;
}
.logo-mini img,
.logo-lg img {
  padding: 0.4em !important;
}

.logo-lg img {
  display: -webkit-inline-box;
  width: 25%;
}

.user-panel {
  height: 4em;
}

hr.visible-xs-block {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.17);
  height: 1px;
  border-color: transparent;
}
</style>
