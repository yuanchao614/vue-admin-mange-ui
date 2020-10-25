<template>
  <div id="pieEcharts" :style="{width: '100%', height: '600px'}"></div>
</template>

<script>
import { getAmontData } from '@/api/echartsService'
import {getMonthStartAndEnd} from '@/utils/utils'

export default {
  name: "PieEcharts",
  data() {
    return {};
  },

  mounted() {
      this.getPayMethodsAmontData();
  },

  methods: {
    drawPieEcharts(wechatData, zfbData, cachData) {
      let myChart = this.$echarts.init(document.getElementById("pieEcharts"));
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          left: "center",
          bottom: "10",
          data: ["微信支出", "支付宝支出", "现金支出"]
        },
        series: [
          {
            name: "本月支出占比",
            type: "pie",
            roseType: "radius",
            radius: [15, 95],
            center: ["50%", "38%"],
            data: [
              { value: wechatData, name: "微信支出" },
              { value: zfbData, name: "支付宝支出" },
              { value: cachData, name: "现金支出" },
            ],
            animationEasing: "cubicInOut",
            animationDuration: 2600
          }
        ]
      });
    },

    getPayMethodsAmontData() {
      const [startDay, endDay] = getMonthStartAndEnd(0);
      const param = {
        startDay,
        endDay
      };
      getAmontData(param).then(res => {
        console.log(res, 'noted:::::::');
        if (res.body) {
          const data = res.body;
          const wechatData = data.wechatAmountSum[0].sum;
          const zfbData = data.zfbAmountSum[0].sum;
          const cachData = data.cachAmountSum[0].sum;
          this.drawPieEcharts(wechatData, zfbData, cachData);
        }
      })
    }
  }
};
</script>

<style>
</style>