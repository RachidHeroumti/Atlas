<template>
<div class="bg-white pt-4">
    <si-app-loader placement="BEFORE_FOOTER"/>
    <div class="container py-2">
        <div class="flex flex-wrap">
            
            <div class="w-full  p-5">
                <div class="p-2 border-r border-l h-full" v-html="$settings.sections.footer.bref_about"></div>
            </div> 
            <div class="w-full ">
                <div class="p-2 border-r border-l h-full space-y-2">
                    <h3 class=" text-xl py-2 text-gray-800 ">{{ $settings.sections.footer.methods.title }}</h3>
                    <div class="flex flex-wrap  p-2 space-x-1 space-y-1">
                        <div v-for="item in methods.filter(m=>$settings.sections.footer.methods[m.name])" :key="item.name" class="w-16 h-12 mx-2 flex items-center justify-center border p-2">
                            <si-image width="40" height="40" :src="item.image" :alt="item.name" class="h-full object-contain"/>
                        </div>
                    </div>

                    <div class="p-2 "></div>
                    
                    <h3 class=" text-lg">{{ $settings.sections.footer.social_media.title }}</h3>
                    <div class="flex flex-wrap">
                        <div v-for="item in socialMedia.filter(s=>$settings.sections.footer.social_media[s.name])" :key="item.name" class="h- m-2 flex items-center justify-between">
                            <a class="h-full flex" :href="$settings.sections.footer.social_media[item.name]" target="_blank" rel="noopener noreferrer">
                                <si-image class="h-6 w-6" width="20" height="20" :src="item.image" :alt="item.name"/>
                            </a>
                        </div>
                    </div>

                </div>

            </div>
            
        </div>
    </div>
    <si-app-loader placement="AFTER_FOOTER"/>
</div>
</template>

<script>
export default {
    data() {
        return {
            methods: [
                {
                    name: 'visa',
                    image: 'https://storeno.b-cdn.net/themes/palest/visa.png'
                },
                {
                    name: 'mastercard',
                    image: 'https://storeno.b-cdn.net/themes/palest/mastercard.png'
                },
                {
                    name: 'transfer',
                    image: 'https://storeno.b-cdn.net/themes/palest/transfer.png'
                },
                {
                    name: 'cash',
                    image: 'https://storeno.b-cdn.net/themes/palest/cod.png'
                }
            ],
            socialMedia: [
                {
                    name: 'facebook',
                    image: 'https://storeno.b-cdn.net/themes/palest/facebook.png'
                },
              
                {
                    name: 'instagram',
                    image: 'https://storeno.b-cdn.net/themes/palest/instagram.png'
                },
                {
                    name: 'snapchat',
                    image: 'https://storeno.b-cdn.net/themes/palest/snapchat.png'
                },
                {
                    name: 'tiktok',
                    image: 'https://storeno.b-cdn.net/themes/palest/tiktok.png'
                }
            ]
        }
    },
}
</script>
