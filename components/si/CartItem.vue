<template>

    <div>
        
        <div class="flex flex-col relative bg-white ">
            
         <div class=" grid  grid-cols-5 w-full border-t-2 border-b-2 border-gray-200 py-5 p-3 font-poppins text-base font-base text-gray-500"> 
               <div class=" flex items-center p-5 ">
                <button class="w-8 h-8 justify-center items-center  rounded-md " @click="remove">&times;</button>
            </div>

            <div class=" items-center">
                <div class="flex flex-col sm:flex-row items-center w-full">
                    <nuxt-link class="w-1/2 md:1/4 flex" :to="`/products/${item.slug}`">
                        <si-image class="border-2 border-gray-300 rounded-md object-contain w-full" :src="item.image" :alt="item.name"/>
                    </nuxt-link>
                    <div class=" w-1/2 md:w-3/4">
                        <div class="flex flex-col p-2">
                            <nuxt-link class="" :to="`/products/${item.slug}`">{{ item.name }}</nuxt-link>
                            <nuxt-link class="text-gray-600" :to="`/products/${item.slug}`"><b v-if="item.variant">{{ item.variant.name }}</b></nuxt-link>
                            <div v-if="item.upsell">
                                <b class="bg-red-700 text-white inline-block p-1 rounded-lg">-{{ item.upsell.value }} {{ item.upsell.type == 'percentage' ? '%' : $store.state.currency.symbol }}</b>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>

             <div class="  p-2 sm:flex items-center ">
                <b class="">{{ item.price }} </b> 
                <span>{{ $store.state.currency.symbol }}</span>
            </div>

            <div class="  flex items-center p-2">
                <si-product-quantity @selected="quantitySelected" :quantity="item.quantity"/>
            </div>

            <div class=" p-2 sm:flex items-center ">
                <b class=" ">{{ item.total }} </b>
                <span>{{ $store.state.currency.symbol }}</span>
            </div>
 
             </div>
          
           
        </div>
    </div>


</template>
<script>
export default {
    props: {
        item: { type: Object, required: true },
        quantity: { type: Number, default: 1 }
    },
    async fetch(){
        this.quantitySelected(this.item.quantity.value);
    },
    methods: {
        remove(){
            this.$emit("remove", this.item);
        },
        quantitySelected(quantity){
            this.item.quantity.value = quantity;
            this.item.total = this.item.price * quantity;
            let item = null;
            if(this.item.variant) item = this.$store.state.cart.find(i => i._id == this.item._id && this.item && i.variant._id == this.item.variant._id);
            else item = this.$store.state.cart.find(i => i._id == this.item._id && this.item && !i.variant);
            this.$tools.call('ADD_TO_CART', { ...item, quantity: quantity });
        }
    },
}
</script>