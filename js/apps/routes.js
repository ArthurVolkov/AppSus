import homePage from './pages/home-page.cmp.js'
import about from './pages/about.cmp.js'
import mailApp from './mail/pages/mail-app.cmp.js'
import keepApp from './keep/pages/keep-app.cmp.js'
import mailList from './mail/pages/mail-list.cmp.js'
import mailDetails from './mail/pages/mail-details.cmp.js'
import mailEdit from './mail/pages/mail-edit.cmp.js'
import keepAdd from './keep/cmps/keep-add.cmp.js'


const routes = [
    {
        path: '/',
        component: homePage,
    },
    {
        path: '/about',
        component: about
    },
    // {
    //     path: '/mail',
    //     component: mailApp,
    // },


    {
        path: '/mail',
        component: mailApp,
        children: [
            {
                path: '/mail/list',
                component: mailList,
            },
            {
                path: '/mail/:mailId',
                component: mailDetails,
            },
        ]
    },





    // {
    //     path: '/mail/:mailId',
    //     component: mailDetails,
    // },
    {
        path: '/mail/edit/:mailId?',
        component: mailEdit,
    },
    {
        path: '/keep',
        component: keepApp
    },
    {
        path: '/keep/edit/:keepId?',
        component: keepAdd,
    },
]

export const myRouter = new VueRouter({ routes })