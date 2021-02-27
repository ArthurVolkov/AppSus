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
            <button @click="setPin" :class="pinIcon" class="pin">🖈</button>
            <button @click="toTodo">☑</button>
            <label for="upload" class="upload-label pointer">📷</label>
            <input type="file" id="upload" accept="image/*" @change="openImg" class="upload-img">
            <label for="color-add" class="upload-label pointer">🎨</label>
            <input type="color" id="color-add" @change="setColor" class="set-color">

            <button @click="clear">🗑</button>
            <button @click="addNewKeep">📁</button>  
      
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
            if (!this.keep.info.txts.length){
                 this.keep.info.txts.push({txt:'',daneAt:null});
                 return this.keep.info.txts.length;
            }
            return this.keep.info.txts.length;
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
                    this.curImage.imageUrl = this.keep.info.url
                    window.scrollTo({top: 0, behavior: "smooth"});
                    keepService.remove(keep.id)
                    .then(() => this.$emit('reload'))         
            })     
            }else{
                this.keep = keep;
                this.curImage.imageUrl = this.keep.info.url
                window.scrollTo({top: 0, behavior: "smooth"});
                keepService.remove(keep.id)
                .then(() => this.$emit('reload'))     
            }                
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
