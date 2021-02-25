import { mailService } from "../sevices/mail.service.js";

export default {
    props:['mail'],
    template:`
    <li class="mail-preview flex justify-between">
        <div class="name-container flex align-center">
            <button :class="markedStar" class="mail-star" @click.stop="setStar">{{star}}</button>
            <p class="mail-name" :class="isReadedClass">{{name}}</p>
        </div>

        <div class="flex justify-between grow">
            <div class="flex justify-center align-center">
                <p :class="isReadedClass" class="mail-subject">{{subject}}</p>
                <p>{{body}}</p>
            </div>
            <p :class="isReadedClass">{{sentAt}}</p>
        </div>
        <!-- <p>Is Read: {{mail.isReaded}}</p> -->
    </li>
    `,
    computed: {
        name() {
            return this.mail.mailAddress.split('@')[0]
        },
        subject() {
            return this.mail.subject + '-'
        },
        body() {
            return this.mail.body.slice(0,39) + '...'
        },

        isReadedClass() {
            return this.mail.isReaded ? '' : 'not-readed'
        },
        sentAt() {
            const sentDate = new Date(this.mail.sentAt)
            return sentDate.toISOString().substr(0, 10)
        },
        star() {
            return this.mail.isImporant ? '★' : '☆'
        },
        markedStar() {
            return this.mail.isImporant ? 'marked-star' : ''
        }
    },
    methods: {
        setStar() {
            this.mail.isImporant = !this.mail.isImporant
        }
    }
}

