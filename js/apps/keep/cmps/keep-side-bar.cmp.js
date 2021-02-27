import {eventBus} from '../../services/event-bus-service.js'

export default {
    template: `
        <section class="keep-side-bar flex flex-col">
            <div class="keep-filter flex">
                <input type="text" @input="setSearch" v-model="filterBy.byTxt" placeholder="Search..." />
            </div>
            <div class="side-btns-container flex flex-col">
                <button @click="setFilter('all')">All</button>
                <button @click="setFilter('noteTxt')">Inbox</button>
                <button @click="setFilter('noteTodos')">Sent</button>
                <button @click="setFilter('noteImg')">Unreaded</button>
                <button @click="setFilter('noteVideo')">Stared</button>
            </div>
        </section>
    `,
    data() {
        return {
            filterBy: {
                byTxt: '',
                secFilter: ''
            }
        }
    },
    methods: {
        setFilter(by) {
            this.filterBy.secFilter = by
            eventBus.$emit('keepFilter', this.filterBy)
        },
        setSearch() {
            eventBus.$emit('keepFilter', this.filterBy)
        }
    },
}