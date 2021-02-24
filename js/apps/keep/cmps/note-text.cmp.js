export default {
    props: ["keep"],
    template: `
          <section>
            <input type="text" v-model="val" />
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
        this.val = this.keep.info.txt;
    }
};
