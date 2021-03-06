import { keepService } from '../sevices/keep.service.js'
import { eventBus } from "../../services/event-bus-service.js"

export default {
    template: `
    <section class="keep-add flex flex-col">
            <div v-if="curImage.imageUrl" class="add-image-container">
                <img  :src="curImage.imageUrl" alt="image" />
            </div>
            <div v-if="curVideo.videoUrl" class="add-video-container">
                <video  :src="curVideo.videoUrl" controls></video>
            </div>
        <div class="add-textarea-container flex justify-center">
            <ul v-if="keep.isTodo" class="checkbox-container clean-list">
                <li v-for="row in rowsCount">
                    <input type="checkbox" @click.stop="toggleTodo(row-1)"/>
                </li>
            </ul>
            <div class="text-area-container flex flex-col grow">
                <input v-for="(row, idx) in keep.info.txts.length" :key="idx" :ref="idx" 
                    @keydown="newLine($event, idx)" type="text" v-model="keep.info.txts[idx].txt" 
                    :class="{'is-selected': keep.info.txts[idx].doneAt && keep.isTodo}" />
            </div>
        </div>

        <div class="add-input-container flex justify-around">
            <button title="Pin" @click="setPin" :class="pinIcon" class="pin">🖈</button>
            <button title="Todo" @click="toTodo">☑</button>
            <label title="Image" for="upload" class="upload-label pointer">📷</label>
            <input title="Add Image" type="file" id="upload" accept="image/*" @change="openImg" class="upload-img">
            <label title="Color" for="color-add" class="upload-label pointer">🎨</label>
            <input title="Change Color" type="color" id="color-add" @change="setColor" class="set-color">

            <button title="Clear" @click="clear">🗑</button>
            <button title="Save" @click="addNewKeep">📁</button>  
      
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
            curVideo: {
                videoUrl: null
            },
        }
    },
    computed: {
        rowsCount() {            
            for (var i=0;i<this.keep.info.txts.length-1;i++){
                if (!this.keep.info.txts[i].txt) {
                   this.keep.info.txts.splice(i,1);
                   i--;
                }
            }
            this.keep.info.txts.push({txt:'',doneAt:null});
            return this.keep.info.txts.length-1;
        },
        pinIcon(){
            return this.keep.isPinned ? 'pined' : '';
        }
    },
    methods: {
        toggleTodo(idx) {
            if (this.keep.info.txts[idx].doneAt){
                this.keep.info.txts[idx].doneAt = null;
            }else {
                this.keep.info.txts[idx].doneAt = Date.now();
            }
        },
        openImg(ev) {
            const file = ev.target.files[0]
            this.isImg = true
            this.isVideo = false
            this.curImage.imageUrl = URL.createObjectURL(file)
        },
        openVid(ev) {
            const file = ev.target.files[0]
            this.isVideo = true
            this.isImg = false
            this.curVideo.videoUrl = URL.createObjectURL(file)
        },
        addNewKeep() {
            this.keep.info.url = this.curImage.imageUrl;
            this.curImage.imageUrl = null;
            this.curVideo.videoUrl = null;
            if (this.isImg) {
                this.keep.type = "noteImg";
            } else if (this.isVideo) {
                this.keep.type = "noteVideo";
            } 
            else if (this.keep.isTodo) {
               this.keep.type = "noteTodos";
            }
            this.$emit('addNewKeep', this.keep);
            const msg = {
                txt: 'keep added',
                type: 'success'
            }
            eventBus.$emit('show-msg', msg)
            this.keep = keepService.getEmptyKeep()
        },
        toTodo() {
            this.keep.isTodo = !this.keep.isTodo;
        },
        setPin(){
            this.keep.isPinned = !this.keep.isPinned;
        },
        setColor(ev){
            this.keep.style.backgroundColor = ev.target.value;
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
            if (this.keep.id) {
                keepService.save(this.keep)
                .then(() => {
                    this.keep = keep;
                    if (this.keep.type = 'noteImg'){
                        this.curImage.imageUrl = this.keep.info.url                        
                    } else if (this.keep.type = 'noteVideo') {
                        this.curVideo.videoUrl = this.keep.info.url
                    }
                    window.scrollTo({top: 0, behavior: "smooth"});
                    keepService.remove(keep.id)
                    .then(() => this.$emit('reload'))         
            })     
            }else{
                this.keep = keep;
                if (this.keep.type = 'noteImg'){
                    this.curImage.imageUrl = this.keep.info.url                        
                } else if (this.keep.type = 'noteVideo') {
                    this.curVideo.videoUrl = this.keep.info.url
                }
                window.scrollTo({top: 0, behavior: "smooth"});
                keepService.remove(keep.id)
                .then(() => this.$emit('reload'))     
            }                
        },
        removeKeep(keep) {
            keepService.remove(keep.id)
            .then(() => {
                this.$emit('reload')
                const msg = {
                    txt: 'keep removed',
                    type: 'success'
                }
                eventBus.$emit('show-msg', msg)
            })
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
        imageKeep(keep){
            keepService.update(keep)
            .then(() => this.$emit('reload'))
        },
        todoKeep(keep,idx){
            if (keep.info.txts[idx].doneAt){
                keep.info.txts[idx].doneAt = null;
            }else {
                keep.info.txts[idx].doneAt = Date.now();
            }
            keepService.update(keep)
            .then(() => this.$emit('reload'))
        },
        setTodoKeep(keep){
            keep.isTodo = !keep.isTodo;
            if (keep.type === 'noteTxt'){
                keep.type = 'noteTodos';
            } else if (keep.type === 'noteTodos'){
                keep.type = 'noteTxt';
            }
            keepService.update(keep)
            .then(() => this.$emit('reload'))    
        },
        clear() {
            this.keep = keepService.getEmptyKeep();
            this.curImage.imageUrl = null;
            this.curVideo.videoUrl = null;
        }
    },
    created() {
        eventBus.$on('selected', this.loadKeep)
        eventBus.$on('remove', this.removeKeep)
        eventBus.$on('pinned', this.pinKeep)
        eventBus.$on('color', this.colorKeep)
        eventBus.$on('image', this.imageKeep)
        eventBus.$on('todo', this.todoKeep)
        eventBus.$on('setTodo', this.setTodoKeep)
        this.keep = keepService.getEmptyKeep();
    },    
}
