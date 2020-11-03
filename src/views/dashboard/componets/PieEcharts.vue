<template>
  <div id="pieEcharts" :style="{width: '100%', height: '600px'}" style="box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);"></div>
</template>

<script>
import { getAmontData } from '@/api/echartsService'
import {getMonthStartAndEnd} from '@/utils/utils'

export default {
  name: "PieEcharts",
  data() {
    const monthnumber = new Date().getMonth() + 1;
    return {
      monthnumber
    };
  },

  mounted() {
      this.getPayMethodsAmontData();
  },

  methods: {
    drawPieEcharts(wechatData, zfbData, cachData) {
      let myChart = this.$echarts.init(document.getElementById("pieEcharts"));
      myChart.setOption({
         title: {
        text: `${this.monthnumber}月支出占比`,
        left: 'center',
        y: '15'
    },
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
            radius: [25, 95],
            center: ["50%", "38%"],
            data: [
              { value: wechatData, name: "微信支出", itemStyle: {color: '#34BFA3'} },
              { value: zfbData, name: "支付宝支出", itemStyle: {color: '#1e90ff'} }, // 自定义颜色
              { value: cachData, name: "现金支出", itemStyle: { color: '#ad2121'} },
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
          const wechatData = data.wechatAmountSum.length ? data.wechatAmountSum[0].sum : 0;
          const zfbData = data.zfbAmountSum.length ? data.zfbAmountSum[0].sum : 0;
          const cachData = data.cachAmountSum.length ? data.cachAmountSum[0].sum : 0;
          this.drawPieEcharts(wechatData, zfbData, cachData);
        }
      })
    }
  }
};
</script>

<style>
</style>