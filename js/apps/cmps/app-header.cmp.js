
export default {
//     template: `
//    <header class="app-header">
//        <div class="logo">
//            <h1>AppSus</h1>
//        </div>
//        <nav>
//            <!-- <router-link active-class="active-link" to="/" exact>Home</router-link> |
//            <router-link to="/book">Books</router-link> |
//            <router-link to="/about">About</router-link> -->
//        </nav>
//     </header>
//     `,



    template: `
    <header class="app-header">
        <div class="header main-container flex justify-between align-center">
            <div class="main logo">
                <router-link tag="h1" to="/" class="main-logo pointer"><span>A</span><span>p</span><span>p</span><span>S</span><span>u</span><span>s</span></router-link>
            </div>
            <ul class="nav-bar clean-list flex">
                <li>
                    <router-link to="/mail/list">Mail</router-link>
                </li>
                <li>
                    <router-link to="/keep">Keep</router-link>
                </li>
                <li>
                    <router-link to="/about">About</router-link>
                </li>
            </ul>
        </div>
    </header>
    `,


}
