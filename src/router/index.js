import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        // component: Home
        component: () => import('../views/Home.vue')
    },
    {
        path: '/products',
        name: 'Products',
        component: () => import('../views/products/ProductList.vue')
    },
    {
        path: '/product/create',
        name: 'Product Create',
        component: () => import('../views/products/ProductCreate.vue')
    },
    {
        path: '/product/edit/:id',
        name: 'ProductEdit',
        component: () => import('../views/products/ProductEdit.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
