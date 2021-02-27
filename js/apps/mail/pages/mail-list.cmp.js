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
            unReadCount: 0
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
                .then(mails => {
                    this.mails = mails
                })
        },
        mailFilter(filterBy) {
            this.filterBy = filterBy
            if (this.$router.currentRoute.path !== '/mail/list') this.$router.push(`/mail/list`);
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
        },
        getUnreadCount(){
            return this.mails.filter(mail => {
                return !mail.isReaded && mail.isIncoming;
            }).length
        }
    },
    computed: {
        mailsToShow() {
            if(!this.mails.length) return
            this.unReadCount = this.getUnreadCount();
            eventBus.$emit('unread', this.unReadCount)
            const searchStr = this.filterBy.bySubject.toLowerCase()
            const filterParam = this.filterBy.secFilter
            const mailsToShow = this.mails.filter(mail => {
                if (filterParam === 'all') return mail.subject.toLowerCase().includes(searchStr) || mail.body.toLowerCase().includes(searchStr) || mail.mailAddress.toLowerCase().includes(searchStr)
                else if (filterParam === 'isSent') {
                    return mail.subject.toLowerCase().includes(searchStr) || mail.body.toLowerCase().includes(searchStr) || mail.mailAddress.toLowerCase().includes(searchStr) &&
                        mail['isIncoming'] === false
                } else if (filterParam === 'isReaded') {
                    return mail.subject.toLowerCase().includes(searchStr) || mail.body.toLowerCase().includes(searchStr) || mail.mailAddress.toLowerCase().includes(searchStr) &&
                        mail['isReaded'] === false
                } else return mail.subject.toLowerCase().includes(searchStr) || mail.body.toLowerCase().includes(searchStr) || mail.mailAddress.toLowerCase().includes(searchStr) &&
                    mail[filterParam] === true
            })
            mailsToShow.sort((date1, date2) => { return date2.sentAt - date1.sentAt })
            return mailsToShow
        }
    },
    components: {
        mailPreview
    },
    created() {
        this.loadMails()
        eventBus.$on('afterSend', this.afterSend)
        eventBus.$on('mailFilter', this.mailFilter)
    },
}