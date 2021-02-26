import { eventBus } from "../../services/event-bus-service.js"

export default {
    props: ['keep'],
    template: `
        <ul class="item-btns-container clean-list flex justify-between align-center">
            <li>
                <button @click="setPin(keep)">📌</button>
            </li>
            <li>
                <label :for="keep.id+1" class="upload-label pointer">📁</label>
                <input type="file" :id="keep.id+1" accept="image/*" @change="openImg($event,keep)" class="upload-img">
            </li>
            <li>
                <label :for="keep.id" class="upload-label pointer">🎨</label>
                <input type="color" :id="keep.id" @change="setColor($event,keep)" class="set-color">
            </li>
            <li>
                <button @click="remove(keep)">🗑</button>
            </li>
        </ul>
    `,
    data() {
        return {
            curImage: {
                imageUrl: null
            }
        }
    },
    computed: {

    },
    methods: {
        setPin(keep) {
            eventBus.$emit('pinned', keep)
        },
        openImg(ev,keep) {
            const file = ev.target.files[0];
            this.image = file;
            keep.type = 'noteImg';
            this.curImage.imageUrl = URL.createObjectURL(file)
            this.keep.info.url = this.curImage.imageUrl;
            eventBus.$emit('image', keep, ev)
        },
        setColor(ev,keep) {
            eventBus.$emit('color', keep, ev.target.value)
        },
        remove(keep) {
            eventBus.$emit('remove', keep)
        }
    },
    created(){
   }
}