import keepList from '../cmps/keep-list.cmp.js'
import keepAdd from '../cmps/keep-add.cmp.js'
import keepSideBar from '../cmps/keep-side-bar.cmp.js'
import userMsg from '../../cmps/user-msg.cmp.js'
import { keepService } from '../sevices/keep.service.js'


export default {
    template: `
        <section class="keep-app main-container flex align-center">
            <user-msg></user-msg>
            <keep-side-bar @filtered="setFilter"/>
            <div class="keep-list-container flex flex-col align-center">
                <keep-add  @reload="reload" @addNewKeep="addNewKeep" />
                <pre class="pined-keeps">     Pined keeps:     </pre>
                <keep-list class="keep-pin" :keeps="keepsPin"/>
                <keep-list :keeps="keepsNoPin"/>
            </div>
        </section>
    `,
    data() {
        return {
            keepsPin: null,
            keepsNoPin: null
        }
    },
    methods: {
        loadKeeps() {
            keepService.queryPinned()
            .then(keeps => {
                this.keepsPin = keeps
            })
            keepService.queryNotPinned()
            .then(keeps => {
                this.keepsNoPin = keeps
            })

        },
        addNewKeep(keep) {
            keepService.save(keep)
                .then(() => this.loadKeeps())
        },
        reload() {
            this.loadKeeps()
        },
        setFilter(filterBy) {
            this.filterBy = filterBy
        }
    },
    components: {
        keepAdd,
        keepList,
        keepSideBar,
        userMsg
    },
    created() {
        this.loadKeeps();
    },
};

