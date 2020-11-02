<template>
  <div
    id="myChart"
    :style="{ width: '100%', height: '400px' }"
    style="box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);"
  ></div>
</template>

<script>
import { set } from "nprogress";
let moment = require("moment");
import { eventBus } from "../../../main";

export default {
  name: "LineEcharts",
  data() {
    return {
      name: "line-echarts-page",
      echartsData: [],
      title: String
    };
  },

  created() {
    eventBus.$on("expendPanel", message => {
      console.log(message, "noted::::::::::expend");
      this.echartsData = message.body ? message.body : [];
      const nowMonth = new Date();
      this.title = `${nowMonth.getMonth() + 1}月支出`;
      if (this.echartsData.length) {
        this.drawExpend();
      }
    });
    eventBus.$on("userPanel", message => {
      console.log(message, "noted::::::::::user");
      this.echartsData = message.body ? message.body : [];
      const nowMonth = new Date();
      this.title = `${nowMonth.getMonth() + 1}月新增用户`;
      this.drawUser();
    });

      eventBus.$on("incomePanel", message => {
      console.log(message, "noted::::::::::income");
      this.echartsData = message.body ? message.body : [];
      const nowMonth = new Date();
      this.title = `${nowMonth.getMonth() + 1}月收入`;
      this.drawIncome(this.echartsData);
    });
  },

  mounted() {
    setTimeout(() => {
      // this.drawLine();
    }, 1000);
    // this.drawLine();
    console.log(999, "noted::::::::::::");
  },

  methods: {
    drawLine(xAxisData, wechatAmountData, zfbAmontData, cachAmontData) {
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      myChart.setOption(
        {
          title: {
            text: this.title
          },
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: ["微信支出", "支付宝支出", "现金支出"]
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: xAxisData
          },
          yAxis: {
            type: "value"
          },
          series: [
            {
              name: "微信支出",
              itemStyle: {
                normal: {
                  color: "#34BFA3",
                  lineStyle: {
                    color: "#34BFA3",
                    width: 2
                  }
                }
              },
              smooth: true,
              type: "line",
              smooth: true,
              data: wechatAmountData
            },
            {
              name: "支付宝支出",
              itemStyle: {
                normal: {
                  color: "#3888fa",
                  lineStyle: {
                    color: "#3888fa",
                    width: 2
                  },
                  areaStyle: {
                    color: "#f3f8ff"
                  }
                }
              },

              type: "line",
              smooth: true,
              data: zfbAmontData
            },
            {
              name: "现金支出",
              type: "line",
              smooth: true,
              data: cachAmontData
            }
          ]
        },
        true
      ); // setOption第二个参数为true代表清除上一次绘制的数据
    },

    drawSingalLine(xAxisData, seriesData) {
      console.log(xAxisData, seriesData);
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      myChart.setOption(
        {
          title: {
            text: this.title
          },
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: ["新增用户"]
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: xAxisData
          },
          yAxis: {
            type: "value"
          },
          series: [
            {
              name: "新增用户",
              itemStyle: {
                normal: {
                  color: "#34BFA3",
                  lineStyle: {
                    color: "#34BFA3",
                    width: 2
                  }
                }
              },
              smooth: true,
              type: "line",
              smooth: true,
              data: seriesData
            }
          ]
        },
        true
      );
    },

    drawExpend() {
      let xAxisData = [];
      const seriesData = [];
      let xDateList = [];
      let wechatAmountData = [];
      let zfbAmontData = [];
      let cachAmontData = [];
      this.echartsData.forEach(item => {
        const formatDate = moment(item.createDate).format("YYYY-MM-DD");
        item.formatDate = formatDate;
        xDateList.push(formatDate);
      });
      xAxisData = [...new Set(xDateList)].sort();
      xAxisData.forEach((item, index) => {
        zfbAmontData[index] = 0;
        wechatAmountData[index] = 0;
        cachAmontData[index] = 0;
        this.echartsData.forEach(item2 => {
          if (item == item2.formatDate) {
            if (item2.payMethods == "支付宝") {
              zfbAmontData[index] = zfbAmontData[index] + item2.amount;
              wechatAmountData[index] = 0 + wechatAmountData[index];
              cachAmontData[index] = 0 + cachAmontData[index];
            } else if (item2.payMethods == "微信") {
              wechatAmountData[index] = wechatAmountData[index] + item2.amount;
              zfbAmontData[index] = zfbAmontData[index] + 0;
              cachAmontData[index] = cachAmontData[index] + 0;
            } else {
              cachAmontData[index] = cachAmontData[index] + item2.amount;
              zfbAmontData[index] = zfbAmontData[index] + 0;
              wechatAmountData[index] = wechatAmountData[index] + 0;
            }
          }
        });
      });
      this.drawLine(xAxisData, wechatAmountData, zfbAmontData, cachAmontData);
    },

    async drawUser() {
      let xAxisData = [];
      let seriesData = [];
      let xDateList = [];
      await this.echartsData.forEach(item => {
        const formatDate = moment(item.createDate).format("YYYY-MM-DD");
        item.formatDate = formatDate;
        xDateList.push(formatDate);
      });
      xAxisData = [...new Set(xDateList)].sort();
      xAxisData.forEach((item, index) => {
        seriesData[index] = 0;
        this.echartsData.forEach(item2 => {
          if (item === item2.formatDate) {
            seriesData[index] += 1;
          }
        });
      });
      this.drawSingalLine(xAxisData, seriesData);
    },

    drawIncome(data) {
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      const option = {
        title: {
          text: `${this.title}`
        },
        tooltip: {
          trigger: "axis"
        },
          legend: {
            data: ["工资", "理财", "收益", "红包", "转账"]
          },
        xAxis: {
          type: "category",
          data: ["工资", "理财", "收益", "红包", "转账"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [data['wagesAmount'][0].sum, data['mangeAmount'][0].sum, data['profitAmount'][0].sum, data['redAmount'][0].sum, data['transferAmount'][0].sum],
            type: "line",
            smooth: true
          }
        ]
      };
      myChart.setOption(option, true)
    }
  }
};
</script>

<style>
</style>