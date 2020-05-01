<template>
  <div >
    <dash-header ></dash-header>
    <sidebar />
    <div class="content-wrapper">
      <section class="content-header">
        <h1>
          总体分布
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
              <span class="info-box-number">{{item.input}}</span>
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
              <span class="info-box-number">{{item.output}}</span>
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
              <span class="info-box-text">读入量</span>
              <span class="info-box-number">{{item.read}}</span>
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
              <span class="info-box-text">写出量</span>
              <span class="info-box-number">{{item.written}}</span>
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

            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <div class="row">
                <div class="col-md-8">
                  <p class="text-center">
                    <strong>节点处理本年度统计</strong>
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
                    <span class="description-percentage text-green">
                      <i class="fa fa-caret-up" v-if="tableRecord.inputmom>0"></i>
                      <i class="fa fa-caret-left" v-if="tableRecord.inputmom==0"></i>
                      <i class="fa fa-caret-down" v-if="tableRecord.inputmom<0"></i>
                      {{tableRecord.inputmom*100}}%
                    </span>
                    <h5 class="description-header">{{tableRecord.input}}</h5>
                    <span class="description-text">本月输入量环比</span>
                  </div>
                  <!-- /.description-block -->
                </div>
                <!-- /.col -->
                <div class="col-sm-3 col-xs-6">
                  <div class="description-block border-right">
                    <span class="description-percentage text-yellow">
                      <i class="fa fa-caret-up" v-if="tableRecord.outputmom>0"></i>
                      <i class="fa fa-caret-left" v-if="tableRecord.outputmom==0"></i>
                      <i class="fa fa-caret-down" v-if="tableRecord.outputmom<0"></i>
                      {{tableRecord.outputmom*100}}%
                    </span>
                    <h5 class="description-header"> {{tableRecord.output}}</h5>
                    <span class="description-text">本月输出量环比</span>
                  </div>
                  <!-- /.description-block -->
                </div>
                <!-- /.col -->
                <div class="col-sm-3 col-xs-6">
                  <div class="description-block border-right">
                    <span class="description-percentage text-green">
                      <i class="fa fa-caret-up" v-if="tableRecord.readmom>0"></i>
                      <i class="fa fa-caret-left" v-if="tableRecord.readmom==0"></i>
                      <i class="fa fa-caret-down" v-if="tableRecord.readmom<0"></i>
                        {{tableRecord.readmom*100}}%
                    </span>
                    <h5 class="description-header">{{tableRecord.read}}</h5>
                    <span class="description-text">本月读入量环比</span>
                  </div>
                  <!-- /.description-block -->
                </div>
                <!-- /.col -->
                <div class="col-sm-3 col-xs-6">
                  <div class="description-block">
                    <span class="description-percentage text-red">
                        <i class="fa fa-caret-up" v-if="tableRecord.writemom>0"></i>
                        <i class="fa fa-caret-left" v-if="tableRecord.writemom==0"></i>
                        <i class="fa fa-caret-down" v-if="tableRecord.writemom<0"></i>
                        {{tableRecord.writemom*100}}%
                    </span>
                    <h5 class="description-header">{{tableRecord.write}}</h5>
                    <span class="description-text">本月写出量环比</span>
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
                    <th style="width: 20%">批次</th>
                    <th style="width: 20%">步骤名称</th>
                    <th style="width: 20%">运行情况</th>
                    <th style="width: 20%">处理数据量</th>
                    <th style="width: 20%">类型</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="item  in tableList">
                    <td  class="colStyle">{{item.channel_id}}</td>
                    <td class="text-green">{{item.name}}</td>
                    <td v-if="item.status=='start'"><span class="label label-success" >开始</span></td>
                    <td v-if="item.status=='stop'"><span class="label label-danger" >运行中</span></td>
                    <td v-if="item.status=='end'"><span class="label label-warning" >结束</span></td>
                    <td>
                      <div class="sparkbar" data-color="#00a65a" data-height="20">{{item.lines_input}}</div>
                    </td>
                    <td>
                      <div class="sparkbar" data-color="#00a65a" data-height="20">{{item.type}}</div>
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
               item:{
                   read:0,
                   written:0,
                   input:0,
                   output:0
               },
               tableList:[],
               tableRecord:{
                   read:0,
                   write:0,
                   input:0,
                   output:0,
                   inputmom:0,
                   outputmom:0,
                   readmom:0,
                   writemom:0,
               }
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
            initLineChar() {//
                var salesChartCanvas = document.getElementById('stepCanvas').getContext('2d');
                let option=new Object();
                let that =this;
                this.$api.getThisYearTransData( option,res=> {
                    let inputColor='red'
                    let outputColor='yellow';
                    let readColor='grey';
                    let writeColor='blue';

                    if (res.code === 200) {
                        var areaChartData = {
                            labels  : res.data.lable,
                            datasets: [
                                {
                                    label               : '输入量',
                                    fillColor:'red',
                                    pointStrokeColor    : '#c1c7d1',
                                    data                : res.data.input,
                                    backgroundColor:[inputColor,inputColor,inputColor,inputColor,inputColor,inputColor,inputColor,inputColor,inputColor,inputColor,inputColor,inputColor]
                                },
                                {
                                    label               : '输出量',
                                    fillColor:'#yellow',
                                    pointColor          : '#3b8bba',
                                    data                : res.data.output,
                                    backgroundColor: [outputColor,outputColor,outputColor,outputColor,outputColor,outputColor,outputColor,outputColor,outputColor,outputColor,outputColor,outputColor]
                                },
                                {
                                    label               : '读入量',
                                    fillColor:'#grey',
                                    pointColor          : '#3b8bba',
                                    data                : res.data.read,
                                    backgroundColor:[readColor,readColor,readColor,readColor,readColor,readColor,readColor,readColor,readColor,readColor,readColor,readColor]
                                },
                                {
                                    label               : '写出量',
                                    pointColor          : '#3b8bba',
                                    data                : res.data.write,
                                    backgroundColor:[writeColor,writeColor,writeColor,writeColor,writeColor,writeColor,writeColor,writeColor,writeColor,writeColor,writeColor,writeColor]
                                }
                            ]
                        }
                        var areaChartOptions = {
                            showScale               : true,
                            scaleShowGridLines      : false,
                            scaleGridLineColor      : 'rgba(0,0,0,.05)',
                            scaleGridLineWidth      : 1,
                            scaleShowHorizontalLines: true,
                            scaleShowVerticalLines  : true,
                            bezierCurve             : true,
                            bezierCurveTension      : 0.3,
                            pointDot                : false,
                            pointDotRadius          : 4,
                            pointDotStrokeWidth     : 1,
                            pointHitDetectionRadius : 20,
                            datasetStroke           : true,
                            datasetStrokeWidth      : 2,
                            datasetFill             : true,
                            legendTemplate          : '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].lineColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
                            maintainAspectRatio     : true,
                            responsive              : true
                        }
                        var myBarChart = new Chart(salesChartCanvas, {
                            type: "bar",
                            data: areaChartData,
                            options: areaChartOptions
                        });
                    } else{
                        this.$alert(res.message);
                    }
                })

            },
            initDashBoardData(){
                let option=new Object();
                let that =this;
                this.$api.getAllData( option,res=> {
                    if (res.code === 200) {
                        that.item = res.data
                    } else{
                        this.$alert(res.message);
                    }
                })
            },
            initRecentRun(){
                let option=new Object();
                let that =this;
                this.$api.getRecentRun( option,res=> {
                    if (res.code === 200) {
                        that.tableList = res.data

                    } else{
                        this.$alert(res.message);
                    }
                })
            },
            initMom(){
                let option=new Object();
                let that =this;
                this.$api.getThisYearTransDataMOM( option,res=> {
                    if (res.code === 200) {
                        that.tableRecord = res.data[0]
                        debugger;
                    } else{
                        this.$alert(res.message);
                    }
                })
            }
        },
        mounted() {
            this.initLineChar();
            this.initPieChart();
            this.initDashBoardData();
            this.initRecentRun();
            this.initMom();
        },
        created() {

        }
    }

</script>
<style>
  .colStyle {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
</style>




