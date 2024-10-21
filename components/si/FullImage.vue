<template>
  <transition name="fade">
    <div
      class="flex justify-center items-center fixed z-10 inset-0"
      v-if="$store.state.fullImage"
    >
      <div
        @click="
          $store.state.fullImage = null;
          image = null;
        "
        class="bg-black absolute inset-0 bg-opacity-25"
      ></div>

      <div
        class="bg-white h-588p w-457p relative flex flex-col justify-center items-center"
      >
        <transition name="fade">
          <si-image
            class="relative h-538p w-457p md:w-auto z-30 object-contain bg-white rounded-md shadow cursor-pointer"
            :src="image ? image.src : $store.state.fullImage"
            :alt="`Full screen image`"
            key="image"
          />
        </transition>

        <button
          @click="prevImage"
          class="absolute left-0 z-50 bg-white w-10 h-10 px-2 flex items-center justify-center"
          v-if="currentIndex > 0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#5f6368"
          >
            <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
          </svg>
        </button>

        <button
          @click="nextImage"
          class="absolute right-0 z-50 text-base font-medium bg-white text-titles-color w-12 h-12 px-2 flex items-center justify-center"
          v-if="currentIndex < item.images.length - 1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#5f6368"
          >
            <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
          </svg>
        </button>

        <div class="flex py-4 px-6 w-full">
          <div class="flex items-center">
            <button
              @click="prevImage"
              class="text-base font-medium text-titles-color bg-white flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#5f6368"
              >
                <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
              </svg>
            </button>

            <button
              @click="nextImage"
              class="text-base font-medium bg-white text-titles-color flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#5f6368"
              >
                <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
              </svg>
            </button>
          </div>

          <div class="w-full flex justify-center items-center">
            <span class="text-base font-normal text-white-gray"
              >{{ currentIndex + 1 }}/{{ this.item.images.length }}</span
            >
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
      isReviewImages: this.$store.state.isReviewinFullimages,
      currentIndex: 0,
      reviews: { paginate: { page: 0 }, results: [] },
      isReviewImg: false,
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
          console.log('reviews :',this.reviews) ;
        }

        this.$tools.call("PAGE_VIEW", this.item);

        /* this.currentIndex = this.item.images.findIndex(
        (img) => img.src === this.$store.state.fullImage
      ); */

           
          if(this.isReviewImages){
            console.log("review images");
          }
        this.image = this.item.images[this.currentIndex] || null;
        

      }
    } catch (e) {
      console.log(e);
      this.$nuxt.error({ statusCode: 404, message: "product_not_found" });
    }
  },
  mounted() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.$store.state.fullImage != null) {
        this.$store.state.fullImage = null;
      }
    });
  },

  methods: {
    setImage(index) {
      this.currentIndex = index;
      this.image = this.item.images[index];
    },
    prevImage() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.image = this.item.images[this.currentIndex];
      }
    },
    nextImage() {
      if (this.currentIndex < this.item.images.length - 1) {
        this.currentIndex++;
        this.image = this.item.images[this.currentIndex];
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
  