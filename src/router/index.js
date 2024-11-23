import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

import PostList from '@/components/PostList.vue';
import LoginPage from '@/components/LoginPage.vue';

const routes = [
    {
        path: '/postlist',
        name: 'PostList',
        component: PostList,
    },
    {
        path: "/login",
        name: "LoginPage",
        component: LoginPage,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 设置页面标题和路径守卫
router.beforeEach((to, from, next) => {
    document.title = to.meta.title || '默认标题';

    if (to.matched.some(record => record.meta.requiresAuth)) {
        // 需要认证的路由
        if (!store.state.isLoggedIn) {
            // 如果用户未登录，重定向到登录页面
            next({ path: '/login' });
        } else {
            // 用户已登录，继续导航
            next();
        }
    } else {
        // 不需要认证的路由，继续导航
        next();
    }
});

export default router