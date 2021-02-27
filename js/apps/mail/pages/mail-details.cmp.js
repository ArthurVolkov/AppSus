import { mailService } from '../sevices/mail.service.js'
import { eventBus } from '../../services/event-bus-service.js'
import mailEdit from './mail-edit.cmp.js'
// import mailSideBar from '../cmps/mail-side-bar.cmp.js'


export default {
    template: `
    <section class="mail-details-container flex">
        <!-- <mail-side-bar></mail-side-bar> -->
        <div v-if="isEdit">
            <mail-edit :isNew="false" @afterSend='afterSend'></mail-edit>
        </div>
        <div class="grow">
            <ul class="review-list clean-list">
                <li v-for="(mail,idx) in mails" class="mail-preview-container" >
                    <div class="details-subject flex align-center">
                        <p>{{mailSubject}}</p>
                        <pre v-if="mail.isIncoming">⇩ Incoming</pre>
                        <pre v-else>⇧ Sent</pre>
                    </div>
                    <div class="from-to flex align-center justify-between">
                        <div class="flex align-center">
                            <div>
                                <pre v-if="mail.isIncoming">{{name(mail)}} </pre>
                                <pre v-else>{{self.name}} </pre>
                            </div>
                            <div>
                                <p class="flex align-center" v-if="mail.isIncoming"><{{mail.mailAddress}}></p>
                                <p class="flex align-center" v-else><{{self.mailAddress}}></p>
                            </div>
                        </div>
                        <div class='details-btns-container flex align-center'>
                            <p class='flex align-center'>{{sentAtToShow(mail.sentAt)}}</p>
                            
                            <button title="Reply" @click="replay" class="close-btn">↶</button>
                            <button title="Delete" @click="closeDetails(mail,idx)" class="close-btn">X</button>
                        </div>
                    </div>
                    <pre class="details-body">{{mail.body}}</pre>
                </li>
            </ul>
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
            },
            isEdit: false,
        }
    },
    methods: {
        loadMails() {
            const id = this.$route.params.mailId
            console.log('ID:',id)
            mailService.getChainById(id)
                .then(mails => {
                    this.mails = mails.sort((mail1, mail2)=> {return mail2.sentAt - mail1.sentAt})
                    this.mailSubject = this.mails[0].subject;
                })
        },
        closeDetails(mail,idx) {            
            mailService.remove(mail.id)
            .then (()=>{
                this.mails.splice(idx,1);
            });
            const msg = {
                txt: 'mail removed',
                type: 'success'
            }
            eventBus.$emit('show-msg', msg)

//             this.$router.push(`/mail/list`)
        },
        sentAtToShow(sentAt) {
            const sentDate = new Date(sentAt)
            return sentDate.toLocaleDateString('en-UK', { month: 'short', day: 'numeric', year: 'numeric', hour12: false,  hour: '2-digit', minute: '2-digit'})
        },
        name(mail) {
            return mail.mailAddress.split('@')[0].replace('.', ' ')
        },
        replay() {
            eventBus.$emit('reply', this.mails)
            console.log('reply');
            this.isEdit = true
        },
        afterSend() {
            this.isEdit = false
            this.loadMails()
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
        mailEdit
        // mailSideBar
    }
}