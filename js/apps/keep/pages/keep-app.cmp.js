import keepList from '../cmps/keep-list.cmp.js'
import keepAdd from '../cmps/keep-add.cmp.js'
import { keepService } from '../sevices/keep.service.js'


export default {
    template: `
        <section class="keep-app main-container flex flex-col align-center">
            <keep-add  @reload="reload" @addNewKeep="addNewKeep" />
            <keep-list class="keep-pin" :keeps="keepsPin"/>
            <keep-list :keeps="keepsNoPin"/>
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
        }
    },
    components: {
        keepAdd,
        keepList
    },
    created() {
        this.loadKeeps();
    },
};

