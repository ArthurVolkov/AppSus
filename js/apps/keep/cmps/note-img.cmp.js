import noteTxt from './note-text.cmp.js'
import noteTodo from './note-todo.cmp.js'

export default {
    props: ["keep"],
    template: `
        <section>
          <li :style="{backgroundColor: keep.style.backgroundColor}" class="note-img flex flex-col align-center">
            <div class="note-img-container">
                  <img :src="keep.info.url" />
            </div>
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
    created() {
    },
    components: {
        noteTxt,
        noteTodo,
    }
};

