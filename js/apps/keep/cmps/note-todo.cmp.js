import noteTxt from './note-text.cmp.js'

export default {
    props: ["keep"],
    template: `
        <section class="flex">
            <li class="note-text">
                <input v-for="(row, idx) in keep.info.txts.length" :key="idx" :ref="idx" @keydown="newLine($event, idx)" type="checkbox" v-model="keep.info.txts[idx].doneAt" />
            </li>
            <note-txt :keep="keep"/>
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
        noteTxt
    }
};
