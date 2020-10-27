.<template>
<div class="calendar">
  <vc-calendar :attributes="attributes" is-expanded style="box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);" />
    <div class="calendar-toobar">
       <span style="display: flex;align-items: center;">
           <i style="background-color: red;" class="circle"></i>
           <span>重要</span>
       </span>

        <span style="display: flex;align-items: center;">
           <i style="background-color: orange;" class="circle"></i>
           <span>一般</span>
        </span>

        <span style="display: flex;align-items: center;">
           <i style="background-color: green;" class="circle"></i>
           <span>次要</span>
       </span>
  </div>
  <p class="footer-titile">计划事项</p>
</div>
</template>

<script>
import { getScheduleList } from "@/api/scheduleService";
export default {
  name: "Calendar",
  data() {
    const todos = [];
    return {
      incId: todos.length,
      todos
    };
  },

  created() {
    this.getScheduleData();
  },

  updated() {},

  methods: {
    getScheduleData() {
      const param = {
        pageIndex: 0,
        pageSize: 999
      };
      getScheduleList(param).then(res => {
        if (res.body) {
          this.todos = res.body;
          this.incId = res.total;
        }
      });
    },

    isSameDay(startTime, endTime) {
      const startTimeMs = new Date(startTime).setHours(0, 0, 0, 0);
      const endTimeMs = new Date(endTime).setHours(0, 0, 0, 0);
      return startTimeMs === endTimeMs ? true : false;
    }
  },

  computed: {
    attributes() {
      return [
        // Attributes for todos
        ...this.todos.map(todo => ({
          dates: new Date(todo.dates),
          dot: {
            color: todo.color,
            class: todo.isComplete ? "opacity-75" : ""
          },
          popover: {
            label: todo.description
          },
          customData: todo
        })),
         { // 今日高亮显示
            key: 'today',
            highlight: 'purple',
            dates: new Date(),
          }
      ]
    }
  }
};
</script>

<style scoped>
.calendar {
    height: 100%;
    width: 100%;
}
.calendar-toobar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 30px;
    width: 100%
}

.circle {
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
}

.footer-titile {
    text-align: center;
    font-size: 20px;
    margin: 5px 0 0 0;
}
</style>