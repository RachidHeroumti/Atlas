<template>
<div class="bg-white px-4">
    
    <div class="container py-2">
        <div class="flex flex-wrap sm:space-y-2">
            <div class="w-full flex flex-col justify-center px-3  p-2 font-poppins font-base text-12p space-y-2  text-gray-600">
                <div class="" v-html="$settings.sections.footer.email"></div>
                <div class="" v-html="$settings.sections.footer.phon"></div>
            </div> 
            <div class="w-full">
                <div class="p-2  h-full space-y-2">
                    <h3 class=" font-poppins font-normal text-base py-1 text-gray-800 ">{{ $settings.sections.footer.methods.title }}</h3>
                    <div class="flex flex-wrap  p-2 space-x-1">
                        <div v-for="item in methods.filter(m=>$settings.sections.footer.methods[m.name])" :key="item.name"
                             class="w-12 h-10 mx-2 flex items-center justify-center border ">
                            <si-image width="30" height="30" :src="item.image" :alt="item.name" class="h-full object-contain"/>
                        </div>
                    </div>

                    <div class="p-2 "></div>
                    
                    <h3 class=" font-poppins font-normal text-base py-1 text-gray-800">{{ $settings.sections.footer.social_media.title }}</h3>
                    <div class="flex flex-wrap">
                        <div v-for="item in socialMedia.filter(s=>$settings.sections.footer.social_media[s.name])" :key="item.name" class="h- m-2 flex items-center justify-between">
                            <a class="h-full flex" :href="$settings.sections.footer.social_media[item.name]" target="_blank" rel="noopener noreferrer">
                                <si-image class="h-5 w-5" width="16" height="16" :src="item.image" :alt="item.name"/>
                            </a>
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
                    image: 'https://www.svgrepo.com/show/508815/facebook.svg'
                },
              
                {
                    name: 'instagram',
                    image: 'https://www.svgrepo.com/show/521711/instagram.svg'
                },
                {
                    name: 'snapchat',
                    image: 'https://www.svgrepo.com/show/510208/snapchat.svg'
                },
                {
                    name: 'tiktok',
                    image: 'https://www.svgrepo.com/show/333611/tiktok.svg'
                }
            ]
        }
    },
}
</script>
