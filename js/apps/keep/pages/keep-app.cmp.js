import noteTxt from '../cmps/note-text.cmp.js'
import noteImg from '../cmps/note-img.cmp.js'
import noteTodos from '../cmps/note-todo.cmp.js'
import { keepService } from '../sevices/keep.service.js'


export default {
    template: `
        <section class="keep-app">
            <div v-for="(keep, idx) in keeps">
                <component :is="keep.type" :info="keep.info"></component>
            </div>
        </section>
    `,
    data() {
        return {
            keeps: []
        }
    },
    created() {
        this.loadKeeps();
    },
    methods: {
        loadKeeps() {
            keepService.query()
                .then(keeps => {
                    this.keeps = keeps
                })
        }
    },
    components: {
        noteTxt,
        noteImg,
        noteTodos,
    }
};

