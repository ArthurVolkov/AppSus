import { mailService } from "../sevices/mail.service.js";

export default {
    props: ['mail'],
    template: `
    <li class="mail-preview flex justify-between pointer">
        <div class="name-container flex align-center">
            <button :class="markedStar" class="mail-star" @click.stop="setStar">{{star}}</button>
            <p class="mail-name" :class="isReadedClass">{{name}}</p>
        </div>

        <div class="flex justify-between align-center grow">
            <div class="flex justify-center align-center">
                <p :class="isReadedClass" class="mail-subject">{{subject}}</p>
                <p>{{body}}</p>
            </div>
            <p :class="isReadedClass" class="sent-at">{{sentAt}}</p>
        </div>
    </li>
    `,
    computed: {
        name() {
            return this.mail.mailAddress.split('@')[0].replace('.', ' ')
        },
        subject() {
            return this.mail.subject + ' - '
        },
        body() {
            return this.mail.body.slice(0, 49) + '...'
        },

        isReadedClass() {
            return this.mail.isReaded ? '' : 'not-readed'
        },
        sentAt() {
            const now = new Date(Date.now())
            const sentDate = new Date(this.mail.sentAt)
            if (now.getDate() === sentDate.getDate() && now - sentDate < 1000 * 60 * 60 * 24) return sentDate.toTimeString().substr(0, 5)
            else if (now.getFullYear() === sentDate.getFullYear()) return sentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
            else return sentDate.toISOString().substr(0, 10)
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

