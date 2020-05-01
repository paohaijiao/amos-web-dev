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
              <span class="info-box-text">CPU Traffic</span>
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
              <span class="info-box-text">Likes</span>
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
              <span class="info-box-text">Sales</span>
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
              <span class="info-box-text">New Members</span>
              <span class="info-box-number">2,000</span>
            </div>
            <!-- /.info-box-content -->
          </div>
          <!-- /.info-box -->
        </div>
        <!-- /.col -->
      </div>
      <!-- /.row -->


      <!-- /.row -->

      <!-- Main row -->
      <div class="row">
        <!-- Left col -->
        <div class="col-md-8">
          <!-- MAP & BOX PANE -->
          <!-- BAR CHART -->
          <div class="box box-success">
            <div class="box-header with-border">
              <h3 class="box-title">Bar Chart</h3>

            </div>
            <div class="box-body">
              <div class="chart">
                <canvas id="barChart" style="height:350px"></canvas>
              </div>
            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->
          <!-- /.row -->

          <!-- TABLE: LATEST ORDERS -->
          <div class="box box-solid bg-teal-gradient ">
            <div class="box-header">
              <i class="fa fa-th"></i>

              <h3 class="box-title">Sales Graph</h3>
            </div>
            <div class="box-body border-radius-none">
              <div class="chart" id="line-chart" style="height: 350px;"></div>
            </div>
            <!-- /.box-body -->
            <!-- /.box-footer -->
          </div>
          <!-- /.box -->
        </div>
        <!-- /.col -->

        <div class="col-md-4">
          <!-- Info Boxes Style 2 -->
          <!-- /.info-box -->
          <div class="box box-danger" style="height:415px">
            <div class="box-header with-border">
              <h3 class="box-title">最近六个月运行态势</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <div class="row">
                <div class="col-md-8">
                  <div class="chart-responsive">
                    <canvas id="polarChart" height="300px"></canvas>
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
          <div class="box box-warning"  style="height:415px">
            <div class="box-header with-border">
              <h3 class="box-title">指标能力</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <div class="row">
                <div class="col-md-8">
                  <div class="chart-responsive">
                    <canvas id="radarChart" height="300px"></canvas>
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

          <!-- /.box -->
        </div>
        <!-- /.col -->
      </div>
      <!-- /.row -->
    </section>
    <!-- /.content -->


  <div class="control-sidebar-bg"></div>
    </div>
  </div>
