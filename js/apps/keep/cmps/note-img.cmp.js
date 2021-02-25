export default {
  props: ["keep"],
  template: `
          <li :style="{backgroundColor: keep.style.backgroundColor}" class="note-img flex flex-col align-center">
            <div class="note-img-container">
              <img :src="keep.info.url" />
            </div>
            <textarea rows="4" v-model="val"></textarea>
            <p>{{keep.info.label}}</p>
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
    for (var i = 0; i < this.keep.info.txts.length; i++) {
      this.val += this.keep.info.txts[i].txt + '\n';
    }
  }
}
