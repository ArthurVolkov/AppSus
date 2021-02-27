import {eventBus} from '../../services/event-bus-service.js'


export default {
    template: `
        <section class="keep-side-bar flex flex-col">
            <div class="keep-filter flex">
                <input type="text" @input="setSearch" v-model="filterBy.bySubject" placeholder="Search in keeps" />
            </div>
            <button @click="compose" class="compose flex align-center justify-around">Compose</button>
            <div class="side-btns-container flex flex-col">
                <button @click="setFilter('all')">All</button>
                <button @click="setFilter('isIncoming')">Inbox</button>
                <button @click="setFilter('isSent')">Sent</button>
                <button @click="setFilter('isReaded')">Unreaded</button>
                <button @click="setFilter('isImporant')">Stared</button>
            </div>
        </section>
    `,
    data() {
        return {
            filterBy: {
                bySubject: '',
                secFilter: ''
            }
        }
    },
    methods: {
        setFilter(by) {
            this.filterBy.secFilter = by
            eventBus.$emit('keepFilter', this.filterBy)
            console.log('this.$router.currentRoute():', this.$router.currentRoute)
            if (this.$router.currentRoute.path !== '/keep/list') 
            this.$router.push(`/keep/list`)
        },
        setSearch() {
            eventBus.$emit('keepFilter', this.filterBy)
        },
        compose() {
            this.$emit('compose')
        }
    },
}