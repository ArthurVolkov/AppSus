export default {
    template: `
        <ul class="item-btns-container clean-list flex justify-between align-center">
            <li>
                <button @click.stop="setPin">📌</button>
            </li>
            <li>
                <label for="upload" @click.stop="" class="upload-label pointer">📁</label>
                <input type="file" id="upload" accept="image/*" @change="openImg" class="upload-img">
            </li>
            <li>
                <label for="color" @click.stop="" class="upload-label pointer">🎨</label>
                <input type="color" id="color" @click.stop="" @change="setColor" class="set-color">
            </li>
            <li>
                <button @click.stop="remove">🗑</button>
            </li>
        </ul>
    `,
    data() {
        return {

        }
    },
    computed: {

    },
    methods: {
        setPin() {
            console.log('setPin');
        },
        openImg(ev) {
            console.log('openImg');
        },
        setColor() {
            console.log('setColor');
        },
        remove() {
            console.log('remove');
        }
    }
}