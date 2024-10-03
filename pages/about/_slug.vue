<template>
    <div class=" image-background">
        <div class=" w-full h-64 flex items-center justify-center ">
            <h1 class=" font-poppins font-bold text-19p text-gray-900 ">{{about.title }}</h1>
        </div>
        <div class=" bg-white">
        <div class=" container bg-white h-full">
            <h1>title 1?</h1>
            <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia exercitationem dolorem 
                sit aliquid cumque quas dolor fugit perspiciatis minima facilis fuga voluptatibus nemo qui,
                 animi a id maxime soluta placeat ?</p>
        </div>
        </div>

        
    </div>
</template>

<script>
export default {
    data() {
        return {
            about: this.$settings.sections.about
}
    },
    methods: {
      
    },
    mounted(){

    }
}
</script>

<style scoped>
.image-background {
    height: 100%; /* Height of your div */
    
    background-image: url('https://arredo.qodeinteractive.com/wp-content/uploads/2018/05/cart-title-img.jpg'); /* Image URL */
    background-size: cover; /* Ensures the image covers the entire div */
    background-position: center; /* Centers the image */
    background-repeat: no-repeat; /* Prevents the image from repeating */
}
</style>