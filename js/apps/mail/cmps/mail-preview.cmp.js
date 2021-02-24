import { mailService } from "../sevices/mail.service.js";

export default {
    props:['mail'],
    template:`
    <section class="mail-preview flex justify-between">
        <p class="mail-name" :class="isReadedClass">{{name}}</p>
        <p :class="isReadedClass" class="mail-subject">{{subject}}</p>
        <p>{{body}}</p>
        <p :class="isReadedClass">{{sentAt}}</p>
        <!-- <p>Is Read: {{mail.isReaded}}</p> -->
    </section>
    `,
    computed: {
        name() {
            return this.mail.mailAddress.split('@')[0]
        },
        subject() {
            return this.mail.subject + '-'
        },
        body() {
            return this.mail.body.slice(0,69) + '...'
        },

        isReadedClass() {
            return this.mail.isReaded ? '' : 'not-readed'
        },
        sentAt() {
            const sentDate = new Date(this.mail.sentAt)
            return sentDate.toISOString().substr(0, 10)
        }
    }
}

