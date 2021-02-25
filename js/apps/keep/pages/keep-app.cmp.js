import keepList from '../cmps/keep-list.cmp.js'
import keepAdd from '../cmps/keep-add.cmp.js'
import { keepService } from '../sevices/keep.service.js'


export default {
    template: `
        <section class="keep-app main-container flex flex-col align-center">
            <keep-add @addNewKeep="addNewKeep"/>
            <keep-list :keeps="keeps"/>
        </section>
    `,
    data() {
        return {
            keeps: null
        }
    },
    methods: {
        loadKeeps() {
            keepService.query()
                .then(keeps => {
                    this.keeps = keeps
                    // console.log('keep to show:', this.keeps);
                })
        },
        addNewKeep(keep) {
            console.log('keep to show:', keep);
            keepService.save(keep)
                .then(() => this.loadKeeps())
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

