import mailPreview from './mail-preview.cmp.js'

export default {
    props: ['mails'],
    template: `
    <ul class="mail-list">
        <li v-for="mail in mails" :key="mail.id" class="mail-preview-container" >
            <mail-preview :mail="mail"/>
        </li>
    </ul>
    `,
    methods: {
    },
    components:{
        mailPreview
    }
}
