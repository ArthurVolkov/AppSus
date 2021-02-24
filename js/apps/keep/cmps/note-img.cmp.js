export default {
    props: ["keep"],
    template: `
          <section :style="{backgroundColor: keep.style.backgroundColor}">
            <p>{{keep.info.label}}</p>
            <img :src="keep.info.url"/>
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
    }
};
