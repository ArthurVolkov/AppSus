import { mailService } from '../sevices/mail.service.js'
import mailFilter from '../cmps/mail-filter.cmp.js'
import mailList from './mail-list.cmp.js'
import mailSideBar from '../cmps/mail-side-bar.cmp.js'


export default {
    template: `
        <section class="mail-app">
            <mail-filter @filtered="setFilter" />
            <router-view />
            <mail-list :mails="mailsToShow"/>
            <mail-side-bar/>
        </section>
    `,
    data() {
        return {
            mails: [],
            filterBy: null
        }
    },
    methods: {
        loadMails() {
            mailService.query()
                .then(mails => this.mails = mails)
        },
        setFilter(filterBy) {
            this.filterBy = filterBy
        },
    },
    computed: {
        mailsToShow() {
            if (!this.filterBy) return this.mails
            const searchStr = this.filterBy.bySubject.toLowerCase()
            const mailsToShow = this.mails.filter(mail => {
                return mail.subject.toLowerCase().includes(searchStr)
            })
            return mailsToShow
        }
    },
    created() {
        this.loadMails();
    },
    components: {
        mailFilter,
        mailList,
        mailSideBar
    }
}
