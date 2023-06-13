<template>
    <div class="items-container">
        <NuxtLink to="/">
            <ArrowLeftIcon class="w-8 h-8 text-gray-400 hover:text-black" />
        </NuxtLink>
        <h1 class="title-1">Items</h1>
        <SearchBar v-model="search" placeholder="Search an item !!!" class="search-bar" />
        <div class="flex flex-wrap justify-center gap-8 bg-white items-list">
            <ul class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                <template v-for="item in items" :key="item.id">
                    <ItemCard v-if="item.name.includes(search)" :item="item" />
                </template>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArrowLeftIcon } from '@heroicons/vue/24/solid'
import { usePokemonStore } from '@/stores/PokemonStore'
import { storeToRefs } from 'pinia';
import SearchBar from '@/components/common/SearchBar.vue'
import ItemCard from '@/components/item/ItemCard.vue'
import gsap from 'gsap'

const search = ref<string>('');

const pokemonStore = usePokemonStore()
const { items } = storeToRefs(pokemonStore);

onMounted(() => {
    const container = <HTMLElement>document.querySelector('.items-container')
    const tl = gsap.timeline()
    const title = <HTMLElement>container.querySelector('h1')
    const search_bar = <HTMLElement>container.querySelector('.search-bar')
    const items_list = <HTMLElement>container.querySelector('.items-list')

    let ctx = gsap.context(() => {
        tl
            .from(title, {
                duration: 0.5,
                autoAlpha: 0,
                ease: 'power2.out',
            })
            .from(search_bar, {
                duration: 0.6,
                autoAlpha: 0,
                width: 0,
                ease: 'power2.out',
            }, '-=0.5')
            .from(items_list, {
                duration: 0.4,
                autoAlpha: 0,
                ease: 'power2.out',
            }, '-=0.3')
    }, container)
})
</script>