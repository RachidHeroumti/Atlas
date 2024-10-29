import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _152988d7 = () => interopDefault(import('..\\pages\\cart\\index.vue' /* webpackChunkName: "pages/cart/index" */))
const _ecaf0126 = () => interopDefault(import('..\\pages\\error.vue' /* webpackChunkName: "pages/error" */))
const _6a61ca4e = () => interopDefault(import('..\\pages\\thanks\\index.vue' /* webpackChunkName: "pages/thanks/index" */))
const _bbbb52dc = () => interopDefault(import('..\\pages\\wishlist\\index.vue' /* webpackChunkName: "pages/wishlist/index" */))
const _45e26137 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _d2172ef0 = () => interopDefault(import('..\\pages\\about\\_slug.vue' /* webpackChunkName: "pages/about/_slug" */))
const _59554f9c = () => interopDefault(import('..\\pages\\account\\_route.vue' /* webpackChunkName: "pages/account/_route" */))
const _3e90adcd = () => interopDefault(import('..\\pages\\blog\\_slug.vue' /* webpackChunkName: "pages/blog/_slug" */))
const _04ca8555 = () => interopDefault(import('..\\pages\\contact\\_slug.vue' /* webpackChunkName: "pages/contact/_slug" */))
const _75d4a3f1 = () => interopDefault(import('..\\pages\\pages\\_slug.vue' /* webpackChunkName: "pages/pages/_slug" */))
const _20316efc = () => interopDefault(import('..\\pages\\posts\\_slug.vue' /* webpackChunkName: "pages/posts/_slug" */))
const _356b1f6a = () => interopDefault(import('..\\pages\\products\\_slug.vue' /* webpackChunkName: "pages/products/_slug" */))
const _182b340e = () => interopDefault(import('..\\pages\\shop\\_slug.vue' /* webpackChunkName: "pages/shop/_slug" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/cart",
    component: _152988d7,
    name: "cart"
  }, {
    path: "/error",
    component: _ecaf0126,
    name: "error"
  }, {
    path: "/thanks",
    component: _6a61ca4e,
    name: "thanks"
  }, {
    path: "/wishlist",
    component: _bbbb52dc,
    name: "wishlist"
  }, {
    path: "/",
    component: _45e26137,
    name: "index"
  }, {
    path: "/about/:slug?",
    component: _d2172ef0,
    name: "about-slug"
  }, {
    path: "/account/:route?",
    component: _59554f9c,
    name: "account-route"
  }, {
    path: "/blog/:slug?",
    component: _3e90adcd,
    name: "blog-slug"
  }, {
    path: "/contact/:slug?",
    component: _04ca8555,
    name: "contact-slug"
  }, {
    path: "/pages/:slug?",
    component: _75d4a3f1,
    name: "pages-slug"
  }, {
    path: "/posts/:slug?",
    component: _20316efc,
    name: "posts-slug"
  }, {
    path: "/products/:slug?",
    component: _356b1f6a,
    name: "products-slug"
  }, {
    path: "/shop/:slug?",
    component: _182b340e,
    name: "shop-slug"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
