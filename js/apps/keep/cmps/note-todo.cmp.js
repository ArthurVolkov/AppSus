import noteTxt from './note-text.cmp.js'
import { eventBus } from "../../services/event-bus-service.js"

export default {
    props: ["keep"],
    template: `
        <section class="flex">
            <li class="note-text flex flex-col">
                <input v-for="(row, idx) in keep.info.txts.length-1" :key="idx" :ref="idx" class="pointer" 
                    @click.stop="toggleTodo(keep,idx)" type="checkbox" v-model="keep.info.txts[idx].doneAt" />
            </li>
            <note-txt :keep="keep"/>
        </section>
          `,
    methods: {
        toggleTodo(keep,idx) {
            eventBus.$emit('todo', keep,idx)
        }
    },
    components: {
        noteTxt,
    }
}
