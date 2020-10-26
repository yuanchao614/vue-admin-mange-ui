.<template>
  <vc-calendar :attributes="attributes" is-expanded />
</template>

<script>
export default {
  name: "Calendar",
  data() {
    const todos = [
      {
        description: "Take Noah to basketball practice.",
        isComplete: false,
        dates: new Date(2020, 10, 1),
        color: "red"
      },

        {
        description: "test1.",
        isComplete: false,
        dates: new Date(2020, 9, 1),
        color: "red"
      },

        {
        description: "test2.",
        isComplete: false,
        dates: new Date(2020, 9, 26),
        color: "red"
      },

           {
        description: "test2_2.",
        isComplete: false,
        dates: new Date(2020, 9, 26),
        color: "blue"
      }
    ];
    return {
      incId: todos.length,
      todos
    };
  },

  created() {},

  methods: {},

  computed: {
    attributes() {
      return [
        // Attributes for todos
        ...this.todos.map(todo => ({
          dates: todo.dates,
          dot: {
            color: todo.color,
            class: todo.isComplete ? "opacity-75" : ""
          },
          popover: {
            label: todo.description
          },
          customData: todo
        }))
      ];
    }
  }
};
</script>

<style>
</style>