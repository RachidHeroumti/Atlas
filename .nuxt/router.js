import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _6345ecd7 = () => interopDefault(import('..\\pages\\cart\\index.vue' /* webpackChunkName: "pages/cart/index" */))
const _2ddfe36d = () => interopDefault(import('..\\pages\\error.vue' /* webpackChunkName: "pages/error" */))
const _ba15a364 = () => interopDefault(import('..\\pages\\thanks\\index.vue' /* webpackChunkName: "pages/thanks/index" */))
const _036cba92 = () => interopDefault(import('..\\pages\\wishlist\\index.vue' /* webpackChunkName: "pages/wishlist/index" */))
const _2bcc7592 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _0c648488 = () => interopDefault(import('..\\pages\\about\\_slug.vue' /* webpackChunkName: "pages/about/_slug" */))
const _8ac098c8 = () => interopDefault(import('..\\pages\\account\\_route.vue' /* webpackChunkName: "pages/account/_route" */))
const _e6a5dc66 = () => interopDefault(import('..\\pages\\blog\\_slug.vue' /* webpackChunkName: "pages/blog/_slug" */))
const _2976801e = () => interopDefault(import('..\\pages\\pages\\_slug.vue' /* webpackChunkName: "pages/pages/_slug" */))
const _65576482 = () => interopDefault(import('..\\pages\\posts\\_slug.vue' /* webpackChunkName: "pages/posts/_slug" */))
const _4694d44b = () => interopDefault(import('..\\pages\\products\\_slug.vue' /* webpackChunkName: "pages/products/_slug" */))
const _4206c9f9 = () => interopDefault(import('..\\pages\\shop\\_slug.vue' /* webpackChunkName: "pages/shop/_slug" */))

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
    component: _6345ecd7,
    name: "cart"
  }, {
    path: "/error",
    component: _2ddfe36d,
    name: "error"
  }, {
    path: "/thanks",
    component: _ba15a364,
    name: "thanks"
  }, {
    path: "/wishlist",
    component: _036cba92,
    name: "wishlist"
  }, {
    path: "/",
    component: _2bcc7592,
    name: "index"
  }, {
    path: "/about/:slug?",
    component: _0c648488,
    name: "about-slug"
  }, {
    path: "/account/:route?",
    component: _8ac098c8,
    name: "account-route"
  }, {
    path: "/blog/:slug?",
    component: _e6a5dc66,
    name: "blog-slug"
  }, {
    path: "/pages/:slug?",
    component: _2976801e,
    name: "pages-slug"
  }, {
    path: "/posts/:slug?",
    component: _65576482,
    name: "posts-slug"
  }, {
    path: "/products/:slug?",
    component: _4694d44b,
    name: "products-slug"
  }, {
    path: "/shop/:slug?",
    component: _4206c9f9,
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
