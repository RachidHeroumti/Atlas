<template>
  <transition name="fade">
    <div class="flex justify-center items-center fixed z-10 inset-0" v-if="$store.state.fullImage">
      <div
        @click="closeFullImage"
        class="bg-black absolute inset-0 bg-opacity-25"
      ></div>

      <div class="bg-white h-588p w-457p relative flex flex-col justify-center items-center">
        <transition name="fade">
          <si-image
            v-if="!$store.state.isReviewinFullimages"
            class="relative h-538p max-h-538p w-457p md:w-auto z-30 object-contain bg-white rounded-md shadow cursor-pointer"
            :src="image ? image.src : $store.state.fullImage"
            :alt="`Full screen image`"
            key="image"
          />
          <si-image
            v-else
            class="relative h-538p max-h-538p w-457p md:w-auto z-30 object-contain bg-white rounded-md shadow cursor-pointer"
            :src="image ? image : $store.state.fullImage"
            :alt="`Full screen image`"
            key="image"
          />
        </transition>

        <!-- Previous button -->
        <button
          @click="prevImage"
          class="absolute left-0 z-50  w-10 h-10 px-2 flex items-center justify-center"
          v-if="currentIndex > 0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
            <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
          </svg>
        </button>

        <!-- Next button -->
        <button
          @click="nextImage"
          class="absolute right-0 z-50 w-12 h-12 px-2 flex items-center justify-center"
          v-if="currentIndex < (isReviewImage ? reviews.results[0].images.length : item.images.length) - 1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
            <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
          </svg>
        </button>

        <div class="flex py-4 px-6 w-full">
          <!-- Pagination -->
          <div class="w-full flex justify-center items-center">
            <span class="text-base font-normal text-white-gray">
              {{ currentIndex + 1 }}/{{ isReviewImage ? reviews.results[0].images.length : item.images.length }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      item: null,
      image: null,
      currentIndex: 0,
      reviews: { paginate: { page: 0 }, results: [] },
      isReviewImage: false,
    };
  },
  
  async fetch() {
    const { slug } = this.$route.params;

    try {
      const productResponse = await this.$storeino.products.get({ slug });
      if (productResponse.data) {
        this.item = productResponse.data;

        const reviewsResponse = await this.$storeino.reviews.search({
          "product._id": this.item._id,
          page: this.reviews.paginate.page + 1,
        });

        if (reviewsResponse.data) {
          this.reviews = reviewsResponse.data;
        }

        this.$tools.call("PAGE_VIEW", this.item);
        this.image = this.item.images[this.currentIndex] || null;
      }
    } catch (e) {
      this.$sentry.captureException(e);
      console.error(e);
      this.$nuxt.error({ statusCode: 404, message: "product_not_found" });
    }
  },

  mounted() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.$store.state.fullImage) {
        this.closeFullImage();
      }
    });
  },

  methods: {
    closeFullImage() {
      this.$store.state.fullImage = null;
      this.image = null;
      this.$store.state.isReviewinFullimages=false ;
    },
    setImage(index) {
      this.currentIndex = index;
      if (this.$store.state.isReviewinFullimages) {
        this.image = this.reviews.results[0].images[index];
      } else {
        this.image = this.item.images[index];
      }
    },
    prevImage() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.setImage(this.currentIndex);
      }
    },
    nextImage() {
      const maxIndex = this.$store.state.isReviewinFullimages
        ? this.reviews.results[0].images.length - 1
        : this.item.images.length - 1;

      if (this.currentIndex < maxIndex) {
        this.currentIndex++;
        this.setImage(this.currentIndex);
      }
    },
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
