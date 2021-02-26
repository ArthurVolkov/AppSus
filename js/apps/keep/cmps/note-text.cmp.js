import itemBtns from './keep-item-btns.cmp.js'


export default {
    props: ["keep"],
    template: `
        <li class="note-text flex flex-col">
            <p v-for="(row, idx) in keep.info.txts.length" :key="idx" :ref="idx" @keydown="newLine($event, idx)" type="text" >{{keep.info.txts[idx].txt}}</p>
            <item-btns></item-btns>
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
    },
    components: {
        itemBtns
    }
};
