import noteTxt from './note-text.cmp.js'
import noteImg from './note-img.cmp.js'
import noteTodos from './note-todo.cmp.js'
import noteVideo from './note-video.cmp.js'
import { keepService } from '../sevices/keep.service.js'

export default {
    props: ['keeps'],
    template: `
            <ul class="keep-list clean-list">
                <component v-for="(keep, idx) in keeps" :key="keep.id" :is="keep.type" :keep="keep"></component>
            </ul>
    `,
    data() {
        return {
        }
    },
    computed: {
        // keep() {
        //     console.log('keep-list props', this.keeps);
        //     return this.keeps
        // }
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

