<template>
  <div v-if="item && item.review.reviews.length > 0" class=" bg-white border-b  ">
    <!--
    <div class="m-2">
      <h2 class="text-2xl">{{ $settings.sections.product.reviews.title }}</h2>
    </div> -->
    <div v-if="loading" class="flex justify-center items-center my-5">
      <si-loader></si-loader>
    </div>
    <div class="bg-white  my-3 reviews" id="reviews">
      <div class="flex flex-wrap">
        <div
          v-for="(review, index) in reviews.results"
          :key="index"
          class="w-full "
        >
          <div class="bg-white flex justify-between flex-col h-full w-full ">
            <div class="flex flex-col">
              <div class="flex">
                <div class="flex ">
                    
                  <div class="w-20 h-20 flex justify-center  bg-white py-1">
                    <si-avatar
                    :name="`${review.customer.firstname} ${review.customer.lastname}`"
                  ></si-avatar>
                  </div>  
                 
                  <div class="">
                    <b class="capitalize text-white-gray">{{
                      `${review.customer.firstname} ${review.customer.lastname}`
                    }}</b>
                    <div class="mb-1  flex">
                      <span
                        v-for="(star, i) in 5"
                        :class="
                          star <= review.rating
                            ? ' text-titles-color '
                            : ' text-white-gray '
                        "
                        :key="i"
                      >
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="star"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                          class="w-3 h-3 translate"
                        >
                          <path
                            fill="currentColor"
                            d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                          ></path>
                        </svg>
                      </span>
                    </div>
                    <div>{{ review.content }}</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="overflow-auto w-full  ">
              <div class="flex w-full">
                <si-image
                  width="100"
                  height="100"
                  class="w-16 h-16 m-1 bg-white  shadow cursor-pointer"
                  v-for="(image, index) in review.images"
                  :key="index"
                  :src="image"
                  @click="$store.state.fullImage = image"
                  :alt="`${review.rating} stars - ${review.content}`"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: { type: Object, default: null },
  },
  data() {
    return {
      reviews: { paginate: { page: 0 }, results: [] },
      loading: true,
    };
  },
  async fetch() {
    const { data } = await this.$storeino.reviews.search({
      "product._id": this.item._id,
      page: this.reviews.paginate.page + 1,
    });
    this.reviews = data;
    this.loading = false;
  },
};
</script>