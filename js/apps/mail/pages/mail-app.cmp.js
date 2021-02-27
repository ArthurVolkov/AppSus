import mailSideBar from '../cmps/mail-side-bar.cmp.js'
import mailEdit from './mail-edit.cmp.js'
import userMsg from '../../cmps/user-msg.cmp.js'

export default {
    template: `
        <section class="mail-app main-container flex">
            <user-msg></user-msg>
            <mail-side-bar @filtered="setFilter" @compose="openEdit"/>
            <router-view></router-view>
           <mail-edit :isNew="true" v-if="isEdit" @closeEdit="closeEdit" @afterSend="afterSend" />
        </section>
    `,
    data() {
        return {
            mails: [],
            isEdit: false,
        }
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy
        },
        openEdit() {
            this.isEdit = true
        },
        closeEdit() {
            this.isEdit = false
        },
        afterSend() {
            this.closeEdit()
        }
    },
    components: {
        mailSideBar,
        mailEdit,
        userMsg
    }
}
