import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'

import Articles from './views/nav1/articles.vue'
import Authors from './views/nav1/authors.vue'
import NewArticle from './views/nav1/newArticle.vue'

import Users from './views/nav2/users.vue'
import Myself from './views/nav2/myself.vue'

import Advs from './views/nav3/Advs.vue'
import AdvCharts from './views/nav3/AdvCharts.vue'

import AdvOwners from './views/nav4/advOwners.vue'
import PVCharts from './views/nav4/pvCharts.vue'
import ClickCharts from './views/nav4/clickCharts.vue'


let routes = [{
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '文章管理',
        iconCls: 'el-icon-message', //图标样式class
        children: [
            { path: '/newArticle', component: NewArticle, name: '新增文章' },
            { path: '/articles', component: Articles, name: '文章列表' },
            { path: '/authors', component: Authors, name: '作者管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '用户管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/users', component: Users, name: '用户列表' },
            { path: '/myself', component: Myself, name: '当前用户' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '广告管理',
        iconCls: 'fa fa-address-card',
        children: [
            { path: '/advs', component: Advs, name: '广告列表' },
            { path: '/advCharts', component: AdvCharts, name: '广告统计' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '广告商管理',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/advOwners', component: AdvOwners, name: '广告商列表' },
            { path: '/pvCharts', component: PVCharts, name: '展现量统计' },
            { path: '/clickCharts', component: ClickCharts, name: '点击量统计' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;