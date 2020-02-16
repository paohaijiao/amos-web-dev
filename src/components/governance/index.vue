<template>
  <div>
    <topo></topo>
  </div>
</template>

<script>
import topo from '@/components/topo/topo.vue'
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
    topo
  }
}
</script>
