import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// 1.開 .vue檔案  （放在views檔案）
// 2.建立路由 （index.js)
// 3.加入路徑 router-link
// (放在Ａpp.vue(原始) Home.vue（前台首頁） 或 dashboard（後台）裡面的Products)

const routes = [
  {
    // ／ 首頁的意思
    path: '/',
    component: () => import('../views/front/Home.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/front/Index.vue'),
      },
      {
        path: '/products',
        name: '產品列表',
        component: () => import('../views/front/Products.vue'),
      },
      { // 動態路由
        path: '/product/:id',
        name: '產品頁面',
        component: () => import('../views/front/Product.vue'),
      },
      {
        path: '/cart',
        name: '購物車',
        component: () => import('../views/front/Cart.vue'),
      },
    ],
  },
  // 巢狀路由
  {
    path: '/login',
    component: () => import('../views/admin/Login.vue'),
  },
  {
    path: '/admin',
    component: () => import('../views/admin/Admin.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/admin/Index.vue'),
      },
      {
        path: 'products',
        component: () => import('../views/admin/Products.vue'),
      },
      {
        path: 'orders',
        component: () => import('../views/admin/Orders.vue'),
      },
      {
        path: 'coupons',
        component: () => import('../views/admin/Coupons.vue'),
      },
    ],
  },
  { // 如果不存在的頁面 重新導向回首頁
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({
  routes,
});

export default router;
