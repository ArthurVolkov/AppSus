export default {
    props: ["keep"],
    template: `
          <section :style="{backgroundColor: keep.style.backgroundColor}">
            <textarea rows="4" cols="50" v-model="val"></textarea>
            <p>{{keep.info.label}}</p>
            <img :src="keep.info.url"/>
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
}