</template>
<script>
    import DashFooter from './layout/DashFooter'
    import DashHeader from './layout/DashHeader'
    import Sidebar from './layout/Sidebar'
    export default {
        name: 'index2',
        components: {
            DashFooter,
            DashHeader,
            Sidebar
        },
        data: function () {
            return {
            }
        },
        computed: {
            user () {
                return {
                }
            }
        },
        methods: {
            initPolarChart(){
                var  ctx                   = document.getElementById('polarChart').getContext('2d')
                var data = {
                    labels  : ['January', 'February', 'March', 'April', 'May'],
                    datasets: [
                        {
                            label               : 'Electronics',
                            pointStrokeColor    : 'red',
                            data                : [65, 59, 80, 81, 56],
                            backgroundColor:['#36a2eb','#ff6384','#4bc0c0','#ffcd56','#c9cbcf']
                        },
                        {
                            label               : 'Digital Goods',
                            pointColor          : '#b6465c',
                            data                : [28, 48, 40, 19, 86],
                            backgroundColor:['#36a2eb','#ff6384','#4bc0c0','#ffcd56','#c9cbcf']
                        }
                    ]
                }
                var options = {
                    scale: {
                        angleLines: {
                            display: false
                        },
                        ticks: {
                            suggestedMin: 0,
                            suggestedMax: 100
                        }
                    }
                };
                var polarArea = new Chart(ctx, {
                    type: 'polarArea',
                    data: data,
                    options: options
                });

            },
            initRadarChart(){
                var  ctx                   = document.getElementById('radarChart').getContext('2d')
                var data ={
                    "labels": [
                        "大数据能力",
                        "结构化数据能力",
                        "非结构化能力",
                        "OLAP能力",
                        "数据加工能力",
                        "其他形式处理能力"
                    ],
                    "datasets": [{
                        "label": "转换能力",
                        "data": [65, 59, 90, 81, 56, 55],
                        "fill": true,
                        "backgroundColor": "rgba(255, 99, 132, 0.2)",
                        "borderColor": "rgb(255, 99, 132)",
                        "pointBackgroundColor": "rgb(255, 99, 132)",
                        "pointBorderColor": "#fff",
                        "pointHoverBackgroundColor": "#fff",
                        "pointHoverBorderColor": "rgb(255, 99, 132)",
                        "fill": true
                    }, {
                        "label": "作业能力",
                        "data": [28, 48, 40, 19, 96, 27],
                        "fill": true,
                        "backgroundColor": "rgba(54, 162, 235, 0.2)",
                        "borderColor": "rgb(54, 162, 235)",
                        "pointBackgroundColor": "rgb(54, 162, 235)",
                        "pointBorderColor": "#fff",
                        "pointHoverBackgroundColor": "#fff",
                        "pointHoverBorderColor": "rgb(54, 162, 235)",
                        "fill": true
                    }]
                }
                var options = {
                    scale: {
                        ticks: {
                            suggestedMin: 0,
                            suggestedMax: 100,
                            stepSize: 1
                        }
                    }
                }
                var myRadarChart = new Chart(ctx, {
                    type: 'radar',
                    data: data,
                    options: options
                });
            },
            initLine(){
                var line = new Morris.Line({
                    element          : 'line-chart',
                    resize           : true,
                    data             : [
                        { y: '2011 Q1', item1: 2666 },
                        { y: '2011 Q2', item1: 2778 },
                        { y: '2011 Q3', item1: 4912 },
                        { y: '2011 Q4', item1: 3767 },
                        { y: '2012 Q1', item1: 6810 },
                        { y: '2012 Q2', item1: 5670 },
                        { y: '2012 Q3', item1: 4820 },
                        { y: '2012 Q4', item1: 15073 },
                        { y: '2013 Q1', item1: 10687 },
                        { y: '2013 Q2', item1: 8432 }
                    ],
                    xkey             : 'y',
                    ykeys            : ['item1'],
                    labels           : ['Item 1'],
                    lineColors       : ['#efefef'],
                    lineWidth        : 2,
                    hideHover        : 'auto',
                    gridTextColor    : '#fff',
                    gridStrokeWidth  : 0.4,
                    pointSize        : 4,
                    pointStrokeColors: ['#efefef'],
                    gridLineColor    : '#efefef',
                    gridTextFamily   : 'Open Sans',
                    gridTextSize     : 10
                });
            },
            init(){
                var areaChartData ={
                    labels  : ['January', 'February', 'March', 'April'],
                    datasets: [
                        {
                            label               : '输入',
                            pointStrokeColor    : '#c1c7d1',
                            data                : [65, 59, 80, 81],
                            backgroundColor:['#00c0ef','#00c0ef','#00c0ef','#00c0ef']
                        },
                        {
                            label               : '输出',
                            pointColor          : '#3b8bba',
                            data                : [28, 48, 12, 19],
                            backgroundColor:['#dd4b39','#dd4b39','#dd4b39','#dd4b39']
                        },
                        {
                            label               : '错误',
                            pointColor          : '#3b8bba',
                            data                : [32, 76, 100, 66],
                            backgroundColor:['#00a65a','#00a65a','#00a65a','#00a65a']
                        },
                        {
                            label               : '拒绝',
                            pointColor          : '#3b8bba',
                            data                : [14, 54, 33, 120],
                            backgroundColor:['#f39c12','#f39c12','#f39c12','#f39c12']
                        }
                    ]
                }
                var  ctx                   = document.getElementById('barChart').getContext('2d')

                var barChartData                     = areaChartData
                barChartData.datasets[1].fillColor   = '#00a65a'
                barChartData.datasets[1].strokeColor = '#00a65a'
                barChartData.datasets[1].pointColor  = '#00a65a'
                var barChartOptions                  = {
                    //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
                    scaleBeginAtZero        : true,
                    //Boolean - Whether grid lines are shown across the chart
                    scaleShowGridLines      : true,
                    //String - Colour of the grid lines
                    scaleGridLineColor      : 'rgba(0,0,0,.05)',
                    //Number - Width of the grid lines
                    scaleGridLineWidth      : 1,
                    //Boolean - Whether to show horizontal lines (except X axis)
                    scaleShowHorizontalLines: true,
                    //Boolean - Whether to show vertical lines (except Y axis)
                    scaleShowVerticalLines  : true,
                    //Boolean - If there is a stroke on each bar
                    barShowStroke           : true,
                    //Number - Pixel width of the bar stroke
                    barStrokeWidth          : 2,
                    //Number - Spacing between each of the X value sets
                    barValueSpacing         : 5,
                    //Number - Spacing between data sets within X values
                    barDatasetSpacing       : 1,
                    //String - A legend template
                    legendTemplate          : '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
                    //Boolean - whether to make the chart responsive
                    responsive              : true,
                    maintainAspectRatio     : true
                }

                barChartOptions.datasetFill = false
                var config = {
                    type: 'bar',
                    data:areaChartData,
                    options: barChartOptions
                }
                new Chart(ctx, config)
            }
        },
        mounted(){
            this.init();
            this.initLine();
            this.initRadarChart();
            this.initPolarChart();
        },
        created() {

        }
    }
</script>


