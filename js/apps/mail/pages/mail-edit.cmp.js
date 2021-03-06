import { mailService } from '../sevices/mail.service.js'
import { eventBus } from '../../services/event-bus-service.js'

export default {
    props: ['isNew'],
    template: `
        <section :class="isFullClass" class="mail-edit flex flex-col">
            <div class="edit-header flex justify-between align-center">
                <p>New Message</p>
                <div class="edit-btns-container">
                    <button @click="toggleFull" class="toggle-full-btn">↔</button>
                    <button @click="closeEdit">x</button>
                </div>
            </div>
            <form @submit="" class="edit-input-container flex flex-col">
                <div class="flex">
                    <p class="flex">To:</p>
                    <input v-model="mailAddress" type="email" class="to-input" required>
                </div>
                <div class="flex">
                    <p class="flex">Subject:</p>
                    <input v-model="subject" type="text" class="subject-input" required>
                </div>
                <textarea v-model="body" class="mailbody-input" required></textarea>
                <div class="form-btns-container flex justify-between">
                    <button @click.prevent="send" class="send-btn">Send</button>
                    <button  @click="closeEdit" class="remove-edit">🗑</button>
                </div>
            </form>
                
        </section>
    `,
    data() {
        return {
            mail: null,
            isFull: false,
            mailAddress: '',
            subject: '',
            body: '',
            mailId: null
        }
    },

    methods: {
        closeEdit() {
            this.$emit('afterSend')
        },
        toggleFull() {
            this.isFull = !this.isFull
        },
        send() {
            mailService.getEmptyMail()
                .then(mail => {
                    mail.mailAddress = this.mailAddress,
                        mail.subject = this.subject,
                        mail.body = this.body
                    mail.sentAt = Date.now()
                    mailService.save(mail)
                        .then(() => {
                            this.$emit('afterSend')
                            eventBus.$emit('afterSend')
                            const msg = {
                                txt: 'mail sent',
                                type: 'success'
                            }
                            eventBus.$emit('show-msg', msg)
                
                            this.mailAddress = ''
                            this.subject = ''
                            this.body = ''
                        })
                })
        }
    },
    computed: {
        isFullClass() {
            return this.isFull ? 'edit-full' : ''
        },
    },
    created() {
        const id = this.$route.params.mailId
        if (!this.isNew) {
            mailService.getById(id)
                .then(mail => {
                    this.mail = mail
                    this.mailAddress = mail.mailAddress
                    this.subject = mail.subject
                })
        }
    },
}
