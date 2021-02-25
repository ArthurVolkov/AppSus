export default {
    template: `
    <section class="keep-add">
        <label> add a keep: </label>    
        <textarea id="w3review" name="w3review" rows="4" cols="50" v-model="keep.txt"></textarea>
        <button @click="print">Add</button>        
    </section>
    `,
    data() {
        return {
            keep: {
                txt: '',
            }
        }
    },
    methods:{
        print(){   
            var lines = this.keep.txt.split(/\r|\r\n|\n/);
            var count = lines.length;
            console.log(count);
            console.log(this.keep.txt);
        }
    }
}
