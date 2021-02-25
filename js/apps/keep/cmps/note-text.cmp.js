export default {
    props: ["keep"],
    template: `
        <li class="note-text">
            <!-- <textarea rows="5" v-model="val"></textarea> -->
            <pre>{{val}}</pre>
        </li>
          `,
    data() {
        return {
            val: ""
        };
    },
    methods: {
    },
    computed: {
    },
    created() {
        console.log('prot in note-text', this.keep);
        for (var i = 0; i < this.keep.info.txts.length; i++) {
            this.val += this.keep.info.txts[i].txt + '\n';
        }
    }
};
