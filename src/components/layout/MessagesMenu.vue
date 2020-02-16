<template>
  <li class="dropdown messages-menu">
    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
      <i class="fa fa-envelope-o"></i>
      <span class="label label-success">{{  mailbox.inbox }}</span>
    </a>
    <ul class="dropdown-menu">
      <li class="header">你收件箱有{{  mailbox.inbox }}条消息</li>
    </ul>
  </li>
</template>

<script>
import { mapState } from 'vuex'
import MessageItem from './MessageItem'

export default {
  name: 'MessagesMenu',
  components: {
    MessageItem
  },
    data() {
        return {
            mailbox:{
                inbox:0,
                outbox:0,
                draft:0,
                junk:0,
                trash:0
            }
        }
    },
    methods:{
        getMailInbox(){
            let that=this;
            this.$api.getMailBox(res => {
                    if (res.data.code === 200) {
                        that.mailbox.inbox=res.data.inbox.value;
                        that.mailbox.outbox=res.data.outbox.value;
                        that.mailbox.draft=res.data.draft.value;
                        that.mailbox.junk=res.data.junk.value;
                        that.mailbox.trash=res.data.trash.value;
                    }else{
                        this.$alert('获取用户失败');
                    }
                })
        }
    },
    created(){
        this.getMailInbox();
    },
  computed: {
  }
}
</script>
