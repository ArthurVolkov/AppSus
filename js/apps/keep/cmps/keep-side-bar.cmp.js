import {eventBus} from '../../services/event-bus-service.js'

export default {
    template: `
        <section class="keep-side-bar flex flex-col">
            <div class="keep-filter flex">
                <input type="text" @input="setSearch" v-model="filterBy.byTxt" placeholder="Search..." />
            </div>
            <div class="side-btns-container flex flex-col">
                <button @click="setFilter('all')" :class="{active : currFilter === 'all'}">All</button>
                <button @click="setFilter('noteTxt')" :class="{active : currFilter === 'noteTxt'}">Text</button>
                <button @click="setFilter('noteTodos')" :class="{active : currFilter === 'noteTodos'}">Todos</button>
                <button @click="setFilter('noteImg')" :class="{active : currFilter === 'noteImg'}">Images</button>
                <button @click="setFilter('noteVideo')" :class="{active : currFilter === 'noteVideo'}">Videos</button>
            </div>
        </section>
    `,
    data() {
        return {
            filterBy: {
                byTxt: '',
                secFilter: ''
            },
            currFilter: 'all',
        }
    },
    methods: {
        setFilter(by) {
            this.currFilter = by
            this.filterBy.secFilter = by
            eventBus.$emit('keepFilter', this.filterBy)
        },
        setSearch() {
            eventBus.$emit('keepFilter', this.filterBy)
        }
    },
}