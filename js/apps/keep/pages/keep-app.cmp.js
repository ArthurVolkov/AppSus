import keepList from '../cmps/keep-list.cmp.js'
import keepAdd from '../cmps/keep-add.cmp.js'
import { keepService } from '../sevices/keep.service.js'


export default {
    template: `
        <section class="keep-app">
            <keep-add @addNewKeep="addNewKeep"/>
            <keep-list :keeps="keeps"/>
        </section>
    `,
    data() {
        return {
            keeps: []
        }
    },
    created() {
        this.loadKeeps();
    },
    methods: {
        loadKeeps() {
            keepService.query()
                .then(keeps => {
                    this.keeps = keeps
                })
        },
        addNewKeep(keep){
            console.log('keep to show:',keep);
            keepService.save(keep);
        }
    },
    components: {
        keepAdd,
        keepList
    }
};

