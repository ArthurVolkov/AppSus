export default {
    props: ["keep"],
    template: `
          <section>
            <p>{{keep.info.label}}</p>
            <ul class="todo-list">
                <li v-for="todo in keep.info.todos" class="todo-preview-container" >
                    <p>{{todo.txt}}</p>
                    <p>{{todo.doneAt}}</p>
                </li>
            </ul>
          </section>
          `,
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

