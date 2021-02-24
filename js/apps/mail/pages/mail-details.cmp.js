import { mailService } from '../sevices/mail.service.js'
// import { eventBus } from '../services/event-bus.service.js'

export default {
    template: `
    <section class="mail-details-container">
        <h3>{{mailSubject}}</h3>
        <ul class="review-list">
            <li v-for="mail in mails" class="mail-preview-container" >
                <p>Id: {{mail.id}}</p>
                <p>Subject: {{mail.subject}}</p>
                <p>Body: {{mail.body}}</p>
                <p>Is Read: {{mail.isRead}}</p>
                <p>Timestamp: {{sentAtToShow(mail.sentAt)}}</p>
            </li>
        </ul>
    <button @click="closeDetails" class="close-btn">X</button>
    </section>        
    `,
    data() {
        return {
            mails: [],
            mailSubject: null
        }
    },
    methods: {
        loadMails() {
            const id = this.$route.params.mailId
            mailService.getChainById(id)
                .then(mails => {
                    this.mails = mails.sort((mail1, mail2)=> {return mail1.sentAt - mail2.sentAt})
                    this.mailSubject = this.mails[0].subject;
                })
        },
        closeDetails() {
             this.$router.push(`/mail`)
        },
        sentAtToShow(sentAt) {
            const sentDate = new Date(sentAt)
            return sentDate.toISOString().substr(0, 10)
        }
    },
    computed: {
    },
    // watch: {
    //     '$route.params.mailId'(id) {
    //         this.loadMail()
    //     }
    // },
    created() {
        this.loadMails()
    },
    components: {

    }
}