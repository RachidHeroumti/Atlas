<template>
  <div class=" bg-white ">
    
   <div class="flex  w-full sm:h-screen ">
     <sections-header-menu></sections-header-menu>
   <template>
      <sections-products v-if="$settings.sections.products_1.active" :section="$settings.sections.products_1"></sections-products>
    </template>
    
    </div>
     
 
  </div>
</template>
<script>
export default {
  async fetch() {
   // console.log(" product 1 is active ?",this.$settings.sections[`products_${1}`].active);
    this.$store.state.seo.title = this.$settings.store_name;
    this.$store.state.seo.description = this.$settings.store_description;
  },
  mounted() {
    this.$tools.call("PAGE_VIEW");
    this.$storeino.fbpx("PageView");
  },
};
</script>
