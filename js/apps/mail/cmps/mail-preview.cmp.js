export default {
    props:['mail'],
    template:`
    <section class="mail-preview">
        <p>ID: {{mail.id}}</p>
        <p>Subject: {{mail.subject}}</p>
        <p>Body: {{mail.body}}</p>
        <p>Is Read: {{mail.isRead}}</p>
    </section>
    `,
    computed: {
    }
}

