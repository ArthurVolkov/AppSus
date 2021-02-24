export default {
    template: `
          <section>
            <input type="text" v-model="val" />
          </section>
          `,
    props: ["info"],
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
        console.log('info.txt',this.info.txt)
        this.val = this.info.txt;
    }
  };
  