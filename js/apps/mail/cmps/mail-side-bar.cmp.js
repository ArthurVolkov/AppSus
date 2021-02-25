import mailFilter from './mail-filter.cmp.js'

export default {
    // props:['mail'],
    template: `
        <section class="mail-side-bar flex flex-col">
            <mail-filter @filtered="setFilter"/>
            <button @click="compose">Compose</button>
            <button>Inbox</button>
            <button>Sent</button>
            <button>Stared</button>
        </section>
    `,
    computed: {
    },
    methods: {
        setFilter(filterBy) {
            this.$emit('filtered', filterBy);
        },
        compose() {
            this.$emit('compose')
        }
    },
    components: {
        mailFilter
    }
}
