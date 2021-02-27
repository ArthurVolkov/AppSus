import {eventBus} from '../../services/event-bus-service.js'

export default {
    template: `
        <section class="mail-side-bar flex flex-col">
            <div class="mail-filter flex">
                <input type="text" @input="setSearch" v-model="filterBy.bySubject" placeholder="Search..." />
            </div>
            <div class="side-btns-container flex flex-col">
                <button @click="setFilter('all')" :class="{active : currFilter === 'all'}">All</button>
                <button @click="setFilter('isIncoming')" :class="{active : currFilter === 'isIncoming'}" class="inbox-filter-btn">Inbox ({{unReadCount}})</button>
                <button @click="setFilter('isSent')" :class="{active : currFilter === 'isSent'}">Sent</button>
                <button @click="setFilter('isReaded')" :class="{active : currFilter === 'isReaded'}">Unreaded</button>
                <button @click="setFilter('isImporant')" :class="{active : currFilter === 'isImporant'}">Stared</button>
            </div>
            <button @click="compose" class="compose flex align-center justify-around">Compose</button>
        </section>
    `,
    data() {
        return {
            filterBy: {
                bySubject: '',
                secFilter: 'isIncoming'
            },
            currFilter: 'isIncoming',
            unReadCount: 0
        }
    },
    methods: {
        setFilter(by) {
            this.filterBy.secFilter = by
            eventBus.$emit('mailFilter', this.filterBy)
            this.currFilter = by
        },
        setSearch() {
            eventBus.$emit('mailFilter', this.filterBy)
        },
        compose() {
            this.$emit('compose')
        },
        unRead(unReadCount) {
             this.unReadCount = unReadCount;
        }
    },
    created() {
        eventBus.$on('unread', this.unRead)
    }
}