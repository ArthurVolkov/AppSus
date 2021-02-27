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
                <div v-for="(keep, idx) in keepsToShow(keeps)" :key="keep.id" class="keep-item" :style="{backgroundColor: keep.style.backgroundColor}">
                    <component :is="keep.type" :keep="keep" @click.native.stop="select(keep)"></component>
                    <item-btns :keep="keep"></item-btns>
                </div>
            </ul>
    `,
    data() {
        return {
            filterBy: {
                byTxt: '',
                secFilter: 'all',
            }
        }
    },
    methods: {
        select(keep) {
            eventBus.$emit('selected', keep)
        },
        keepFilter(filterBy) {
            this.filterBy = filterBy
        },
        keepsToShow(keeps) {
            if (keeps) {
                
            const searchStr = this.filterBy.byTxt.toLowerCase()
            const filterParam = this.filterBy.secFilter
            const keepsToShow = keeps.filter(keep => {
                if (filterParam === 'all') {
                    return keep.info.txts.find(res=>res.txt.toLowerCase().includes(searchStr))
                }
                else if (filterParam === 'noteTxt') {
                    return keep.info.txts.find(res=>res.txt.toLowerCase().includes(searchStr)) 
                    && keep.type === 'noteTxt'
                }
                else if (filterParam === 'noteTodos') {
                    return keep.info.txts.find(res=>res.txt.toLowerCase().includes(searchStr))
                    && keep.isTodo
                }
                else if (filterParam === 'noteImg') {
                    return keep.info.txts.find(res=>res.txt.toLowerCase().includes(searchStr))
                    && keep.type === 'noteImg'
                }
                else if (filterParam === 'noteVideo') {
                    return keep.info.txts.find(res=>res.txt.toLowerCase().includes(searchStr))
                    && keep.type === 'noteVideo'
                }                   
            })
            return keepsToShow
            }
            return keeps;
        }
    },
    created() {
        eventBus.$on('keepFilter', this.keepFilter)
    },
    components: {
        noteTxt,
        noteImg,
        noteTodos,
        noteVideo,
        itemBtns
    }
};

