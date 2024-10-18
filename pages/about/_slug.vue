<template>
    <div :style="backgroundStyle" class="image-background">
        <div class="w-full h-64 flex items-center justify-center">
            <h1 class="font-poppins font-bold text-5xl text-gray-900">{{ about.title }}</h1>
        </div>
        <div class="bg-white">
            <div class="container bg-white h-full p-5 space-y-3">
                <h1 class="font-poppins font-medium text-19p text-titles-color">
                    {{about.body.title1}}
                </h1>
                <p class="font-poppins font-normal text-base text-gray-600 pb-1">
                   {{about.body.description1}}
                </p>
                
                 <h1 class="font-poppins font-medium text-19p text-black">
                     {{about.body.title2}}
                </h1>
                <p class="font-poppins font-normal text-base text-gray-600 pb-1">
                   {{about.body.description2}}
                </p>
                
                 <h1 class="font-poppins font-medium text-19p text-black">
                     {{about.body.title3}}
                </h1>
                <p class="font-poppins font-normal text-base text-gray-600 pb-1">
                 {{about.body.description3}}
                </p>
                
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            about: this.$settings.sections.about 
        };
    },
    computed: {
        backgroundStyle() {
            const imgBacground=this.about.photo?.src;
            return {
                backgroundImage:imgBacground? `url(${imgBacground})`:'',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '100%'
            };
        }
    }
};
</script>

<style scoped>
.image-background {
    
}
</style>
