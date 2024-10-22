<template>
  <div 
  class=""
      :class="[
        { hidden: isHidden, fixed: isFixed },
        'text-titles-color bg-white h-20  w-full  top-0  left-0 right-0  z-50 border-b border-gray-200 ',
      ]"
      >
    <div
     
    >
      <si-app-loader placement="BEFORE_HEADER" />
      <div class="relative h-full">
        <div class="flex items-center justify-between p-2 h-full">

          <!--icon to controll menus -->
          <div class="min-w-20 w-20">
            <button
              @click="
                $store.state.showHeaderMenu = !$store.state.showHeaderMenu
              "
              aria-label="Search button"
              class="md:hidden h-full"
            >
              <si-svg>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M4 6H20M4 12H20M4 18H20"
                      stroke="#000000"
                      stroke-width="1.75"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </g>
                </svg>
              </si-svg>
            </button>
          </div>

          <!-- menu mobile -->
          <div
            v-if="$store.state.showHeaderMenu"
            class="px-10 bg-white text-titles-color md:hidden fixed top-16 left-0 right-0 flex z-20 justify-between w-screen"
          >
            <div v-if="menu && menu.items" class="w-full">
              <ul
                v-for="(item, i) in menu.items"
                :key="i"
                class="flex flex-col w-full"
              >
                <li
                  class="flex items-center mb-1 justify-between w-full border-b-2 hover:underline hover:underline-offset-4"
                >
                  <router-link
                    class="m-1 w-full flex font-poppins text-13p text-titles-color font-medium"
                    :to="item.url"
                  >
                    {{ item.text }}
                  </router-link>
                  <button
                    class="p-2"
                    @click="activeId = activeId !== item._id ? item._id : null"
                  >
                    <si-svg>
                      <svg
                        v-if="item.childrens && item.childrens.length > 0"
                        class="w-2 transform"
                        :class="activeId === item._id ? 'rotate-180' : ''"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        x="0px"
                        y="0px"
                        viewBox="0 0 330 330"
                        style="enable-background: new 0 0 330 330"
                        xml:space="preserve"
                      >
                        <path
                          d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
                        />
                      </svg>
                    </si-svg>
                  </button>
                </li>

                <transition name="slide">
                  <div v-if="item._id === activeId">
                    <div
                      v-for="(child, i) in item.childrens"
                      :key="i"
                      class="bg-white text-titles-color font-poppins text-13p justify-between"
                    >
                      <div class="flex justify-between">
                        <router-link
                          class="m-1 bg-white hover:underline flex text-white-gray"
                          :to="child.url"
                        >
                          {{ child.text }}
                        </router-link>
                        <!-- Child Toggle Button -->
                        <button
                          class="p-2"
                          @click="
                            activeChildid =
                              activeChildid !== child._id ? child._id : null
                          "
                        >
                          <si-svg>
                            <svg
                              v-if="
                                child.childrens && child.childrens.length > 0
                              "
                              class="w-2 transform"
                              :class="
                                activeChildid === child._id ? 'rotate-180' : ''
                              "
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                              version="1.1"
                              x="0px"
                              y="0px"
                              viewBox="0 0 330 330"
                              style="enable-background: new 0 0 330 330"
                              xml:space="preserve"
                            >
                              <path
                                d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
                              />
                            </svg>
                          </si-svg>
                        </button>
                      </div>

                      <transition name="slide">
                        <div v-if="child._id === activeChildid">
                          <ul
                            v-for="(subChild, ii) in child.childrens"
                            :key="ii"
                            class="px-5"
                          >
                            <li>
                              <router-link
                                class="m-1 flex px-5 text-white-gray"
                                :to="subChild.url"
                              >
                                {{ subChild.text }}
                              </router-link>
                            </li>
                          </ul>
                        </div>
                      </transition>
                    </div>
                  </div>
                </transition>
              </ul>
            </div>
          </div>
   
          <div class="flex items-center px-4 logo w-full">
            <router-link to="/">
              <nuxt-img
                width="70"
                height="50"
                property="height"
                class="object-contain w-full h-12"
                :src="
                  section.logo ? section.logo.src : $store.state.defaults.logo
                "
                alt="Store logo"
              />
            </router-link>
          </div>

          <div class="flex w-full text-dark-gray">
            <div class="flex justify-end items-center w-full icons">

              <!--Nav Bar-Menu start ------------------------------------------------>
              <div
                v-if="menu && menu.items"
                class="hidden font-poppins justify-end px-3 items-center w-full md:flex h-full"
              >
                <ul
                  v-for="(item, i) in menu.items"
                  :key="i"
                  class="flex flex-col menuTextStyle cursor-pointer"
                >
                  <li
                    class="relative flex justify-between w-full hover:underline hover:underline-offset-4 overflow-visible"
                    @mouseenter="hoveredItem = i"
                    @mouseleave="hoveredItem = null"
                    @focus="hoveredItem = i"
                    @mouseover="hoveredItem = i"
                  >
                    <!-- Parent Item Text -->
                    <div class="p-4 w-full flex" @focus="hoveredItem = i">
                      <router-link
                class=""
                :class="i == 0 ? 'underline-first-item' : ''"
                :to="item.url"
                >{{ item.text }}
              </router-link>
                    </div>

                    <!-- First Level Submenu -->
                    <ul
                      v-if="item.childrens && item.childrens.length > 0"
                      :class="[
                        'submenu',
                        { 'submenu-visible': hoveredItem === i },
                      ]"
                      class="p-4 py-2 sm:py-5 z-30 w-40 bg-white shadow-sm"
                      @mouseenter="hoveredItem = i"
                      @mouseleave="hoveredItem = null"
                    >
                      <li
                        v-for="(child, ii) in item.childrens"
                        :key="ii"
                        class="py-1 hover:underline relative"
                        @mouseenter="hoveredChild = ii"
                        @mouseleave="hoveredChild = null"
                        @mouseover="hoveredChild = ii"
                      >
                        <nuxt-link
                          class="flex whitespace-nowrap font-base justify-between items-center text-12p"
                          :to="child.url"
                        >
                          <span> {{ child.text }}</span>

                          <si-svg>
                            <svg
                              v-if="
                                child.childrens && child.childrens.length > 0
                              "
                              class="w-2 transform"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                              version="1.1"
                              x="0px"
                              y="0px"
                              viewBox="0 0 330 330"
                              style="enable-background: new 0 0 330 330"
                              xml:space="preserve"
                            >
                              <path
                                d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393  c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393  s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
                              />
                            </svg>
                          </si-svg>
                        </nuxt-link>

                        <ul
                          v-if="child.childrens && child.childrens.length > 0"
                          :class="[
                            'second-level-submenu',
                            {
                              'second-level-submenu-visible':
                                hoveredChild === ii,
                            },
                          ]"
                          class="w-40 bg-white z-30 p shadow-sm sm:px-3 md:px-5 py-1 sm:py-3 md:py-5"
                          @mouseenter="hoveredChild = ii"
                          @mouseleave="hoveredChild = null"
                        >
                          <li
                            v-for="(grandchild, iii) in child.childrens"
                            :key="iii"
                            class="py-1 hover:underline"
                          >
                            <nuxt-link
                              class="flex whitespace-nowrap font-base text-12p"
                              :to="grandchild.url"
                            >
                              {{ grandchild.text }}
                            </nuxt-link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>

              <!----------------- navbar end-------------->
              <div class="flex justify-end h-full items-center">


                <!--languages-->
                <!--issue there is only one language?-->
                <div
                  v-if="
                    $settings.sections.header.icons.language &&
                    $settings.store_languages.length > 1"
                  class="relative mx-1 bg-text-white z-50 "
                >
                  <div
                    v-if="iconMenu == 'language'"
                    class="absolute z-50 flex flex-col text-base font-poppins font-medium text-titles-color top-8"
                  >
                    <a
                      class="p-2 m-1 whitespace-nowrap"
                      v-for="lang of $settings.store_languages"
                      :key="lang.code"
                      :href="`?lang=${lang.code}`"
                      >{{ lang.name }} ( {{ lang.code }} )</a
                    >
                  </div>
                </div>

                <button
                  @click="iconMenu = iconMenu == 'language' ? null : 'language'"
                  v-if="$settings.sections.header.icons.language &&$settings.store_languages.length > 1"
                  title="Language"
                  class="item hidden md:block p-1.5  text-titles-color "
                >
                  <span class="text-base  font-poppins font-medium ">{{ $store.state.language.code }}</span>
                </button>

                <!--button search-->
                <button
                  v-if="$settings.sections.header.icons.search"
                  @click="showSearch = true"
                  aria-label="Search button"
                  class="relative p-2 mx-1 flex justify-center rounded-md item items-center w-12"
                >
                  <svg
                    width="40"
                    height="40"
                    viewBox="-5.04 -5.04 31.08 31.08"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    fill="#000000"
                    transform="rotate(270)"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="1"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <title>search_right [#1507]</title>
                      <desc>Created with Sketch.</desc>
                      <defs></defs>
                      <g
                        id="Page-1"
                        stroke-width="0.483"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <g
                          id="Dribbble-Light-Preview"
                          transform="translate(-179.000000, -280.000000)"
                          fill="#000000"
                        >
                          <g
                            id="icons"
                            transform="translate(56.000000, 160.000000)"
                          >
                            <path
                              d="M128.93985,132.929 L130.42455,134.343 L124.4847,140 L123,138.586 L128.93985,132.929 Z M136.65,132 C133.75515,132 131.4,129.757 131.4,127 C131.4,124.243 133.75515,122 136.65,122 C139.54485,122 141.9,124.243 141.9,127 C141.9,129.757 139.54485,132 136.65,132 L136.65,132 Z M136.65,120 C132.5907,120 129.3,123.134 129.3,127 C129.3,130.866 132.5907,134 136.65,134 C140.7093,134 144,130.866 144,127 C144,123.134 140.7093,120 136.65,120 L136.65,120 Z"
                              id="search_right-[#1507]"
                            ></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </button>

                <router-link
                  v-if="$settings.sections.header.icons.account"
                  to="/account/orders"
                  title="Account"
                  class="hidden mx-1 w-12 rounded-md item md:block"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="far"
                    data-icon="user"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    class="w-6 h-6 translate"
                  >
                    <path
                      fill="currentColor"
                      d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z"
                      class=""
                    ></path>
                  </svg>
                </router-link>

                <!--cart-->
                <router-link
                  v-if="$settings.sections.header.icons.cart"
                  to="/cart"
                  title="Cart"
                  id="cart-icon"
                  class="relative rounded-md item w-12"
                >
                  <svg
                    viewBox="-3.84 -3.84 31.68 31.68"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke="#CCCCCC"
                      stroke-width="1.488"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M17.8264 20C18.9965 20 19.9167 18.9999 19.8195 17.8339L19.1528 9.83391C19.0664 8.79732 18.1999 8 17.1597 8H16M16 8H12M16 8L16 7C16 5.93913 15.5786 4.92172 14.8284 4.17157C14.0783 3.42143 13.0609 3 12 3C10.9391 3 9.92172 3.42143 9.17157 4.17157C8.42143 4.92172 8 5.93913 8 7L8 8M16 8L16 12M8 8H6.84027C5.80009 8 4.93356 8.79732 4.84718 9.83391L4.18051 17.8339C4.08334 18.9999 5.00352 20 6.1736 20H13M8 8L8 12"
                        stroke="#000000"
                        stroke-width="1.44"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </g>
                  </svg>

                  <small
                    class="absolute font-poppins text-base flex items-center justify-center font-medium w-full h-full text-titles-color rounded-full top-1 right-0"
                    >{{ $store.state.cart.length }}</small
                  >
                </router-link>
              </div>
            </div>

            <div
              v-if="showSearch"
              class="absolute inset-0 z-20 flex items-center justify-center"
            >
              <div class="absolute w-full p-2 bg-white">
                <form
                  @submit.prevent="search"
                  class="container flex p-2 border border-gray-200 search bg-white"
                  action="/shop?"
                >
                  <button
                    type="button"
                    @click="showSearch = false"
                    aria-label="Search button"
                  >
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fal"
                      data-icon="times"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                      class="w-5 h-5 translate"
                    >
                      <path
                        fill="currentColor"
                        d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"
                        class=""
                      ></path>
                    </svg>
                  </button>
                  <input
                    autofocus
                    v-model="q"
                    class="w-full px-2 bg-transparent outline-none"
                    :placeholder="'Search for products'"
                    type="search"
                    name="q"
                  />
                  <button aria-label="Search button">
                    <si-svg
                      ><svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="far"
                        data-icon="search"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        class="w-5 h-5 translate"
                      >
                        <path
                          fill="currentColor"
                          d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z"
                          class=""
                        ></path></svg></si-svg>
                  </button>
                </form>
              </div>
            </div>

            <div class="flex items-center justify-start h-full">
              <div
                v-if="
                  $settings.sections.header.icons.currency &&
                  $settings.store_currencies.length > 1
                "
                class="relative mx-1"
              >
                <div
                  v-if="iconMenu == 'currency'"
                  class="absolute z-50 flex flex-col bg-gray-100 rounded-md top-5"
                >
                  <a
                    class="p-2 m-1 whitespace-nowrap"
                    v-for="cur of $settings.store_currencies"
                    :key="cur.code"
                    :href="`?cur=${cur.code}`"
                    >{{ cur.name }} ( {{ cur.code }} )</a
                  >
                </div>
              </div>
              <button
                @click="iconMenu = iconMenu == 'currency' ? null : 'currency'"
                v-if="
                  $settings.sections.header.icons.currency &&
                  $settings.store_currencies.length > 1
                "
                title="Currency"
                class="item hidden md:block p-1.5 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                <span class="text-sm">{{ $store.state.currency.code }}</span>
              </button>
              
            </div>

          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showSearch: false,
      hoveredChild: null,
      activeId: null,
      activeChildid: null,
      menu: this.$settings.sections.header.navbarmenu,
      iconMenu: null,
      q: this.$route.query.search,
      section: this.$settings.sections.header,
      hoveredItem: null,
      showMenuList: false,
      lastScrollTop: 0,
      isHidden: false,
      isFixed: true,
      listApps: this.$store.state.apps,
      otherMenu: [
        {
          _id: "lang",
          text: this.$store.state.language.code,
          active: this.$settings.sections.header.icons.language,
          childrens: this.$settings.store_languages.map((l) => {
            return {
              _id: l.code,
              text: l.name,
              url: `?lang=${l.code}`,
            };
          }),
        },
        {
          _id: "currency",
          text: this.$store.state.currency.code,
          active: this.$settings.sections.header.icons.currency,
          childrens: this.$settings.store_currencies.map((c) => {
            return {
              _id: c.code,
              text: c.name,
              url: `?cur=${c.code}`,
            };
          }),
        },
      ].filter((item) => item.active),
    };
  },
  watch: {
    showSearch(val) {
      if (val) {
        this.$nextTick(() => {
          document.querySelector("form.search input").focus();
        });
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    search() {
      this.$store.state.search = this.q;
      this.$router.push({ path: "/shop", query: { search: this.q } });
      this.showSearch = false;
    },
    handleScroll() {
      const currentScroll = window.pageYOffset;

      if (window.pageYOffset > 100) {
        this.isHidden =
          currentScroll > this.lastScrollTop && currentScroll > 50;
        this.lastScrollTop = currentScroll;
      } else {
        this.isHidden = false;
      }
    },
  },
};
</script>

<style scoped>
.parent-list {
  position: relative;
}
.menuTextStyle {
  font-family: Poppins, sans-serif;
  font-size: 16px;
  line-height: 22px;
  font-weight: 500;
  text-align: -webkit-match-parent;
}
.menuTextStyle {
  position: relative;
}

.submenu {
  position: absolute;
  top: 100%;
  left: 0;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-20px); /* Initially slide up */
  transition: all 0.8s ease-in-out;
}

.submenu-visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.second-level-submenu {
  position: absolute;
  top: 0;
  left: 100%;
  opacity: 0;
  visibility: hidden;
}

.second-level-submenu-visible {
  opacity: 1;
  visibility: visible;
  transform: translateX(0);
}
</style>
