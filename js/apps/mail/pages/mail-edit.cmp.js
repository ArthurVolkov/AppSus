import { mailService } from '../sevices/mail.service.js'
import { eventBus } from '../../services/event-bus-service.js'

export default {
    props: ['mailToEdit'],
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
                <input v-model="mailAddress" type="email" class="to-input" placeholder="To" required>
                <input v-model="subject" type="text" class="subject-input" placeholder="Subject" required>
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
                            this.mailAddress = ''
                            this.subject = ''
                            this.body = ''
                        })
                })

        }
        // save() {
        //     carService.save(this.carToEdit)
        //         .then(car => {
        //             console.log('Saved Car:', car);
        //             const msg = {
        //                 txt: 'Car saved succesfully',
        //                 type: 'success'
        //             }
        //             eventBus.$emit('show-msg', msg)
        //             this.$router.push('/car')
        //         })
        //         .catch(err => {
        //             console.log(err);
        //             const msg = {
        //                 txt: 'Error, please try again later',
        //                 type: 'error'
        //             }
        //             eventBus.$emit('show-msg', msg)
        //         })
        // }
    },
    computed: {
        isFullClass() {
            return this.isFull ? 'edit-full' : ''
        },
        // title() {
        //     return this.carId ? 'Car Edit' : 'Car Add'
        // },
        // mailId() {
        //     return this.$route.params.mailId
        // }
    },
    created() {
        // this.male = this.mailToEdit
        // console.log('this.mailToEdit:', this.mailToEdit)
        const id = this.$route.params.mailId
        if (id) {
            mailService.getById(id)
                .then(mail => {
                    this.mail = mail
                    console.log('this.mail:', this.mail)
                    this.mailAddress = mail.mailAddress
                    this.subject = mail.subject
                })
        }



        // if (this.carId) {
        //     carService.getById(this.carId).then(car => this.carToEdit = car)
        // } else {
        //     this.carToEdit = carService.getEmptyCar()
        // }
    },
    watch: {
        // carToEdit: {
        //     handler(val) { 
        //         console.log('Car Modified', val)
        //         // TODO: Call the Validation Service
        //     },
        //     deep:true
        // }
    }
}
