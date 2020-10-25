.<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">本月新增用户</div>
          <!-- <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num" /> -->
          <span style="font-size: 20px">{{totalList[0].value.total}}</span>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="income" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">本月收入</div>
          <!-- <count-to :start-val="0" :end-val="81212" :duration="3000" class="card-panel-num" /> -->
          999
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('expendPanel')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="money" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">本月支出</div>
          <!-- <count-to :start-val="0" :end-val="9280" :duration="3200" class="card-panel-num" /> -->
          <span style="font-size: 20px">{{totalList[2].value.amountSum }}</span>
          
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="shopping" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">其他</div>
          999
          <!-- <count-to :start-val="0" :end-val="13600" :duration="3600" class="card-panel-num" /> -->
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import {getMonthStartAndEnd} from '@/utils/utils'
import {getBillByMonth} from '@/api/billService'
import {queryUserByMonth} from '@/api/user'
import { number } from 'echarts/lib/export';
import { eventBus } from '../../../main'

export default {
  name: "PanelGroup",
  data() {
    return {
        totalList: [
            {name: 'userPanel', value: {total: number, body: [], amountSum: number}}, // 本月用户
            {name: 'incomePanel', value: {total: number, body: [], amountSum: number}}, // 本月收入
            {name: 'expendPanel', value: {total: number, body: [], amountSum: number}}, // 本月支出
            {name: 'otherPanel', value: {total: number, body: [], amountSum: number}} // 其他
        ]
    };
  },

  created() {
      // getMonthStartAndEnd可获取当月或者上一个月的开始和结束日期
      console.log(getMonthStartAndEnd(0));
      const [startDay, endDay] = getMonthStartAndEnd(0);
      this.getBillByMonthFun(startDay, endDay);
      this.getUserByMonth(startDay, endDay);
  },

  methods: {
    handleSetLineChartData(message) {
        this.messageToEcharts(message, 'test')
    },

    getBillByMonthFun(startDay, endDay) {
      const param = {
          startDay: startDay,
          endDay: endDay
      };
      getBillByMonth(param).then(res => {
          console.log(res, 'noted:::::::::');
          if (res.body) {
              this.totalList[2].value.total = res.total;
              this.totalList[2].value.body = res.body;
              this.totalList[2].value.amountSum = res.amountSum[0].sum;
              this.messageToEcharts('expendPanel', res.body)
          }
      })
    },

    getUserByMonth(startDay, endDay) {
        const param = {
            startDay: startDay,
            endDay: endDay
        };
        queryUserByMonth(param).then(
            res => {
                if (res.body) {
                    this.totalList[0].value.total = res.total;
                    this.totalList[0].value.body = res.body;
                }
            }
        )
    },

messageToEcharts(type, data) {
    console.log(type, 999);
    eventBus.$emit(type, data)
}

  },
};
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col {
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
        background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shopping {
        background: #34bfa3;
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shopping {
      color: #34bfa3;
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }
  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;
    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>