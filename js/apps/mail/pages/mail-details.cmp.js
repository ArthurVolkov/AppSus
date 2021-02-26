import { mailService } from '../sevices/mail.service.js'
// import mailSideBar from '../cmps/mail-side-bar.cmp.js'

// import { eventBus } from '../services/event-bus.service.js'

export default {
    template: `
    <section class="mail-details-container flex">
        <!-- <mail-side-bar></mail-side-bar> -->
        <div>
            <ul class="review-list clean-list">
                <li v-for="mail in mails" class="mail-preview-container" >
                    <div class="details-subject flex align-center">
                        <p>{{mailSubject}}</p>
                        <pre v-if="mail.isIncoming">⇩ Incoming</pre>
                        <pre v-else>⇧ Sent</pre>
                    </div>
                    <div>
                        <p v-if="mail.isIncoming">from: {{name(mail)}} <{{mail.mailAddress}}></p>
                        <p v-else>from: {{self.name}} <{{self.mailAddress}}></p>
                    </div>
                    <p>Body: {{mail.body}}</p>
                    <p>Is Read: {{mail.isRead}}</p>
                    <p>Timestamp: {{sentAtToShow(mail.sentAt)}}</p>
                </li>
            </ul>
        <button @click="closeDetails" class="close-btn">X</button>
        </div>
    </section>        
    `,
    data() {
        return {
            mails: [],
            mailSubject: null,
            self: {
                name: 'Abraham Linkoln',
                mailAddress: 'appsus.gmail.com'
            }
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
             this.$router.push(`/mail/list`)
        },
        sentAtToShow(sentAt) {
            const sentDate = new Date(sentAt)
            return sentDate.toISOString().substr(0, 10)
        },
        name(mail) {
            return mail.mailAddress.split('@')[0].replace('.', ' ')
        },
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
        // mailSideBar
    }
}