<template>
    <div>
        <NuxtLink to="/">
            <ArrowLeftIcon class="w-8 h-8 text-gray-400 hover:text-black" />
        </NuxtLink>
        <h1 class="title-1">Abilities</h1>
        <SearchBar v-model="search" placeholder="Search an ability !!!" />
        <div class="flex flex-wrap justify-center gap-8 bg-white">
            <ul class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                <template v-for="abilitiy in abilities" :key="abilitiy.id">
                    <AbilityCard v-if="abilitiy.name.includes(search)" :ability="abilitiy" />
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
import AbilityCard from '@/components/ability/AbilityCard.vue'

const search = ref<string>('');

const pokemonStore = usePokemonStore()
const { abilities } = storeToRefs(pokemonStore);
</script>