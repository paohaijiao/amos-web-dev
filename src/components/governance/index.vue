<template>
  <div >
      <dash-header ></dash-header>
      <sidebar />
      <topo></topo>
      <router-view></router-view>
    <dash-footer></dash-footer>
  </div>
<!--  <topo></topo>-->
</template>

<script>
import topo from '@/components/topo/topo.vue'
import DashFooter from '../layout/DashFooter'
import DashHeader from '../layout/DashHeader'
import Sidebar from '../layout/Sidebar'
export default {
  name: 'governance',
  data() {
    return {
      topoData1: {
        nodes: [],
        connectors: []
      }
    }
  },
  methods: {},
  components: {DashHeader,DashFooter,Sidebar,topo}
}
</script>
<style>
  .content-wrapper{
    margin-top: -20px;
  }
</style>
