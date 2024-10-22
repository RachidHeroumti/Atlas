<template>
  <div class="container h-full" v-if="items.length > 0">
    <div class="m-2">
      <h2 class="font-poppins font-medium text-19p">{{ $settings.sections.product.related.title }}</h2>
    </div>
    <div class="flex justify-end bg-white font-poppins text-base" v-if="$settings.sections.products_1.show_more_text">
      <nuxt-link class="text-white-gray flex items-center" to="/shop">
        <span class="w-full">{{ $settings.sections.products_1.show_more_text }}</span>
        <svg class="h-4 translate" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" x="0" y="0" viewBox="0 0 492.004 492.004" style="enable-background:new 0 0 512 512" xml:space="preserve">
          <g>
            <path d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12 c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028 c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265 c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z" fill="#ffffff"></path>
          </g>
        </svg>
      </nuxt-link>
    </div>
    <div v-if="loading" class="flex justify-center items-center my-5">
      <si-loader></si-loader>
    </div>
    <div class="flex w-full">
      <div class="flex ">
        <div 
          v-for="(item, i) in visibleItems" 
          :key="i" 
          class="flex p-1 w-1/2 sm:w-1/3 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-1"
        >
          <si-product :item="item" place="product-page"></si-product>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  },
  data() {
    return {
      loading: true,
      items: [],
    };
  },
  computed: {
    visibleItems() {
      // Only access window in the client-side context
      if (process.client) {
        const screenWidth = window.innerWidth; // Get the current screen width
        let count;

        
        if (screenWidth < 768) { 
          count = 2; 
        } else if (screenWidth >= 768 && screenWidth < 1024) { 
          count = 3; 
        } else {
          count = 5; 
        }

        return this.items.slice(0, count); // Return the first 'count' items
      }

      // Fallback for server-side rendering
      return this.items.slice(0, 4); // Show max 4 items on SSR
    }
  },
  async fetch() {
    try {
      const ids = this.item.collections.map(c => c._id);
      const { data } = await this.$storeino.products.search({
        "_id-ne": this.item._id,
        "collections._id-in": ids
      });
      this.items = data.results;
    } catch (e) {
      console.log({ e });
    }
    this.loading = false;
  },
  mounted() {
    if (process.client) {
      window.addEventListener('resize', this.updateVisibleItems); // Update on resize
    }
  },
  beforeDestroy() {
    if (process.client) {
      window.removeEventListener('resize', this.updateVisibleItems); // Clean up
    }
  },
  methods: {
    updateVisibleItems() {
      this.$forceUpdate(); // Force re-evaluation of computed property
    },
  },
};
</script>
