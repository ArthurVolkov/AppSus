import mailPreview from '../cmps/mail-preview.cmp.js'
import { mailService } from '../sevices/mail.service.js'
import { eventBus } from '../../services/event-bus-service.js'


export default {
    template: `
    <ul class="mail-list clean-list">
        <mail-preview v-for="mail in mailsToShow" :mail="mail" :key="mail.id"  @click.native.stop="select(mail)" @remove="remove(mail)" @unRead="unRead(mail)" class="mail-preview-container" />
    </ul>
    `,
    data() {
        return {
            mails: [],
            filterBy: {
                bySubject: '',
                secFilter: 'isIncoming',
            },
            isEdit: false,
        }
    },
    methods: {
        select(mail) {
            mail.isReaded = true
            mailService.update(mail)
                .then(() => this.loadMails)
            this.$emit('selected', mail)
            this.$router.push(`/mail/${mail.id}`)
        },
        loadMails() {
            mailService.query()
                .then(mails => this.mails = mails)
        },
        mailFilter(filterBy) {
            if (filterBy.secFilter) this.filterBy = filterBy
            else this.filterBy.bySubject = filterBy.bySubject
        },
        afterSend() {
            this.loadMails()
        },
        remove(mail){
            mailService.remove(mail.id)
            .then (()=>this.loadMails());
        },
        unRead(mail){
            mail.isReaded = !mail.isReaded;
            mailService.update(mail)
            .then (()=>this.loadMails());
        }
    },
    computed: {
        mailsToShow() {
            const searchStr = this.filterBy.bySubject.toLowerCase()
            const filterParam = this.filterBy.secFilter
            const mailsToShow = this.mails.filter(mail => {
                if (filterParam === 'all') return mail.subject.toLowerCase().includes(searchStr)
                else if (filterParam === 'isSent') {
                    return mail.subject.toLowerCase().includes(searchStr) &&
                        mail['isIncoming'] === false
                } else return mail.subject.toLowerCase().includes(searchStr) &&
                    mail[filterParam] === true
            })
            mailsToShow.sort((date1, date2) => { return date2.sentAt - date1.sentAt })
            // console.log('mailsToShow:', mailsToShow)
            return mailsToShow
        }
    },
    components: {
        mailPreview
    },
    created() {
        this.loadMails();
        eventBus.$on('mailFilter', this.mailFilter)
        eventBus.$on('afterSend', this.afterSend)
    },
}