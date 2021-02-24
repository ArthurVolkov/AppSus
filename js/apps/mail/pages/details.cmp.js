import { mailService } from '../sevices/mail.service.js'
// import { eventBus } from '../services/event-bus.service.js'


export default {
    template: `
    <section v-if="mail" class="mail-details flex justify-between align-center">
        <div class="mail-details-cintainer main-container flex justify-between align-center">
            <div class="info-container flex flex-col justify-between align-center">
                <div class="router-link-container flex justify-between">
                    <!-- <router-link :to="prevMailLink">Prev book</router-link>
                    <router-link :to="nextMailLink">Next book</router-link> -->
                </div>
                <div>MAIL</div>
   
                <button @click="closeDetails" class="close-btn">X</button>
            </div>
        </div>
    </section>
    `,
    data() {
        return {
            mail: null,
            isMore: false,

        }
    },
    methods: {
        loadMail() {
            const id = this.$route.params.mailId
            mailService.getById(id)
                .then(mail => {
                    this.mail = mail
                    // console.log('mail:', mail)
        
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