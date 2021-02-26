export default {
    props: ["keep"],
    template: `
        <li class="note-text">
            <input v-for="(row, idx) in keep.info.txts.length" :key="idx" :ref="idx" @keydown="newLine($event, idx)" type="text" v-model="keep.info.txts[idx].txt" />
        </li>
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
    }
};
