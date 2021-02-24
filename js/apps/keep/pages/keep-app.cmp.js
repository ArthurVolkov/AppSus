import noteTxt from '../cmps/note-text.cmp.js'
import noteImg from '../cmps/note-img.cmp.js'
import noteTodo from '../cmps/note-todo.cmp.js'
import { keepService } from '../sevices/keep.service.js'


export default {
    template: `
        <section class="keep-app">
            <div v-for="(cmp, idx) in survey.cmps">
                <component :is="cmp.type"  :info="cmp.info"></component>
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
                .then(keeps => this.keeps = keeps)
        }
    },
    components: {
        selectBox,
        textBox,
        linearScale,
        photoTuner
    }
};

