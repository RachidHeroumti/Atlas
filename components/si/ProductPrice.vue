<template>
  <div>
    <meta itemprop="priceCurrency" :content="$store.state.currency.code" />

    <!-- Simple Product Price -->
    <div
      :class="[
        'price flex text-titles-color font-normal font-poppins',
        place === 'home' ? 'text-13p' : 'text-19p',
      ]"
      v-if="type == 'simple'"
    >
      <span
        >{{ price.salePrice ? price.salePrice : 0
        }}{{ $store.state.currency.symbol }}</span
      >
      <span class="flex w-2"></span>

      <span class="relative" v-if="price.comparePrice > 0">
        <b
          class="text-titles-color"
          style="text-decoration: line-through; text-decoration-color: red"
          >{{ price.comparePrice }}{{ $store.state.currency.symbol }}</b
        >
      </span>
      <meta itemprop="price" :content="price.salePrice" />
    </div>

    <!-- Variable Product Price (Range) -->
    <div
      :class="[
        'price flex justify-center my-2 font-poppins font-normal',
        place === 'home' ? 'text-13p' : 'text-19p',
      ]"
      v-else-if="minPrice != maxPrice"
    >
      <meta itemprop="price" :content="minPrice" />
      <span class="text-titles-color"
        >{{ minPrice }}{{ $store.state.currency.symbol }}</span
      >
      <span class="flex">~</span>
      <span class="text-titles-color"
        >{{ maxPrice }}{{ $store.state.currency.symbol }}</span
      >
    </div>

    <!-- Variant Prices -->
    <div
      :class="[
        'price flex justify-center my-2 font-poppins font-normal',
        place === 'home' ? 'text-13p' : 'text-19p',
      ]"
      v-else-if="variants.length > 0"
    >
      <meta itemprop="price" :content="variants[0].price.salePrice" />
      <span class="text-titles-color"
        >{{ variants[0].price.salePrice
        }}{{ $store.state.currency.symbol }}</span
      >
      <span class="flex w-2"></span>
      <span class="relative" v-if="variants[0].price.comparePrice > 0">
        <span class="text-titles-color"
          >{{ variants[0].price.comparePrice
          }}{{ $store.state.currency.symbol }}</span
        >
        <span
          class="compare-price absolute top-2 block w-full bg-red-600"
        ></span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: String,
    price: Object,
    originalPrice: { type: Object, default: null },
    variants: { type: Array, default: [] },
    place: {
      type: String,
      default: "home",
    },
  },
  data() {
    return {
      minPrice:
        this.type == "variable"
          ? Math.min(...this.variants.map((v) => v.price.salePrice))
          : 0,
      maxPrice:
        this.type == "variable"
          ? Math.max(...this.variants.map((v) => v.price.salePrice))
          : 0,
    };
  },
};
</script>

<style>
.compare-price {
  height: 0.2em;
  transform: rotate(-12deg);
  opacity: 0.5;
}
</style>
