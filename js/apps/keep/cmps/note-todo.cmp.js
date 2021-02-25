export default {
    props: ["keep"],
    template: `
            <li class="note-todo">
                <p>{{keep.info.label}}</p>
                <ul class="todo-list">
                    <li v-for="todo in keep.info.todos" class="todo-preview-container" >
                        <p>{{todo.txt}}</p>
                        <p>{{todo.doneAt}}</p>
                    </li>
                </ul>
            </li>
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

