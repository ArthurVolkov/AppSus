export default {
    template: `
          <section>
            <p>{{info.label}}</p>
            <ul class="todo-list">
                <li v-for="todo in info.todos" class="todo-preview-container" >
                    <p>{{todo.txt}}</p>
                    <p>{{todo.doneAt}}</p>
                </li>
            </ul>
          </section>
          `,
    props: ["info"],
    data() {
        return {
        }
    },
    methods: {
    },
    computed: {
    },
    created() {
    }
};

