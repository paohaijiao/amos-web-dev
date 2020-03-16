<template>
  <li class="dropdown user user-menu">
    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
      <img src="https://img.zcool.cn/community/01eda25ba32d76a8012099c8cbfcfb.jpg@260w_195h_1c_1e_1o_100sh.jpg"  class="user-image" />
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
          <span>退出登录</span>
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
            if (window.localStorage) {
                window.localStorage.setItem('user', null)
                window.localStorage.setItem('token', null)
            }
            let that =this;
            this.$api.getLogout({},res => {
                    if (res.code === 200) {
                        debugger;
                    }else{
                        this.$alert(res.message);
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
