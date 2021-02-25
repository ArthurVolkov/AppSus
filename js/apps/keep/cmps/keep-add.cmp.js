import { keepService } from '../sevices/keep.service.js'

export default {
    template: `
    <section class="keep-add flex flex-col">


        <img v-if="curImage.imageUrl" :src="curImage.imageUrl" alt="image" />

        <div class="add-textarea-container flex justify-center">
            <ul v-if="isTodo" class="checkbox-container clean-list">
                <li v-for="row in rowsCount">
                    <input type="checkbox" />
                </li>
            </ul>
            <textarea :rows="rowsCount"  v-model="keepToAddTxt"></textarea>
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
            keepToAddTxt: '',
            // src: null,
            isImg: false,
            isVideo: false,
            isTodo: false,
            curImage: {
                image: null,
                imageUrl: null
            }
        }
    },
    computed: {
        rowsCount() {
            const lines = this.keepToAddTxt.split(/\r|\r\n|\n/);
            return lines.length
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
            var lines = this.keepToAddTxt.split(/\r|\r\n|\n/);
            for (var i = 0; i < lines.length; i++) {
                this.keep.info.txts.push({ txt: lines[i], doneAt: null })
            }
            // this.keep.info.url = this.src;
            this.keep.info.url = this.curImage.imageUrl;


            if (this.isImg) {
                this.keep.type = "noteImg";
            } else if (this.isVideo) {
                this.keep.type = "noteVideo";
            }
            this.$emit('addNewKeep', this.keep);
            this.keep = keepService.getEmptyKeep();
        },
        toTodo() {
            this.isTodo = !this.isTodo
        }
    },
    created() {
        this.keep = keepService.getEmptyKeep();
    }
}
