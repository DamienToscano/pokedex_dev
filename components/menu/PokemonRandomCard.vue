<template>
    <div v-if="pokemon && pokemon_specy" class="
            overflow-hidden
            relative
            shadow-md
            px-6
            sm:px-16
            pt-8
            pb-2
            rounded-xl
            sm:rounded-3xl
            text-white
            font-bold
            text-2xl
            tracking-wider
            before:absolute
            before:w-32
            before:h-32
            before:rounded-full
            before:rotate-45
            before:-top-20
            before:-left-16
            before:bg-white/20
            hover:before:bg-white/40
            before:transition-all" :class="`bg-${pokemon.types[0].name} shadow-${pokemon.types[0].name}`">
        <h2 class="mb-2 sm:mb-6">Pokemon random</h2>
        <div class="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between">
            <h1 class="text-3xl sm:text-5xl font-bold tracking-wider">
                <NuxtLink :to="`/pokemons/${pokemon.id}`" class="-ml-4 px-4 py-1 hover:bg-white/20 cursor rounded-md">{{
                    capitalize(pokemon.name) }}</NuxtLink>
                <SpeakerWaveIcon
                    class="ml-0 sm:ml-4 inline-block w-8 h-8 transition-transform cursor-pointer hover:scale-110 hover:-rotate-12"
                    @click="playCry" />
            </h1>
            <div class="text-2xl font-bold">#{{ pokemon.id.toString().padStart(3, '0') }}</div>
        </div>
        <ul class="flex gap-3 mt-4">
            <li v-for="pokemon_type in pokemon.types" class="px-4 py-1 text-sm font-semibold bg-white/30 rounded-xl w-fit">
                {{ capitalize(pokemon_type.name) }}
            </li>
        </ul>
        <img src="@/assets/images/pokeball.svg" alt="Icon of pokeball" class="absolute -right-8 -bottom-6 h-60 w-60">
        <div class="flex flex-col mt-8 justify-around items-center md:flex-row md:mt-0">
            <p class="max-w-lg text-lg sm:text-2xl">{{ pokemon_specy.description }}</p>
            <img class="relative w-auto h-64 sm:h-80" :src="pokemon.picture" :alt="`Picture of ${pokemon.name}`"
            :style="{ 'view-transition-name': `pokemon-${pokemon.id}` }">
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePokemonStore } from '@/stores/PokemonStore';
import { capitalize } from 'vue';
import { Pokemon } from '~/data/models/pokemon';
import { SpeakerWaveIcon } from '@heroicons/vue/24/outline';
import { PokemonSpecy } from '~/data/models/pokemon-specy';

const pokemonStore = usePokemonStore();
const pokemon = ref<Pokemon>();
const pokemon_specy = ref<PokemonSpecy>();

// Set pokemon and pokemon_specy if pokemonStore is loaded
if (pokemonStore.isLoaded) {
    getRandomPokemon();
}

// Watch until pokemonStore is loaded, if not already
watch(() => pokemonStore.isLoaded, (isLoaded) => {
    if (isLoaded) {
        getRandomPokemon();
    }
});

function getRandomPokemon() {
    pokemon.value = pokemonStore.getRandomPokemon();
    pokemon_specy.value = pokemonStore.getPokemonSpecyById(pokemon.value.id);
}

function playCry() {
    if (pokemon.value) {
        const audio = new Audio('/audio/cries/' + pokemon.value.id + '.mp3')
        audio.play()
    }
}

</script>