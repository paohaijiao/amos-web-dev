<template>
  <div >
    <dash-header ></dash-header>
    <sidebar />
    <div class="content-wrapper">
      <section class="content-header">
        <h1>
          运行统计
          <small>数据概览</small>
        </h1>
        <ol class="breadcrumb">
          <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
          <li class="active">数据概览</li>
        </ol>
      </section>
    <!-- Main content -->
    <section class="content">
      <!-- Info boxes -->
      <div class="row">
        <div class="col-md-3 col-sm-6 col-xs-12">
          <div class="info-box">
            <span class="info-box-icon bg-aqua"><i class="ion ion-ios-gear-outline"></i></span>

            <div class="info-box-content">
              <span class="info-box-text">总输入量</span>
              <span class="info-box-number">90<small>%</small></span>
            </div>
            <!-- /.info-box-content -->
          </div>
          <!-- /.info-box -->
        </div>
        <!-- /.col -->
        <div class="col-md-3 col-sm-6 col-xs-12">
          <div class="info-box">
            <span class="info-box-icon bg-red"><i class="fa fa-google-plus"></i></span>

            <div class="info-box-content">
              <span class="info-box-text">总输出量</span>
              <span class="info-box-number">41,410</span>
            </div>
            <!-- /.info-box-content -->
          </div>
          <!-- /.info-box -->
        </div>
        <!-- /.col -->

        <!-- fix for small devices only -->
        <div class="clearfix visible-sm-block"></div>

        <div class="col-md-3 col-sm-6 col-xs-12">
          <div class="info-box">
            <span class="info-box-icon bg-green"><i class="ion ion-ios-cart-outline"></i></span>

            <div class="info-box-content">
              <span class="info-box-text">总拒绝量</span>
              <span class="info-box-number">760</span>
            </div>
            <!-- /.info-box-content -->
          </div>
          <!-- /.info-box -->
        </div>
        <!-- /.col -->
        <div class="col-md-3 col-sm-6 col-xs-12">
          <div class="info-box">
            <span class="info-box-icon bg-yellow"><i class="ion ion-ios-people-outline"></i></span>

            <div class="info-box-content">
              <span class="info-box-text">总错误量</span>
              <span class="info-box-number">2,000</span>
            </div>
            <!-- /.info-box-content -->
          </div>
          <!-- /.info-box -->
        </div>
        <!-- /.col -->
      </div>
      <!-- /.row -->

      <div class="row">
        <div class="col-md-8">


          <!-- TABLE: LATEST ORDERS -->
          <div class="box box-info">
            <div class="box-header with-border">
              <h3 class="box-title">使用者分布</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <div class="chart">
                <canvas id="mapchart" style="height:400px;width:400px"></canvas>
              </div>
              <!-- /.table-responsive -->
            </div>
            <!-- /.box-footer -->
          </div>
          <!-- /.box -->
        </div>
        <div class="col-md-4">
          <div class="box box-warning">
            <div class="box-header with-border">
              <h3 class="box-title">功能概览</h3>

              <div class="box-tools pull-right">
                <div class="btn-group">
                  <ul class="dropdown-menu" role="menu">
                    <li><a href="#">Action</a></li>
                    <li><a href="#">Another action</a></li>
                    <li><a href="#">Something else here</a></li>
                    <li class="divider"></li>
                    <li><a href="#">Separated link</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <div class="row">
                <div class="col-md-12">

                  <div class="chart">
                    <div id="myChart" style="width:600px; height: 400px"></div>
                  </div>
                  <!-- /.chart-responsive -->
                </div>
                <!-- /.col -->
                <!-- /.col -->
              </div>
              <!-- /.row -->
            </div>
            <!-- ./box-body -->
            <!-- /.box-footer -->
          </div>
          <!-- /.box -->
        </div>
        <!-- /.col -->
      </div>
      <!-- /.row -->

      <!-- Main row -->
      <div class="row">
        <!-- Left col -->
        <div class="col-md-8">


          <!-- TABLE: LATEST ORDERS -->
          <div class="box box-info">
            <div class="box-header with-border">
              <h3 class="box-title">最近运行情况</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <div class="table-responsive">
                <table class="table no-margin">
                  <thead>
                  <tr>
                    <th style="width: 25%">批次</th>
                    <th style="width: 25%">步骤名称</th>
                    <th style="width: 25%">运行情况</th>
                    <th style="width: 25%">运行时长</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>OR9842</td>
                    <td>Call of Duty IV</td>
                    <td><span class="label label-success">开始</span></td>
                    <td>
                      <div class="sparkbar" data-color="#00a65a" data-height="20">90,80,90,-70,61,-83,63</div>
                    </td>
                  </tr>
                  <tr>
                    <td>OR1848</td>
                    <td>Samsung Smart TV</td>
                    <td><span class="label label-warning">结束</span></td>
                    <td>
                      <div class="sparkbar" data-color="#f39c12" data-height="20">90,80,-90,70,61,-83,68</div>
                    </td>
                  </tr>
                  <tr>
                    <td>OR7429</td>
                    <td>iPhone 6 Plus</td>
                    <td><span class="label label-danger">运行中</span></td>
                    <td>
                      <div class="sparkbar" data-color="#f56954" data-height="20">90,-80,90,70,-61,83,63</div>
                    </td>
                  </tr>
                  <tr>
                    <td>OR1848</td>
                    <td>Samsung Smart TV</td>
                    <td><span class="label label-warning">结束</span></td>
                    <td>
                      <div class="sparkbar" data-color="#f39c12" data-height="20">90,80,-90,70,61,-83,68</div>
                    </td>
                  </tr>
                  <tr>
                    <td>OR7429</td>
                    <td>iPhone 6 Plus</td>
                    <td><span class="label label-danger">运行中</span></td>
                    <td>
                      <div class="sparkbar" data-color="#f56954" data-height="20">90,-80,90,70,-61,83,63</div>
                    </td>
                  </tr>
                  <tr>
                    <td>OR9842</td>
                    <td>Call of Duty IV</td>
                    <td><span class="label label-success">开始</span></td>
                    <td>
                      <div class="sparkbar" data-color="#00a65a" data-height="20">90,80,90,-70,61,-83,63</div>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <!-- /.table-responsive -->
            </div>
            <!-- /.box-footer -->
          </div>
          <!-- /.box -->
        </div>
        <!-- /.col -->

        <div class="col-md-4">


          <!-- /.info-box -->

          <div class="box box-danger">
            <div class="box-header with-border">
              <h3 class="box-title">使用功能占比</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <div class="row">
                <div class="col-md-12">
                  <div class="chart-responsive">
                    <canvas id="funnel" height="400px" width="600px"></canvas>
                  </div>
                  <!-- ./chart-responsive -->
                </div>
                <!-- /.col -->

                <!-- /.col -->
              </div>
              <!-- /.row -->
            </div>
            <!-- /.box-body -->

            <!-- /.footer -->
          </div>
          <!-- /.box -->
        </div>
        <!-- /.col -->
      </div>
      <!-- /.row -->
    </section>
    <!-- /.content -->
  </div>
    <dash-footer></dash-footer>
  </div>
