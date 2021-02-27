import noteTxt from './note-text.cmp.js'
import noteTodo from './note-todo.cmp.js'

export default {
    props: ["keep"],
    template: `
        <section>
          <li class="note-img flex flex-col justify-center align-center">
                <img :src="keep.info.url" />
          </li>
          <note-todo v-if="keep.isTodo" :keep="keep"/>
          <note-txt v-else :keep="keep"/>
        </section>
          `,
    data() {
        return {
        };
    },
    methods: {
    },
    computed: {
    },
    components: {
        noteTxt,
        noteTodo,
    }
};

