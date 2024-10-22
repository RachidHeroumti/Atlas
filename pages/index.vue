<template>
  <div class="bg-white">
    <div class="flex w-full sm:h-screen">
      <!-- Sidebar (header-menu) dynamically positioned based on language direction -->
      <sections-header-menu ></sections-header-menu>
      
      <template v-for="i in 1">
        <sections-products
          :key="i"
          :data-key="i"
          v-if="$settings.sections[`products_${i}`].active"
          :section="$settings.sections[`products_${i}`]"
        ></sections-products>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sidebarPosition: 'sidebar-left', // Default to LTR (English)
    };
  },

  async fetch() {
    this.$store.state.seo.title = this.$settings.store_name;
    this.$store.state.seo.description = this.$settings.store_description;
  },

  mounted() {
    // This will only run in the browser (client-side)
    const direction = document.documentElement.getAttribute('dir') || 'ltr'; // Default to 'ltr' (English and similar languages)
     console.log("language direction : ",document.documentElement.getAttribute('dir'));
    // Set sidebar position based on the document's text direction
    this.sidebarPosition = direction === 'rtl' ? 'sidebar-right' : 'sidebar-left';

    // Tracking page views
    this.$tools.call("PAGE_VIEW");
    this.$storeino.fbpx("PageView");
  },
};
</script>

<style>
/* Sidebar on the left for LTR (default for English and similar languages) */
.sidebar-left {
  order: 1; /* Sidebar first for LTR */
}

/* Sidebar on the right for RTL (e.g., Arabic) */
.sidebar-right {
  order: 2; /* Sidebar moved to the end for RTL */
}
</style>
