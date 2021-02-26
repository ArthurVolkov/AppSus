import noteTxt from './note-text.cmp.js'

export default {
    props: ["keep"],
    template: `
        <section class="flex" :style="{backgroundColor: keep.style.backgroundColor}">
            <li class="note-text flex flex-col">
                <input v-for="(row, idx) in keep.info.txts.length" :key="idx" :ref="idx" class="pointer" 
                    @click.stop="toggleTodo" type="checkbox" v-model="keep.info.txts[idx].doneAt" />
            </li>
            <note-txt :keep="keep"/>
        </section>
          `,
    data() {
        return {
        };
    },
    methods: {
        toggleTodo() {
            console.log("toggle todo");
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
