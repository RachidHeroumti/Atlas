<template>
    <div class="flex items-center font-poppins font-base justify-center  text-gray-400 sm:border border-gray-300  text-sm ">
        <button @click="inc(-1)" class="  py-2 px-2 md:px-4" :class="value > quantity.min ? ' ' : ''">&lt;</button>

        <div class="flex font-poppins font-base ">
            <label class="relative  py-2 h-full ">
                <span class="p-1 px-2 py-4 text-center ">{{ value }}</span>
                <input :min="quantity.min" :max="quantity.max" class=" text-center absolute outline-none inset-0 bg-opacity-0 w-full h-full" v-model="value" type="number">
            </label>
            <span class="flex items-center bg-white  px-2" v-if="quantity.unit">{{ quantity.unit }}</span>
        </div>

        <button @click="inc(1)" class=" py-2 px-2 md:px-4" :class="value < quantity.instock ? '' : ''">></button>
    </div>
</template>

<script>
export default {
    props: {
        quantity: Object,
    },
    data() {
        return {
            value: this.quantity.value || this.quantity.default || 1
        }
    },
    watch:{
        value(val){
            if(val > this.quantity.instock) this.value = this.quantity.instock;
            if(val < this.quantity.min) this.value = this.quantity.default;
            if(isNaN(val)) this.value = this.quantity.default;
            this.$emit('selected', this.value);
        }
    },
    methods: {
        inc(inc){
            this.value = Number(this.value) + (Number(this.quantity.increment) * Number(inc))
        }
    },
}
</script>
