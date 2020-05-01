<template>
  <div >
    <dash-header ></dash-header>
    <sidebar />
    <div class="content-wrapper">
      <section class="content-header">
        <h1>
          转换统计
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
        <div class="col-md-12">
          <div class="box box-danger">
            <div class="box-header with-border">
              <h3 class="box-title">月度报表情况</h3>

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
                <div class="col-md-8">
                  <p class="text-center">
                    <strong>转换处理本年度统计</strong>
                  </p>

                  <div class="chart">
                    <!-- Sales Chart Canvas -->
                    <canvas id="stepCanvas" style="height: 180px;"></canvas>
                  </div>
                  <!-- /.chart-responsive -->
                </div>
                <!-- /.col -->
                <div class="col-md-4">
                  <p class="text-center">
                    <strong>作业本年度统计</strong>
                  </p>

                  <div class="progress-group" style="width:40%">
                    <span class="progress-text">转换最长时间</span>
                    <span class="progress-number"><b>120</b>/500</span>

                    <div class="progress sm">
                      <div class="progress-bar progress-bar-aqua" style="width: 80%"></div>
                    </div>
                  </div>
                  <!-- /.progress-group -->
                  <div class="progress-group">
                    <span class="progress-text">转换最短时间</span>
                    <span class="progress-number"><b>310</b>/400</span>

                    <div class="progress sm">
                      <div class="progress-bar progress-bar-red" style="width: 50%"></div>
                    </div>
                  </div>
                  <!-- /.progress-group -->
                  <div class="progress-group">
                    <span class="progress-text">作业最长时间</span>
                    <span class="progress-number"><b>480</b>/800</span>

                    <div class="progress sm">
                      <div class="progress-bar progress-bar-green" style="width: 90%"></div>
                    </div>
                  </div>
                  <!-- /.progress-group -->
                  <div class="progress-group">
                    <span class="progress-text">作业最短时间</span>
                    <span class="progress-number"><b>250</b>/500</span>

                    <div class="progress sm">
                      <div class="progress-bar progress-bar-yellow" style="width: 30%"></div>
                    </div>
                  </div>
                  <!-- /.progress-group -->
                </div>
                <!-- /.col -->
              </div>
              <!-- /.row -->
            </div>
            <!-- ./box-body -->
            <div class="box-footer">
              <div class="row">
                <div class="col-sm-3 col-xs-6">
                  <div class="description-block border-right">
                    <span class="description-percentage text-green"><i class="fa fa-caret-up"></i> 17%</span>
                    <h5 class="description-header">$35,210.43</h5>
                    <span class="description-text">本月输入量环比</span>
                  </div>
                  <!-- /.description-block -->
                </div>
                <!-- /.col -->
                <div class="col-sm-3 col-xs-6">
                  <div class="description-block border-right">
                    <span class="description-percentage text-yellow"><i class="fa fa-caret-left"></i> 0%</span>
                    <h5 class="description-header">$10,390.90</h5>
                    <span class="description-text">本月输出量环比</span>
                  </div>
                  <!-- /.description-block -->
                </div>
                <!-- /.col -->
                <div class="col-sm-3 col-xs-6">
                  <div class="description-block border-right">
                    <span class="description-percentage text-green"><i class="fa fa-caret-up"></i> 20%</span>
                    <h5 class="description-header">$24,813.53</h5>
                    <span class="description-text">本月拒绝量环比</span>
                  </div>
                  <!-- /.description-block -->
                </div>
                <!-- /.col -->
                <div class="col-sm-3 col-xs-6">
                  <div class="description-block">
                    <span class="description-percentage text-red"><i class="fa fa-caret-down"></i> 18%</span>
                    <h5 class="description-header">1200</h5>
                    <span class="description-text">本月错误量环比</span>
                  </div>
                  <!-- /.description-block -->
                </div>
              </div>
              <!-- /.row -->
            </div>
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
                    <td><a href="pages/examples/invoice.html">OR9842</a></td>
                    <td>Call of Duty IV</td>
                    <td><span class="label label-success">开始</span></td>
                    <td>
                      <div class="sparkbar" data-color="#00a65a" data-height="20">90,80,90,-70,61,-83,63</div>
                    </td>
                  </tr>
                  <tr>
                    <td><a href="pages/examples/invoice.html">OR1848</a></td>
                    <td>Samsung Smart TV</td>
                    <td><span class="label label-warning">结束</span></td>
                    <td>
                      <div class="sparkbar" data-color="#f39c12" data-height="20">90,80,-90,70,61,-83,68</div>
                    </td>
                  </tr>
                  <tr>
                    <td><a href="pages/examples/invoice.html">OR7429</a></td>
                    <td>iPhone 6 Plus</td>
                    <td><span class="label label-danger">运行中</span></td>
                    <td>
                      <div class="sparkbar" data-color="#f56954" data-height="20">90,-80,90,70,-61,83,63</div>
                    </td>
                  </tr>
                  <tr>
                    <td><a href="pages/examples/invoice.html">OR1848</a></td>
                    <td>Samsung Smart TV</td>
                    <td><span class="label label-warning">结束</span></td>
                    <td>
                      <div class="sparkbar" data-color="#f39c12" data-height="20">90,80,-90,70,61,-83,68</div>
                    </td>
                  </tr>
                  <tr>
                    <td><a href="pages/examples/invoice.html">OR7429</a></td>
                    <td>iPhone 6 Plus</td>
                    <td><span class="label label-danger">运行中</span></td>
                    <td>
                      <div class="sparkbar" data-color="#f56954" data-height="20">90,-80,90,70,-61,83,63</div>
                    </td>
                  </tr>
                  <tr>
                    <td><a href="pages/examples/invoice.html">OR9842</a></td>
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

          <div class="box box-primary">
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
            initLineChar() {
                var salesChartCanvas = document.getElementById('stepCanvas').getContext('2d');
                var areaChartData = {
                    labels  : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [
                        {
                            label               : 'Electronics',
                            pointStrokeColor    : '#c1c7d1',
                            data                : [65, 59, 80, 81, 56, 55, 40],
                            backgroundColor:['red','yellow','grey','blue']
                        },
                        {
                            label               : 'Digital Goods',
                            pointColor          : '#3b8bba',
                            data                : [28, 48, 40, 19, 86, 27, 90]
                        }
                    ]
                }
                var areaChartOptions = {
                    //Boolean - If we should show the scale at all
                    showScale               : true,
                    //Boolean - Whether grid lines are shown across the chart
                    scaleShowGridLines      : false,
                    //String - Colour of the grid lines
                    scaleGridLineColor      : 'rgba(0,0,0,.05)',
                    //Number - Width of the grid lines
                    scaleGridLineWidth      : 1,
                    //Boolean - Whether to show horizontal lines (except X axis)
                    scaleShowHorizontalLines: true,
                    //Boolean - Whether to show vertical lines (except Y axis)
                    scaleShowVerticalLines  : true,
                    //Boolean - Whether the line is curved between points
                    bezierCurve             : true,
                    //Number - Tension of the bezier curve between points
                    bezierCurveTension      : 0.3,
                    //Boolean - Whether to show a dot for each point
                    pointDot                : false,
                    //Number - Radius of each point dot in pixels
                    pointDotRadius          : 4,
                    //Number - Pixel width of point dot stroke
                    pointDotStrokeWidth     : 1,
                    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
                    pointHitDetectionRadius : 20,
                    //Boolean - Whether to show a stroke for datasets
                    datasetStroke           : true,
                    //Number - Pixel width of dataset stroke
                    datasetStrokeWidth      : 2,
                    //Boolean - Whether to fill the dataset with a color
                    datasetFill             : true,
                    //String - A legend template
                    legendTemplate          : '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].lineColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
                    //Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
                    maintainAspectRatio     : true,
                    //Boolean - whether to make the chart responsive to window resizing
                    responsive              : true
                }
                var myBarChart = new Chart(salesChartCanvas, {
                    type: "bar",
                    data: areaChartData,
                    options: areaChartOptions
                });
            },
        },
        mounted() {
            this.initLineChar();
            this.initPieChart();
        },
        created() {

        }
    }
</script>



