import { keepService } from '../sevices/keep.service.js'

export default {
    template: `
    <section class="keep-add flex flex-col">
        <img v-if="curImage.imageUrl" :src="curImage.imageUrl" alt="image" />
        <div class="add-textarea-container flex flex-col justify-center">
            <ul v-if="isTodo" class="checkbox-container clean-list">
                <li v-for="row in rowsCount">
                    <input type="checkbox" />
                </li>
            </ul>
            <input v-for="(row, idx) in keep.info.txts.length+1" :key="idx" :ref="idx" @keydown="newLine($event, idx)" type="text" v-model="keep.info.txts[idx]" />
        </div>

        <div class="add-input-container flex justify-around">
            <!-- <button @click="openImg">img</button> -->
            <button @click="toTodo">todo</button>
            <!-- <input type="text" v-if="isImg" v-model="src"> -->
            <label for="upload" class="upload-label pointer">Image</label>
            <input type="file" id="upload" accept="image/*" @change="openImg" class="upload-img">

            <button @click="addNewKeep">Add</button>        
        </div>
    </section>
    `,

    data() {
        return {
            keep: null,
            // src: null,
            isImg: false,
            isVideo: false,
            isTodo: false,
            curImage: {
                image: null,
                imageUrl: null
            },
            // index: 1
        }
    },
    computed: {
        rowsCount() {            
            for (var i=0;i<this.keep.info.txts.length;i++){
                if (this.keep.info.txts[i] === '') {
                    this.keep.info.txts.splice(i,1)
                    i--;
                }
            }
            console.log(this.keep.info.txts);
            return this.keep.info.txts.length;
        }
    },
    methods: {
        openImg(ev) {
            const file = ev.target.files[0]
            this.image = file
            this.isImg = true
            this.curImage.imageUrl = URL.createObjectURL(file)
        },
        addNewKeep() {
            // this.keep.info.url = this.src;
            this.keep.info.url = this.curImage.imageUrl;
            if (this.isImg) {
                this.keep.type = "noteImg";
            } else if (this.isVideo) {
                this.keep.type = "noteVideo";
            }
            this.$emit('addNewKeep', this.keep);
            keepService.getEmptyKeep()
        },
        toTodo() {
            this.isTodo = !this.isTodo
        },
        //backspace 8 up 38 down 40
        newLine(ev, idx) {
            if (ev.which === 13) {
                this.keep.info.txts.splice(idx+1,0,'')
                idx = idx + 1 + '';
                this.$refs[idx][0].focus()
            }
            if (ev.which === 38) {
                if (idx > 0) this.$refs[idx-1][0].focus()
            }
            if (ev.which === 40) {
                if (idx < this.keep.info.txts.length-1) this.$refs[idx+1][0].focus()
            }
            if (ev.which === 8 && this.keep.info.txts[idx] === '' && idx > 0) {
                this.keep.info.txts.splice(idx,1,)
                idx = idx - 1 + '';
                this.$refs[idx][0].focus()
            }

        }
    },
    created() {
        this.keep = keepService.getEmptyKeep();
    },    
}
