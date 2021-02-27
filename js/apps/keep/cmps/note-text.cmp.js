

export default {
    props: ["keep"],
    template: `
        <!-- <li class="note-text flex flex-col grow">
            <p v-for="(row, idx) in keep.info.txts.length" 
                :key="idx" :ref="idx" @keydown="newLine($event, idx)" type="text" >
                {{keep.info.txts[idx].txt}}</p> -->
        <li class="note-text flex flex-col grow" :style="{backgroundColor: keep.style.backgroundColor}">
            <p v-for="(row, idx) in keep.info.txts.length" :key="idx" :ref="idx" @keydown="newLine($event, idx)" type="text" :class="{'is-selected': keep.info.txts[idx].doneAt}" >{{keep.info.txts[idx].txt}}</p>
            <!-- <item-btns></item-btns> -->
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
    }
};
