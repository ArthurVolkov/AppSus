export default {
    props:['mail'],
    template:`
    <section class="mail-preview">
        <p>ID: {{mail.id}}</p>
        <p>Subject: {{mail.subject}}</p>
        <p>Body: {{mail.body}}</p>
        <p>Is Read: {{book.isRead}}</p>
    </section>
    `,
    computed: {
    }
}

