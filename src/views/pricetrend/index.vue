<template>
  <div id="main" :style="{width: '100%', height: '600px'}"></div>
</template>
<script>
  import * as echarts from 'echarts';
  import request from '@/utils/request'
  import {serverDomain} from "../../settings";

  export default {
    data() {
      return {
        chartData: {},
        chart: null
      }
    },
    mounted() {
      this.initCharts()
    },
    created() {
      this.fetchData()
    },
    watch: {
      chartData: {
        deep: true,
        handler(val) {
          this.setOptions(val)
        }
      }
    },
    methods: {
      initCharts() {
        this.chart = echarts.init(this.$el, 'macarons')
      },
      setOptions(chartData) {

        var xAxisData = chartData.xAxisData
        var price1Data = chartData.price1Data
        var price2Data = chartData.price2Data
        var price3Data = chartData.price3Data
        var price4Data = chartData.price4Data
        var price = chartData.price

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
          rotate: 0,
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
            this.chart.setOption({
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
          padding: [0, 0, 0, -7],
          verticalAlign: app.config.verticalAlign,
          rotate: app.config.rotate,
          formatter: '{c}',
          fontSize: 10,
          rich: {
            name: {}
          }
        };

        option = {
          title: {
            text: 'Colorless price trend',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['price1', 'price2', 'price3', 'price4']
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
          yAxis: [
            {
              type: 'category',
              axisTick: {show: false},
              data: xAxisData//['2012', '2013', '2014', '2015', '2016']
            }
          ],
          xAxis: [
            {
              type: 'value',
              axisLabel: {
                formatter: '{value} W'
              },
            }
          ],
          series: [
            {
              name: 'price1',
              stack: '广告',
              type: 'bar',
              label: labelOption,
              emphasis: {
                focus: 'series'
              },
              // markPoint: {
              //   data: price
              // },
              data: price1Data
            },
            {
              name: 'price2',
              stack: '广告',
              type: 'bar',
              label: labelOption,
              emphasis: {
                focus: 'series'
              },
              data: price2Data
            },
            {
              name: 'price3',
              stack: '广告',
              type: 'bar',
              label: labelOption,
              emphasis: {
                focus: 'series'
              },
              data: price3Data
            },
            {
              name: 'price4',
              stack: '广告',
              type: 'bar',
              label: labelOption,
              emphasis: {
                focus: 'series'
              },
              data: price4Data
            }
          ]
        };

        option && this.chart.setOption(option);
      },
      fetchData() {
        var params = {gzone_id: 1, limit: 10}
        request({
          url: serverDomain + 'api/price_trend/search',
          method: 'get',
          params
        }).then(respose => {
          console.log(respose)
          this.chartData = respose.data

        })

      },

    }
  }
</script>
