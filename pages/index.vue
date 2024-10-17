<template>
  <div class=" bg-white ">
    
   <div class="flex  w-full sm:h-screen ">
     <sections-header-menu></sections-header-menu>
   <template v-for="i in 2">
    
      <sections-products
        :key="i"
        :data-key="i"
        v-if="$settings.sections[`products_${i}`].active"
        :section="$settings.sections[`products_${i}`]"
        
      ></sections-products>
    </template>
    </div>
     

<!--
    <sections-posts v-if="$settings.sections.posts.active"></sections-posts>
    <sections-services
      v-if="$settings.sections.services.active"
    ></sections-services>
    -->
 
  </div>
</template>
<script>
export default {
  async fetch() {
    this.$store.state.seo.title = this.$settings.store_name;
    this.$store.state.seo.description = this.$settings.store_description;
  },
  mounted() {
    this.$tools.call("PAGE_VIEW");
    this.$storeino.fbpx("PageView");
  },
};
</script>
