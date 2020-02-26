<template>
  <li class="dropdown tasks-menu">
<!--    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">-->
<!--      <i class="fa fa-flag-o"></i>-->
<!--      <span class="label label-danger">{{item.count}} </span>-->
<!--    </a>-->
<!--    <ul class="dropdown-menu">-->
<!--      <li class="header">你有{{item.count}}用户需要审核</li>-->
<!--    </ul>-->
  </li>
</template>

<script>
export default {
  name: 'TasksMenu',
    data() {
        return {
            item:{
                count:0
            },
        }

    },
    methods: {

    },
  computed: {
  },
    created() {
            let option=new Object();
            option.size=10;
            option.page=1;
            option.name=this.search ? this.search : null;
            option.status=false;
            let that =this;
            this.$api
                .getUserAll( option,res => {
                    if (res.code === 200) {
                        that.item.count = res.data.totalElements
                    }else{
                        this.$alert(res.message);
                    }
                })

    }
}
</script>
