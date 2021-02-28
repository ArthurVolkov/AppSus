
export default {
    template: `
    <header class="app-header">
        <div class="header main-container flex justify-between align-center">
            <div class="main logo flex justify-center align-center">
                <router-link tag="h1" to="/" class="main-logo pointer"><span>A</span><span>p</span><span>p</span><span>S</span><span>u</span><span>s</span></router-link>
            </div>
            <ul v-if="windowWidth > 630" class="nav-bar clean-list flex align-center">
                <li class="flex align-center">
                    <router-link to="/mail/list">Mail</router-link>
                </li>
                <li class="flex align-center">
                    <router-link to="/keep">Keep</router-link>
                </li>
                <li class="flex align-center">
                    <router-link to="/book">Book</router-link>
                </li>
                <li class="flex align-center">
                    <router-link to="/about">About</router-link>
                </li>
            </ul>
            <div v-else-if="isOpen === false" @click="isOpen = !isOpen" class="burger">☰</div>
            <transition v-if="isOpen" name="component-fade" mode="out-in">
                <ul class="nav-bar-burger clean-list flex flex-col align-center">
                    <li class="flex align-center">
                        <router-link @click.native="isOpen = false" to="/mail/list" >Mail</router-link>
                    </li>
                    <li class="flex align-center">
                        <router-link @click.native="isOpen = false" to="/keep">Keep</router-link>
                    </li>
                    <li class="flex align-center">
                        <router-link @click.native="isOpen = false" to="/book">Book</router-link>
                    </li>
                    <li class="flex align-center">
                        <router-link @click.native="isOpen = false" to="/about">About</router-link>
                    </li>
                    <li class="flex align-center">
                        <button @click="isOpen = false" class="close-btn">Close</button>
                    </li>
                </ul>
            </transition>
        </div>
    </header>
    `,
    data() {
        return {
            isOpen: false
        }
    },
    computed: {
        windowWidth() {
            return window.innerWidth
        }        
    },

}
