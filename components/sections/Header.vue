<template>
<div class=" bg-white w-full fixed top-0 left-0 right-0 h-20 z-20"> <!--fixed top-0 left-0  z-50  -->
    <si-app-loader placement="BEFORE_HEADER"/>
    <div class="relative mb-2 ">
        <div class=" flex items-center justify-between p-2 ">
            <!-- to controll menus -->
            <button @click="$store.state.showHeaderMenu = !$store.state.showHeaderMenu" aria-label="Search button"
             class="flex sm:hidden flex-col p-2 bg-gray-100 rounded-md hover:bg-gray-200 ">
                    <si-svg><svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="bars" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-5 h-5 translate"><g class="fa-group"><path fill="currentColor" d="M16 288h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16z" class="fa-secondary">
                          </path><path fill="currentColor" d="M432 384H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H16A16 16 0 0 0 0 80v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16z">
                            </path></g></svg></si-svg>
             </button>

              <div v-if="$store.state.showHeaderMenu" class="px-10  sm:hidden fixed top-16 left-0 right-0 flex z-20 justify-between bg-white w-screen">
                 <div class=""> 
                <ul v-for="(item, i) in menu.items" :key="i" class="flex flex-col">
                    <li class="flex items-center mb-1 justify-between w-full rounded-md bg-white hover:underline hover:underline-offset-4">
                        <router-link class="m-1 w-full flex font-poppins text-base text-titles-color font-medium" :to="item.url">{{ item.text }}</router-link>
                        <button class="bg-white p-2 mx-1" @click="activeId = activeId != item._id ? item._id : null">
                            <si-svg>
                                <svg v-if="item.childrens && item.childrens.length > 0" class="w-3 transform" :class="activeId==item._id ? 'rotate-180': ''" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 330 330" style="enable-background:new 0 0 330 330;" xml:space="preserve">
                                    <path d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393  c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393  s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"/>
                                </svg>
                            </si-svg>
                        </button>
                    </li>

                    <transition name="slide">
                    <div v-if="item._id == activeId">
                        <div v-for="(item,i) in item.childrens" :key="i" class="bg-gray-100">
                            <router-link class="m-1 rounded-md bg-gray-50 hover:bg-white hover:text-gray-300 flex" :to="item.url">{{item.text}}</router-link>
                            <ul class=" " v-if="item.childrens && item.childrens.length > 0">
                                <li v-for="(child,ii) in item.childrens" :key="ii">
                                    <nuxt-link  class=" m-1 rounded-md bg-gray-50 hover:bg-white hover:text-gray-300 flex" :to="child.url">
                                        {{ child.text }}
                                    </nuxt-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    </transition>
                </ul>
                 
                 </div>
                 <span @click="$store.state.showHeaderMenu = !$store.state.showHeaderMenu"
                  class=" text-gray-900 text-base p-2 cursor-pointer ">X</span>
               </div>

            <div class="flex items-center px-4  logo ">
                <router-link to="/">

   <nuxt-img width="70" height="50" property="height" class="object-contain w-full h-12"
         :src="section.logo ? section.logo.src : $store.state.defaults.logo" alt="Store logo"/>
                    
                </router-link>
            </div>

      <div class=" flex justify-end w-full text-dark-gray  ">
         <div class="flex items-center justify-end   icons px-3">
             <!--Nav Bar-Menu start ------------------------------------------------>
             <div v-if="menu" class="hidden justify-between px-10 md:flex ">
             <ul v-for="(item, i) in menu.items" :key="i" class="flex flex-col p-2">
     
      <li 
        class="relative flex  justify-between w-full rounded-md bg-white hover:underline hover:underline-offset-4"
        @mouseenter="hoveredItem = i" 
        @mouseleave="hoveredItem = null"
      >
        <!-- Parent Item Text -->
        <div class="p-2 m-1 w-full flex text-xl text-gray-700 font-medium">
          {{ item.text }}
        </div>

        <ul 
          v-if="item.childrens && item.childrens.length > 0"
          class="absolute top-full left-0 text-gray-700 flex flex-col font-base text-13p font-poppins  shadow-lg   z-10 min-w-[200px] bg-white "
          v-show="hoveredItem === i"
          @mouseenter="hoveredItem = i"  
          @mouseleave="hoveredItem = i"
        >
         <li v-for="(child, ii) in item.childrens" :key="ii" class="px-4 py-2 hover:bg-gray-50">
          <nuxt-link class="flex whitespace-nowrap" :to="child.url">
         {{ child.text }}
           </nuxt-link>
