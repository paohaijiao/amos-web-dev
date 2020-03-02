<template>
  <!-- Main content -->
  <section class="content">
    <!-- GitHub hint -->
    <div class="row">
      <div class="col-xs-12">
        <alert :dismissible="true"
               type="success"
               :iconClasses="['fa', 'fa-check']"
               title="数据治理平台">
          <span>若有好的建议或者bug修复请联系作者.</span>
          <a href="mailto:814780613@qq.com&subject=大数据+数据治理平台使用感受&body=你有什么想法可以发送给我们"><i class="fa fa-github fa-2x"></i></a>
        </alert>
      </div>

      <!-- Info boxes -->
      <div class="col-md-3 col-sm-6 col-xs-12">
        <info-box color-class="bg-aqua"
                  :icon-classes="['fa', 'fa-cube']"
                  text="数据源个数"
                  :number="item.ds"
                  ></info-box>
      </div>
      <!-- /.col -->
      <div class="col-md-3 col-sm-6 col-xs-12">
        <info-box color-class="bg-red"
                  :icon-classes="['fa', 'fa-google-plus']"
                  text="转换"
                  :number="item.trans"
               >
        </info-box>
      </div>
      <!-- /.col -->

      <!-- fix for small devices only -->
      <div class="clearfix visible-sm-block"></div>

      <div class="col-md-3 col-sm-6 col-xs-12">
        <info-box color-class="bg-green"
                  :icon-classes="['ion', 'ion-ios-cart-outline']"
                  text="作业"
                  :number="item.jobs"
                  ></info-box>
      </div>
      <!-- /.col -->
      <div class="col-md-3 col-sm-6 col-xs-12">
        <info-box color-class="bg-yellow"
                  :icon-classes="['ion', 'ion-ios-people-outline']"
                  text="任务数"
                  :number="item.task"
                  >
        </info-box>
      </div>
      <!-- /.col -->
    </div>
    <!-- /.row -->

    <div class="col-xs-12">
      <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title"></h3>
          <div class="box-body">
            <div class="col-sm-6 col-xs-12">
              <p class="text-center">
                <strong>服务器性能概览</strong>
              </p>
              <canvas id="trafficBar" ></canvas>
            </div>
            <hr class="visible-xs-block">
            <div class="col-sm-6 col-xs-12">
              <p class="text-center">
                <strong>数据概览</strong>
              </p>
              <canvas id="languagePie"></canvas>
            </div>
          </div>
        </div>
        <div class="text-center">
          <small><b>欢迎</b> 使用数据治理平台</small>
        </div>
      </div>
    </div>
    <!-- /.row -->

    <!-- Main row -->
    <div class="row">
      <div class="col-md-3 col-sm-6 col-xs-12">
        <process-info-box color-class="bg-yellow"
                          :icon-classes="['ion', 'ion-ios-pricetag-outline']"
                          text="接口数"
                          :number="item.api"
                          :progress="50"
                          description=""></process-info-box>
      </div>
      <!-- /.col -->
      <div class="col-md-3 col-sm-6 col-xs-12">
        <process-info-box color-class="bg-green"
                          :icon-classes="['ion', 'ion-ios-heart-outline']"
                          text="消息数"
                          :number="0"
                          :progress="20"
                          description=""></process-info-box>
      </div>
      <!-- /.col -->
      <div class="col-md-3 col-sm-6 col-xs-12">
        <process-info-box color-class="bg-red"
                          :icon-classes="['ion', 'ion-ios-cloud-download-outline']"
                          text="用户数"
                          :number="item.user"
                          :progress="70"
                          description=""></process-info-box>
      </div>
      <!-- /.col -->
      <div class="col-md-3 col-sm-6 col-xs-12">
        <process-info-box color-class="bg-aqua"
                          :icon-classes="['ion', 'ion-ios-chatbubble-outline']"
                          text="数据采集数"
                          :number="item.spark"
                          :progress="40"
                          description=""></process-info-box>
      </div>
      <!-- /.col -->
    </div>
    <!-- /.row -->
  </section>
  <!-- /.content -->
</template>

<script>
import Chart from 'chart.js'
import Alert from '../widgets/Alert'
import InfoBox from '../widgets/InfoBox'
import ProcessInfoBox from '../widgets/ProcessInfoBox'

export default {
  name: 'Dashboard',
  components: {
      Alert,
      InfoBox,
      ProcessInfoBox
  },
  data () {
    return {
      containner: {},
      item: {
        ds: null,
        trans: null,
        jobs: null,
        task: null,
        api: null,
        message: null,
        message: null,
        user: null,
        spark: null
      },
      generateRandomNumbers (numbers, max, min) {
        var a = []
        for (var i = 0; i < numbers; i++) {
          a.push(Math.floor(Math.random() * (max - min + 1)) + max)
        }
        return a
      }
    }
  },
  methods: {
    getContainer() {
      let that = this
        this.$api.getServerPerform({},res => {
            debugger;
                  if (res.code === 200) {
                    that.containner = res.data
                    that.draw()
                  } else {
                    that.$alert(res.data.message)
                  }
                })
    },
    getList() {
      let that = this
        this.$api.getIndex({},res => {
            if (res.code === 200) {
                that.item = res.data
            } else {
                that.$alert(res.message)
            }
        })
    },
    draw() {
      this.$nextTick(() => {
        var ctx = document.getElementById('trafficBar').getContext('2d')
        let array = this.containner
        var config = {
          type: 'line',
          data: {
            labels: this.containner.labels,
            datasets: [{
              label: 'cpu',
              fill: false,
              borderColor: '#284184',
              pointBackgroundColor: '#284184',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              data: this.containner.cpu
            }, {
              label: 'memory',
              borderColor: '#4BC0C0',
              pointBackgroundColor: '#4BC0C0',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              data: this.containner.memory
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: !this.isMobile,
            legend: {
              position: 'bottom',
              display: true
            },
            tooltips: {
              mode: 'label',
              xPadding: 10,
              yPadding: 10,
              bodySpacing: 10
            }
          }
        }

         new Chart(ctx, config) // eslint-disable-line no-new

        var pieChartCanvas = document.getElementById('languagePie').getContext('2d')
        var pieConfig = {
          type: 'pie',
          data: {
            labels: ['作业', '转换', 'spark采集'],
            datasets: [{
              data: [this.containner.jobs, this.containner.trans, this.containner.sparks],
              backgroundColor: ['#00a65a', '#f39c12', '#00c0ef'],
              hoverBackgroundColor: ['#00a65a', '#f39c12', '#00c0ef']
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: !this.isMobile,
            legend: {
              position: 'bottom',
              display: true
            }
          }
        }

        new Chart(pieChartCanvas, pieConfig) // eslint-disable-line no-new
      })
    }
  },
  computed: {
    isMobile () {
      return this.generateRandomNumbers(10, 100, 100)
    }
  },
  created() {
    this.getList()
    this.getContainer()
  },

  mounted () {

  }
}
</script>
<style>
  .content{
    margin-top: 10px !important;
  }
  #trafficBar{
    height:250px!important;
  }
  #languagePie{
    height:250px!important;
  }
.info-box {
  cursor: pointer;
}
.info-box-content {
  text-align: center;
  vertical-align: middle;
  display: inherit;
}
.fullCanvas {
  width: 100%;
}
</style>
