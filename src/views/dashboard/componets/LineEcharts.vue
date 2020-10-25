<template>
  <div id="myChart" :style="{ width: '100%', height: '400px' }"></div>
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
      echartsData: Array,
      title: String,
    };
  },

  created() {
    eventBus.$on("expendPanel", (message) => {
      console.log(message, "noted::::::::::00000");
      this.echartsData = message;
      const nowMonth = new Date();
      this.title = `${nowMonth.getMonth() + 1}月支出`;
      this.drawExpend();
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
      myChart.setOption({
        title: {
          text: this.title,
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["微信支出", "支付宝支出", "现金支出"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: xAxisData,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "微信支出",
            itemStyle: {
            normal: {
              color: '#24DB5A',
              lineStyle: {
                color: '#24DB5A',
                width: 2
              }
            }
          },
          smooth: true,
            type: "line",
            smooth: true,
            data: wechatAmountData,
          },
          {
            name: "支付宝支出",
            itemStyle: {
            normal: {
              color: '#3888fa',
              lineStyle: {
                color: '#3888fa',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
       
            type: "line",
            smooth: true,
            data: zfbAmontData,
          },
          {
            name: "现金支出",
            type: "line",
            smooth: true,
            data: cachAmontData,
          },
        ],
      });
    },

    async drawExpend() {
      let xAxisData = [];
      const seriesData = [];
      let xDateList = [];
      let wechatAmountData = [];
      let zfbAmontData = [];
      let cachAmontData = [];
      await this.echartsData.forEach((item) => {
        const formatDate = moment(item.createDate).format("YYYY-MM-DD");
        item.formatDate = formatDate;
        xDateList.push(formatDate);
      });
      xAxisData = [...new Set(xDateList)].sort();
      xAxisData.forEach((item, index) => {
          zfbAmontData[index] = 0 ;
          wechatAmountData[index] = 0;
          cachAmontData[index] = 0;
        this.echartsData.forEach((item2) => {
          if (item == item2.formatDate) {
            if (item2.payMethods == '支付宝') {
              zfbAmontData[index] = zfbAmontData[index] + item2.amount ;
              wechatAmountData[index] = 0 + wechatAmountData[index];
              cachAmontData[index] = 0 + cachAmontData[index];
            } else if (item2.payMethods == '微信') {
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
      console.log(xAxisData);
      // console.log(wechatAmountData);
      // console.log(zfbAmontData);
      // console.log(cachAmontData);
      this.drawLine(xAxisData, wechatAmountData, zfbAmontData, cachAmontData);
    },
  },
};
</script>

<style>
</style>