<template>
  <div class="bg-gray-900 text-white w-full py-16 p-10 ">
    <div class="container">
    <si-app-loader placement="BEFORE_FOOTER" />
    <div class="sm:flex justify-start sm:space-x-5 mb-3">
      <div class="w-full space-y-3">
        <p class=" ">{{$settings.sections.footer.about_us}}</p>
        <p class="text-gray-500" v-html="$settings.sections.footer.about"></p>
      </div>

      <div v-if=" menu&&menu.items" class="w-full space-y-3">
        <p>{{ $settings.sections.footer.download}}</p>
        <div 
          v-for="(item, i) in menu.items"
          :key="i"
          class="w-full text-gray-400"
        >
          <div class="">
            <h4 class="font-poppins font-base text-12p">
              <router-link :to="item.url">{{ item.text }}</router-link>
            </h4>
            <!--
                <ul class="p-2" v-if="item.childrens && item.childrens.length > 0">
                    <li v-for="(child,ii) in item.childrens" :key="ii">
                        <nuxt-link :to="child.url" class="submenu-title">
                            {{ child.text }}
                        </nuxt-link>
                        <ul class="p-2 rounded-md bg-gray-100" v-if="child.childrens && child.childrens.length > 0">
                            <li v-for="(child2,iii) in child.childrens" :key="iii">
                                <nuxt-link :to="child2.url" class="subsubmenu-title">
                                    {{ child2.text }}
                                </nuxt-link>
                            </li>
                        </ul>
                    </li>
                </ul>
-->
          </div>
        </div>
      </div>

      <div class="w-full space-y-3">
        
        <p class=" text-lg">{{ $settings.sections.footer.social_media.title }}</p> 
        <div class="text-12p font-poppins font-base text-gray-400">
          <div
            v-for="item in socialMedia.filter(
              (s) => $settings.sections.footer.social_media[s.name]
            )"
            :key="item.name"
            class="flex items-center justify-between"
          >
            <a
              class="h-full flex items-center space-y-2"
              :href="$settings.sections.footer.social_media[item.name]"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="hover:underline">{{ item.name }}</span>
            </a>
          </div>
        </div>
      </div>

      <div class="w-full space-y-3">
        <p>{{ $settings.sections.footer.call_center }}</p>
        <div>
          <p
            class="text-12p font-poppins font-normal text-gray-400"
            v-html="$settings.sections.footer.worktime"
          ></p>
          <p
            class="text-12p font-poppins font-normal text-gray-400"
            v-html="$settings.sections.footer.closetime"
          ></p>
          <p class="p-1"></p>
          <p
            class="text-12p font-poppins font-normal text-gray-400"
            v-html="$settings.sections.footer.email"
          ></p>
          <p
            class="text-12p font-poppins font-normal text-gray-400"
            v-html="$settings.sections.footer.phon"
          ></p>
        </div>
      </div>
    </div>
    <hr />
    <div
     v-if=" menu_bottom&&menu_bottom.items"
      class="w-full flex justify-center  space-x-2 sm:space-x-5 font-normal py-5 text-white"
    >
      <div
        v-for="(item, i) in menu_bottom.items"
        :key="i"
        class="font-poppins text-13p p-1"
      >
        <span class="font-poppins text-15p font-medium">
          <router-link :to="item.url">{{ item.text }}</router-link>
        </span>
      </div>
    </div>
    <si-app-loader placement="AFTER_FOOTER" />
  </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menu: this.$settings.sections.footer.menu,
      menu_bottom: this.$settings.sections.footer.menu_bottom,
      socialMedia: [
        {
          name: "facebook",
          image: "https://storeno.b-cdn.net/themes/palest/facebook.png",
        },
        {
          name: "twitter",
          image: "https://storeno.b-cdn.net/themes/palest/twitter.png",
        },
        {
          name: "instagram",
          image: "https://storeno.b-cdn.net/themes/palest/instagram.png",
        },
        {
          name: "youtube",
          image: "https://storeno.b-cdn.net/themes/palest/youtube.png",
        },
        {
          name: "whatsapp",
          image: "https://storeno.b-cdn.net/themes/palest/whatsapp.png",
        },
        {
          name: "linkedin",
          image: "https://storeno.b-cdn.net/themes/palest/linkedin.png",
        },
        {
          name: "snapchat",
          image: "https://storeno.b-cdn.net/themes/palest/snapchat.png",
        },
        {
          name: "tiktok",
          image: "https://storeno.b-cdn.net/themes/palest/tiktok.png",
        },
      ],
    };
  },
};
</script>
<style>
.menu-title {
  border-left: 4px solid var(--primary-color);
}
</style>
