<template>
  <li class="dropdown notifications-menu">
    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
<!--      <i class="fa fa-bell-o"></i>-->
<!--      <span class="label label-warning">{{ notification.length }}</span>-->
    </a>
    <ul class="dropdown-menu">
      <li class="header">
        <div class="row no-margin">
          <span class="col-xs-12 col-md-12 tab-link" :class="'new'">
<!--              <a href="javascript:;">系统通知</a>-->
            </span>
        </div>
      </li>
      <li>
        <ul  class="menu">
          <notification-item v-for="item in notification" :key="item.id" :notification="item"></notification-item>
          <li v-if="0==notification.length">
<!--            <span class="center-block text-center">没有新消息</span>-->
          </li>
        </ul>
      </li>
      <li v-if="notification.length && tab === 'new'" class="footer">
        <a href="javascript:;" >
<!--          <i class="fa fa-check"></i>-->
<!--          <span>查看更多</span>-->
        </a>
      </li>
    </ul>
  </li>
</template>

<script>
import NotificationItem from './NotificationItem'

export default {
  name: 'NotificationsMenu',
  components: {
    NotificationItem
  },
  data () {
    return {
      notification:[],
      tab: 'new'
    }
  },
  computed: {

  },
    created(){
        this.getnotify();
    },
  methods: {
    getnotify () {


    }

  }
}
</script>

<style scoped>
.navbar-custom-menu > .navbar-nav > li.notifications-menu > .dropdown-menu {
  width: 400px;
}
.navbar-custom-menu > .navbar-nav > li.notifications-menu > .dropdown-menu li.header {
  padding: 0;
}
.navbar-custom-menu > .navbar-nav > li.notifications-menu > .dropdown-menu li.header span.tab-link {
  padding: 4px;
  text-align: center;
  cursor: pointer;
}
.navbar-custom-menu > .navbar-nav > li.notifications-menu > .dropdown-menu li.header span.tab-link a {
  color: #444;
}
.navbar-custom-menu > .navbar-nav > li.notifications-menu > .dropdown-menu li.header span.tab-link.active {
  font-weight: bold;
  border-bottom: 2px solid #3c8dbc;
}
.navbar-custom-menu > .navbar-nav > li.notifications-menu > .dropdown-menu li.header span:hover.tab-link > a {
  color: #3c8dbc !important;
}
.navbar-custom-menu > .navbar-nav > li.notifications-menu > .dropdown-menu li > ul.menu {
  max-height: 300px;
}
.navbar-custom-menu > .navbar-nav > li.notifications-menu > .dropdown-menu li > ul.menu li > span {
  padding: 10px;
}
.navbar-custom-menu > .navbar-nav > li.notifications-menu > .dropdown-menu li:hover.footer > a {
  color: #3c8dbc !important;
}
</style>
