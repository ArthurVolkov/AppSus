import noteTxt from './note-text.cmp.js'
import { eventBus } from "../../services/event-bus-service.js"

export default {
    props: ["keep"],
    template: `
        <section class="flex" :style="{backgroundColor: keep.style.backgroundColor}">
            <li class="note-text flex flex-col">
                <input v-for="(row, idx) in keep.info.txts.length" :key="idx" :ref="idx" class="pointer" 
                    @click.stop="toggleTodo(keep,idx)" type="checkbox" v-model="keep.info.txts[idx].doneAt" />
            </li>
            <note-txt :keep="keep"/>
        </section>
          `,
    data() {
        return {
        };
    },
    methods: {
        toggleTodo(keep,idx) {
            eventBus.$emit('todo', keep,idx)

            console.log("toggle todo",idx);
        }
    },
    computed: {
    },
    created() {
    },
    components: {
        noteTxt,
    }
};
