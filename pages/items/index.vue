<template>
    <div>
        <NuxtLink to="/">
            <ArrowLeftIcon class="w-8 h-8 text-gray-400 hover:text-black" />
        </NuxtLink>
        <h1 class="title-1">Items</h1>
        <SearchBar v-model="search" placeholder="Search an item !!!" />
        <div class="flex flex-wrap justify-center gap-8 bg-white">
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

const search = ref<string>('');

const pokemonStore = usePokemonStore()
const { items } = storeToRefs(pokemonStore);
</script>