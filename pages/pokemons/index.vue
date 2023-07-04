<template>
    <div class="pokemons-container">
        <NuxtLink to="/">
            <ArrowLeftIcon class="w-8 h-8 text-gray-400 hover:text-black" />
        </NuxtLink>
        <h1 class="title-1">Pokemons</h1>
        <SearchBar v-model="search" placeholder="Search a pokemon !!!" class="search-bar" />
        <h2 class="title-2">Choose a type </h2>
        <div class="flex flex-nowrap gap-x-4 overflow-auto mb-6 pb-6 mt-4 snap-x">
            <AllTypesFilterButton @click="filter = ''" :active="filter == ''" class="snap-start filter-button" />
            <TypeFilterButton v-for="pokemon_type in types" :key="pokemon_type" :type="pokemon_type"
                @click="filter = pokemon_type" :active="filter == pokemon_type" class="snap-start filter-button" />
        </div>
        <div class="flex flex-wrap justify-center gap-8 bg-white pokemons-list">
            <template v-for="pokemon in pokemons" :key="pokemon.id">
                <PokemonCard :pokemon="pokemon" v-if="(filter === '' || pokemon.types.some(type => type.name === filter))
                    && pokemon.name.includes(search)
                    " class="pokemon-card" />
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArrowLeftIcon } from '@heroicons/vue/24/solid'
import { storeToRefs } from 'pinia'
import { usePokemonStore } from '@/stores/PokemonStore'
import PokemonCard from '@/components/pokemon/PokemonCard.vue'
import TypeFilterButton from '@/components/common/TypeFilterButton.vue'
import AllTypesFilterButton from '@/components/common/AllTypesFilterButton.vue'
import SearchBar from '@/components/common/SearchBar.vue'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)

const pokemonStore = usePokemonStore();
const filter = ref<string>('');
const search = ref<string>('');

const { pokemons, types } = storeToRefs(pokemonStore);

onMounted(() => {
    const container = <HTMLElement>document.querySelector('.pokemons-container')
    const tl = gsap.timeline()
    const title = <HTMLElement>container.querySelector('h1')
    const search_bar = <HTMLElement>container.querySelector('.search-bar')
    const type_title = <HTMLElement>container.querySelector('h2')
    const filter_buttons = container.querySelectorAll('.filter-button')

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
            .from(type_title, {
                duration: 0.4,
                autoAlpha: 0,
                ease: 'power2.out',
            }, '-=0.5')
            .from(filter_buttons, {
                duration: 0.4,
                autoAlpha: 0,
                ease: 'power2.out',
                stagger: 0.1,
            }, '-=0.3')
    }, container)
})
</script>