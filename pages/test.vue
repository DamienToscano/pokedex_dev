<template>
    <div v-if="pokemon"
        class="w-screen min-h-screen before:w-60 before:h-60 before:bg-gradient-to-r before:from-white/50 before:to-white/5 before:absolute before:-top-14 before:-left-28 before:rounded-3xl before:rotate-[60deg]"
        :class="background">
        <!-- TODO: add images on the bacground representing the type of the pokemon, leaf, water drop ... -->
        <div class="container p-2 mx-auto pb-12">
            <!-- Pokemon part -->
            <div class="relative px-6 pt-6 md:px-12 md:pt-12 text-white">
                <NuxtLink to="/pokemons">
                    <ArrowLeftIcon class="w-8 h-8 my-6" />
                </NuxtLink>
                <div class="flex justify-between items-center">
                    <h1 class="text-5xl font-bold tracking-wider">
                        {{ capitalize(pokemon.name) }}
                        <SpeakerWaveIcon class="w-8 h-8 cursor-pointer hover:scale-110 hover:-rotate-12 inline-block" @click="playCry" />
                    </h1>
                    <div class="font-bold text-2xl">#{{ pokemon.id.toString().padStart(3, '0') }}</div>
                </div>
                <ul class="flex gap-4 mt-4">
                    <li v-for="pokemon_type in pokemon.types"
                        class="px-4 py-1 text-md font-semibold bg-white/30 rounded-xl w-fit">
                        {{ capitalize(pokemon_type.name) }}
                    </li>
                </ul>
                <div class="w-fit mx-auto -mb-14 relative">
                    <img src="@/assets/images/pokeball.svg" alt="Pokeball icon"
                        class="absolute w-4/5 h-4/5 bottom-0 left-8">
                    <img class="w-auto h-80 relative" :src="pokemon.picture" :alt="`Picture of ${pokemon.name}`">
                </div>
            </div>
            <!-- Characteristics part -->
            <div class="px-12 py-6 bg-white rounded-3xl min-h-[60%] max-w-3xl shadow-xl m-auto">
                <nav class="mt-8">
                    <ul class="flex font-semibold text-gray-400">
                        <li v-for="nav_item in nav" :key="nav_item.name"
                            class="text-sm md:text-lg pr-8 pb-2 cursor-pointer hover:text-gray-800 transition-colors duration-200 flex items-center"
                            :class="{ 'text-gray-800 border-b-gray-800': active_nav == nav_item.name }"
                            @click="active_nav = nav_item.name">
                            <component :is="nav_item.icon" class="w-6 h-6 mr-2"></component>
                            {{ nav_item.name }}
                        </li>
                    </ul>
                </nav>
                <div class="mt-8">
                    <!-- About -->
                    <div id="about" v-if="active_nav == 'About'">
                        <p>{{ pokemon_specy.description }}.</p>
                        <p>His main color is {{ pokemon_specy.color }} and lives in {{ pokemon_specy.habitat }}.</p>
                        <div
                            class="flex rounded-xl p-4 justify-around mx-8 my-8 bg-white shadow-[1px_2px_17px_-1px_rgba(56,56,56,0.45)]">
                            <div>
                                <p class="font-semibold text-gray-500">Height</p>
                                <p>{{ pokemon.height * 10 }} cm</p>
                            </div>
                            <div>
                                <p class="font-semibold text-gray-500">Weight</p>
                                <p>{{ pokemon.weight / 10 }} kg</p>
                            </div>
                        </div>
                        <h2 class="text-xl font-bold text-gray-800 mb-4">And what more ?</h2>
                        <ul>
                            <li v-for="info in about_infos_list" :key="info.name" class="mb-2">
                                <span class="font-semibold text-gray-400 w-36 inline-block">{{ info.name }}</span>
                                {{ info.value }}
                            </li>
                        </ul>
                    </div>
                    <!-- Stats -->
                    <div id="stats" v-if="active_nav == 'Stats'">
                        Stats
                    </div>
                    <!-- Evolution -->
                    <div id="evolution" v-if="active_nav == 'Evolution'">
                        <h2 class="text-xl font-bold text-gray-800 mb-4">Evolution chain</h2>
                        <div class="mx-8">
                            <template v-for="evolution in pokemon_evolution" v-if="pokemon_evolution.length > 1">
                                <div v-if="evolution.trigger && evolution.base_pokemon"
                                    class="flex items-center justify-between my-4">
                                    <NuxtLink :to="`/pokemons/${evolution.base_pokemon.id}`">
                                        <div class="relative text-center font-semibold group">
                                            <img src="@/assets/images/pokeball_dark.svg" alt="Pokeball icon"
                                                class="absolute top-1 left-1 opacity-80 w-11/12 h-auto group-hover:rotate-45 transition">
                                            <img :src="evolution.base_pokemon.picture"
                                                :alt="`Picture of ${evolution.base_pokemon.name}`"
                                                class="relative h-24 w-auto group-hover:drop-shadow-md">
                                            <p>{{ capitalize(evolution.base_pokemon.name) }}</p>
                                        </div>
                                    </NuxtLink>
                                    <div class="font-bold">
                                        <ArrowRightIcon class="w-10 h-10 text-gray-300 mb-4 m-auto" />
                                        <p v-if="evolution.level">Lvl {{ evolution.level }}</p>
                                        <p v-if="evolution.item">{{ capitalize(evolution.item) }}</p>
                                        <p v-if="evolution.trigger == 'trade'">Trade</p>
                                    </div>
                                    <NuxtLink :to="`/pokemons/${evolution.id}`">
                                        <div class="relative text-center font-semibold group">
                                            <img src="@/assets/images/pokeball_dark.svg" alt="Pokeball icon"
                                                class="absolute top-1 left-1 opacity-80 w-11/12 h-auto group-hover:rotate-45 transition">
                                            <img :src="evolution.picture" :alt="`Picture of ${evolution.name}`"
                                                class="relative h-24 w-auto group-hover:drop-shadow-md">
                                            <p>{{ capitalize(evolution.name) }}</p>
                                        </div>
                                    </NuxtLink>
                                </div>
                            </template>
                        </div>
                        <p v-if="has_no_evolution">This pokemon has no evolution !</p>
                    </div>
                    <!-- Moves -->
                    <div class="moves" v-if="active_nav == 'Moves'">
                        Moves
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePokemonStore } from '@/stores/PokemonStore'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/vue/24/solid';
import { InformationCircleIcon, ChartBarSquareIcon, ChevronDoubleUpIcon, HandRaisedIcon, SpeakerWaveIcon } from '@heroicons/vue/24/outline';
import { capitalize } from 'vue';
import { Pokemon } from '~/data/models/pokemon';
import type { PokemonPageNavigationType } from '@/types/pokemons';

