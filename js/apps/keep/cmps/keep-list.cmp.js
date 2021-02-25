import noteTxt from './note-text.cmp.js'
import noteImg from './note-img.cmp.js'
import noteTodos from './note-todo.cmp.js'
import noteVideo from './note-video.cmp.js'
import { keepService } from '../sevices/keep.service.js'

export default {
    props:['keeps'],
    template: `
        <section class="keep-list">
            <div v-for="(keep, idx) in keeps">
                <component :is="keep.type" :keep="keep"></component>
            </div>
        </section>
    `,
    data() {
        return {
        }
    },
    created() {
    },
    methods: {
    },
    components: {
        noteTxt,
        noteImg,
        noteTodos,
        noteVideo
    }
};