</template>
<script>
    import DashFooter from './layout/DashFooter'
    import DashHeader from './layout/DashHeader'
    import Sidebar from './layout/Sidebar'
    import Chart from 'chart.js';
    import echarts from 'echarts'
   // import '../../node_modules/echarts/map/js/world.js'
    import '../../node_modules/echarts/map/js/china.js'

    export default {
        name: 'report',
        props: {},
        components: {
            DashFooter,
            DashHeader,
            Sidebar
        },
        data() {
            return {

            }
        },
        methods: {
            //https://chartjs.bootcss.com/docs/charts/area.html 参考文档
            //http://blog.csdn.net/u010520912/article/details/78252271
            initMap(){
                let myChart = echarts.init(document.getElementById("mapchart"));
                var mydata = [
                    {name: '北京',value: this.randomData() },{name: '天津',value: Math.round(Math.random()*500) },
                    {name: '上海',value: this.randomData()  },{name: '重庆',value: Math.round(Math.random()*500)},
                    {name: '河北',value: this.randomData() },{name: '河南',value:Math.round(Math.random()*500) },
                    {name: '云南',value: this.randomData() },{name: '辽宁',value: Math.round(Math.random()*500) },
                    {name: '黑龙江',value: this.randomData() },{name: '湖南',value: Math.round(Math.random()*500)},
                    {name: '安徽',value: this.randomData() },{name: '山东',value: Math.round(Math.random()*500) },
                    {name: '新疆',value: this.randomData() },{name: '江苏',value: Math.round(Math.random()*500) },
                    {name: '浙江',value: this.randomData() },{name: '江西',value: Math.round(Math.random()*500) },
                    {name: '湖北',value: this.randomData() },{name: '广西',value: Math.round(Math.random()*500) },
                    {name: '甘肃',value: this.randomData() },{name: '山西',value: Math.round(Math.random()*500) },
                    {name: '内蒙古',value: this.randomData() },{name: '陕西',value: Math.round(Math.random()*500) },
                    {name: '吉林',value: this.randomData() },{name: '福建',value: Math.round(Math.random()*500) },
                    {name: '贵州',value: this.randomData() },{name: '广东',value: Math.round(Math.random()*500) },
                    {name: '青海',value: this.randomData() },{name: '西藏',value: Math.round(Math.random()*500) },
                    {name: '四川',value: this.randomData() },{name: '宁夏',value: Math.round(Math.random()*500) },
                    {name: '海南',value: this.randomData() },{name: '台湾',value:Math.round(Math.random()*500) },
                    {name: '香港',value: this.randomData() },{name: '澳门',value: Math.round(Math.random()*500) }
                ];
                var option = {
                    backgroundColor: '#FFFFFF',
                    title: {
                        text: '',
                        subtext: '',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item'
                    },
                    visualMap: {
                        show : false,
                        x: 'left',
                        y: 'bottom',
                        splitList: [
                            {start: 500, end:600},{start: 400, end: 500},
                            {start: 300, end: 400},{start: 200, end: 300},
                            {start: 100, end: 200},{start: 0, end: 100},
                        ],
                        color: ['#66CC33', '#00FF00', '#66FF33','#339900', '#33CC00', '#00CC00']
                    },
                    series: [{
                        name: '随机数据',
                        type: 'map',
                        mapType: 'china',
                        roam: true,
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        data:mydata
                    }]
                };
                myChart.setOption(option);
            },
            randomData(){
                return Math.round(Math.random()*500);
            },
            initSparkLine(){
                $('.sparkline').each(function () {
                    var $this = $(this);
                    $this.sparkline('html', {
                        type     : 'line',
                        height   : $this.data('height') ? $this.data('height') : '90',
                        width    : '100%',
                        lineColor: $this.data('linecolor'),
                        fillColor: $this.data('fillcolor'),
                        spotColor: $this.data('spotcolor')
                    });
                });
            },
            initPieChart(){
                let myChart = echarts.init(document.getElementById("funnel"));
                var option = {
                    title: {
                        text: ''
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c}%"
                    },
                    toolbox: {
                        feature: {
                            dataView: {readOnly: false},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    legend: {
                        data: ['展现','点击','访问']
                    },
                    series: [
                        {
                            name: '实际',
                            type: 'funnel',
                            left: '10%',
                            width: '80%',
                            maxSize: '80%',
                            label: {
                                position: 'inside',
                                formatter: '{c}%',
                                color: '#fff'
                            },
                            itemStyle: {
                                opacity: 0.5,
                                borderColor: '#fff',
                                borderWidth: 2
                            },
                            emphasis: {
                                label: {
                                    position: 'inside',
                                    formatter: '{b}实际: {c}%'
                                }
                            },
                            data: [
                                {value: 30, name: '访问'},
                                {value: 60, name: '点击'},
                                {value: 90, name: '展现'}
                            ]
                        }
                    ]
                };
                myChart.setOption(option);
            },
          drawLine() {
              let myChart = echarts.init(document.getElementById("myChart"));
              let that=this;
              this.$api.getSunburstData( {}, res => {
                  if (res.code === 200) {
                     var option= {
                          title: {
                              text: '',
                              subtext: 'S',
                              textStyle: {
                                  fontSize: 14,
                                  align: 'center'
                              },
                              subtextStyle: {
                                  align: 'center'
                              },
                              sublink: ''
                          },
                          series: {
                              type: 'sunburst',
                              highlightPolicy: 'ancestor',
                              data: res.data,
                              radius: [0, '95%'],
                              sort: null,
                              levels: [{}, {
                                  r0: '15%',
                                  r: '35%',
                                  itemStyle: {
                                      borderWidth: 2
                                  },
                                  label: {
                                      rotate: 'tangential'
                                  }
                              }, {
                                  r0: '35%',
                                  r: '70%',
                                  label: {
                                      align: 'right'
                                  }
                              }, {
                                  r0: '70%',
                                  r: '72%',
                                  label: {
                                      position: 'outside',
                                      padding: 3,
                                      silent: false
                                  },
                                  itemStyle: {
                                      borderWidth: 3
                                  }
                              }]
                          }
                      };
                      myChart.showLoading();
                      myChart.hideLoading();
                      myChart.setOption(option);
                  }else{
                      this.$alert(res.message);
                  }
              })


          },

        },
        mounted() {
            this.initPieChart();
            this.drawLine();
            this.initMap();
        },
        created() {

        }
    }
</script>



