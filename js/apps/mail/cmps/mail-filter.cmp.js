export default {
    template: `
    <section class="mail-filter flex">
        <input type="text" @input="setFilter" v-model="filterBy.bySubject" placeholder="Search in mails" />
    </section>
    `,
    data() {
        return {
            filterBy: {
                bySubject: '',
            }
        }
    },
    methods:{
        setFilter(){
            this.$emit('filtered',JSON.parse(JSON.stringify(this.filterBy)));
        }
    }
}
