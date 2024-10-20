<template>
  <div class="container bg-white md:pt-20 pt-5 h-full">
    <div class="flex mb-2 relative space-x-2 bg-white h-full">
      <div class="w-full md:w-3/4 px-6">
        <div class="bg-white">
          <div class="py-2">
            <div class="flex justify-between md:justify-end items-center">
              <button
                @click="showSideBar = true"
                aria-label="Search button"
                class="flex  md:hidden items-center flex-col p-2 bg-gray-100 rounded-md mx-1 hover:bg-gray-200"
              >
                <span class="w-6 my-0.5 h-0.5 bg-gray-800"></span>
                <span class="w-4 my-0.5 h-0.5 bg-gray-800"></span>
                <span class="w-2 my-0.5 h-0.5 bg-gray-800"></span>
                <span class="w-1 my-0.5 h-0.5 bg-gray-800"></span>
              </button>
              <!--sort by-->
              <div
                class="relative"
                @mouseover="windowWidth >= 1024 ? (isSortVisible = true) : null"
                @mouseleave="
                  windowWidth >= 1024 ? (isSortVisible = false) : null
                "
              >
                <div
                  class="flex items-center py-3 cursor-pointer font-poppins font-base text-base"
                  @click="showSort"
                >
                  <span class=" ">{{ sortText }}</span>
                  <svg
                    class="w-5 h-4"
                    aria-label="chivron icon"
                    :class="
                      isSortVisible == true
                        ? 'rotate-180 transition-all delay-150 ease-linear'
                        : ''
                    "
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.39 7.6a.54.54 0 00-.78 0L10 12.21 5.39 7.6a.54.54 0 00-.78 0 .55.55 0 000 .77L10 13.76l5.39-5.39a.55.55 0 000-.77z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
                <transition name="fade">
                  <div
                    v-show="isSortVisible"
                    class="absolute right-0 z-20 w-56 bg-white rounded-b-lg shadow-lg sort-direction top-full"
                  >
                    <div
                      class="flex flex-col gap-3 py-5 px-5"
                      v-if="sorts && sorts.length > 0"
                    >
                      <div
                        class="flex items-center"
                        v-for="(sort, i) in sorts"
                        :key="i"
                      >
                        <input
                          hidden
                          type="radio"
                          v-model="params.sort"
                          :value="sort.field"
                          :id="sort.name"
                        />
                        <label
                          @click="getSortByText(sort.name)"
                          class="cursor-pointer text-13p font-poppins font-normal text-secondary-hover hover:underline hover:text-titles-color"
                          :for="sort.name"
                          >{{ sort.name }}</label
                        >
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
            </div>
          </div>

          <div
            v-if="loading.pages"
            class="flex justify-center items-center my-5"
          >
            <si-loader></si-loader>
          </div>
          <div
            v-if="!loading.pages && items.length == 0"
            class="flex justify-center items-center my-5"
          >
            <h1 class="py-3">{{ $settings.sections.blog.empty_text }}</h1>
          </div>

          <!--posts-->
          <div class="w-full" v-if="items && items.length > 0">
            <div v-for="(item, i) in items" :key="i" class="w-full">
              <si-post :item="item"></si-post>
            </div>
          </div>

          <div></div>
        </div>
      </div>

      <transition
        name="slideleft"
        v-if="$settings.sections.blog.sidebar.active"
      >
        <div
          :class="showSideBar ? 'show overflow-y-scroll' : 'hide'"
          class="fixed top-0 bottom-0 z-50 sm:z-20 hidden h-screen sm:h-full mb-4 pb-4 bg-white w-80 md:w-1/4 md:block px-4 md:top-0 md:relative"
        >
          <div
            class="bg-black bg-opacity-50 fixed block md:hidden inset-0"
            @click="showSideBar = false"
          ></div>

          <div class="px-6 bg-white h-full flex flex-col relative">
            <div class="w-full flex justify-end md:hidden">
              <button
                @click="showSideBar = false"
                aria-label="Search button"
                class="item p-1 bg-gray-100 rounded-md m-1 hover:bg-gray-200"
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
            </div>

            <!--Search-->
            <div
              class="relative border border-gray-200 p-2 sm:p-3 sm:px-5 items-center justify-between flex mb-5 sm:mb-8"
            >
              <input
                class="outline-none"
                type="text"
                placeholder="search..."
                v-model="q"
                @keydown.enter="search"
              />

              <button type="button" @click="search">
                <si-svg>
                  <svg
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
                    ></path>
                  </svg>
                </si-svg>
              </button>
            </div>

            <!-- Author-->
            <div>
              <h2
                class="mb-2 text-base font-poppins font-medium text-titles-color"
              >
                Author
              </h2>
              <div class="py-5">
                <nuxt-img
                  class="w-full h-48 rounded-sm object-cover opacity-75"
                  src="https://images.pexels.com/photos/3772623/pexels-photo-3772623.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="coolections Pic"
                />
                <p
                  class="py-3 text-white-gray text-base font-base font-poppins"
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  minima animi assumenda nam dignissimos non. Quae, cum?
                </p>
              </div>
            </div>

            <!--Categories-->
            <h2
              v-if="$settings.sections.blog.sidebar.categories.active"
              class="text-base font-poppins font-medium text-titles-color"
            >
              {{ $settings.sections.blog.sidebar.categories.title }}
            </h2>
            <div
              v-if="$settings.sections.blog.sidebar.categories.active"
              class="flex flex-col mb-2"
            >
              <div
                v-if="loading.categories"
                class="flex justify-center items-center my-5"
              >
                <si-loader></si-loader>
              </div>
              <div v-if="categories && categories.length > 0">
                <div v-for="(item, i) in categories" :key="i" class="">
                  <div class="py-1">
                    <span
                      @click="setParams(item.slug)"
                      class="capitalize cursor-pointer collec-name text-titles-color text-12p font-poppins font-normal hover:text-gray-600 hover:underline"
                      :class="{
                        'text-gray-600 underline':
                          selectedCategory === item.slug,
                      }"
                    >
                      {{ item.name }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div class="w-full relative py-5 hidden lg:flex">
              <div
                class="absolute z-20 top-0 left-0 w-3/4 h-full flex justify-center items-center"
              >
                <h1
                  class="text-center text-white font-poppins font-bold left-0 right-0 w-3/4"
                >
                  Shop
                </h1>
              </div>
              <nuxt-img
                class="w-full h-48 rounded-sm object-cover opacity-75"
                src="https://images.pexels.com/photos/9603486/pexels-photo-9603486.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="coolections Pic"
              />
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      windowWidth: 0,
      sortText: "Sort By default",
      isSortVisible: false,
      selectedCategory: null,
      loading: {
        pages: true,
        categories: true,
      },
      query: {},
      param: [],
     
      showSideBar: false,
      items: [],
      categories: [],
      paginate: { page: 1, limit: 12, total: 12 },
      params: {
        "categories.slug-in": [],
        sort: { createdAt: -1 },
        type: "POST",
        search: this.$route.query.search,
      },
      lastParams: {
        "categories.slug-in": [],
        sort: { createdAt: -1 },
        type: "POST",
      },
      sorts: [
        {
          field: { name: 1 },
          name: this.$settings.sections.blog.sorts.name_asc,
        },
        {
          field: { name: -1 },
          name: this.$settings.sections.blog.sorts.name_desc,
        },
        {
          field: { createdAt: -1 },
          name: this.$settings.sections.blog.sorts.newest,
        },
        {
          field: { createdAt: 1 },
          name: this.$settings.sections.blog.sorts.oldest,
        },
      ],
      girds: [
        { number: 6, width: 16, class: "w-full md:w-1/2 lg:w-1/2" },
        { number: 9, width: 21, class: "w-full md:w-1/2 lg:w-1/3" },
        { number: 12, width: 26, class: "w-1/2 md:w-1/3 lg:w-1/4" },
      ],
      q: "",
      showSearch: false,
    };
  },
  watch: {
    params: {
      handler(val) {
        if (JSON.stringify(val) !== JSON.stringify(this.lastParams)) {
          this.getItems();
        }
      },
      deep: true,
    },
    "$route.query.search"(val) {
      this.$set(this.params, "search", val);
    },
  },
  async fetch() {
    console.log("sidbar blog",this.$settings.sections.blog.sidebar.active);
    console.log("active categories",this.$settings.sections.blog.sidebar.categories.active);
    
    await this.getItems();
    await this.getCategories();
   
    this.$store.state.seo.title =
      this.$settings.sections.blog.title + " - " + this.$settings.store_name;
    this.$store.state.seo.description =
      this.$settings.sections.blog.description ||
      this.$settings.store_description;
  },
  mounted() {
    this.$storeino.fbpx("PageView");

    this.getWindowWidth();
    window.addEventListener("resize", this.getWindowWidth);
  },
  methods: {
    getWindowWidth() {
      this.windowWidth = window.innerWidth;
    },
    setParams(value) {
      const key = "categories.slug-in";
      this.selectedCategory = value;
      this.$set(this.params, key, value);

      switch (key) {
        case "categories.slug-in":
          this.param = [value];
          break;
      }
    },
    async getCategories() {
      this.categories = [];
      this.loading.categories = true;
      try {
        const { data } = await this.$storeino.categories.search({});
        if (data && data.results) this.categories = data.results;
      } catch (e) {
        console.log({ e });
      }
      this.loading.categories = false;
    },
    async getItems() {
      this.items = [];
      this.loading.pages = true;
      try {
        this.lastParams = this.$tools.copy(this.params);
        const { data } = await this.$storeino.pages.search(this.params);
        if (data && data.results) this.items = data.results;
      } catch (e) {
        console.log({ e });
      }
      this.loading.pages = false;
    },
    getSortByText(textSort) {
      this.sortText = textSort;
    },
    showSort() {
      if (window.innerWidth < 1024) {
        this.isSortVisible = !this.isSortVisible;
      }
    },
    search() {
      this.$store.state.search = this.q;
      this.$router.push({ path: "/blog", query: { search: this.q } });
    },
  },
};
</script>
<style>
.color-option label {
  width: 24px;
  height: 24px;
  margin-left: 4px;
  margin-right: 4px;
  box-shadow: 0 0 0px 2px rgb(230, 230, 230);
}
.color-option.active label {
  color: transparent;
  box-shadow: 0 0 0px 2px white, 0 0 0px 4px var(--primary-color);
  margin-left: 6px;
  margin-right: 6px;
  width: 20px;
  height: 20px;
}

.slideleft-enter-active {
  transition-duration: 0.3s;
  transition-timing-function: ease-in;
}

.slideleft-leave-active {
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slideleft-enter-to,
.slideleft-leave {
  width: 100%;
}

.slideleft-enter,
.slideleft-leave-to {
  width: 0%;
}
/* Media screen mobile */
@media (max-width: 768px) {
  .show {
    display: block !important;
  }
}
</style>
