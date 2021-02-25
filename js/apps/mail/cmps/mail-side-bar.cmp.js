
export default {
    // props:['mail'],
    template: `
        <section class="mail-side-bar flex flex-col">
            <div class="mail-filter flex">
                <input type="text" @input="setFilter" v-model="filterBy.bySubject" placeholder="Search in mails" />
            </div>
            <button @click="compose" class="compose flex align-center justify-around">Compose</button>
            <button @click="setFilter()">All</button>
            <button @click="setFilter('isIncoming')">Inbox</button>
            <button @click="setFilter('isSent')">Sent</button>
            <button @click="setFilter('isImporant')">Stared</button>
        </section>
    `,
    data() {
        return {
            filterBy: {
                bySubject: '',
                isIncoming: false,
                isSent: false,
                isImporant: false
            }
        }
    },
    computed: {
    },
    methods: {
        setFilter(by) {
            this.filterBy.isIncoming = false
            this.filterBy.isSent = false
            this.filterBy.isImporant = false
            if (by) this.filterBy[by] = true
            this.$emit('filtered', {...this.filterBy});
        },
        compose() {
            this.$emit('compose')
        }
    },
    components: {

    }
}
