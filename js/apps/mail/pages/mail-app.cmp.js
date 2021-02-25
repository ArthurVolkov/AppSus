import { mailService } from '../sevices/mail.service.js'
import mailFilter from '../cmps/mail-filter.cmp.js'
import mailList from './mail-list.cmp.js'
import mailSideBar from '../cmps/mail-side-bar.cmp.js'
import mailEdit from './mail-edit.cmp.js'


export default {
    template: `
        <section class="mail-app main-container flex justify-between">
            <mail-side-bar @filtered="setFilter" @compose="openEdit"/>
            <mail-list :mails="mailsToShow" @selected="isReaded"/>
            <mail-edit v-if="isEdit" @closeEdit="closeEdit" />
        </section>
    `,
    data() {
        return {
            mails: [],
            filterBy: null,
            isEdit: false
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
        isReaded(mail) {
            mail.isReaded = true
            console.log('mail:', mail)
            mailService.update(mail)
                .then(() => this.loadMails)
        },
        openEdit() {
            this.isEdit = true
        },
        closeEdit() {
            this.isEdit = false
        }
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
        mailSideBar,
        mailEdit
    }
}
