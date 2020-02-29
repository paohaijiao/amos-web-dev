<template>
  <div>
    <topojob></topojob>
  </div>
</template>

<script>
import topojob from '@/components/topo/topojob.vue'
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
  components: {
      topojob
  }
}
</script>

<style >
#div1 {
  width: 700px;
  height: 120px;
  padding: 10px;
  border: 1px solid #aaaaaa;
}

#drag1 {
  cursor: pointer;
}
 .content-wrapper{
   margin-top: -20px;
 }
</style>
