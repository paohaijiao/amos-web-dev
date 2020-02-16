<template>
  <li class="dropdown user user-menu">
    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
      <img src="/static/img/stock/user2-160x160.jpg"  class="user-image" />
      <span class="hidden-xs">{{userInfo.name}}</span>
    </a>
    <ul class="dropdown-menu">
      <li class="user-header" style="height:auto;min-height:85px;padding-bottom:15px;">
        <p>
          <span>{{userInfo.name}}</span>
          <small >管理员</small>
        </p>
      </li>
      <li class="user-footer">
        <a @click="logout()" class="btn btn-default btn-flat btn-block">
          <i class="fa fa-sign-out"></i>
          <span>Logout</span>
        </a>
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'UserMenu',
  data(router) {
    return {
      userInfo:{}
    }
  },
  methods: {
        logout () {
            debugger;
            if (window.localStorage) {
                window.localStorage.setItem('user', null)
                window.localStorage.setItem('token', null)
            }
            let that =this;
            this.$axios
                .post('/api/user/logout')
                .then(res => {
                    debugger;
                    if (res.data.code === 200) {
                        debugger;
                    }else{
                        this.$alert(res.data.message);
                    }
                })
            window.location="/"
        }
    },
  mounted() {
    this.userInfo={};
    let str=window.localStorage.getItem('userInfo');
    this.userInfo=JSON.parse(str);
  },
}
</script>
