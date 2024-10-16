<template>
<div class="bg-white">
    
    <div class="">
           <div class="flex flex-wrap ">
            <div class="w-full flex flex-col justify-center    font-poppins font-base text-12p space-y-2   text-gray-600">
                <p class="" v-html="$settings.sections.footer.email"></p>
                <p class="" v-html="$settings.sections.footer.phon"></p>
            </div> 

           </div>

            <div class="w-full my-3 space-y-2 ">
                    <div  v-if="socialMedia"
                    class="flex flex-wrap ">
                        <div v-for="item in socialMedia.filter(s=>$settings.sections.footer.social_media[s.name])" :key="item.name" class=" ml-3 flex items-center justify-between">
                            <a class="h-full flex" :href="$settings.sections.footer.social_media[item.name]" target="_blank" rel="noopener noreferrer">
                                <si-image class="h-4 w-4" width="16" height="16" :src="item.image" :alt="item.name"/>
                            </a>
                        </div>
                    </div>

                     <!--
                    <div class="flex flex-wrap space-x-1">
                        <div v-for="item in methods.filter(m=>$settings.sections.footer.methods[m.name])" :key="item.name"
                             class="w-10 h-8 mx-2 flex items-center justify-center border ">
                            <si-image width="30" height="30" :src="item.image" :alt="item.name" class="h-full object-contain"/>
                        </div>
                  </div>-->

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
                    image: 'https://www.svgrepo.com/show/333620/visa.svg'
                },
                {
                    name: 'mastercard',
                    image: 'https://www.svgrepo.com/show/394275/mastercard.svg'
                },
                {
                    name: 'transfer',
                    image: 'https://www.svgrepo.com/show/217948/money-flow-bank.svg'
                },
                {
                    name: 'cash',
                    image: 'https://www.svgrepo.com/show/308983/cash-payment-pay-money-cash.svg'
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

<style scoped>

</style>
