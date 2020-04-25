<template>
  <header class="main-header" style="background-color: #3c8dbc;">
    <!-- Logo -->
    <a href="javascript:;" class="logo">
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <span class="logo-mini"><b>A</b>LT</span>
      <!-- logo for regular state and mobile devices -->
      <span class="logo-lg"><b>A</b>mos</span>
    </a>
    <!-- Header Navbar -->
    <nav class="navbar navbar-static-top" role="navigation">
      <!-- Sidebar toggle button-->
      <a href="javascript:;" class="sidebar-toggle" data-toggle="offcanvas" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>

      <!-- Navbar Right Menu -->
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <messages-menu></messages-menu>
          <notifications-menu></notifications-menu>
          <tasks-menu></tasks-menu>
          <user-menu :user="user"></user-menu>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import MessagesMenu from './MessagesMenu'
import NotificationsMenu from './NotificationsMenu'
import TasksMenu from './TasksMenu'
import UserMenu from './UserMenu'

export default {
  name: 'DashHeader',
  components: {
    MessagesMenu,
    NotificationsMenu,
    TasksMenu,
    UserMenu
  },
  props: ['user'],
  computed: {
    ...mapState([
      'userInfo'
    ])
  }
}
</script>
