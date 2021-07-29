<template>
  <div class="app-container">
    <div id="main" :style="{width: '100%', height: '800px'}"></div>
  </div>
</template>
<script>
  import * as echarts from 'echarts';
  import {getList} from "../../api/test";
  export default {
    data() {
      return {
        legendData: ['Forest', 'Steppe', 'Desert', 'Wetland'],
        xAxisData:['2012', '2013', '2014', '2015', '2016']
      }
    },
    mounted() {
      this.init()
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData(){
        var params = {uid:1,pageSize:10,pageNumber:1}
        getList(params).then(response => {
          console.log(response)
        })

      },

      init() {

        var app = {};

        var chartDom = document.getElementById('main');
        var myChart = echarts.init(chartDom, 'dark');
        var option;

        var posList = [
          'left', 'right', 'top', 'bottom',
          'inside',
          'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
          'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
        ];

        app.configParameters = {
          rotate: {
            min: -90,
            max: 90
          },
          align: {
            options: {
              left: 'left',
              center: 'center',
              right: 'right'
            }
          },
          verticalAlign: {
            options: {
              top: 'top',
              middle: 'middle',
              bottom: 'bottom'
            }
          },
          position: {
            options: posList.reduce(function (map, pos) {
              map[pos] = pos;
              return map;
            }, {})
          },
          distance: {
            min: 0,
            max: 100
          }
        };

        app.config = {
          rotate: 90,
          align: 'left',
          verticalAlign: 'middle',
          position: 'insideBottom',
          distance: 15,
          onChange: function () {
            var labelOption = {
              normal: {
                rotate: app.config.rotate,
                align: app.config.align,
                verticalAlign: app.config.verticalAlign,
                position: app.config.position,
                distance: app.config.distance
              }
            };
            myChart.setOption({
              series: [{
                label: labelOption
              }, {
                label: labelOption
              }, {
                label: labelOption
              }, {
                label: labelOption
              }]
            });
          }
        };


        var labelOption = {
          show: true,
          position: app.config.position,
          distance: app.config.distance,
          align: app.config.align,
          verticalAlign: app.config.verticalAlign,
          rotate: app.config.rotate,
          formatter: '{c}  {name|{a}}',
          fontSize: 16,
          rich: {
            name: {
            }
          }
        };

        option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: this.legendData
          },
          toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {show: false},
              data: this.xAxisData
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: 'Forest',
              type: 'bar',
              barGap: 0,
              label: labelOption,
              emphasis: {
                focus: 'series'
              },
              data: [320, 332, 301, 334, 390]
            },
            {
              name: 'Steppe',
              type: 'bar',
              label: labelOption,
              emphasis: {
                focus: 'series'
              },
              data: [220, 182, 191, 234, 290]
            },
            {
              name: 'Desert',
              type: 'bar',
              label: labelOption,
              emphasis: {
                focus: 'series'
              },
              data: [150, 232, 201, 154, 190]
            },
            {
              name: 'Wetland',
              type: 'bar',
              label: labelOption,
              emphasis: {
                focus: 'series'
              },
              data: [98, 77, 101, 99, 40]
            }
          ]
        };

        option && myChart.setOption(option);
      }
    }
  }
</script>
