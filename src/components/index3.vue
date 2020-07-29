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
        <div class="col-md-7">
          <!-- TABLE: LATEST ORDERS -->
          <div class="box box-info">
            <div class="box-header with-border">
              <button class="backBtn" @click="back()">返回上级</button>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <div class="row">
                <div class="col-md-8">
                  <div class="chart-responsive">
                    <div id="mapChart"  style="height:350px;margin-top: -50px" class="chart"></div>
                  </div>
                  <!-- ./chart-responsive -->
                </div>
                <!-- /.col -->
                <!-- /.col -->
              </div>
              <!-- /.table-responsive -->
            </div>
            <!-- /.box-footer -->
          </div>
          <!-- /.box -->
        </div>
        <div class="col-md-5">
          <div class="box box-warning">
            <div class="box-header with-border">
              <h3 class="box-title">功能概览</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <div class="row">
                <div class="col-md-12">

                  <div class="chart">
                    <div id="myChart" style=" height: 300px"></div>
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
        <div class="col-md-7">


          <!-- TABLE: LATEST ORDERS -->
          <div class="box box-success">
            <div class="box-header with-border">
              <h3 class="box-title">最近运行情况</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
                <div id="kgraph" style="height:350px"></div>

              <!-- /.table-responsive -->
            </div>
            <!-- /.box-footer -->
          </div>
          <!-- /.box -->
        </div>
        <!-- /.col -->

        <div class="col-md-5">


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
                    <canvas id="funnel" height="350px" width="400px"></canvas>
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
    import echarts from 'echarts'
    import '../../node_modules/echarts/map/js/china.js'
    import cityMap from "./map/china-main-city-map.js";
    import axios from "axios";
    var chinaId = 100000;
    var chinaName = "china";
    var chinaJson = null;
    //记录父级ID、Name
    var mapStack = [];
    var parentId = null;
    var parentName = null;
    //Echarts地图全局变量，主要是在返回上级地图的方法中会用到
    var mapChart = null;
    export default {
        name: "chinaMap",
        props: {
            msg: String
        },
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
            //npm install chromedriver --chromedriver_cdnurl=http://cdn.npm.taobao.org/dist/chromedriver
            back() {
                if (mapStack.length != 0) {
                    //如果有上级目录则执行
                    var map = mapStack.pop();
                    axios
                        .get("./static/json/map/" + map.mapId + ".json", {})
                        .then(response => {
                            const mapJson = response.data;
                            this.registerAndsetOption(
                                mapChart,
                                map.mapId,
                                map.mapName,
                                mapJson,
                                false
                            );
                            //返回上一级后，父级的ID、Name随之改变
                            parentId = map.mapId;
                            parentName = map.mapName;
                        });
                }
            },
            mapChart(divid) {
                let that=this;
                axios.get("./static/json/map/" + chinaId + ".json", {}).then(response => {
                    const mapJson = response.data;
                    chinaJson = mapJson;
                    mapChart = echarts.init(document.getElementById(divid));
                    this.registerAndsetOption(mapChart, chinaId, chinaName, mapJson, false);
                    parentId = chinaId;
                    parentName = "china";
                    mapChart.on("click", function(param) {
                        var cityId = cityMap[param.name];
                        if (cityId) {
                            //代表有下级地图
                            axios
                                .get("./static/json/map/" + cityId + ".json", {})
                                .then(response => {
                                    const mapJson = response.data;
                                    that.registerAndsetOption(
                                        mapChart,
                                        cityId,
                                        param.name,
                                        mapJson,
                                        true
                                    );
                                });
                        } else {
                            //没有下级地图，回到一级中国地图，并将mapStack清空
                            that.registerAndsetOption(mapChart, chinaId, chinaName, chinaJson, false);
                            mapStack = [];
                            parentId = chinaId;
                            parentName = chinaName;
                        }
                    });
                });
            },
            registerAndsetOption(mapChart, id, name, mapJson, flag) {
                echarts.registerMap(name, mapJson);
                mapChart.setOption({
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
                    series: [
                        {
                            type: "map",
                            map: name,
                            itemStyle: {
                                normal: {
                                    areaColor: "rgba(23, 27, 57,0)",
                                    borderColor: "#1dc199",
                                    borderWidth: 1
                                }
                            },
                            data: this.initMapData(mapJson)
                        }
                    ]
                });
                if (flag) {
                    //往mapStack里添加parentId，parentName,返回上一级使用
                    mapStack.push({
                        mapId: parentId,
                        mapName: parentName
                    });
                    parentId = id;
                    parentName = name;
                }
            },
            initMapData(mapJson) {
                var mapData = [];
                for (var i = 0; i < mapJson.features.length; i++) {
                    mapData.push({
                        name: mapJson.features[i].properties.name,
                        value: this.randomData()
                    });
                }
                return mapData;
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
            initKGraph(){
                let myChart = echarts.init(document.getElementById("kgraph"));
                var upColor = '#ec0000';
                var upBorderColor = '#8A0000';
                var downColor = '#00da3c';
                var downBorderColor = '#008F28';
                var dataCount = 20000;
                var data = this.generateOHLC(dataCount);
                var option = {
                    dataset: {
                        source: data
                    },
                    title: {
                        text: ''
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'line'
                        }
                    },
                    toolbox: {
                        feature: {
                            dataZoom: {
                                yAxisIndex: false
                            },
                        }
                    },
                    grid: [
                        {
                            left: '10%',
                            right: '10%',
                            bottom: 200
                        },
                        {
                            left: '10%',
                            right: '10%',
                            height: 80,
                            bottom: 80
                        }
                    ],
                    xAxis: [
                        {
                            type: 'category',
                            scale: true,
                            boundaryGap: false,
                            // inverse: true,
                            axisLine: {onZero: false},
                            splitLine: {show: false},
                            splitNumber: 20,
                            min: 'dataMin',
                            max: 'dataMax'
                        },
                        {
                            type: 'category',
                            gridIndex: 1,
                            scale: true,
                            boundaryGap: false,
                            axisLine: {onZero: false},
                            axisTick: {show: false},
                            splitLine: {show: false},
                            axisLabel: {show: false},
                            splitNumber: 20,
                            min: 'dataMin',
                            max: 'dataMax'
                        }
                    ],
                    yAxis: [
                        {
                            scale: true,
                            splitArea: {
                                show: true
                            }
                        },
                        {
                            scale: true,
                            gridIndex: 1,
                            splitNumber: 2,
                            axisLabel: {show: false},
                            axisLine: {show: false},
                            axisTick: {show: false},
                            splitLine: {show: false}
                        }
                    ],
                    dataZoom: [
                        {
                            type: 'inside',
                            xAxisIndex: [0, 1],
                            start: 10,
                            end: 100
                        },
                        {
                            show: true,
                            xAxisIndex: [0, 1],
                            type: 'slider',
                            bottom: 10,
                            start: 10,
                            end: 100,
                            handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                            handleSize: '105%'
                        }
                    ],
                    visualMap: {
                        show: false,
                        seriesIndex: 1,
                        dimension: 6,
                        pieces: [{
                            value: 1,
                            color: upColor
                        }, {
                            value: -1,
                            color: downColor
                        }]
                    },
                    series: [
                        {
                            type: 'candlestick',
                            itemStyle: {
                                color: upColor,
                                color0: downColor,
                                borderColor: upBorderColor,
                                borderColor0: downBorderColor
                            },
                            encode: {
                                x: 0,
                                y: [1, 4, 3, 2]
                            }
                        },
                        {
                            name: 'Volumn',
                            type: 'bar',
                            xAxisIndex: 1,
                            yAxisIndex: 1,
                            itemStyle: {
                                color: '#7fbe9e'
                            },
                            large: true,
                            encode: {
                                x: 0,
                                y: 5
                            }
                        }
                    ]
                };

                myChart.setOption(option);
            },
            generateOHLC(count){
                var data = [];
                var xValue = +new Date(2011, 0, 1);
                var minute = 60 * 1000;
                var baseValue = Math.random() * 12000;
                var boxVals = new Array(4);
                var dayRange = 12;

                for (var i = 0; i < count; i++) {
                    baseValue = baseValue + Math.random() * 20 - 10;

                    for (var j = 0; j < 4; j++) {
                        boxVals[j] = (Math.random() - 0.5) * dayRange + baseValue;
                    }
                    boxVals.sort();

                    var openIdx = Math.round(Math.random() * 3);
                    var closeIdx = Math.round(Math.random() * 2);
                    if (closeIdx === openIdx) {
                        closeIdx++;
                    }
                    var volumn = boxVals[3] * (1000 + Math.random() * 500);

                    // ['open', 'close', 'lowest', 'highest', 'volumn']
                    // [1, 4, 3, 2]
                    data[i] = [
                        echarts.format.formatTime('yyyy-MM-dd\nhh:mm:ss', xValue += minute),
                        +boxVals[openIdx].toFixed(2), // open
                        +boxVals[3].toFixed(2), // highest
                        +boxVals[0].toFixed(2), // lowest
                        +boxVals[closeIdx].toFixed(2),  // close
                        volumn.toFixed(0),
                        this.getSign(data, i, +boxVals[openIdx], +boxVals[closeIdx], 4) // sign
                    ];
                }

                return data;
            },
            getSign(data, dataIndex, openVal, closeVal, closeDimIdx){
                var sign;
                if (openVal > closeVal) {
                    sign = -1;
                }
                else if (openVal < closeVal) {
                    sign = 1;
                }
                else {
                    sign = dataIndex > 0
                        // If close === open, compare with close of last record
                        ? (data[dataIndex - 1][closeDimIdx] <= closeVal ? 1 : -1)
                        // No record of previous, set to be positive
                        : 1;
                }

                return sign;
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
            this.mapChart("mapChart");
            this.initKGraph();
        },
        created() {

        }
    }
</script>