const id = 1

definePageMeta({
    layout: 'pokemon'
})


// Get pokemon from store
const pokemonStore = usePokemonStore()
const pokemon = ref<Pokemon>(pokemonStore.getPokemonById(Number(id)))
const pokemon_specy = ref(pokemonStore.getPokemonSpecyById(Number(id)))
const pokemon_evolution = ref(pokemonStore.getPokemonEvolutionById(Number(id)))

// TODO: Get previous pokemon picture and id from store
// TODO: Get next pokemon picture and id from store

const background = computed(() => {
    return `bg-${pokemon.value.types[0].name}`;
})

const has_no_evolution = computed(() => {

    if (pokemon_evolution.value.length <= 1) {
        return true
    }

    let flag = true
    pokemon_evolution.value.forEach((evolution) => {
        if (evolution.base_pokemon) {
            flag = false
        }
    })

    return flag
})

const about_infos_list = [
    {
        name: 'Shape',
        value: capitalize(pokemon_specy.value.shape)
    },
    {
        name: 'Growth rate',
        value: capitalize(pokemon_specy.value.growth_rate)
    },
    {
        name: 'Capture rate',
        value: pokemon_specy.value.capture_rate
    },
    {
        name: 'Base hapiness',
        value: pokemon_specy.value.base_happiness
    },
]

const nav = <Array<PokemonPageNavigationType>>[
    {
        name: 'About',
        icon: InformationCircleIcon,
    },
    {
        name: 'Stats',
        icon: ChartBarSquareIcon,
    },
    {
        name: 'Evolution',
        icon: ChevronDoubleUpIcon,
    },
    {
        name: 'Moves',
        icon: HandRaisedIcon,
    },
]

const active_nav = ref(nav[0].name)

function playCry() {
    // TODO: See how to make it work with files in assets folder
    const audio = new Audio('https://play.pokemonshowdown.com/audio/cries/' + pokemon.value.name + '.mp3')
    audio.play()
}

</script>