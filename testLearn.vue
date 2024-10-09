<template>
    <div class="container mb-10">
        <!-- Pop-Up Placment -->
        <si-app-loader placement="SHOP_PAGE" />
        <!-- Pop-Up Placment -->
        <!-- nav -->
        <div class="flex flex-wrap items-center gap-2 py-5 text-xs font-semibold uppercase dosis-font md:py-6">
            <nuxt-link to="/">
                <div class="flex items-center gap-2 hover:underline">
                    <span>{{ $settings.sections.pages.home.name }}</span>
                    <svg class="translate" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="8px" height="8px"
                        viewBox="0 0 32 32">
                        <path
                            d="M8.489 31.975c-0.271 0-0.549-0.107-0.757-0.316-0.417-0.417-0.417-1.098 0-1.515l14.258-14.264-14.050-14.050c-0.417-0.417-0.417-1.098 0-1.515s1.098-0.417 1.515 0l14.807 14.807c0.417 0.417 0.417 1.098 0 1.515l-15.015 15.022c-0.208 0.208-0.486 0.316-0.757 0.316z" />
                    </svg>
                </div>
            </nuxt-link>
            <div class="flex items-center primary-gray-text">
                <span>{{ $settings.sections.pages.shop.name }}</span>
            </div>
        </div>
        <!-- nav -->
        <si-app-loader placement="BEFORE_SHOP_SIDEBAR" />
        <!-- sideBar  shop content -->
        <div class="flex lg:gap-10">
            <!-- sideBar -->
            <div class="lg:w-1/4" v-show="$settings.sections.shop.sidebar.active">
                <transition name="fade">
                    <div v-show="windowWidth < 1024 ? showSideBar : true" :class="showSideBar ? 'show' : 'hide'"
                        class="fixed inset-0 z-50 hidden w-full h-full overflow-y-auto bg-white lg:block lg:static lg:w-auto lg:h-auto lg:inset-auto lg:z-auto scroll-y">
                        <div class="flex flex-col w-full p-5 lg:p-0">
                            <!-- sidebar title -->
                            <div class="flex items-center justify-between border-b lg:hidden pb-7">
                                <h2 class="text-sm">{{ $settings.sections.shop.sidebar.filter_text }}</h2>
                                <button class="p-1 text-white rounded-full primary-gray-bg bg-secondary-hover"
                                    @click="showSideBar = false" aria-label="Close Button">
                                    <svg aria-label="close icon" width="13" height="13" viewBox="0 0 20 20" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M10.71 10l4.65-4.66a.495.495 0 10-.7-.7L10 9.29 5.34 4.64a.495.495 0 00-.7.7L9.29 10l-4.65 4.66a.48.48 0 000 .7.481.481 0 00.7 0L10 10.71l4.66 4.65a.482.482 0 00.7 0 .48.48 0 000-.7L10.71 10z"
                                            fill="currentColor"></path>
                                    </svg>
                                </button>
                            </div>
                            <!-- sidebar title -->
                            <!-- filters loader -->
                            <div v-show="loading.filters && loading.filters && loading.collections"
                                class="flex items-center justify-center my-5">
                                <si-loader></si-loader>
                            </div>
                            <!-- filters loader -->
                            <!-- product filters -->
                            <div class="flex flex-col lg:gap-10"
                                v-show="!loading.filters && !loading.filters && !loading.collections">
                                <!--  Collections -->
                                <div class="border-b py-7 lg:py-0 lg:border-0 border-primary-color"
                                    v-show="$settings.sections.shop.sidebar.collections.active && collections.length > 0">
                                    <!-- Collections title -->
                                    <div v-show="$settings.sections.shop.sidebar.collections.title.length > 0"
                                        class="flex mb-5">
                                        <h2 class="font-semibold tracking-normal uppercase text-sml dosis-font">{{
                                            $settings.sections.shop.sidebar.collections.title }}</h2>
                                    </div>
                                    <!-- Collections title -->
                                    <!-- collections name -->
                                    <div class="flex flex-col gap-3">
                                        <!-- parent collections -->
                                        <div v-for="(item, i) in collections" :key="i">
                                            <!-- Parent Collction -->
                                            <div class="flex items-center justify-between w-full cursor-pointer"
                                                v-show="item.childrens && item.childrens.length > 0">
                                                <label
                                                    class="relative flex items-center w-full gap-4 cursor-pointer collec-hover">
                                                    <input hidden type="checkbox"
                                                        class="absolute top-0 left-0 form-checkbox" style="z-index: -1"
                                                        :checked="params['collections.slug-in'] && params['collections.slug-in'].indexOf(item.slug) >= 0"
                                                        :id="item.slug"
                                                        @change="setParams($event, 'collections.slug-in', item.slug)">
                                                    <div
                                                        class="w-3.5 h-3.5 flex justify-center items-center bg-white border border-primary-color rounded-sm">
                                                        <svg class="hidden w-2.5 h-2.5 text-white" viewBox="0 0 20 20">
                                                            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" fill="currentColor" />
                                                        </svg>
                                                    </div>
                                                    <label class="capitalize cursor-pointer text-xsl primary-gray-text"
                                                        :for="item.slug">{{ item.name }}</label>
                                                </label>
                                                <div class="transition-all svg-display"
                                                    @click="setActive(i + 'fit', i + 'ret')" :id="i + 'ret'">
                                                    <div class="transition-all plus">
                                                        <svg class="w-4 h-4" aria-label="plus icon" width="20" height="20"
                                                            viewBox="0 0 20 20" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M15.5 9.4h-4.9V4.5a.6.6 0 10-1.2 0v4.9H4.5a.6.6 0 000 1.2h4.9v4.9a.6.6 0 001.2 0v-4.9h4.9a.6.6 0 100-1.2z"
                                                                fill="currentColor"></path>
                                                        </svg>
                                                    </div>
                                                    <div class="hidden transition-all minus">
                                                        <svg class="w-4 h-4" aria-label="minus icon" width="20" height="20"
                                                            viewBox="0 0 20 20" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M15.5 9.45h-11a.55.55 0 000 1.1h11a.55.55 0 000-1.1z"
                                                                fill="currentColor"></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- Parent Collction -->
                                            <!-- childe collection -->
                                            <div :id="i + 'fit'" class="relative overflow-hidden transition-all max-h-0"
                                                v-show="item.childrens && item.childrens.length > 0">
                                                <div class="flex flex-col gap-3 mt-3 ml-8">
                                                    <div v-for="(child, key) in item.childrens" :key="key">
                                                        <div class="flex items-center justify-between w-full cursor-pointer"
                                                            v-show="child.childrens && child.childrens.length > 0">
                                                            <label
                                                                class="relative flex items-center w-full gap-4 cursor-pointer collec-hover">
                                                                <input hidden type="checkbox"
                                                                    class="absolute top-0 left-0 form-checkbox"
                                                                    style="z-index: -1"
                                                                    :checked="params['collections.slug-in'] && params['collections.slug-in'].indexOf(child.slug) >= 0"
                                                                    :id="child.slug"
                                                                    @change="setParams($event, 'collections.slug-in', child.slug)">
                                                                <div
                                                                    class="w-3.5 h-3.5 flex justify-center items-center bg-white border border-primary-color rounded-sm">
                                                                    <svg class="hidden w-2.5 h-2.5 text-white"
                                                                        viewBox="0 0 20 20">
                                                                        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z"
                                                                            fill="currentColor" />
                                                                    </svg>
                                                                </div>
                                                                <label
                                                                    class="capitalize cursor-pointer text-xsl primary-gray-text"
                                                                    :for="child.slug">{{ child.name }}</label>
                                                            </label>
                                                            <div class="transition-all svg-display"
                                                                @click="setActive(key +`fiti-${i}`, key +`reti-${i}`)"
                                                                :id="key +`reti-${i}`">
                                                                <div class="transition-all plus">
                                                                    <svg class="w-4 h-4" aria-label="plus icon" width="20"
                                                                        height="20" viewBox="0 0 20 20" fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg">
                                                                        <path
                                                                            d="M15.5 9.4h-4.9V4.5a.6.6 0 10-1.2 0v4.9H4.5a.6.6 0 000 1.2h4.9v4.9a.6.6 0 001.2 0v-4.9h4.9a.6.6 0 100-1.2z"
                                                                            fill="currentColor"></path>
                                                                    </svg>
                                                                </div>
                                                                <div class="hidden transition-all minus">
                                                                    <svg class="w-4 h-4" aria-label="minus icon" width="20"
                                                                        height="20" viewBox="0 0 20 20" fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg">
                                                                        <path
                                                                            d="M15.5 9.45h-11a.55.55 0 000 1.1h11a.55.55 0 000-1.1z"
                                                                            fill="currentColor"></path>
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <!-- Simple Collction -->
                                                        <label
                                                            class="relative flex items-center w-full gap-4 cursor-pointer collec-hover"
                                                            v-show="child.childrens && child.childrens.length == 0">
                                                            <input hidden type="checkbox"
                                                                class="absolute top-0 left-0 form-checkbox"
                                                                style="z-index: -1"
                                                                :checked="params['collections.slug-in'] && params['collections.slug-in'].indexOf(child.slug) >= 0"
                                                                :id="child.slug"
                                                                @change="setParams($event, 'collections.slug-in', child.slug)">
                                                            <div
                                                                class="w-3.5 h-3.5 flex justify-center items-center bg-white border border-primary-color rounded-sm">
                                                                <svg class="hidden w-2.5 h-2.5 text-white"
                                                                    viewBox="0 0 20 20">
                                                                    <path d="M0 11l2-2 5 5L18 3l2 2L7 18z"
                                                                        fill="currentColor" />
                                                                </svg>
                                                            </div>
                                                            <label
                                                                class="capitalize cursor-pointer text-xsl primary-gray-text"
                                                                :for="child.slug">{{ child.name }}</label>
                                                        </label>
                                                        <!-- Simple Collction -->
                                                        <div :id="key +`fiti-${i}`"
                                                            class="relative overflow-hidden transition-all max-h-0"
                                                            v-show="item.childrens && item.childrens.length > 0">
                                                            <div class="flex flex-col gap-3 mt-3 ml-8">
                                                                <div v-for="(childe, ind) in child.childrens" :key="ind">
                                                                    <div class="flex items-center justify-between w-full cursor-pointer"
                                                                        v-show="childe.childrens && childe.childrens.length > 0">
                                                                        <label
                                                                            class="relative flex items-center w-full gap-4 cursor-pointer collec-hover">
                                                                            <input hidden type="checkbox"
                                                                                class="absolute top-0 left-0 form-checkbox"
                                                                                style="z-index: -1"
                                                                                :checked="params['collections.slug-in'] && params['collections.slug-in'].indexOf(childe.slug) >= 0"
                                                                                :id="childe.slug"
                                                                                @change="setParams($event, 'collections.slug-in', childe.slug)">
                                                                            <div
                                                                                class="w-3.5 h-3.5 flex justify-center items-center bg-white border border-primary-color rounded-sm">
                                                                                <svg class="hidden w-2.5 h-2.5 text-white"
                                                                                    viewBox="0 0 20 20">
                                                                                    <path d="M0 11l2-2 5 5L18 3l2 2L7 18z"
                                                                                        fill="currentColor" />
                                                                                </svg>
                                                                            </div>
                                                                            <label
                                                                                class="capitalize cursor-pointer text-xsl primary-gray-text"
                                                                                :for="childe.slug">{{ childe.name }}</label>
                                                                        </label>
                                                                        <div class="transition-all svg-display"
                                                                            @click="setActive(ind + i+ 'fite', ind+ i + 'rete')"
                                                                            :id="ind+ i + 'rete'">
                                                                            <div class="transition-all plus">
                                                                                <svg class="w-4 h-4" aria-label="plus icon"
                                                                                    width="20" height="20"
                                                                                    viewBox="0 0 20 20" fill="none"
                                                                                    xmlns="http://www.w3.org/2000/svg">
                                                                                    <path
                                                                                        d="M15.5 9.4h-4.9V4.5a.6.6 0 10-1.2 0v4.9H4.5a.6.6 0 000 1.2h4.9v4.9a.6.6 0 001.2 0v-4.9h4.9a.6.6 0 100-1.2z"
                                                                                        fill="currentColor"></path>
                                                                                </svg>
                                                                            </div>
                                                                            <div class="hidden transition-all minus">
                                                                                <svg class="w-4 h-4" aria-label="minus icon"
                                                                                    width="20" height="20"
                                                                                    viewBox="0 0 20 20" fill="none"
                                                                                    xmlns="http://www.w3.org/2000/svg">
                                                                                    <path
                                                                                        d="M15.5 9.45h-11a.55.55 0 000 1.1h11a.55.55 0 000-1.1z"
                                                                                        fill="currentColor"></path>
                                                                                </svg>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                     <!-- Simple Collction -->
                                                        <label
                                                            class="relative flex items-center w-full gap-4 cursor-pointer collec-hover"
                                                            v-show="childe.childrens && childe.childrens.length == 0">
                                                            <input hidden type="checkbox"
                                                                class="absolute top-0 left-0 form-checkbox"
                                                                style="z-index: -1"
                                                                :checked="params['collections.slug-in'] && params['collections.slug-in'].indexOf(childe.slug) >= 0"
                                                                :id="childe.slug"
                                                                @change="setParams($event, 'collections.slug-in', childe.slug)">
                                                            <div
                                                                class="w-3.5 h-3.5 flex justify-center items-center bg-white border border-primary-color rounded-sm">
                                                                <svg class="hidden w-2.5 h-2.5 text-white"
                                                                    viewBox="0 0 20 20">
                                                                    <path d="M0 11l2-2 5 5L18 3l2 2L7 18z"
                                                                        fill="currentColor" />
                                                                </svg>
                                                            </div>
                                                            <label
                                                                class="capitalize cursor-pointer text-xsl primary-gray-text"
                                                                :for="childe.slug">{{ childe.name }}</label>
                                                        </label>
                                                        <!-- Simple Collction -->
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                            <!-- childe collection -->
                                            <!-- Simple Collction -->
                                            <label
                                                class="relative flex items-center w-full gap-4 cursor-pointer collec-hover"
                                                v-show="item.childrens && item.childrens.length == 0">
                                                <input hidden type="checkbox" class="absolute top-0 left-0 form-checkbox"
                                                    style="z-index: -1"
                                                    :checked="params['collections.slug-in'] && params['collections.slug-in'].indexOf(item.slug) >= 0"
                                                    :id="item.slug"
                                                    @change="setParams($event, 'collections.slug-in', item.slug)">
                                                <div
                                                    class="w-3.5 h-3.5 flex justify-center items-center bg-white border border-primary-color rounded-sm">
                                                    <svg class="hidden w-2.5 h-2.5 text-white" viewBox="0 0 20 20">
                                                        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" fill="currentColor" />
                                                    </svg>
                                                </div>
                                                <label class="capitalize cursor-pointer text-xsl primary-gray-text"
                                                    :for="item.slug">{{ item.name }}</label>
                                            </label>
                                            <!-- Simple Collction -->
                                        </div>
                                    </div>
                                    <!-- collections name -->
                                </div>
                                <!-- Collections -->
                                <!-- Prices -->
                                <div class="border-b py-7 lg:py-0 lg:border-0 border-primary-color"
                                    v-if="$settings.sections.shop.sidebar.prices.active && filters && filters.prices && filters.prices.length > 0">
                                    <!-- Prices title -->
                                    <div v-show="$settings.sections.shop.sidebar.prices.title.length > 0" class="flex mb-5">
                                        <h2 class="font-semibold tracking-normal uppercase text-sml dosis-font">{{
                                            $settings.sections.shop.sidebar.prices.title }}</h2>
                                    </div>
                                    <!-- Prices title -->
                                    <!-- Price Range -->
                                    <div class="flex flex-col" dir="ltr">
                                        <si-price-range @change="setParams" :min="filters.prices.min"
                                            :max="filters.prices.max" />
                                    </div>
                                    <!-- Price Range -->
                                </div>
                                <!-- Prices -->
                                <!-- Sizes -->
                                <div class="border-b py-7 lg:py-0 lg:border-0 border-primary-color"
                                    v-if="$settings.sections.shop.sidebar.sizes.active && filters && filters.sizes && filters.sizes.length > 0">
                                    <!-- Sizes title -->
                                    <div v-show="$settings.sections.shop.sidebar.sizes.title.length > 0" class="flex mb-5">
                                        <h2 class="font-semibold tracking-normal uppercase text-sml dosis-font">{{
                                            $settings.sections.shop.sidebar.sizes.title }}</h2>
                                    </div>
                                    <!-- Sizes title -->
                                    <!-- Sizes -->
                                    <div class="flex flex-col gap-3">
                                        <div v-for="(item, i) in filters.sizes" :key="i">
                                            <label
                                                class="relative flex items-center w-full gap-4 cursor-pointer collec-hover">
                                                <input hidden type="checkbox" class="absolute top-0 left-0 form-checkbox"
                                                    style="z-index: -1"
                                                    :checked="params['options.values.value1'] && params['options.values.value1'].indexOf(item.value1) >= 0"
                                                    :id="item.value1"
                                                    @change="setParams($event, 'options.values.value1', item.value1)">
                                                <div
                                                    class="w-3.5 h-3.5 flex justify-center items-center bg-white border border-primary-color rounded-sm">
                                                    <svg class="hidden w-2.5 h-2.5 text-white" viewBox="0 0 20 20">
                                                        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" fill="currentColor" />
                                                    </svg>
                                                </div>
                                                <label class="capitalize cursor-pointer text-xsl primary-gray-text"
                                                    :for="item.value1">{{ item.value1 }}</label>
                                            </label>
                                        </div>
                                    </div>
                                    <!-- Sizes -->
                                </div>
                                <!-- Sizes -->
                                <!-- Colors -->
                                <div class="border-b py-7 lg:py-0 lg:border-0 border-primary-color"
                                    v-if="$settings.sections.shop.sidebar.colors.active && filters && filters.colors && filters.colors.length > 0">
                                    <!-- Colors title -->
                                    <div v-show="$settings.sections.shop.sidebar.colors.title.length > 0" class="flex mb-5">
                                        <h2 class="font-semibold tracking-normal uppercase text-sml dosis-font">{{
                                            $settings.sections.shop.sidebar.colors.title }}</h2>
                                    </div>
                                    <!-- Colors title -->
                                    <!-- Colors -->
                                    <div class="flex flex-col gap-3">
                                        <div v-for="(item, i) in filters.colors" :key="i">
                                            <label
                                                class="relative flex items-center w-full gap-4 cursor-pointer collec-hover">
                                                <input hidden type="checkbox" class="absolute top-0 left-0 form-checkbox"
                                                    style="z-index: -1" :id="item.value1"
                                                    :checked="params['options.values.value1'] && params['options.values.value1'].indexOf(item.value1) >= 0"
                                                    @change="setParams($event, 'options.values.value1', item.value1)">
                                                <div
                                                    class="w-3.5 h-3.5 flex justify-center items-center bg-white border border-primary-color rounded-sm">
                                                    <svg class="hidden w-2.5 h-2.5 text-white" viewBox="0 0 20 20">
                                                        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" fill="currentColor" />
                                                    </svg>
                                                </div>
                                                <label class="capitalize cursor-pointer text-xsl primary-gray-text"
                                                    :for="item.value1" :aria-label="item.value1">{{ item.value1 }}</label>
                                            </label>
                                        </div>
                                    </div>
                                    <!-- Colors -->
                                </div>
                                <!-- Colors -->
                                <!-- tags -->
                                <div class="border-b py-7 lg:py-0 lg:border-0 border-primary-color"
                                    v-if="$settings.sections.shop.sidebar.tags.active && filters && filters.tags && filters.tags.length > 0">
                                    <!-- tags title -->
                                    <div v-show="$settings.sections.shop.sidebar.tags.title.length > 0" class="flex mb-5">
                                        <h2 class="font-semibold tracking-normal uppercase text-sml dosis-font">{{
                                            $settings.sections.shop.sidebar.tags.title }}</h2>
                                    </div>
                                    <!-- tags title -->
                                    <!-- tags -->
                                    <div class="flex flex-col gap-3">
                                        <div v-for="(tag, i) in filters.tags" :key="i">
                                            <label
                                                class="relative flex items-center w-full gap-4 cursor-pointer collec-hover">
                                                <input hidden type="checkbox" class="absolute top-0 left-0 form-checkbox"
                                                    style="z-index: -1" :id="`tag_${tag}`"
                                                    :checked="params['tags-in'] && params['tags-in'].indexOf(tag) >= 0"
                                                    @change="setParams($event, 'tags-in', tag)">
                                                <div
                                                    class="w-3.5 h-3.5 flex justify-center items-center bg-white border border-primary-color rounded-sm">
                                                    <svg class="hidden w-2.5 h-2.5 text-white" viewBox="0 0 20 20">
                                                        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" fill="currentColor" />
                                                    </svg>
                                                </div>
                                                <label class="capitalize cursor-pointer text-xsl primary-gray-text"
                                                    :for="`tag_${tag}`">{{ tag }}</label>
                                            </label>
                                        </div>
                                    </div>
                                    <!-- tags -->
                                </div>
                                <!-- tags -->
                                <!-- brands -->
                                <div class="border-b py-7 lg:py-0 lg:border-0 border-primary-color"
                                    v-show="$settings.sections.shop.sidebar.brands.active && brands.length > 0">
                                    <!-- brands title -->
                                    <div v-show="$settings.sections.shop.sidebar.brands.title.length > 0" class="flex mb-5">
                                        <h2 class="font-semibold tracking-normal uppercase text-sml dosis-font">{{
                                            $settings.sections.shop.sidebar.brands.title }}</h2>
                                    </div>
                                    <!-- brands title -->
                                    <!-- brands -->
                                    <div class="flex flex-col gap-3">
                                        <div v-for="(item, i) in brands" :key="i">
                                            <label
                                                class="relative flex items-center w-full gap-4 cursor-pointer collec-hover">
                                                <input hidden type="checkbox" class="absolute top-0 left-0 form-checkbox"
                                                    style="z-index: -1" :id="item.slug"
                                                    :checked="params['brand.slug-in'] && params['brand.slug-in'].indexOf(item.slug) >= 0"
                                                    @change="setParams($event, 'brand.slug-in', item.slug)">
                                                <div
                                                    class="w-3.5 h-3.5 flex justify-center items-center bg-white border border-primary-color rounded-sm">
                                                    <svg class="hidden w-2.5 h-2.5 text-white" viewBox="0 0 20 20">
                                                        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" fill="currentColor" />
                                                    </svg>
                                                </div>
                                                <label class="capitalize cursor-pointer text-xsl primary-gray-text"
                                                    :for="item.slug">{{ item.name }}</label>
                                            </label>
                                        </div>
                                    </div>
                                    <!-- brands -->
                                </div>
                                <!-- brands -->
                                <!-- banner -->
                                <div class="py-7 lg:py-0" v-show="$settings.sections.shop.sidebar.banner.active">
                                    <!-- title -->
                                    <div v-show="$settings.sections.shop.sidebar.banner.title.length > 0" class="flex mb-5">
                                        <h2 class="font-semibold tracking-normal uppercase text-sml dosis-font">{{
                                            $settings.sections.shop.sidebar.banner.title }}</h2>
                                    </div>
                                    <!-- title -->
                                    <!-- image -->
                                    <si-image class="object-cover w-full h-full rounded-md"
                                        :src="$settings.sections.shop.sidebar.banner.image ? $settings.sections.shop.sidebar.banner.image.src : $store.state.defaults.WidgetBannerImage"
                                        :alt="$settings.sections.shop.sidebar.banner.title" />
                                    <!-- image -->
                                </div>
                                <!-- banner -->
                            </div>
                            <!-- product filters -->
                        </div>
                    </div>
                </transition>
            </div>
            <!-- sideBar -->
            <!-- shop content -->
            <div :class="$settings.sections.shop.sidebar.active ? 'w-full lg:w-3/4' : 'w-full'">
                <!-- collection banner -->
                <div v-show="$settings.sections.shop.banner.active"
                    class="relative h-40 mb-5 overflow-hidden rounded-lg lg:h-60">
                    <si-image class="object-cover w-full h-full"
                        :src="$settings.sections.shop.banner.image ? $settings.sections.shop.banner.image.src : $store.state.defaults.BannersImage"
                        :alt="$settings.sections.shop.banner.title" />
                    <div class="absolute inset-0 flex items-center justify-center">
                        <div :style="`max-width: 70%; color: ${$settings.sections.shop.banner.text_color};`"
                            class="flex flex-col gap-2">
                            <h1 v-show="$settings.sections.shop.banner.subtitle.length > 0"
                                class="text-lg font-extralight md:text-xl lg:text-2xl">{{
                                    $settings.sections.shop.banner.subtitle }}</h1>
                            <h1 v-show="$settings.sections.shop.banner.title.length > 0"
                                class="text-xl font-semibold md:text-2xl lg:text-3xl">{{
                                    $settings.sections.shop.banner.title }}</h1>
                            <h1 v-show="$settings.sections.shop.banner.description.length > 0"
                                class="text-xs primary-gray-text">{{ $settings.sections.shop.banner.description }}</h1>
                        </div>
                    </div>
                </div>
                <!-- collection banner -->
                <!-- filters & sorts -->
                <div class="flex items-center mb-5 rounded-lg product-bg h-14 px-7"
                    :class="$settings.sections.shop.sidebar.active ? 'justify-between' : 'justify-end lg:justify-between'">
                    <!-- show sidebar -->
                    <div class="flex items-center gap-2 cursor-pointer lg:hidden"
                        v-show="$settings.sections.shop.sidebar.active" @click="showSideBar = true">
                        <svg class="w-3.5 h-3.5" width="20px" height="20px" viewBox="0 0 32 32" fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12,25l6.67,6.67a1,1,0,0,0,.7.29.91.91,0,0,0,.39-.08,1,1,0,0,0,.61-.92V13.08L31.71,1.71A1,1,0,0,0,31.92.62,1,1,0,0,0,31,0H1A1,1,0,0,0,.08.62,1,1,0,0,0,.29,1.71L11.67,13.08V24.33A1,1,0,0,0,12,25ZM3.41,2H28.59l-10,10a1,1,0,0,0-.3.71V28.59l-4.66-4.67V12.67a1,1,0,0,0-.3-.71Z" />
                        </svg>
                        <div class="font-medium text-xsl">{{ $settings.sections.shop.sidebar.filter_text }}</div>
                    </div>
                    <!-- show sidebar -->
                    <!-- grid show -->
                    <div class="items-center hidden gap-2 lg:flex">
                        <div class="cursor-pointer primary-gray-text hover:text-black"
                            @click="gridClass = 'w-full'; page = 'shop'">
                            <svg :class="gridClass == 'w-full' ? 'text-black' : ''" width="18px" height="18px"
                                viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M14.5 4C14.5 5.38071 13.3807 6.5 12 6.5C10.6193 6.5 9.5 5.38071 9.5 4C9.5 2.61929 10.6193 1.5 12 1.5C13.3807 1.5 14.5 2.61929 14.5 4Z"
                                    fill="currentColor" />
                                <path
                                    d="M14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5C13.3807 9.5 14.5 10.6193 14.5 12Z"
                                    fill="currentColor" />
                                <path
                                    d="M12 22.5C13.3807 22.5 14.5 21.3807 14.5 20C14.5 18.6193 13.3807 17.5 12 17.5C10.6193 17.5 9.5 18.6193 9.5 20C9.5 21.3807 10.6193 22.5 12 22.5Z"
                                    fill="currentColor" />
                            </svg>
                        </div>
                        <div class="cursor-pointer primary-gray-text hover:text-black"
                            @click="gridClass = 'w-1/2'; page = ''">
                            <svg :class="gridClass == 'w-1/2' ? 'text-black' : ''" width="18px" height="18px"
                                viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8 6.5C9.38071 6.5 10.5 5.38071 10.5 4C10.5 2.61929 9.38071 1.5 8 1.5C6.61929 1.5 5.5 2.61929 5.5 4C5.5 5.38071 6.61929 6.5 8 6.5Z"
                                    fill="currentColor" />
                                <path
                                    d="M15.5 6.5C16.8807 6.5 18 5.38071 18 4C18 2.61929 16.8807 1.5 15.5 1.5C14.1193 1.5 13 2.61929 13 4C13 5.38071 14.1193 6.5 15.5 6.5Z"
                                    fill="currentColor" />
                                <path
                                    d="M10.5 12C10.5 13.3807 9.38071 14.5 8 14.5C6.61929 14.5 5.5 13.3807 5.5 12C5.5 10.6193 6.61929 9.5 8 9.5C9.38071 9.5 10.5 10.6193 10.5 12Z"
                                    fill="currentColor" />
                                <path
                                    d="M15.5 14.5C16.8807 14.5 18 13.3807 18 12C18 10.6193 16.8807 9.5 15.5 9.5C14.1193 9.5 13 10.6193 13 12C13 13.3807 14.1193 14.5 15.5 14.5Z"
                                    fill="currentColor" />
                                <path
                                    d="M10.5 20C10.5 21.3807 9.38071 22.5 8 22.5C6.61929 22.5 5.5 21.3807 5.5 20C5.5 18.6193 6.61929 17.5 8 17.5C9.38071 17.5 10.5 18.6193 10.5 20Z"
                                    fill="currentColor" />
                                <path
                                    d="M15.5 22.5C16.8807 22.5 18 21.3807 18 20C18 18.6193 16.8807 17.5 15.5 17.5C14.1193 17.5 13 18.6193 13 20C13 21.3807 14.1193 22.5 15.5 22.5Z"
                                    fill="currentColor" />
                            </svg>
                        </div>
                        <div class="cursor-pointer primary-gray-text hover:text-black"
                            @click="gridClass = 'w-1/2 md:w-1/3'; page = ''">
                            <svg :class="gridClass == 'w-1/2 md:w-1/3' ? 'text-black' : ''" width="18px" height="18px"
                                viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7 4C7 5.38071 5.88071 6.5 4.5 6.5C3.11929 6.5 2 5.38071 2 4C2 2.61929 3.11929 1.5 4.5 1.5C5.88071 1.5 7 2.61929 7 4Z"
                                    fill="currentColor" />
                                <path
                                    d="M14.5 4C14.5 5.38071 13.3807 6.5 12 6.5C10.6193 6.5 9.5 5.38071 9.5 4C9.5 2.61929 10.6193 1.5 12 1.5C13.3807 1.5 14.5 2.61929 14.5 4Z"
                                    fill="currentColor" />
                                <path
                                    d="M19.5 6.5C20.8807 6.5 22 5.38071 22 4C22 2.61929 20.8807 1.5 19.5 1.5C18.1193 1.5 17 2.61929 17 4C17 5.38071 18.1193 6.5 19.5 6.5Z"
                                    fill="currentColor" />
                                <path
                                    d="M7 12C7 13.3807 5.88071 14.5 4.5 14.5C3.11929 14.5 2 13.3807 2 12C2 10.6193 3.11929 9.5 4.5 9.5C5.88071 9.5 7 10.6193 7 12Z"
                                    fill="currentColor" />
                                <path
                                    d="M12 14.5C13.3807 14.5 14.5 13.3807 14.5 12C14.5 10.6193 13.3807 9.5 12 9.5C10.6193 9.5 9.5 10.6193 9.5 12C9.5 13.3807 10.6193 14.5 12 14.5Z"
                                    fill="currentColor" />
                                <path
                                    d="M22 12C22 13.3807 20.8807 14.5 19.5 14.5C18.1193 14.5 17 13.3807 17 12C17 10.6193 18.1193 9.5 19.5 9.5C20.8807 9.5 22 10.6193 22 12Z"
                                    fill="currentColor" />
                                <path
                                    d="M4.5 22.5C5.88071 22.5 7 21.3807 7 20C7 18.6193 5.88071 17.5 4.5 17.5C3.11929 17.5 2 18.6193 2 20C2 21.3807 3.11929 22.5 4.5 22.5Z"
                                    fill="currentColor" />
                                <path
                                    d="M14.5 20C14.5 21.3807 13.3807 22.5 12 22.5C10.6193 22.5 9.5 21.3807 9.5 20C9.5 18.6193 10.6193 17.5 12 17.5C13.3807 17.5 14.5 18.6193 14.5 20Z"
                                    fill="currentColor" />
                                <path
                                    d="M19.5 22.5C20.8807 22.5 22 21.3807 22 20C22 18.6193 20.8807 17.5 19.5 17.5C18.1193 17.5 17 18.6193 17 20C17 21.3807 18.1193 22.5 19.5 22.5Z"
                                    fill="currentColor" />
                            </svg>
                        </div>
                        <div class="cursor-pointer primary-gray-text hover:text-black"
                            @click="gridClass = 'w-1/2 md:w-1/3 lg:w-1/4'; page = ''">
                            <svg :class="gridClass == 'w-1/2 md:w-1/3 lg:w-1/4' ? 'text-black' : ''" width="18px"
                                height="18px" viewBox="0 0 771.15 697" xmlns="http://www.w3.org/2000/svg">
                                <g xmlns="http://www.w3.org/2000/svg" id="Calque_2" data-name="Calque 2">
                                    <g id="Calque_1-2" data-name="Calque 1">
                                        <ellipse fill="currentColor" cx="64.53" cy="69" rx="64.02" ry="65.48" />
                                        <path fill="currentColor"
                                            d="M64.53,4C99.55,4,128,33.18,128,69s-28.49,65-63.51,65S1,104.82,1,69,29.52,4,64.53,4m0-1C28.89,3,0,32.55,0,69s28.89,66,64.53,66,64.54-29.55,64.54-66S100.17,3,64.53,3Z" />
                                        <ellipse fill="currentColor" cx="285.61" cy="66" rx="64.02" ry="65.48" />
                                        <path fill="currentColor"
                                            d="M285.61,1c35,0,63.51,29.15,63.51,65s-28.49,65-63.51,65-63.5-29.15-63.5-65S250.6,1,285.61,1m0-1C250,0,221.08,29.55,221.08,66s28.89,66,64.53,66,64.54-29.55,64.54-66S321.26,0,285.61,0Z" />
                                        <path fill="currentColor"
                                            d="M500.61,131.48c-35.3,0-64-29.37-64-65.48S465.31.52,500.61.52s64,29.37,64,65.48S535.91,131.48,500.61,131.48Z" />
                                        <path fill="currentColor"
                                            d="M500.61,1c35,0,63.51,29.15,63.51,65s-28.49,65-63.51,65-63.5-29.15-63.5-65S465.6,1,500.61,1m0-1C465,0,436.08,29.55,436.08,66s28.89,66,64.53,66,64.54-29.55,64.54-66S536.26,0,500.61,0Z" />
                                        <path fill="currentColor"
                                            d="M703.61,134.48c-35.3,0-64-29.37-64-65.48s28.71-65.48,64-65.48,64,29.37,64,65.48S738.91,134.48,703.61,134.48Z" />
                                        <path fill="currentColor"
                                            d="M703.61,4c35,0,63.51,29.15,63.51,65s-28.49,65-63.51,65-63.5-29.15-63.5-65S668.6,4,703.61,4m0-1C668,3,639.08,32.55,639.08,69s28.89,66,64.53,66,64.54-29.55,64.54-66S739.26,3,703.61,3Z" />
                                        <ellipse fill="currentColor" cx="68.61" cy="252" rx="64.02" ry="65.48" />
                                        <path fill="currentColor"
                                            d="M68.61,187c35,0,63.51,29.15,63.51,65s-28.49,65-63.51,65-63.5-29.15-63.5-65,28.49-65,63.5-65m0-1C33,186,4.08,215.55,4.08,252S33,318,68.61,318s64.54-29.55,64.54-66-28.89-66-64.54-66Z" />
                                        <ellipse fill="currentColor" cx="286.61" cy="251" rx="64.02" ry="65.48" />
                                        <path fill="currentColor"
                                            d="M286.61,186c35,0,63.51,29.15,63.51,65s-28.49,65-63.51,65-63.5-29.15-63.5-65,28.49-65,63.5-65m0-1c-35.64,0-64.53,29.55-64.53,66s28.89,66,64.53,66,64.54-29.55,64.54-66-28.89-66-64.54-66Z" />
                                        <path fill="currentColor"
                                            d="M500.61,317.48c-35.3,0-64-29.37-64-65.48s28.71-65.48,64-65.48,64,29.37,64,65.48S535.91,317.48,500.61,317.48Z" />
                                        <path fill="currentColor"
                                            d="M500.61,187c35,0,63.51,29.15,63.51,65s-28.49,65-63.51,65-63.5-29.15-63.5-65,28.49-65,63.5-65m0-1c-35.64,0-64.53,29.55-64.53,66s28.89,66,64.53,66,64.54-29.55,64.54-66-28.89-66-64.54-66Z" />
                                        <path fill="currentColor"
                                            d="M702.61,319.48c-35.3,0-64-29.37-64-65.48s28.71-65.48,64-65.48,64,29.37,64,65.48S737.91,319.48,702.61,319.48Z" />
                                        <path fill="currentColor"
                                            d="M702.61,189c35,0,63.51,29.15,63.51,65s-28.49,65-63.51,65-63.5-29.15-63.5-65,28.49-65,63.5-65m0-1c-35.64,0-64.53,29.55-64.53,66s28.89,66,64.53,66,64.54-29.55,64.54-66-28.89-66-64.54-66Z" />
                                        <ellipse fill="currentColor" cx="68.45" cy="444" rx="64.02" ry="65.48" />
                                        <path fill="currentColor"
                                            d="M68.45,379c35,0,63.5,29.15,63.5,65s-28.49,65-63.5,65S4.94,479.82,4.94,444s28.49-65,63.51-65m0-1c-35.64,0-64.54,29.55-64.54,66s28.9,66,64.54,66S133,480.45,133,444s-28.89-66-64.53-66Z" />
                                        <ellipse fill="currentColor" cx="287.61" cy="442" rx="64.02" ry="65.48" />
                                        <path fill="currentColor"
                                            d="M287.61,377c35,0,63.51,29.15,63.51,65s-28.49,65-63.51,65-63.5-29.15-63.5-65,28.49-65,63.5-65m0-1c-35.64,0-64.53,29.55-64.53,66s28.89,66,64.53,66,64.54-29.55,64.54-66-28.89-66-64.54-66Z" />
                                        <ellipse fill="currentColor" cx="502.67" cy="443" rx="64.02" ry="65.48" />
                                        <path fill="currentColor"
                                            d="M502.67,378c35,0,63.5,29.15,63.5,65s-28.49,65-63.5,65-63.51-29.15-63.51-65,28.49-65,63.51-65m0-1c-35.64,0-64.54,29.55-64.54,66s28.9,66,64.54,66,64.53-29.55,64.53-66-28.89-66-64.53-66Z" />
                                        <path fill="currentColor"
                                            d="M706.61,502.49c-35.3,0-64-29.38-64-65.49s28.71-65.48,64-65.48,64,29.37,64,65.48S741.91,502.49,706.61,502.49Z" />
                                        <path fill="currentColor"
                                            d="M706.61,372c35,0,63.51,29.15,63.51,65s-28.49,65-63.51,65-63.5-29.15-63.5-65,28.49-65,63.5-65m0-1c-35.64,0-64.53,29.55-64.53,66s28.89,66,64.53,66,64.54-29.55,64.54-66-28.89-66-64.54-66Z" />
                                        <ellipse fill="currentColor" cx="73.61" cy="630" rx="64.02" ry="65.49" />
                                        <path fill="currentColor"
                                            d="M73.61,565c35,0,63.51,29.15,63.51,65s-28.49,65-63.51,65-63.5-29.15-63.5-65,28.49-65,63.5-65m0-1C38,564,9.08,593.55,9.08,630S38,696,73.61,696s64.54-29.55,64.54-66-28.89-66-64.54-66Z" />
                                        <ellipse fill="currentColor" cx="289.61" cy="631" rx="64.02" ry="65.49" />
                                        <path fill="currentColor"
                                            d="M289.61,566c35,0,63.51,29.15,63.51,65s-28.49,65-63.51,65-63.5-29.15-63.5-65,28.49-65,63.5-65m0-1c-35.64,0-64.53,29.55-64.53,66s28.89,66,64.53,66,64.54-29.55,64.54-66-28.89-66-64.54-66Z" />
                                        <path fill="currentColor"
                                            d="M507.61,695.49c-35.3,0-64-29.38-64-65.49s28.71-65.49,64-65.49,64,29.38,64,65.49S542.91,695.49,507.61,695.49Z" />
                                        <path fill="currentColor"
                                            d="M507.61,565c35,0,63.51,29.15,63.51,65s-28.49,65-63.51,65-63.5-29.15-63.5-65,28.49-65,63.5-65m0-1c-35.64,0-64.53,29.55-64.53,66s28.89,66,64.53,66,64.54-29.55,64.54-66-28.89-66-64.54-66Z" />
                                        <path fill="currentColor"
                                            d="M704.61,692.49c-35.3,0-64-29.38-64-65.49s28.71-65.49,64-65.49,64,29.38,64,65.49S739.91,692.49,704.61,692.49Z" />
                                        <path fill="currentColor"
                                            d="M704.61,562c35,0,63.51,29.15,63.51,65s-28.49,65-63.51,65-63.5-29.15-63.5-65,28.49-65,63.5-65m0-1c-35.64,0-64.53,29.55-64.53,66s28.89,66,64.53,66,64.54-29.55,64.54-66-28.89-66-64.54-66Z" />
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </div>
                    <!-- grid show -->
                    
                    <!-- Sort -->
                    <div class="relative" @mouseover="windowWidth >= 1024 ? isSortVisible = true : null"
                        @mouseleave="windowWidth >= 1024 ? isSortVisible = false : null">
                        <div class="flex items-center py-3 cursor-pointer" @click="showSort">
                            <h2 class="font-medium text-xsl"> {{ $settings.sections.shop.sorts.sort_by_text }} </h2>
                            <svg class="w-5 h-4" aria-label="chivron icon"
                                :class="isSortVisible == true ? 'rotate-180 transition-all delay-150 ease-linear' : ''"
                                width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M15.39 7.6a.54.54 0 00-.78 0L10 12.21 5.39 7.6a.54.54 0 00-.78 0 .55.55 0 000 .77L10 13.76l5.39-5.39a.55.55 0 000-.77z"
                                    fill="currentColor"></path>
                            </svg>
                        </div>
                        <transition name="fade">
                            <div v-show="isSortVisible"
                                class="absolute right-0 z-20 w-56 bg-white rounded-b-lg shadow-lg sort-direction top-full">
                                <div class="flex flex-col gap-3 py-5 px-9">
                                    <div class="flex items-center" v-for="(sort, i) in sorts" :key="i">
                                        <input hidden type="radio" v-model="params.sort" :value="sort.field"
                                            :id="sort.name">
                                        <label class="cursor-pointer text-xsl text-secondary-hover" :for="sort.name">{{
                                            sort.name }}</label>
                                    </div>
                                </div>
                            </div>
                        </transition>
                    </div>
                    <!-- Sort -->

                </div>
                <!-- filters & sorts -->
                <!--product loader -->
                <div v-show="loading.products" class="flex items-center justify-center my-5">
                    <si-loader></si-loader>
                </div>
                <!--product loader -->
                <div v-show="!loading.products">
                    <!-- Products  -->
                    <!-- Products  -->
                    <div v-if="items.length > 0" class="overflow-hidden border rounded-lg border-primary-color"
                        v-show="items.length > 0">
                        <div class="flex flex-wrap col-items">
                            <div class="col-item" :class="gridClass" v-for="(item, i) in items" :key="i">
                                <si-product :item="item" :page="page"></si-product>
                            </div>
                        </div>
                    </div>
                    <!-- Products -->
                    <!-- no Products -->
                    <div v-else class="flex items-center justify-center my-5">
                        <h1 class="py-3 text-xl">{{ $settings.sections.shop.empty_text }}</h1>
                    </div>
                    <!-- no Products -->
                </div>

                <!-- Pagination -->
                <div class="flex flex-wrap items-center justify-center mt-8 md:mt-10" v-show="paginate.last_page > 0">
                    <!-- chivron left -->
                    <button aria-label="chivron left button" v-show="paginate.current_page > 1"
                        class="my-1 mx-1 p-2.5 flex items-center rounded-full bg-secondary-hover hover:text-white transition-all"
                        @click="getItems(paginate.current_page - 1)">
                        <svg class="w-4 h-4 translate" width="20px" height="20px" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <polyline fill="none" id="Right-2" points="7.6 7 2.5 12 7.6 17" stroke="currentColor"
                                stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                            <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="2" x1="21.5" x2="4.8" y1="12" y2="12" />
                        </svg>
                    </button>
                    <!-- chivron left -->
                    <!-- pages -->
                    <button aria-label="paggination button" v-show="paginate.last_page > 1"
                        :class="[(this.style), ((paginate.last_page - (paginate.last_page - 1)) == paginate.current_page ? 'bg-secondary text-white' : '')]"
                        @click="getItems(paginate.last_page - (paginate.last_page - 1))">
                        <span aria-label="paggination icon" class="text-sm font-semibold">{{ paginate.last_page -
                            (paginate.last_page - 1) }}</span>
                    </button>
                    <button aria-label="paggination button" v-show="paginate.last_page > 2"
                        :class="[(this.style), ((paginate.last_page - (paginate.last_page - 2)) == paginate.current_page ? 'bg-secondary text-white' : '')]"
                        @click="getItems(paginate.last_page - (paginate.last_page - 2))">
                        <span aria-label="paggination icon" class="text-sm font-semibold">{{ paginate.last_page -
                            (paginate.last_page - 2) }}</span>
                    </button>
                    <button aria-label="paggination button" v-show="paginate.last_page > 3"
                        :class="[(this.style), ((paginate.last_page - (paginate.last_page - 3)) == paginate.current_page ? 'bg-secondary text-white' : '')]"
                        @click="getItems(paginate.last_page - (paginate.last_page - 3))">
                        <span aria-label="paggination icon" class="text-sm font-semibold">{{ paginate.last_page -
                            (paginate.last_page - 3) }}</span>
                    </button>
                    <button aria-label="paggination button" v-show="paginate.last_page > 4"
                        :class="[(this.style), ((paginate.last_page - (paginate.last_page - 4)) == paginate.current_page ? 'bg-secondary text-white' : '')]"
                        @click="getItems(paginate.last_page - (paginate.last_page - 4))">
                        <span aria-label="paggination icon" class="text-sm font-semibold">{{ paginate.last_page -
                            (paginate.last_page - 4) }}</span>
                    </button>
                    <button aria-label="paggination button" v-show="paginate.last_page > 5"
                        :class="[(this.style), ((paginate.last_page - (paginate.last_page - 5)) == paginate.current_page ? 'bg-secondary text-white' : '')]"
                        @click="getItems(paginate.last_page - (paginate.last_page - 5))">
                        <span aria-label="paggination icon" class="text-sm font-semibold">{{ paginate.last_page -
                            (paginate.last_page - 5) }}</span>
                    </button>
                    <!-- More Page exists -->
                    <button aria-label="paggination button" v-show="paginate.last_page > 5"
                        :class="[(this.style), (paginate.current_page > (paginate.last_page - (paginate.last_page - 5)) && paginate.current_page < (paginate.last_page) ? 'bg-secondary text-white' : '')]">
                        <span aria-label="paggination icon" class="text-sm font-semibold">{{ paginate.current_page >
                            (paginate.last_page - (paginate.last_page - 5)) && paginate.current_page < (paginate.last_page)
                            ? paginate.current_page : '...' }}</span>
                    </button>
                    <button aria-label="paggination button"
                        v-show="paginate.current_page > (paginate.last_page - (paginate.last_page - 5)) && paginate.current_page < (paginate.last_page)"
                        :class="this.style">
                        <span aria-label="paggination icon" class="text-sm font-semibold">...</span>
                    </button>
                    <!-- More Page exists -->
                    <!-- pages -->
                    <div v-if="paginate.last_page > 5">
                        <button aria-label="paggination button" v-show="paginate.last_page == paginate.current_page"
                            :class="[(this.style), (paginate.last_page == paginate.current_page ? 'bg-secondary text-white' : '')]"
                            @click="getItems(paginate.last_page)">
                            <span aria-label="paggination icon" class="text-sm font-semibold">{{ paginate.last_page
                            }}</span>
                        </button>
                    </div>
                    <div v-else>
                        <button aria-label="paggination button" v-show="paginate.last_page > 0"
                            :class="[(this.style), (paginate.last_page == paginate.current_page ? 'bg-secondary text-white' : '')]"
                            @click="getItems(paginate.last_page)">
                            <span aria-label="paggination icon" class="text-sm font-semibold">{{ paginate.last_page
                            }}</span>
                        </button>
                    </div>
                    <!-- pages -->
                    <!-- chivron right -->
                    <button aria-label="chivron right button" v-show="paginate.current_page < paginate.last_page"
                        class="my-1 mx-1 p-2.5 flex items-center rounded-full bg-secondary-hover hover:text-white transition-all"
                        @click="getItems(paginate.current_page + 1)">
                        <svg class="w-4 h-4 translate" width="20px" height="20px" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <polyline fill="none" id="Right-2" points="16.4 7 21.5 12 16.4 17" stroke="currentColor"
                                stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                            <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="2" x1="2.5" x2="19.2" y1="12" y2="12" />
                        </svg>
                    </button>
                    <!-- chivron right -->
                </div>
                <!-- Pagination -->
            </div>
            <!-- shop content -->
        </div>
        <!-- sideBar  shop content -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            windowWidth: 0,
            showSideBar: false,
            isSortVisible: false,
            loading: {
                products: true,
                filters: true,
                collections: true,
                brands: true,
            },
            query: {},
            param: [],
            filters: null,
            gridClass: 'w-1/2 md:w-1/3 lg:w-1/4',
            page: '',
            style: 'my-1 mx-1 h-9 w-9 rounded-full bg-secondary-hover hover:text-white transition-all',
            items: [],
            collections: [],
            brands: [],
            paginate: { page: 1, limit: this.$settings.sections.shop.pagination.limit, total: 12 },
            params: { page: 1, search: this.$route.query.search, limit: this.$settings.sections.shop.pagination.limit, 'collections.slug-in': [], sort: { createdAt: -1 } },
            lastParams: { page: 1, search: this.$route.query.search, limit: this.$settings.sections.shop.pagination.limit, 'collections.slug-in': [], sort: { createdAt: -1 } },
            sorts: [
                { field: { 'price.salePrice': 1 }, name: this.$settings.sections.shop.sorts.price_asc },
                { field: { 'price.salePrice': -1 }, name: this.$settings.sections.shop.sorts.price_desc },
                { field: { 'review.rating': -1 }, name: this.$settings.sections.shop.sorts.rating_desc },
                { field: { 'review.rating': 1 }, name: this.$settings.sections.shop.sorts.rating_asc },
                { field: { 'name': 1 }, name: this.$settings.sections.shop.sorts.name_asc },
                { field: { 'name': -1 }, name: this.$settings.sections.shop.sorts.name_desc },
                { field: { createdAt: -1 }, name: this.$settings.sections.shop.sorts.newest },
                { field: { createdAt: 1 }, name: this.$settings.sections.shop.sorts.oldest }
            ]
        }
    },
    watch: {
        params: {
            handler(val) {
                if (JSON.stringify(val) !== JSON.stringify(this.lastParams)) {
                    this.getItems();
                }
            },
            deep: true
        },
        "$route.query.search"(val) {
            this.$set(this.params, 'search', val);
        }
    },
    created() {
        this.$store.dispatch('checkHomePage')
    },
    async fetch() {
        // Seo
        this.$store.state.seo.title = this.$settings.sections.shop.title + ' - ' + this.$settings.store_name;
        this.$store.state.seo.description = this.$settings.sections.shop.description || this.$settings.store_description;
        // Params
        if (this.$route.params.slug) {
            this.param = this.$route.params.slug.split(',');
            this.$route.params.slug.split(',').forEach(item => { this.params['collections.slug-in'].push(item); });
        }
        //Filters
        for (const key in this.$route.query) {
            if (!this.$route.query[key]) continue;
            switch (key) {
                case 'price-from': this.$set(this.params, 'price.salePrice-from', this.$route.query[key]); break;
                case 'price-to': this.$set(this.params, 'price.salePrice-to', this.$route.query[key]); break;
                case 'colors-size': this.$set(this.params, 'options.values.value1', this.$route.query[key].split(',')); break;
                case 'tags': this.$set(this.params, 'tags-in', this.$route.query[key].split(',')); break;
                case 'brands': this.$set(this.params, 'brand.slug-in', this.$route.query[key].split(',')); break;
                case 'page': this.$set(this.params, 'page', this.$route.query[key]); break;
            }
        }
        //Get Data
        this.lastParams = this.params;
        await this.getFilters();
        await this.getItems();
        await this.getCollections();
        await this.getBrands();
        this.subCollections();
    },
    mounted() {
        // All Pixel
        this.$tools.call('PAGE_VIEW');
        // Fb Pixel
        this.$storeino.fbpx('PageView');
        // Get Window Width
        this.getWindowWidth();
        window.addEventListener('resize', this.getWindowWidth);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.getWindowWidth);
    },
    methods: {
        getWindowWidth() {
            this.windowWidth = window.innerWidth;
        },
        showSort() {
            if (window.innerWidth < 1024) {
                this.isSortVisible = !this.isSortVisible;
            }
        },
        subCollections() {
            for (const itm of this.collections) {
                if (itm.childrens && itm.childrens.length > 0) itm.childrens = [];
            }
            for (let i = 0; i < this.collections.length; i++) {
                for (let j = 0; j < this.collections.length; j++) {
                    if (this.collections[i] && this.collections[i].parent == this.collections[j]._id) {
                        const childObject = this.collections[i];
                        this.collections[j].childrens.push(childObject);
                        for (let index = 0; index < this.collections[j].childrens.length; index++) {
                            for (let jr = 0; jr < this.collections.length; jr++) {
                                if (this.collections[j].childrens.length > 0 && this.collections[j].childrens[index]._id == this.collections[jr].parent) {
                                    this.collections[j].childrens[index].childrens.push(this.collections[jr])
                                    this.collections.splice(jr, 1);
                                    jr--;
                                }
                            }
                        }
                        this.collections.splice(i, 1);
                        i--;
                    }
                }
            }
        },
        setActive: function (id, idRet) {
            const element = document.getElementById(id);
            if (element.classList.contains('active-subcollections')) {
                element.classList.remove('active-subcollections');
            }
            else {
                element.classList.add('active-subcollections');
            }
            const icon = document.getElementById(idRet);
            console.log({ icon });
            if (icon.classList.contains('active-svg')) {
                icon.classList.remove('active-svg');
            }
            else {
                icon.classList.add('active-svg');
            }
        },
        setParams(e, key, value) {
            if (key.indexOf('price') >= 0 || key.indexOf('page') >= 0) {
                this.$set(this.params, key, e.target.value);
                return false;
            } else {
                if (e.target.checked) {
                    if (!this.params[key]) this.params[key] = this.$set(this.params, key, []);
                    this.params[key].push(value);
                } else {
                    this.params[key] = this.params[key].filter(item => item !== value);
                }
            }
            for (const key in this.params) {
                switch (key) {
                    case 'collections.slug-in': this.param = this.params[key]; break;
                    case 'price.salePrice-from': this.query['price-from'] = this.params[key]; break;
                    case 'price.salePrice-to': this.query['price-to'] = this.params[key]; break;
                    case 'options.values.value1': this.query['colors-size'] = this.params[key]; break;
                    case 'tags-in': this.query['tags'] = this.params[key]; break;
                    case 'brand.slug-in': this.query['brands'] = this.params[key]; break;
                    case 'page': this.query['page'] = [this.params[key]]; break;
                }
            }
            let url = `/shop/`;
            url += this.param.length > 0 ? [...new Set(this.param)].join(',') : '';
            for (const key in this.query) {
                url += url.indexOf('?') == -1 ? '?' : '&';
                if (typeof this.query[key] == 'object') {
                    url += `${key}=${this.query[key].join(',')}`;
                } else url += `${key}=${this.query[key]}`;
            }
            window.history.pushState({}, '', url);
        },
        async getFilters() {
            this.filters = null;
            this.loading.filters = true;
            try {
                const { data } = await this.$storeino.products.filters({});
                this.filters = data;
            } catch (err) {
                this.$sentry.captureException(err);
            }
            this.loading.filters = false;
        },
        async getCollections() {
            this.collections = [];
            this.loading.collections = true;
            try {
                const { data } = await this.$storeino.collections.search({limit:1000});
                this.collections = data.results;
            } catch (err) {
                this.$sentry.captureException(err);
            }
            this.loading.collections = false;
        },
        async getBrands() {
            this.brands = [];
            this.loading.brands = true;
            try {
                const { data } = await this.$storeino.brands.search({});
                this.brands = data.results;
            } catch (err) {
                this.$sentry.captureException(err);
            }
            this.loading.brands = false;
        },
        async getItems(page = null) {
            if (page != null) this.setParams({ target: { value: page } }, 'page', page);
            this.items = [];
            this.loading.products = true;
            try {
                this.params.search = this.$route.query.search;
                this.params.page = page || this.paginate.current_page;
                this.params.limit = this.$settings.sections.shop.pagination.limit;
                this.lastParams = this.$tools.copy(this.params);
                const { data } = await this.$storeino.products.search(this.params);
                this.items = data.results;
                this.paginate = data.paginate;
            } catch (err) {
                this.$sentry.captureException(err);
            }
            this.loading.products = false;
        },
    },
}
</script>

<style scoped>
.collec-hover:hover>div {
    background-color: var(--gray-bg);
}

input[type="checkbox"]:checked+div {
    transition: all .3s ease-in-out;
}

input[type="checkbox"]:checked+div {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
}

input[type="checkbox"]:checked+div svg {
    display: block;
}

input[type="checkbox"]:checked+div+label,
input[type="radio"]:checked+label {
    transition: all .3s ease-in-out;
}

input[type="checkbox"]:checked+div+label,
input[type="radio"]:checked+label {
    color: var(--primary-text-color);
    font-weight: 600;
}

[dir='rtl'] .sort-direction {
    left: 0px;
    right: auto;
}

.active-subcollections {
    max-height: 500px;
}

.svg-display.active-svg>.plus {
    display: none;
}

.svg-display.active-svg>.minus {
    display: block;
}

/* show filters */
@media (max-width: 1024px) {
    .show {
        display: block !important;
    }
}</style>


