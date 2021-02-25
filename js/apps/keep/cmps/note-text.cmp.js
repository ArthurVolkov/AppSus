export default {
    props: ["keep"],
    template: `
          <section>
            <textarea v-model="val"></textarea>
          </section>
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
        for (var i=0;i<this.keep.info.txts.length;i++){
            this.val += this.keep.info.txts[i].txt + '\n';
        }
    }
};
