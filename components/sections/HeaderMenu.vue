<template>
  <div
    class="md:flex inset-0 z-20 max-h-full hidden shadow-container General-Compoanent"
  >
  
    <!--SideBar -->
    <transition name="slideleft">
      <div
        class="transition-all delay-500 General-Compoanent flex flex-col sideBarStyle bg-white"
      >

        <div class="flex justify-center items-center  logo ">
          <router-link to="/">
            <nuxt-img
              width="70"
              height="50"
              property="height"
              class="object-contain w-full h-12"
              :src="section.logo ? section.logo.src : $store.state.defaults.logo"
              alt="Store logo"
            />
          </router-link>
        </div>

        <!--Home/blog ... -->
        <div v-if="menu" class="mt-14 mb-8">
          <ul
            v-for="(item, i) in menu.items"
            :key="i"
            class="flex flex-col cursor-pointer"
          >
            <li
              class="flex items-center justify-between w-full rounded-md bg-white bold-underline"
            >
              <span
                class="w-full flex text-titles-color menuTextStyle tracking-normal menu-text-pad"
                :class="i == 0 ? 'underline-first-item' : ''"
                >{{ item.text }}
              </span>
              <button
                class="bg-white"
                @click="activeId = activeId != item._id ? item._id : null"
              >
                <si-svg>
                  <svg
                    v-if="item.childrens && item.childrens.length > 0"
                    class="w-2 transform"
                    :class="activeId == item._id ? 'rotate-180' : ''"
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
              </button>
            </li>

            <transition name="slide">
              <div v-if="item._id == activeId">
                <div
                  v-for="(item, i) in item.childrens"
                  :key="i"
                  class="bg-white text-titles-color font-poppins font-base text-13p"
                >
                  <router-link
                    class="m-1 bg-white hover:underline flex"
                    :to="item.url"
                    >{{ item.text }}</router-link
                  >
                  <ul
                    class=" "
                    v-if="item.childrens && item.childrens.length > 0"
                  >
                    <li v-for="(child, ii) in item.childrens" :key="ii">
                      <nuxt-link class="m-1 flex" :to="child.url">
                        {{ child.text }}
                      </nuxt-link>
                    </li>
                  </ul>
                </div>
              </div>
            </transition>
          </ul>
        </div>
        <sections-footer></sections-footer>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      activeId: null,
      menu: this.$settings.sections.header.menu,
      section: this.$settings.sections.header,
      
 
      
    };
  },
  watch: {
    "$route.params": {
      handler() {
        this.$store.state.showHeaderMenu = false;
      },
      deep: true,
    },
    "$store.state.showHeaderMenu"(val) {
      if (val) {
        this.show = val;
      } else {
        setTimeout(() => {
          this.show = val;
        }, 500);
      }
    },
  },
};
</script>
<style>
/*
[dir='ltr'] .move-out{ transform: translateX(-40em); }
[dir='ltr'] .move-in{ transform: translateX(-20em); }

[dir="rtl"] .move-out{ transform: translateX(40em); }
[dir="rtl"] .move-in{ transform: translateX(20em); }
*/

.shadow-container {
  background-color: #f0f0f0;
  box-shadow: var(--wp--preset--shadow--natural),
    var(--wp--preset--shadow--deep);
}
:root {
  --wp--preset--shadow--natural: 6px 6px 9px rgba(172, 170, 170, 0.2);
  --wp--preset--shadow--deep: 12px 12px 50px rgba(193, 189, 189, 0.4);
}

.menuTextStyle {
  font-family: Poppins, sans-serif;
  font-size: 15px;
  font-weight: 500;
  line-height: 26px;
  text-align: -webkit-match-parent;
}

.sideBarStyle {
  padding-top: 94px;
  padding-right: 60px;
  padding-left: 60px;
  padding-bottom: 10px;
}
.menu-text-pad {
  padding: 7px 0;
}
.underline-first-item {
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-thickness: 1px;
}
.bold-underline:hover {
  text-decoration: underline;
  text-underline-offset: 4px;
  text-decoration-thickness: 2px;
}

.General-Compoanent {
  width: 310px;
}
</style>
