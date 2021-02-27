import { mailService } from '../sevices/mail.service.js'
import mailList from './mail-list.cmp.js'
import mailSideBar from '../cmps/mail-side-bar.cmp.js'
import mailEdit from './mail-edit.cmp.js'
import userMsg from '../../cmps/user-msg.cmp.js'
import { eventBus } from '../../services/event-bus-service.js'

export default {
    template: `
        <section class="mail-app main-container flex">
            <user-msg></user-msg>
            <mail-side-bar @filtered="setFilter" @compose="openEdit"/>

            <router-view></router-view>


            <!-- <mail-list :mails="mailsToShow" @selected="isReaded"/> -->
            <!-- <mail-edit v-if="isEdit" @closeEdit="closeEdit" @reply="reply" @afterSend="afterSend" /> -->
            <mail-edit :isNew="true" v-if="isEdit" @closeEdit="closeEdit" @afterSend="afterSend" />
        </section>
    `,
    data() {
        return {
            mails: [],
            // filterBy: { isIncoming: true, bySubject: '' },
            isEdit: false,
        }
    },
    methods: {
        // loadMails() {
        //     mailService.query()
        //         .then(mails => this.mails = mails)
        // },
        setFilter(filterBy) {
            this.filterBy = filterBy
        },
        // isReaded(mail) {
        //     mail.isReaded = true
        //     mailService.update(mail)
        //         .then(() => this.loadMails)
        // },
        openEdit() {
            this.isEdit = true
        },
        closeEdit() {
            this.isEdit = false
        },
        afterSend() {
            // this.loadMails()
            this.closeEdit()
        },
        // reply(mails) {
        //     // console.log('reply');
        //     // console.log('mails:', mails)


        //     // this.isEdit === true
        // }
    },
    computed: {
        // mailsToShow() {
        //     if (!this.filterBy) return this.mails.sort((date1, date2) => { return date2.sentAt - date1.sentAt })

        //     let filterParam = null
        //     if (this.filterBy.isIncoming) filterParam = ['isIncoming', true]
        //     else if (this.filterBy.isSent) filterParam = ['isIncoming', false]
        //     else if (this.filterBy.isImporant) filterParam = ['isImporant', true]
        //     else if (this.filterBy.isReaded) filterParam = ['isReaded', false]


        //     const searchStr = this.filterBy.bySubject.toLowerCase()
        //     const mailsToShow = this.mails.filter(mail => {
        //         if (!filterParam) return mail.subject.toLowerCase().includes(searchStr)
        //         else return mail.subject.toLowerCase().includes(searchStr) &&
        //             mail[filterParam[0]] === filterParam[1]
        //     })

        //     mailsToShow.sort((date1, date2) => { return date2.sentAt - date1.sentAt })

        //     return mailsToShow
        // }
    },
    components: {
        // mailList,
        mailSideBar,
        mailEdit,
        userMsg
    },
    // created() {
    //     // eventBus.$on('afterSend', this.closeEdit)
    //     eventBus.$on('reply', this.reply)
    //     // eventBus.$on('afterSend', this.afterSend)

    //     // this.loadMails();
    // },
    // destroyed() {
    //     eventBus.$off('reply', this.reply)

    // }
}
