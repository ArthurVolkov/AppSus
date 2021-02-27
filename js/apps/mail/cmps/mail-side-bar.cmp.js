import {eventBus} from '../../services/event-bus-service.js'

export default {
    template: `
        <section class="mail-side-bar flex flex-col">
            <div class="mail-filter flex">
                <input type="text" @input="setSearch" v-model="filterBy.bySubject" placeholder="Search..." />
            </div>
            <div class="side-btns-container flex flex-col">
                <button @click="setFilter('all')">All</button>
                <button @click="setFilter('isIncoming')">Inbox</button>
                <button @click="setFilter('isSent')">Sent</button>
                <button @click="setFilter('isReaded')">Unreaded</button>
                <button @click="setFilter('isImporant')">Stared</button>
            </div>
            <button @click="compose" class="compose flex align-center justify-around">Compose</button>
        </section>
    `,
    data() {
        return {
            filterBy: {
                bySubject: '',
                secFilter: 'isIncoming'
            }
        }
    },
    methods: {
        setFilter(by) {
            this.filterBy.secFilter = by
            // if (this.$router.currentRoute.path !== '/mail/list') this.$router.push(`/mail/list`);
            eventBus.$emit('mailFilter', this.filterBy)
            // this.$router.currentRoute()
            // console.log('this.$router.currentRoute():', this.$router.currentRoute)
        },
        setSearch() {
            eventBus.$emit('mailFilter', this.filterBy)
        },
        compose() {
            this.$emit('compose')
        },
        unRead(num){
            return num;
        }
    },
    created() {
        eventBus.$on('unread', this.unRead)
    }
}