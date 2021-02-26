import itemBtns from './keep-item-btns.cmp.js'


export default {
    template: `
            <li>
                <p>{{info.label}}</p>
                <ul class="todo-list">
                    <li v-for="todo in info.todos" class="todo-preview-container" >
                        <p>{{todo.txt}}</p>
                        <p>{{todo.doneAt}}</p>
                    </li>
                </ul>
                <item-btns></item-btns>
            </li>
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
    },
    components: {
        itemBtns
    }
};

