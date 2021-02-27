import { eventBus } from "../services/event-bus-service.js"

export default {
    template: `
        <transition name="component-fade" mode="out-in">
            <section v-if="msg" class="user-msg" :class="msg.type">
                <p>{{msg.txt}}</p>
            </section>
        </transition>

    `,
    data() {
        return {
            msg: null
        }
    },
    methods: {
        setMsg(msg) {
            console.log('msg:',msg)
            this.msg = msg
            setTimeout(() => {
                this.msg = null
            }, 3000);
        }
    },
    created() {
        eventBus.$on('show-msg', this.setMsg)
    },
    destroyed(){
        eventBus.$off('show-msg', this.setMsg)
    }
}