import homePage from './pages/home-page.cmp.js'
import about from './pages/about.cmp.js'
import mailApp from './mail/pages/mail-app.cmp.js'
import keepApp from './keep/pages/keep-app.cmp.js'


const routes = [
    {
        path: '/',
        component: homePage,
    },
    {
        path: '/about',
        component: about
    },
    {
        path: '/mail',
        component: mailApp
    },
    {
        path: '/keep',
        component: keepApp
    },
]

export const myRouter = new VueRouter({ routes })