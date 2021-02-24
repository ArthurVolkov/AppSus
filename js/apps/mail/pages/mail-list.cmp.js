import mailPreview from '../cmps/mail-preview.cmp.js'

export default {
    props: ['mails'],
    template: `
    <ul class="mail-list">
        <mail-preview v-for="mail in mails" :mail="mail" :key="mail.id"  @click.native.stop="select(mail)" class="mail-preview-container" />
    </ul>
    `,
    methods: {
        select(mail) {
            this.$router.push(`/mail/${mail.id}`)
        }
    },
    components:{
        mailPreview
    }
}
