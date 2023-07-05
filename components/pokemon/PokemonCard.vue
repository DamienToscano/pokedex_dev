<template>
    <NuxtLink :to="`/pokemons/${pokemon.id}`"
        class="relative p-8 overflow-hidden text-white shadow-lg group rounded-3xl h-52 w-80 pokemon-card" :class="background">
        <div class="absolute font-bold transition-all top-4 right-6 text-gray-800/30 group-hover:text-white">#{{ pokemon.id.toString().padStart(3, '0') }}</div>
        <p class="text-2xl font-bold tracking-wider">{{ capitalize(pokemon.name) }}</p>
        <ul class="flex flex-col gap-3 mt-4">
            <li v-for="pokemon_type in pokemon.types" class="px-4 py-1 text-sm font-semibold bg-white/30 rounded-xl w-fit">
                {{ capitalize(pokemon_type.name) }}
            </li>
        </ul>
        <img src="@/assets/images/pokeball.svg" alt="Pokeball icon" class="absolute transition-all duration-300 ease w-44 h-44 -right-3 -bottom-8 group-hover:rotate-45">
        <img class="absolute w-auto h-40 bottom-1 right-1 group-hover:scale-110 transition-all" :src="pokemon.picture" :alt="`Picture of ${pokemon.name}`" 
        :style="{ 'view-transition-name': `pokemon-${pokemon.id}` }">
    </NuxtLink>
</template>

<script setup lang="ts">
import { capitalize } from 'vue';
import { Pokemon } from '@/data/models/pokemon';

const props = defineProps<{
    pokemon: Pokemon,
}>()

const background = computed(() => {
    return `bg-${props.pokemon.types[0].name}`;
})

</script>