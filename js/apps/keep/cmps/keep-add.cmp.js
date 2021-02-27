import { keepService } from '../sevices/keep.service.js'
import { eventBus } from "../../services/event-bus-service.js"

export default {
    template: `
    <section class="keep-add flex flex-col">
            <div class="add-image-container">
                <img v-if="curImage.imageUrl" :src="curImage.imageUrl" alt="image" />
            </div>
        <div class="add-textarea-container flex justify-center">
            <ul v-if="keep.isTodo" class="checkbox-container clean-list">
                <li v-for="row in rowsCount">
                    <input type="checkbox" />
                </li>
            </ul>
            <div class="text-area-container flex flex-col grow">
                <input v-for="(row, idx) in keep.info.txts.length" :key="idx" :ref="idx" @keydown="newLine($event, idx)" type="text" v-model="keep.info.txts[idx].txt" />
            </div>
        </div>

        <div class="add-input-container flex justify-around">
            <button @click="toTodo">ToDo</button>
            <label for="upload" class="upload-label pointer">📁</label>
            <input type="file" id="upload" accept="image/*" @change="openImg" class="upload-img">
            <button @click="clear">🧹</button>
            <button @click="addNewKeep">Add</button>  
      
        </div>
    </section>
    `,

    data() {
        return {
            keep: null,
            isImg: false,
            isVideo: false,
            curImage: {
                imageUrl: null
            },
        }
    },
    computed: {
        rowsCount() {            
            for (var i=0;i<this.keep.info.txts.length;i++){
                if (!this.keep.info.txts[i].txt) {
                   this.keep.info.txts.splice(i,1);
                   i--;
                }
            }
            return this.keep.info.txts.length;
        },
    },
    methods: {
        openImg(ev) {
            const file = ev.target.files[0]
            this.image = file
            this.isImg = true
            this.curImage.imageUrl = URL.createObjectURL(file)
        },
        addNewKeep() {
            this.keep.info.url = this.curImage.imageUrl;
            this.curImage.imageUrl = null;
            if (this.isImg) {
                this.keep.type = "noteImg";
            } else if (this.isVideo) {
                this.keep.type = "noteVideo";
            } 
            else if (this.keep.isTodo) {
               this.keep.type = "noteTodos";
            }
            this.$emit('addNewKeep', this.keep);
            this.keep = keepService.getEmptyKeep()
        },
        toTodo() {
            this.keep.isTodo = !this.keep.isTodo;
        },
        newLine(ev, idx) {
            if (ev.which === 13) {
                this.keep.info.txts.splice(idx+1,0,{txt:'',doneAt: null})
                idx = idx + 1 + '';
                this.$refs[idx][0].focus()
            }
            if (ev.which === 38) {
                if (idx > 0) this.$refs[idx-1][0].focus()
            }
            if (ev.which === 40) {
                if (idx < this.keep.info.txts.length-1) this.$refs[idx+1][0].focus()
            }
            if (ev.which === 8 && 
                this.keep.info.txts[idx].txt === '' &&
                idx > 0) {
                    this.keep.info.txts.splice(idx,1)
                    idx = idx - 1 + '';
                    this.$refs[idx][0].focus()
            }
        },
        loadKeep(keep) {
            this.keep = keep;
            this.curImage.imageUrl = this.keep.info.url
            window.scrollTo({top: 0, behavior: "smooth"});
            keepService.remove(keep.id)
            .then(() => this.$emit('reload')) 
                
        },
        removeKeep(keep) {
            keepService.remove(keep.id)
            .then(() => this.$emit('reload')) 
        },
        pinKeep(keep) {
            keep.isPinned = !keep.isPinned;
            keepService.update(keep)
            .then(() => this.$emit('reload'))
        },
        colorKeep(keep,color) {
            keep.style.backgroundColor = color;
            keepService.update(keep)
            .then(() => this.$emit('reload'))
        },
        imageKeep(keep,ev){
            keepService.update(keep)
            .then(() => this.$emit('reload'))
        },
        clear() {
            this.keep = keepService.getEmptyKeep();
        }
    },
    created() {
        eventBus.$on('selected', this.loadKeep)
        eventBus.$on('remove', this.removeKeep)
        eventBus.$on('pinned', this.pinKeep)
        eventBus.$on('color', this.colorKeep)
        eventBus.$on('image', this.imageKeep)

        this.keep = keepService.getEmptyKeep();
    },    
}