</li>

        </ul>
      </li>
               </ul>
               </div>
            <!-------------------------------------------------------------------------- navbar end-->
            <!--
            <div class=" flex space-x-5 px-3 font-medium">
             <router-link v-if="$settings.sections.header.icons.cart" to="/" title="home" id="home" 
                 class="relative p-2 mx-1 ">
                 <span class=" font-poppins  hover:underline ">Home</span>
              </router-link>
             <router-link v-if="$settings.sections.header.icons.cart" to="/pages" title="Pages" id="Pages" 
                 class="relative p-2 mx-1 ">
                 <span class="  font-poppins hover:underline  ">Pages</span>
               </router-link>
             <router-link v-if="$settings.sections.header.icons.cart" to="/shop" title="shop" id="shop" 
                 class="relative p-2 mx-1 ">
                 <span class="  font-poppins   hover:underline ">Shop</span>
               </router-link>
              <router-link v-if="$settings.sections.header.icons.cart" to="/portfolio" title="portfolio" id="portfolio" 
                 class="relative p-2 mx-1 ">
                 <span class=" font-poppins   hover:underline ">Portfolio</span>
               </router-link>
             <router-link v-if="$settings.sections.header.icons.cart" to="/Blog" title="Blog" id="Blog" 
                 class="relative p-2 mx-1 ">
                 <span class="  font-poppins   hover:underline ">Blog</span>
               </router-link>
             </div>
             -->


                <button v-if="$settings.sections.header.icons.search" @click="showSearch=true" aria-label="Search button" class="relative p-2 mx-1  rounded-md item ">
                    <si-svg><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-5 h-5 translate"><path fill="currentColor" d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z" class=""></path></svg></si-svg>
                    <small v-if="$route.query.search" class="absolute flex items-center justify-center w-1 h-1 p-1 text-white bg-green-700 rounded-full -top-1 -right-1"></small>
                </button>
                <router-link v-if="$settings.sections.header.icons.account" to="/account/orders" title="Account" class="hidden p-2 mx-1  rounded-md item md:block ">
                    <si-svg><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-5 h-5 translate"><path fill="currentColor" d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z" class=""></path></svg></si-svg>
                    
                </router-link>
                <router-link v-if="$settings.sections.header.icons.wishlist" to="/wishlist" title="Wishlist" class="relative hidden p-2 mx-1  rounded-md item md:block ">
                    <si-svg><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-5 h-5 translate"><path fill="currentColor" d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z" class=""></path></svg></si-svg>
                    <small class="absolute flex items-center justify-center w-5 h-5 p-2 text-white bg-red-700 rounded-full -top-2 -right-2">{{ $store.state.wishlist.length }}</small>
                </router-link>
                <router-link v-if="$settings.sections.header.icons.cart" to="/cart" title="Cart" id="cart-icon" class="relative p-2 mx-1 rounded-md item ">
                    <si-svg><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="shopping-cart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="w-5 h-5 translate"><path fill="currentColor" d="M551.991 64H144.28l-8.726-44.608C133.35 8.128 123.478 0 112 0H12C5.373 0 0 5.373 0 12v24c0 6.627 5.373 12 12 12h80.24l69.594 355.701C150.796 415.201 144 430.802 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-18.136-7.556-34.496-19.676-46.142l1.035-4.757c3.254-14.96-8.142-29.101-23.452-29.101H203.76l-9.39-48h312.405c11.29 0 21.054-7.869 23.452-18.902l45.216-208C578.695 78.139 567.299 64 551.991 64zM208 472c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm256 0c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm23.438-200H184.98l-31.31-160h368.548l-34.78 160z" class=""></path></svg></si-svg>
                    <small class="absolute flex items-center justify-center w-5 h-5 p-2 text-white bg-red-700 rounded-full -top-2 -right-2">{{ $store.state.cart.length }}</small>
                </router-link>
                
                

            </div>
            
            <div v-if="showSearch" class="absolute inset-0 z-20 flex items-center justify-center">
                <div class="absolute w-full p-2 bg-white">
                <form @submit.prevent="search" class="container flex p-2 border border-gray-200 rounded-md search bg-gray-50" action="/shop?">
                    <button type="button" @click="showSearch=false" aria-label="Search button">
                        <si-svg><svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="w-5 h-5 translate"><path fill="currentColor" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z" class=""></path></svg></si-svg>
                    </button>
                    <input autofocus v-model="q" class="w-full px-2 bg-transparent outline-none" :placeholder="'Search for products'" type="search" name="q">
                    <button aria-label="Search button">
                        <si-svg><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-5 h-5 translate"><path fill="currentColor" d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z" class=""></path></svg></si-svg>
                    </button>
                </form>
                 </div>
            </div>
               <div class="flex items-center justify-start  h-full ">
                
                <div v-if="$settings.sections.header.icons.currency && $settings.store_currencies.length > 1" class="relative mx-1">
                    <div v-if="iconMenu == 'currency'" class="absolute z-50 flex flex-col bg-gray-100 rounded-md top-5">
                        <a class="p-2 m-1 bg-white whitespace-nowrap" v-for="cur of $settings.store_currencies" :key="cur.code" :href="`?cur=${cur.code}`">{{ cur.name }} ( {{ cur.code }} )</a>
                    </div>
                </div>
                <button @click="iconMenu = iconMenu == 'currency' ? null : 'currency'" v-if="$settings.sections.header.icons.currency && $settings.store_currencies.length > 1" title="Currency" class="item hidden md:block p-1.5 bg-gray-100 rounded-md hover:bg-gray-200">
                    <span class="text-sm">{{ $store.state.currency.code }}</span>
                </button>
                <div v-if="$settings.sections.header.icons.language && $settings.store_languages.length > 1" class="relative mx-1">
                    <div v-if="iconMenu == 'language'" class="absolute z-50 flex flex-col bg-gray-100 rounded-md top-5">
                        <a class="p-2 m-1 bg-white whitespace-nowrap" v-for="lang of $settings.store_languages" :key="lang.code" :href="`?lang=${lang.code}`">{{ lang.name }} ( {{ lang.code }} )</a>
                    </div>
                </div>
                <button @click="iconMenu = iconMenu == 'language' ? null : 'language'" v-if="$settings.sections.header.icons.language && $settings.store_languages.length > 1" title="Language" class="item hidden md:block p-1.5 bg-gray-100 rounded-md hover:bg-gray-200">
                    <span class="text-sm">{{ $store.state.language.code }}</span>
                </button>
            </div> 
            </div>
           
        </div>
  
  
        
    
    </div>
    <si-app-loader placement="AFTER_HEADER"/>
</div>
</template>
<script>
export default {
    data() {
        return {
            showSearch: false,
            activeId: null,
             menu: this.$settings.sections.header.navbarmenu,
               iconMenu: null,
            q: this.$route.query.search,
            section: this.$settings.sections.header,
            hoveredItem: null,
            showMenuList:false
        }
    },
    watch: {
        showSearch(val) {
            if (val) {
                this.$nextTick(()=>{
                    document.querySelector('form.search input').focus();
                })
            }
        }
    },
    methods: {
        search(){
            this.$store.state.search = this.q;
            this.$router.push({ path: '/shop', query: { search: this.q }});
            this.showSearch = false;
        }
    },
}
</script>

<style scoped>
.parent-list {
  position: relative; 
}
</style>
