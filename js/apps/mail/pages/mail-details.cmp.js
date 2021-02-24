import { mailService } from '../sevices/mail.service.js'
// import { eventBus } from '../services/event-bus.service.js'

export default {
    template: `
    <section class="mail-details-container">
        <h3>{{this.mail.subject}}</h3>
        <ul class="review-list">
            <li v-for="(review,idx) in reviews" class="review-preview-container" >
                <book-review-preview :review="review"/>
                <button @click="removeReview(idx)">X</button>
            </li>
        </ul>
    </section>        
                <button @click="closeDetails" class="close-btn">X</button>
    `,
    data() {
        return {
            mails: [],
            isMore: false,
        }
    },
    methods: {
        loadMails() {
            const id = this.$route.params.mailId
            mailService.getChainById(id)
                .then(mail => {
                    this.mail = mail
                })
        },
        closeDetails() {
            this.$router.push(`/mail`)
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
        this.loadMail()
    },
    components: {

    }
}