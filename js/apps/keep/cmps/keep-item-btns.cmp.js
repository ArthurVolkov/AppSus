import { eventBus } from "../../services/event-bus-service.js"

export default {
    props: ['keep'],
    template: `
        <ul class="item-btns-container clean-list flex justify-between align-center">
            <li>
                <button @click="setPin(keep)">📌</button>
            </li>
            <li>
                <label :for="keep.id+'file'" class="upload-label pointer">📁</label>
                <input type="file" :id="keep.id+'file'" accept="image/*" @change="openImg($event ,keep)" class="upload-img">
            </li>
            <li>
                <label :for="keep.id" class="upload-label pointer">🎨</label>
                <input type="color" :id="keep.id" @change.prevent="setColor($event, keep)" class="set-color">
            </li>
            <li>
                <button @click="remove(keep)">🗑</button>
            </li>
        </ul>
    `,
    data() {
        return {

        }
    },
    computed: {

    },
    methods: {
        setPin(keep) {
            console.log('keep',keep.id)
            console.log('this.keep',this.keep.id);
            eventBus.$emit('pinned', keep)
        },
        openImg(ev, keep) {
            console.log('ev:', ev)
            console.log('keep',keep.id)
            console.log('this.keep',this.keep.id);
            eventBus.$emit('color', keep, ev)
        },
        setColor(ev,keep) {
            console.log('ev:', ev)
            console.log('keep',keep.id)
            console.log('this.keep',this.keep.id);
            eventBus.$emit('color', keep, ev.target.value)
        },
        remove(keep) {
            console.log('keep',keep.id)
            console.log('this.keep',this.keep.id);
            eventBus.$emit('remove', keep)
        }
    },
    created(){
   }
}