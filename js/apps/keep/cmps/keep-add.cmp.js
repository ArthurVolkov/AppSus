import { keepService } from '../sevices/keep.service.js'

export default {
    template: `
    <section class="keep-add">
        <label> add a keep: </label>    
        <textarea rows="4" cols="50" v-model="keepToAddTxt"></textarea>
        <button @click="openImg">img</button>
        <button>todo</button>
        <input type="text" v-if="isImg" v-model="src">
        <button @click="addNewKeep">Add</button>        
    </section>
    `,

data() {
        return {
            keep: null,
            keepToAddTxt: '',
            src: null,
            isImg: false,
            isVideo: false
        }
    },
    methods:{
        openImg(){
            this.isImg = !this.isImg;
        },
        addNewKeep(){ 
            var lines = this.keepToAddTxt.split(/\r|\r\n|\n/);
            for (var i=0;i<lines.length;i++){
                this.keep.info.txts.push({txt:lines[i],doneAt:null})
            }
            this.keep.info.url = this.src;
            if (this.isImg){
                this.keep.type = "noteImg";
            }else if (this.isVideo){
                this.keep.type = "noteVideo";
            }
            this.$emit('addNewKeep', this.keep);
        }
    },
    created(){
        this.keep = keepService.getEmptyKeep(); 
    }
}
