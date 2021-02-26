import noteTxt from './note-text.cmp.js'
import noteImg from './note-img.cmp.js'
import noteTodos from './note-todo.cmp.js'
import noteVideo from './note-video.cmp.js'
import { eventBus } from "../../services/event-bus-service.js"
import itemBtns from './keep-item-btns.cmp.js'
import { keepService } from '../sevices/keep.service.js'

export default {
    props: ['keeps'],
    template: `
            <ul class="keep-list clean-list">
            <!-- <component v-for="(keep, idx) in keeps" :key="keep.id" :is="keep.type" :keep="keep" @click.native.stop="select(keep)" class="keep-item"></component> -->
                <div v-for="(keep, idx) in keeps" :key="keep.id" class="keep-item">
                    <component :is="keep.type" :keep="keep" @click.native.stop="select(keep)"></component>
                    <item-btns></item-btns>
                </div>
            </ul>
    `,
    data() {
        return {
        }
    },
    computed: {
    },
    created() {
    },
    methods: {
        select(keep) {
            eventBus.$emit('selected', keep)
        }
    },
    components: {
        noteTxt,
        noteImg,
        noteTodos,
        noteVideo,
        itemBtns
    }
};

