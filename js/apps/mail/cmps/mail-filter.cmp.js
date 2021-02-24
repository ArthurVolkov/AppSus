export default {
    template: `
    <section class="mail-filter">
        <label> Search mail: </label>    
        <input type="text" v-model="filterBy.bySubject">
        <button @click="setFilter">Search</button>        
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
