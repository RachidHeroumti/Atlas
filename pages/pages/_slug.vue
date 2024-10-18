<template>
 <div  :style="backgroundStyle" class="image-background">
     <div v-if="loading" class="flex items-center justify-center my-5">
            <si-loader></si-loader>
        </div>
        <div class="w-full h-80 flex items-center justify-center" v-if="item">
            <h1 class="font-poppins font-bold text-5xl text-gray-900">{{item.title}}</h1> 
        </div>
       <div class=" w-full bg-white" v-if="item">
        <div v-if="item" class="container bg-white h-full p-5 space-y-3">
            <h1 class="m-2">{{ item.title }}</h1>
            <hr class="m-0">
            <p class="m-2"><small>{{ item.excerpt }}</small></p>
            <hr>
            <div  v-if="item" class="p-2 mx-2 my-3 bg-white rounded-md description" id="description" v-html="item.content"></div>

            <div v-if="$route.params.slug && $route.params.slug.indexOf('contact') > -1">
                <si-app-loader :placement="'AFTER_CONTACT_PAGE'"/>
            </div>

      
            <div class="flex items-center">
                <div class="flex w-full border-b border-gray-200 "></div>
                <h3 class="p-2  whitespace-nowrap">{{ $settings.sections.post.share_buttons.title }}</h3>
                <div class="flex w-full border-b border-gray-200 "></div>
            </div>

            
            
            <div class="flex justify-center ">
                <div v-for="item in socialMedia.filter(s=>$settings.sections.post.share_buttons[s.name])" :key="item.name" class="flex items-center justify-center h-12 m-2">
                    <a class="flex h-full" :href="item.url" target="_blank" rel="noopener noreferrer">
                        <si-image class="w-10 h-10" width="40" height="40" :src="item.image" :alt="item.name"/>
                    </a>
                </div>
            </div>
      
        </div>
    </div>
        <hr>
    </div>
</template>
<script> 
export default {
    data() {
        return {
            loading: true,
            item: null,
            socialMedia: [
                {
                    name: 'whatsapp',
                    url: 'https://api.whatsapp.com/send?text={title}%20{url}',
                    image: 'https://www.svgrepo.com/show/510342/whatsapp.svg'
                },
                {
                    name: 'facebook',
                    image: 'https://www.svgrepo.com/show/506656/facebook.svg',
                    url: 'https://www.facebook.com/sharer.php?u={url}'
                },
                {
                    name: 'twitter',
                    url: 'https://twitter.com/intent/tweet?url={url}&text={title}',
                    image: 'https://seeklogo.com/images/T/twitter-x-logo-19D2657BAA-seeklogo.com.png'
                },
                {
                    name: 'linkedin',
                    url: 'https://www.linkedin.com/sharing/share-offsite/?url={url}',
                    image: 'https://www.svgrepo.com/show/447138/linkedin-fill.svg'
                }
            ]
            
        }
    },
    async fetch(){
        try{
            const { slug } = this.$route.params;
            const { data } = await this.$storeino.pages.get({ slug, type: 'PAGE' })
           
            if(data)
               this.item = data;
            this.$store.state.seo.title = this.item.title + ' - ' + this.$settings.store_name;
            this.$store.state.seo.description = this.item.excerpt || this.$settings.store_description;
            if(this.item.image){ this.$store.state.seo.image = this.item.image.url; }
            let url = `https://${this.$store.state.domain}/pages/${slug}`;
            
            for (const button of this.socialMedia) {
                button.url = button.url.replace(/\{title\}/gi, this.item.title).replace(/\{url\}/gi, url);
            }
            this.loading = false;
        }catch(e){
            console.log("error",{e});
            this.$nuxt.error({ statusCode: 404, message: 'post_not_found' })
        }
    },
    mounted(){
      this.$storeino.fbpx('PageView')
    },
    computed: {
        backgroundStyle() {
            return {
                backgroundImage: `url(${this.$store.state.seo.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '100%'
            };
        }
    }
}
</script>

<style scoped>

</style>