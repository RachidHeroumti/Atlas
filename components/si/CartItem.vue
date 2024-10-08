<template>

    <div class="">
        
        <div class="flex   bg-white py-2">
         <!--   
            <table>
                <tr>
                    <td class="flex">
                         <div class=" flex items-center ">
                <button class="w-8 h-8 justify-center items-center  rounded-md " @click="remove">&times;</button>
                        </div>
                        <div class=" flex md:flex-row flex-col items-center  ">
                <div class="flex flex-col sm:flex-row items-center w-full">
                    <nuxt-link class=" w-28 h-28    hidden lg:flex" :to="`/products/${item.slug}`">
                        <si-image  class="border-2 border-gray-300 rounded-md object-contain w-full" :src="item.image" :alt="item.name"/>
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
                    </td>

                    <td>
                        <div class="  md:p-2 md:flex items-center  ">
                <span class="">{{ item.price }} </span>
                <br> 
                <span>{{ $store.state.currency.symbol }}</span>
            </div>
                    </td>

                    <td>
                        <div class="  flex items-center sm:p-2 justify-center">
                <si-product-quantity @selected="quantitySelected" :quantity="item.quantity"/>
            </div>
                    </td>

                    <td>
                          <div class=" md:p-2 md:flex items-center ">
                <span class=" ">{{ item.total }} </span>
                <br>
                <span>{{ $store.state.currency.symbol }}</span>
                   </div>
                    </td>
                </tr>

            </table>
         -->   
        <div class="  flex items-center justify-center w-5 sm:w-12  md:w-16 xl:w-40 ">
                <button class="w-5 h-full justify-center items-center  rounded-md " @click="remove">&times;</button>
              </div>
         <div class=" grid  grid-cols-4 w-full gap-1 border-t-2 border-b-2 border-gray-200 py-5  font-poppins text-sm sm:text-base font-base text-gray-500"> 


             

            <div class=" flex items-center justify-center  w-full">
                <div class="flex flex-col sm:flex-row items-center w-full">
                    <nuxt-link class="w-1/2 md:1/4  hidden lg:flex" :to="`/products/${item.slug}`">
                        <si-image class="border-2 border-gray-300 rounded-md object-contain w-full h-28" :src="item.image" :alt="item.name"/>
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

            <div class=" flex flex-col md:flex-row  items-center  justify-center  w-full">
                <span class="">{{ item.price }} </span>
                <span>{{ $store.state.currency.symbol }}</span>
            </div>

            <div class="  flex items-center w-full justify-center ">
                <si-product-quantity @selected="quantitySelected" :quantity="item.quantity"/>
            </div>

            <div class=" flex flex-col md:flex-row  items-center justify-center   w-full ">
                <span class="">{{ item.total }} </span>
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
<style>