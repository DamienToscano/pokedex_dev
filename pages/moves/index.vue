<template>
    <div v-if="moves">
        <NuxtLink to="/">
            <ArrowLeftIcon class="w-8 h-8 text-gray-400 hover:text-black" />
        </NuxtLink>
        <h1 class="title-1">Moves</h1>
        <SearchBar v-model="search" placeholder="Search a move !!!" />
        <h2 class="title-2">Choose a type </h2>
        <div class="flex pb-6 mt-4 mb-6 overflow-auto flex-nowrap gap-x-4">
            <AllTypesFilterButton @click="filter = ''" :active="filter == ''" />
            <TypeFilterButton v-for="pokemon_type in types" :key="pokemon_type" :type="pokemon_type"
                @click="filter = pokemon_type" :active="filter == pokemon_type" />
        </div>
        <div>
            <ul class="grid grid-cols-1 gap-8 lg:grid-cols-2 2xl:grid-cols-3">
                <template v-for="move in moves" :key="move.id">
                    <MoveCard v-if="move.description && (filter === '' || move.type === filter) && move.name.includes(search)" :move="move" />
                </template>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArrowLeftIcon } from '@heroicons/vue/24/solid'
import { usePokemonStore } from '@/stores/PokemonStore'
import MoveCard from '@/components/move/MoveCard.vue'
import { storeToRefs } from 'pinia';
import TypeFilterButton from '@/components/common/TypeFilterButton.vue'
import AllTypesFilterButton from '@/components/common/AllTypesFilterButton.vue'
import SearchBar from '@/components/common/SearchBar.vue'

const filter = ref<string>('');
const search = ref<string>('');

const pokemonStore = usePokemonStore()
const { moves, types } = storeToRefs(pokemonStore);
</script>