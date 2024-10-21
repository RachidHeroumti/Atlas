<template>
  <div class="bg-white md:pt-20 pt-5 container">
    <div class="relative h-full flex mb-2 space-x-2">
      <div class="w-full md:w-3/4 px-4">
        <div class="">
          <div class="mb-5">
            <div class="font-poppins font-base text-base">
              <div
                class="flex items-center justify-between text-white-gray p-2"
              >
                <button
                  @click="showSideBar = true"
                  aria-label="Search button"
                  class="flex flex-col items-center p-2 mx-1 rounded-md md:hidden hover:bg-gray-200"
                >
                  <span class="w-6 my-0.5 h-0.5 bg-gray-800"></span>
                  <span class="w-4 my-0.5 h-0.5 bg-gray-800"></span>
                  <span class="w-2 my-0.5 h-0.5 bg-gray-800"></span>
                  <span class="w-1 my-0.5 h-0.5 bg-gray-800"></span>
                </button>
                <!-- type of showing products
                            <div class="flex">
                                <button v-for="(grid,i) in girds" :key="i" @click="gridClass=grid.class" class="flex flex-wrap mx-0.5" :style="`width:${grid.width}px`">
                                    <span v-for="i in grid.number" :key="i" class="flex" :class="grid.class == gridClass ? 'bg-primary':'bg-gray-300'" style="margin:1px;width:4px;height:4px" ></span>
                                </button>
                            </div>-->

                <div>
                  <span class="hidden md:flex">
                    Showing 1–{{ items.length < 9 ? items.length : 9 }} of
                    {{ items.length }} results</span
                  >
                </div>

                <!-- Sort -->
                <div
                  class="relative pl-5 pr-7"
                  @mouseover="
                    windowWidth >= 1024 ? (isSortVisible = true) : null
                  "
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
                      <div class="flex flex-col gap-3 py-5 px-5">
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
                            class="cursor-pointer text-13p text-secondary-hover hover:underline hover:text-titles-color"
                            :for="sort.name"
                            >{{ sort.name }}</label
                          >
                        </div>
                      </div>
                    </div>
                  </transition>
                </div>
                <!-- Sort -->
              </div>
            </div>
            <div
              v-if="loading.products"
              class="flex items-center justify-center my-5"
            >
              <si-loader></si-loader>
            </div>
            <div
              v-if="!loading.products && items.length == 0"
              class="flex items-center justify-center my-5"
            >
              <h1 class="py-3">{{ $settings.sections.shop.empty_text }}</h1>
            </div>
            <div v-if="items && items.length > 0" class="flex flex-wrap">
              <div
                v-for="(item, i) in items"
                :key="i"
                class="p-2 home-products"
                :class="gridClass"
              >
                <si-product :item="item" place="shop"></si-product>
              </div>
            </div>
          </div>
          <div
            v-if="items.length > 0"
            class="flex items-center justify-center w-full p-2"
          >
            <ul
              class="flex space-x-2 font-poppins font-base text-13p text-gray-500"
            >
              <li
                class="h-6 w-6 cursor-pointer hover:text-black"
                @click="getItems(1)"
              >
                1
              </li>
              <li
                class="h-6 w-6 cursor-pointer hover:text-black"
                @click="getItems(2)"
              >
                2
              </li>
              <li
                class="h-6 w-6 cursor-pointer hover:text-black"
                @click="getItems(3)"
              >
                3
              </li>
              <li
                class="h-6 w-6 cursor-pointer hover:text-black"
                @click="getItems(4)"
              >
                4
              </li>
              <li
                class="h-6 w-6 cursor-pointer hover:text-black"
                @click="getItems(5)"
              >
                5
              </li>
              <li
                class="h-6 w-6 cursor-pointer hover:text-black"
                @click="getItems(6)"
              >
                6
              </li>
              <li
                class="h-6 w-6 cursor-pointer hover:text-black"
                @click="getItems(7)"
              >
                7
              </li>
              <li
                class="h-8 w-6 cursor-pointer text-base hover:text-black"
                @click="getItems(paginate.current_page + 1)"
              >
                &gt;
              </li>
            </ul>
            <!--
                        <button class="flex items-center p-2 text-white bg-primary" @click="getItems(paginate.current_page-1)">
                            <svg class="h-4 translate" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"></path></svg>
                            <span>&ensp;</span>
                            <span>{{ $settings.sections.shop.pagination.prev_text }}</span>
                        </button>
                        <span>&ensp;</span>
                        <span>{{paginate.current_page}}/{{paginate.last_page}}</span>
                        <span>&ensp;</span>
                        <button class="flex items-center p-2 text-white bg-gray-900" @click="getItems(paginate.current_page+1)">
                            <span>{{ $settings.sections.shop.pagination.next_text }}</span>
                            <span>&ensp;</span>
                            <svg class="h-4 translate" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path></svg>
                        </button>
                        -->
          </div>
        </div>
      </div>

      <transition name="slideleft">
        <div
          :class="showSideBar ? 'show overflow-y-scroll' : 'hide'"
          class="fixed top-0 bottom-0 z-50 sm:z-20 hidden h-screen sm:h-full mb-4 pb-4 bg-white w-80 md:w-1/4 md:block px-4 md:top-0 md:relative"
        >
          <div
            class="fixed inset-0 block bg-black/40 bg-opacity-50 md:hidden"
            @click="showSideBar = false"
          ></div>
          <div class="relative flex flex-col h-full bg-white">
            <div class="flex justify-end w-full md:hidden">
              <button
                @click="showSideBar = false"
                aria-label="Search button"
                class="p-1 m-1 bg-gray-100 rounded-md item hover:bg-gray-200"
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

            <!--Search -->

            <div
              class="relative border border-gray-200 p-3 px-5 items-center justify-between flex mb-8"
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

            <!--collections-->
            <h2
              v-if="$settings.sections.shop.sidebar.collections.active"
              class="mb-5 font-poppins text-base font-normal text-titles-color leading-custom-1.3"
            >
              {{ $settings.sections.shop.sidebar.collections.title }}
            </h2>
            <div
              v-if="$settings.sections.shop.sidebar.collections.active"
              class="flex flex-col mb-2"
            >
              <div
                v-if="loading.collections"
                class="flex items-center justify-center my-5"
              >
                <si-loader></si-loader>
              </div>
              <div v-for="(item, i) in collections" :key="i" class="">
                <div class="flex items-center py-1">
                  <span
                    v-if="item.childrens"
                    @click="toggleSelection(item.slug)"
                    class="capitalize cursor-pointer collec-name text-titles-color text-12p font-poppins font-normal hover:text-gray-600 hover:underline"
                  >
                    {{ item.name }} ({{ productCounts[item.slug] || 0 }})
                  </span>
                  <!--
  <span
    @click="setActive(i + 'fit', i + 'ret')"
    v-if="item.childrens && item.childrens.length > 0"
    class="capitalize cursor-pointer collec-name"
  >
    {{ item.name }}
  </span> -->

                  <svg
                    @click="setActive(i + 'fit', i + 'ret')"
                    :id="i + 'ret'"
                    v-if="item.childrens && item.childrens.length > 0"
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    width="15"
                    height="15"
                    x="0"
                    y="0"
                    viewBox="0 0 451.847 451.847"
                    style="enable-background: new 0 0 512 512; cursor: pointer"
                    xml:space="preserve"
                    class="rotated"
                  >
                    <g>
                      <path
                        d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751 c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0 c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z"
                        fill="#7a7575"
                      />
                    </g>
                  </svg>
                </div>
                <!-------- ------------------>
                <div
                  :id="i + 'fit'"
                  class="fit-collapsible"
                  :class="item.childrens.length > 0 ? 'sub-collections' : ''"
                >
                  <ul
                    class="list-sub-collections fit-collapsible-content"
                    v-if="item.childrens && item.childrens.length > 0"
                  >
                    <li v-for="(child, i) in item.childrens" :key="i">
                      <input
                        class="w-4 h-4 mx-1"
                        :checked="
                          params['collections.slug-in'] &&
                          params['collections.slug-in'].indexOf(child.slug) >= 0
                        "
                        :id="child.slug"
                        @change="
                          setParams($event, 'collections.slug-in', child.slug)
                        "
                        type="checkbox"
                      />
                      <label
                        :for="child.slug"
                        class="cursor-pointer c-p c-grey"
                        >{{ child.name }}</label
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <hr v-if="$settings.sections.shop.sidebar.collections.active" />
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
                class="w-3/4 h-48 rounded-sm object-cover opacity-75"
                src="https://images.pexels.com/photos/9603486/pexels-photo-9603486.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="coolections Pic"
              />
            </div>

            <!-- colors -->
            <h2
              class="px-2 mt-2 font-poppins text-base font-medium p-2"
              v-if="$settings.sections.shop.sidebar.colors.active"
            >
              {{ $settings.sections.shop.sidebar.colors.title }}
            </h2>
            <div
              v-if="$settings.sections.shop.sidebar.colors.active && loading.filters"
              class="flex items-center justify-center my-5"
            >
              <si-loader></si-loader>
            </div>
            <div
              v-if="$settings.sections.shop.sidebar.colors.active && filters"
              class="flex flex-wrap mx-2 mb-2"
            >
              <div
                v-for="(item, i) in filters.colors"
                :key="i"
                class="flex items-center my-0.5 color-option"
                :class="
                  params['options.values.value1'] &&
                  params['options.values.value1'].indexOf(item.value1) >= 0
                    ? 'active'
                    : ''
                "
              >
                <input
                  hidden
                  :id="item.value1"
                  :checked="
                    params['options.values.value1'] &&
                    params['options.values.value1'].indexOf(item.value1) >= 0
                  "
                  @change="
                    setParams($event, 'options.values.value1', item.value1)
                  "
                  type="checkbox"
                />
                <label
                  class="cursor-pointer"
                  :style="`background-color:${item.value2}`"
                  :for="item.value1"
                  :aria-label="item.value1"
                ></label>
              </div>
            </div>
            <hr v-if="$settings.sections.shop.sidebar.colors.active" />

            <!-- sizes -->
            <h2
              class="px-2 mt-2 font-poppins text-base font-medium p-2"
              v-if="$settings.sections.shop.sidebar.sizes.active"
            >
              {{ $settings.sections.shop.sidebar.sizes.title }}
            </h2>
            <div
              v-if="$settings.sections.shop.sidebar.sizes.active && loading.filters"
              class="flex items-center justify-center my-5"
            >
              <si-loader></si-loader>
            </div>
            <div
              v-if="$settings.sections.shop.sidebar.sizes.active && filters"
              class="flex flex-wrap mx-2 mb-2"
            >
              <div
                v-for="(item, i) in filters.sizes"
                :key="i"
                class="flex items-center m-0.5"
                :class="
                  params['options.values.value1'] &&
                  params['options.values.value1'].indexOf(item.value1) >= 0
                    ? ' bg-titles-color text-white'
                    : ' border '
                "
              >
                <input
                  hidden
                  :id="item.value1"
                  :checked="
                    params['options.values.value1'] &&
                    params['options.values.value1'].indexOf(item.value1) >= 0
                  "
                  @change="
                    setParams($event, 'options.values.value1', item.value1)
                  "
                  type="checkbox"
                />
                <label class="px-2 cursor-pointer" :for="item.value1">{{
                  item.value1
                }}</label>
              </div>
            </div>
            <hr v-if="$settings.sections.shop.sidebar.sizes.active" />

            <!-- prices -->
            <h2
              v-if="$settings.sections.shop.sidebar.prices.active"
              class="px-2 mt-2 font-poppins text-base font-medium p-2"
            >
              {{ $settings.sections.shop.sidebar.prices.title }}
            </h2>
            <div
              v-if="loading.filters"
              class="flex items-center justify-center my-5"
            >
              <si-loader></si-loader>
            </div>
            <div
              v-if="$settings.sections.shop.sidebar.prices.active && filters"
              class="flex flex-col mb-2"
              dir="ltr"
            >
              <si-price-range
                @change="setParams"
                :min="filters.prices.min"
                :max="filters.prices.max"
              />
            </div>
            <hr v-if="$settings.sections.shop.sidebar.prices.active" />

            <!-- taggs -->
            <h2
              class="px-2 mt-2 font-poppins text-base font-medium p-2"
              v-if="$settings.sections.shop.sidebar.tags.active"
            >
              {{ $settings.sections.shop.sidebar.tags.title }}
            </h2>
            <div
              v-if="$settings.sections.shop.sidebar.tags.active && loading.filters"
              class="flex items-center justify-center my-5"
            >
              <si-loader></si-loader>
            </div>
            <div
              v-if="$settings.sections.shop.sidebar.tags && filters"
              class="flex flex-col mb-2 space-y-1"
            >
              <div
                v-for="(tag, i) in filters.tags"
                :key="i"
                class="flex items-center px-2 space-x-2"
              >
                <input
                  class="w-4 h-4 mx-1"
                  :checked="
                    params['tags-in'] && params['tags-in'].indexOf(tag) >= 0
                  "
                  :id="`tag_${tag}`"
                  @change="setParams($event, 'tags-in', tag)"
                  type="checkbox"
                />
                <label class="capitalize cursor-pointer" :for="`tag_${tag}`">{{
                  tag
                }}</label>
              </div>
            </div>

            <!-- brands -->
            <hr v-if="$settings.sections.shop.sidebar.tags.active" />
            <h2
              class="px-2 mt-2 font-poppins text-base font-medium p-2"
              v-if="$settings.sections.shop.sidebar.brands.active"
            >
              {{ $settings.sections.shop.sidebar.brands.title }}
            </h2>
            <div class="flex flex-col mb-2">
              <div
                v-if="
                  $settings.sections.shop.sidebar.brands.active &&
                  loading.brands
                "
                class="flex items-center justify-center my-5"
              >
                <si-loader></si-loader>
              </div>
              <div v-if="$settings.sections.shop.sidebar.brands.active">
                <div
                  v-for="(item, i) in brands"
                  :key="i"
                  class="flex items-center px-2"
                >
                  <input
                    class="w-4 h-4 mx-1"
                    :id="item.slug"
                    :checked="
                      params['brand.slug-in'] &&
                      params['brand.slug-in'].indexOf(item.slug) >= 0
                    "
                    @change="setParams($event, 'brand.slug-in', item.slug)"
                    type="checkbox"
                  />
                  <label class="capitalize cursor-pointer" :for="item.slug">{{
                    item.name
                  }}</label>
                </div>
              </div>
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
      productCounts: {},
      windowWidth: 0,
      isSortVisible: false,
      loading: {
        products: true,
        filters: true,
        collections: true,
        brands: true,
      },
      query: {},
      param: [],
      filters: null,
      showSideBar: false,
      gridClass: this.$settings.sections.shop.products
        ? this.$settings.sections.shop.products.default_size
        : "w-full md:w-1/2 lg:w-1/3",
      items: [],
      collections: [],
      brands: [],
      paginate: {
        page: 1,
        limit: this.$settings.sections.shop.pagination.limit,
        total: 12,
      },
      params: {
        page: 1,
        search: this.$route.query.search,
        limit: this.$settings.sections.shop.pagination.limit,
        "collections.slug-in": [],
        sort: { createdAt: -1 },
      },
      lastParams: {
        page: 1,
        search: this.$route.query.search,
        limit: this.$settings.sections.shop.pagination.limit,
        "collections.slug-in": [],
        sort: { createdAt: -1 },
      },
      sorts: [
        {
          field: { "price.salePrice": 1 },
          name: this.$settings.sections.shop.sorts.price_asc,
        },
        {
          field: { "price.salePrice": -1 },
          name: this.$settings.sections.shop.sorts.price_desc,
        },
        {
          field: { "review.rating": -1 },
          name: this.$settings.sections.shop.sorts.rating_desc,
        },
        {
          field: { "review.rating": 1 },
          name: this.$settings.sections.shop.sorts.rating_asc,
        },
        {
          field: { name: 1 },
          name: this.$settings.sections.shop.sorts.name_asc,
        },
        {
          field: { name: -1 },
          name: this.$settings.sections.shop.sorts.name_desc,
        },
        {
          field: { createdAt: -1 },
          name: this.$settings.sections.shop.sorts.newest,
        },
        {
          field: { createdAt: 1 },
          name: this.$settings.sections.shop.sorts.oldest,
        },
      ],
      girds: [
        { number: 6, width: 16, class: "w-full md:w-1/2" },
        { number: 9, width: 21, class: "w-full md:w-1/2 lg:w-1/3" },
        { number: 12, width: 26, class: "w-1/2 md:w-1/3 lg:w-1/4" },
      ],
      q: "",
      showSearch: false,
      sortText: "Sort By default",
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
    console.log('sidebar.collection active',this.$settings.sections.shop.sidebar.collections.active);
    console.log(" color shop active",this.$settings.sections.shop.sidebar.colors.active) ;
    console.log(" sizes shop active",this.$settings.sections.shop.sidebar.sizes.active) ;
    console.log(" prices shop active",this.$settings.sections.shop.sidebar.prices.active) ;
    console.log(" tags shop active",this.$settings.sections.shop.sidebar.tags.active);
    console.log(" brands shop active",this.$settings.sections.shop.sidebar.brands.active);
    this.$store.state.seo.title =
      this.$settings.sections.shop.title + " - " + this.$settings.store_name;
    this.$store.state.seo.description =
      this.$settings.sections.shop.description ||
      this.$settings.store_description;
    if (this.$route.params.slug) {
      this.param = this.$route.params.slug.split(",");
      this.$route.params.slug.split(",").forEach((item) => {
        this.params["collections.slug-in"].push(item);
      });
    }
    for (const key in this.$route.query) {
      if (!this.$route.query[key]) continue;
      switch (key) {
        case "price-from":
          this.$set(
            this.params,
            "price.salePrice-from",
            this.$route.query[key]
          );
          break;
        case "price-to":
          this.$set(this.params, "price.salePrice-to", this.$route.query[key]);
          break;
        case "colors-size":
          this.$set(
            this.params,
            "options.values.value1",
            this.$route.query[key].split(",")
          );
          break;
        case "tags":
          this.$set(this.params, "tags-in", this.$route.query[key].split(","));
          break;
        case "brands":
          this.$set(
            this.params,
            "brand.slug-in",
            this.$route.query[key].split(",")
          );
          break;
        case "page":
          this.$set(this.params, "page", this.$route.query[key]);
          break;
      }
    }
    this.lastParams = this.params;
    await this.getFilters();
    await this.getItems();
    await this.getCollections();
    await this.getBrands();
    this.subCollections();
  },

  mounted() {
    // All Pixel
    this.$tools.call("PAGE_VIEW");
    // Fb Pixel
    this.$storeino.fbpx("PageView");
    // Get Window Width
    this.getWindowWidth();
    window.addEventListener("resize", this.getWindowWidth);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.getWindowWidth);
  },
  methods: {
    getWindowWidth() {
      this.windowWidth = window.innerWidth;
    },
    showSort() {
      if (window.innerWidth < 1024) {
        this.isSortVisible = !this.isSortVisible;
      }
    },
    subCollections() {
      for (let itm of this.collections) {
        if (itm.childrens && itm.childrens.length > 0) itm.childrens = [];
      }
      for (let i = 0; i < this.collections.length; i++) {
        for (let j = 0; j < this.collections.length; j++) {
          if (this.collections[i].parent == this.collections[j]._id) {
            let childObject = this.collections[i];
            this.collections[j].childrens.push(childObject);
            this.collections.splice(i, 1);
            i--;
          }
        }
      }
    },
    setActive: function (id, idRet) {
      var element = document.getElementById(id);
      if (element.classList.contains("active")) {
        element.classList.remove("active");
      } else {
        element.classList.add("active");
      }
      var icon = document.getElementById(idRet);
      if (icon.classList.contains("active")) {
        icon.classList.remove("active");
      } else {
        icon.classList.add("active");
      }
    },
    setParams(e, key, value) {
      if (key.indexOf("price") >= 0 || key.indexOf("page") >= 0) {
        this.$set(this.params, key, e.target.value);
        return false;
      } else {
        if (e.target.checked) {
          if (!this.params[key])
            this.params[key] = this.$set(this.params, key, []);
          this.params[key].push(value);
        } else {
          this.params[key] = this.params[key].filter((item) => item !== value);
        }
      }
      for (const key in this.params) {
        switch (key) {
          case "collections.slug-in":
            this.param = this.params[key];
            break;
          case "price.salePrice-from":
            this.query["price-from"] = this.params[key];
            break;
          case "price.salePrice-to":
            this.query["price-to"] = this.params[key];
            break;
          case "options.values.value1":
            this.query["colors-size"] = this.params[key];
            break;
          case "tags-in":
            this.query["tags"] = this.params[key];
            break;
          case "brand.slug-in":
            this.query["brands"] = this.params[key];
            break;
          case "page":
            this.query["page"] = [this.params[key]];
            break;
        }
      }
      let url = `/shop/`;
      url += this.param.length > 0 ? [...new Set(this.param)].join(",") : "";
      for (const key in this.query) {
        url += url.indexOf("?") == -1 ? "?" : "&";
        if (typeof this.query[key] == "object") {
          url += `${key}=${this.query[key].join(",")}`;
        } else url += `${key}=${this.query[key]}`;
      }
      window.history.pushState({}, "", url);
    },
    async getFilters() {
      this.filters = null;
      this.loading.filters = true;
      try {
        const { data } = await this.$storeino.products.filters({});
        if (data) this.filters = data;
      } catch (e) {
        console.log({ e });
      }
      this.loading.filters = false;
    },
    async getCollections() {
      this.collections = [];
      this.loading.collections = true;
      try {
        const { data } = await this.$storeino.collections.search({});
        if (data.results) this.collections = data.results;
      } catch (e) {
        console.log({ e });
      }
      this.loading.collections = false;
    },
    async getBrands() {
      this.brands = [];
      this.loading.brands = true;
      try {
        const { data } = await this.$storeino.brands.search({});
        if (data.results) this.brands = data.results;
      } catch (e) {
        console.log({ e });
      }
      this.loading.brands = false;
    },
    async getItems(page = null) {
      if (page != null)
        this.setParams({ target: { value: page } }, "page", page);
      this.items = [];
      this.loading.products = true;
      try {
        this.params.search = this.$route.query.search;
        this.params.page = page || this.paginate.current_page;
        this.params.limit = this.$settings.sections.shop.pagination.limit;
        this.lastParams = this.$tools.copy(this.params);
        const { data } = await this.$storeino.products.search(this.params);

        if (data && data.results) {
          this.items = data.results;
          this.paginate = data.paginate;
        }
        this.loading.products = false;
      } catch (e) {
        console.log({ e });
      }
      this.loading.products = false;
    },
    toggleSelection(slug) {
      this.$set(this.params, "collections.slug-in", [slug]);
    },
    async fetchProductCounts() {
      const counts = {};
      for (const collection of this.collections) {
        counts[collection.slug] = await this.getProductsLength(collection.slug);
      }
      this.productCounts = counts; // Update the reactive property
    },

    async getProductsLength(slug) {
      try {
        const { data } = await this.$storeino.products.search({
          "collections.slug-in": slug,
        });
        return data && data.results ? data.results.length : 0;
      } catch (err) {
        //this.$sentry.captureException(err);
        console.log("error in pages shop",err);
        return 0; // Return 0 on error
      }
    },
    async getCollections() {
      this.collections = [];
      this.loading.collections = true;
      try {
        const { data } = await this.$storeino.collections.search({});
        if (data.results) this.collections = data.results;
        await this.fetchProductCounts(); // Fetch product counts after collections are set
      } catch (e) {
        console.log({ e });
      }
      this.loading.collections = false;
    },
    getSortByText(textSort) {
      this.sortText = textSort;
    },

    search() {
      this.$store.state.search = this.q;
      this.$router.push({ path: "/shop", query: { search: this.q } });
    },
  },
};
</script>
<style>
.color-option label {
  width: 16px;
  height: 16px;
  margin-left: 4px;
  margin-right: 4px;
  box-shadow: 0 0 0px 2px rgb(230, 230, 230);
}
.color-option.active label {
  color: transparent;
  box-shadow: 0 0 0px 2px white, 0 0 0px 3px #282828;
  margin-left: 6px;
  margin-right: 6px;
  width: 16px;
  height: 16px;
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

[dir="ltr"] .collec-name {
  margin-right: auto;
}

[dir="rtl"] .collec-name {
  margin-left: auto;
}

[dir="ltr"] .sub-collections .list-sub-collections {
  list-style: none;
  padding-left: 40px;
}

[dir="rtl"] .sub-collections .list-sub-collections {
  list-style: none;
  padding-right: 40px;
}

[dir="rtl"] .list-sub-collections li {
  text-align: right;
}

.fit-collapsible {
  overflow: unset;
  text-align: left;
  display: block;
  margin: 0;
  border: 0;
  outline: 0;
  vertical-align: baseline;
  background: 0 0;
}

.fit-collapsible .fit-collapsible-content {
  max-height: 0;
  position: relative;
  overflow: hidden;
  transition: 0.4s;
}

.fit-collapsible.active .fit-collapsible-content {
  max-height: 500px;
}

.rotated {
  transform: rotate(-92deg);
  transition: 0.3s;
}

.rotated.active {
  transform: rotate(0deg);
}

[dir="rtl"] .rotated {
  transform: rotate(92deg);
  transition: 0.3s;
}

[dir="rtl"] .rotated.active {
  transform: rotate(0deg);
}

option {
  /* Initial styling of options */
  color: #282828;
}

option:hover {
  background: white;
  background-color: white;
  text-decoration: underline;
}
</style>