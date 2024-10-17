import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5392a539 = () => interopDefault(import('..\\pages\\cart\\index.vue' /* webpackChunkName: "pages/cart/index" */))
const _baa1e562 = () => interopDefault(import('..\\pages\\error.vue' /* webpackChunkName: "pages/error" */))
const _9a1553a0 = () => interopDefault(import('..\\pages\\thanks\\index.vue' /* webpackChunkName: "pages/thanks/index" */))
const _140271f4 = () => interopDefault(import('..\\pages\\wishlist\\index.vue' /* webpackChunkName: "pages/wishlist/index" */))
const _5ee8ef19 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _25aed866 = () => interopDefault(import('..\\pages\\about\\_slug.vue' /* webpackChunkName: "pages/about/_slug" */))
const _69952a04 = () => interopDefault(import('..\\pages\\account\\_route.vue' /* webpackChunkName: "pages/account/_route" */))
const _7cf9ca2f = () => interopDefault(import('..\\pages\\blog\\_slug.vue' /* webpackChunkName: "pages/blog/_slug" */))
const _08f82ec4 = () => interopDefault(import('..\\pages\\collections\\_slug.vue' /* webpackChunkName: "pages/collections/_slug" */))
const _048f13cf = () => interopDefault(import('..\\pages\\pages\\_slug.vue' /* webpackChunkName: "pages/pages/_slug" */))
const _7ea1b860 = () => interopDefault(import('..\\pages\\posts\\_slug.vue' /* webpackChunkName: "pages/posts/_slug" */))
const _572a8bad = () => interopDefault(import('..\\pages\\products\\_slug.vue' /* webpackChunkName: "pages/products/_slug" */))
const _3253825b = () => interopDefault(import('..\\pages\\shop\\_slug.vue' /* webpackChunkName: "pages/shop/_slug" */))

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
    component: _5392a539,
    name: "cart"
  }, {
    path: "/error",
    component: _baa1e562,
    name: "error"
  }, {
    path: "/thanks",
    component: _9a1553a0,
    name: "thanks"
  }, {
    path: "/wishlist",
    component: _140271f4,
    name: "wishlist"
  }, {
    path: "/",
    component: _5ee8ef19,
    name: "index"
  }, {
    path: "/about/:slug?",
    component: _25aed866,
    name: "about-slug"
  }, {
    path: "/account/:route?",
    component: _69952a04,
    name: "account-route"
  }, {
    path: "/blog/:slug?",
    component: _7cf9ca2f,
    name: "blog-slug"
  }, {
    path: "/collections/:slug?",
    component: _08f82ec4,
    name: "collections-slug"
  }, {
    path: "/pages/:slug?",
    component: _048f13cf,
    name: "pages-slug"
  }, {
    path: "/posts/:slug?",
    component: _7ea1b860,
    name: "posts-slug"
  }, {
    path: "/products/:slug?",
    component: _572a8bad,
    name: "products-slug"
  }, {
    path: "/shop/:slug?",
    component: _3253825b,
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
