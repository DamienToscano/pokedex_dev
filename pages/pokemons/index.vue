<template>
    <div>
        <NuxtLink to="/">
            <ArrowLeftIcon class="w-8 h-8 text-gray-400 hover:text-black" />
        </NuxtLink>
        <h1 class="title-1">Pokedex</h1>
        <SearchBar v-model="search" placeholder="Search a pokemon !!!" />
        <h2 class="title-2">Choose a type </h2>
        <div class="flex flex-nowrap gap-x-4 overflow-auto mb-6 pb-6 mt-4">
            <AllTypesFilterButton @click="filter = ''" :active="filter == ''" />
            <TypeFilterButton v-for="pokemon_type in types" :key="pokemon_type" :type="pokemon_type"
                @click="filter = pokemon_type" :active="filter == pokemon_type" />
        </div>
        <div class="flex flex-wrap justify-center gap-8 bg-white">
            <template v-for="pokemon in pokemons" :key="pokemon.id">
                <PokemonCard :pokemon="pokemon" v-if="(filter === '' || pokemon.types.some(type => type.name === filter))
                    && pokemon.name.includes(search)
                    " />
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

// TODO: For the transition between this page and the pokemon page, see this https://nuxt-view-transitions.surge.sh/ with nuxt 3.4 only

const pokemonStore = usePokemonStore();
const filter = ref<string>('');
const search = ref<string>('');

const { pokemons, types } = storeToRefs(pokemonStore);

</script>