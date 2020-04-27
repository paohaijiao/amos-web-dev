<template>
  <div class="items-list">
    <div class="dropdown dropdownItem" v-for="(stepfirst,index) in stepList">
      <button type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown" style="width:100%">
        {{stepfirst.name}}
      </button>
      <div class="dropdown-menu item-list" style="margin:0px;padding: 0;width:100%">
        <ul style="list-style:none; margin:0px;padding: 0;float: left;width:100%">
          <li class="item second table-bordered item item-function"  data-type="FUNCTION" :data-name="stepItem.description" :data-code="stepItem.code"  v-for="(stepItem, index1) in stepfirst.step"  :key="index1" style="list-style: none">
            <a class="dropdown-item" href="#" style="margin-left:0px">
             <span style="font-size: 14px;overflow: hidden;color: #2c3b41">{{stepItem.description}}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'item-list',
  data() {
    return {
      iconLIst:['fa-adn','fa-angellist','fa-behance-square','fa-bitbucket-square',' fa-codiepie','fa-line-chart',
          'fa-bar-chart','fa-dollar','fa-krw','fa-tasks','fa-file-audio-o','fa-anchor',
      'fa-ambulance','fa-american-sign-language-interpreting','fa-archive','fa-arrows','fa-asl-interpreting',
          'fa-asterisk','fa-audio-description','fa-automobile','fa-balance-scale','fa-bandcamp','fa-bank','fa-bar-chart-o',
      'fa-bath',' fa-beer','fa-bell','fa-bicycle','fa-binoculars','fa-bitbucket','fa-black-tie','fa-bolt',
      'fa-bomb','fa-book','fa-briefcase','fa-building','fa-calculator','fa-calendar','fa-calendar-check-o','fa-camera-retro'
      ,'fa-cart-arrow-down','fa-cc-diners-club','fa-chain','fa-chrome','fa-clock-o','fa-cloud-download','fa-code-fork',
      'fa-codepen','fa-code','fa-cloud-upload','fa-codiepie','fa-cog','fa-cogs','fa-fort-awesome']
    }
  },
  methods: {
  },
    created(){
    },
  props: {
    stepList: {
        type: Array
    }
}
}
</script>
<style>
  .dropdownItem{
    width:160px;
  }
</style>
