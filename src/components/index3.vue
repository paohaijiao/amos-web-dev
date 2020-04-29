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

          <div class="box box-default">
            <div class="box-header with-border">
              <h3 class="box-title">使用功能占比</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <div class="row">
                <div class="col-md-8">
                  <div class="chart-responsive">
                    <canvas id="pieChart" height="150"></canvas>
                  </div>
                  <!-- ./chart-responsive -->
                </div>
                <!-- /.col -->
                <div class="col-md-4">
                  <ul class="chart-legend clearfix">
                    <li><i class="fa fa-circle-o text-red"></i> 采集数据</li>
                    <li><i class="fa fa-circle-o text-green"></i> 数据治理</li>
                    <li><i class="fa fa-circle-o text-yellow"></i> 任务调度</li>
                    <li><i class="fa fa-circle-o text-aqua"></i> 在线预览</li>
                    <li><i class="fa fa-circle-o text-light-blue"></i> 数据服务</li>
                    <li><i class="fa fa-circle-o text-gray"></i> 任务监控</li>
                  </ul>
                </div>
                <!-- /.col -->
              </div>
              <!-- /.row -->
            </div>
            <!-- /.box-body -->
            <div class="box-footer no-padding">
              <ul class="nav nav-pills nav-stacked">
                <li><a href="#">超级管理员
                  <span class="pull-right text-red"><i class="fa fa-angle-down"></i> 12%</span></a></li>
                <li><a href="#">普通管理员 <span class="pull-right text-green"><i class="fa fa-angle-up"></i> 4%</span></a>
                </li>
                <li><a href="#">用户
                  <span class="pull-right text-yellow"><i class="fa fa-angle-left"></i> 0%</span></a></li>
              </ul>
            </div>
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
            initSparkBar(){

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
                var pieChartCanvas =  document.getElementById('pieChart').getContext('2d');
                var data = {
                    datasets: [
                        {
                            data: [10, 20, 30,40,50,60],
                            backgroundColor:['#f56954','#00a65a','#f39c12','#00c0ef','#3c8dbc','#d2d6de']
                        }
                    ],
                    labels: ["采集数据", "数据治理", " 任务调度"," 在线预览"," 数据服务"," 任务监控"]
                };
                var pieOptions     = {
                    cutoutPercentage:40,
                    animation:{
                        animateRotate:true
                    }
                };
                let config={type: "doughnut",data:data,options:pieOptions}
                new Chart(pieChartCanvas, config)
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
        },
        created() {

        }
    }
</script>



