import { mailService } from '../sevices/mail.service.js'
// import { eventBus } from '../../services/event-bus-service'

export default {
    template: `
        <section v-if="mailToEdit" class="mail-edit app-main">
                <h3>EDIT MAIL</h3>
                
        </section>
    `,
    data() {
        return {
            mailToEdit: null
        }
    },

    methods: {
        // save() {
        //     carService.save(this.carToEdit)
        //         .then(car => {
        //             console.log('Saved Car:', car);
        //             const msg = {
        //                 txt: 'Car saved succesfully',
        //                 type: 'success'
        //             }
        //             eventBus.$emit('show-msg', msg)
        //             this.$router.push('/car')
        //         })
        //         .catch(err => {
        //             console.log(err);
        //             const msg = {
        //                 txt: 'Error, please try again later',
        //                 type: 'error'
        //             }
        //             eventBus.$emit('show-msg', msg)
        //         })
        // }
    },
    computed: {
        // title() {
        //     return this.carId ? 'Car Edit' : 'Car Add'
        // },
        // carId() {
        //     return this.$route.params.carId
        // }
    },
    created() {
        // if (this.carId) {
        //     carService.getById(this.carId).then(car => this.carToEdit = car)
        // } else {
        //     this.carToEdit = carService.getEmptyCar()
        // }
    },
    watch: {
        // carToEdit: {
        //     handler(val) { 
        //         console.log('Car Modified', val)
        //         // TODO: Call the Validation Service
        //     },
        //     deep:true
        // }
    }
}
