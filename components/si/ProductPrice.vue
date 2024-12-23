<template>
  <div>
    <meta itemprop="priceCurrency" :content="$store.state.currency.code" />

    <!-- Simple Product Price -->
    <div
      :class="[
        ' flex text-titles-color font-normal font-poppins',
        place === 'home' ? 'text-13p' : 'text-19p',
      ]"
      v-if="type == 'simple'"
    >
      <span
        >   <span class="price">{{ price.comparePrice }}</span>
        <span class="currency">{{ $store.state.currency.symbol }}</span>
        </span
      >
      <span class="flex w-2"></span>

      <span class="relative" v-if="price.comparePrice > 0">
        <b
          class="text-titles-color"
          style="text-decoration: line-through; text-decoration-color: red"
          > <span class="price">{{ price.comparePrice }}</span>
          <span class="currency">{{ $store.state.currency.symbol }}</span></b
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
        > <span class="price">{{ minPrice }}</span>
        <span class="currency">{{ $store.state.currency.symbol }}</span></span
      >
      <span class="flex">~</span>
      <span class="text-titles-color">
         <span class="price">{{ maxPrice }}</span>
        <span class="currency">{{ $store.state.currency.symbol }}</span>
        </span>
    </div>

    <!-- Variant Prices -->
    <div
      :class="[
        ' flex justify-center my-2 font-poppins font-normal',
        place === 'home' ? 'text-13p' : 'text-19p',
      ]"
      v-else-if="variants.length > 0"
    >
      <meta itemprop="price" :content="variants[0].price.salePrice" />
      <span class="text-titles-color"
        >
        <span class="price">{{ variants[0].price.salePrice }}</span>
        <span class="currency">{{ $store.state.currency.symbol }}</span></span
      >
      <span class="flex w-2"></span>
      <span class="relative" v-if="variants[0].price.comparePrice > 0">
        <span class="text-titles-color"
          > <span class="price">{{ variants[0].price.comparePrice }}</span>
          <span class="currency">{{ $store.state.currency.symbol }}</span></span
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
