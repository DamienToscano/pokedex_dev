<template>
    <Transition appear :css="false" @enter="enterMain">
        <div v-if="pokemon && pokemon_specy && isPokemonLoaded"
            class="w-screen min-h-screen before:w-60 before:h-60 before:bg-gradient-to-r before:from-white/50 before:to-white/5 before:absolute before:-top-14 before:-left-28 before:rounded-3xl before:rotate-[60deg] pokemon-container"
            :class="background">
            <!-- TODO: add images on the bacground representing the type of the pokemon, leaf, water drop ... -->
            <div class="container p-2 pb-12 mx-auto">
                <!-- Pokemon part -->
                <div class="relative px-6 pt-6 text-white md:px-12 md:pt-12" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
                    <NuxtLink to="/pokemons">
                        <ArrowLeftIcon class="w-8 h-8 my-6" />
                    </NuxtLink>
                    <div class="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between">
                        <h1 class="text-5xl font-bold tracking-wider selection:bg-transparent">
                            {{ capitalize(pokemon.name) }}
                            <SpeakerWaveIcon
                                class="inline-block w-8 h-8 transition-transform cursor-pointer hover:scale-110 hover:-rotate-12"
                                @click="playCry" />
                        </h1>
                        <div class="text-2xl font-bold opacity-80 pokemon-id">#{{ pokemon.id.toString().padStart(3, '0') }}
                        </div>
                    </div>
                    <div class="flex items-center justify-between">
                        <ul class="flex gap-4 mt-4">
                            <li v-for="pokemon_type in pokemon.types"
                                class="px-4 py-1 font-semibold text-md bg-white/30 rounded-xl w-fit type-badge">
                                {{ capitalize(pokemon_type.name) }}
                            </li>
                        </ul>
                        <div class="mt-2 text-lg font-semibold text-right opacity-60 pokemon-specy">
                            <p>{{ pokemon_specy.type }}</p>
                            <p>{{ capitalize(pokemon_specy.shape) }}</p>
                        </div>
                    </div>
                    <div class="relative mx-auto w-fit -mb-14">
                        <img src="@/assets/images/pokeball.svg" alt="Pokeball icon"
                            class="absolute bottom-0 w-4/5 h-4/5 left-8">
                        <img class="relative w-auto h-60 sm:h-80 pokemon-picture" :src="pokemon.picture"
                            :alt="`Picture of ${pokemon.name}`">
                        <!-- Previous pokemon -->
                        <NuxtLink v-if="previous_pokemon" :to="`/pokemons/${previous_pokemon.id}`">
                            <img class="absolute w-auto transition-all h-36 sm:h-44 md:h-52 -left-40 sm:-left-48 md:-left-60 top-12 brightness-0 contrast-50 opacity-70 hover:opacity-100"
                                :src="previous_pokemon.picture" :alt="`Picture of ${pokemon.name}`">
                        </NuxtLink>
                        <!-- Next pokemon -->
                        <NuxtLink v-if="next_pokemon" :to="`/pokemons/${next_pokemon.id}`">
                            <img class="absolute w-auto transition-all h-36 sm:h-44 md:h-52 -right-40 sm:-right-48 md:-right-60 top-12 brightness-0 contrast-50 opacity-70 hover:opacity-100"
                                :src="next_pokemon.picture" :alt="`Picture of ${pokemon.name}`">
                        </NuxtLink>
                    </div>
                </div>
                <!-- Characteristics part -->
                <div class="px-8 sm:px-12 py-6 bg-white rounded-3xl min-h-[60%] max-w-3xl shadow-xl m-auto">
                    <nav class="mt-8">
                        <ul class="flex justify-around font-semibold text-gray-400">
                            <li v-for="nav_item in nav" :key="nav_item.name"
                                class="flex items-center sm:pb-2 sm:pr-8 text-sm transition-colors duration-200 cursor-pointer md:text-lg hover:text-gray-800"
                                :class="{ 'text-gray-800 border-b-gray-800': active_nav == nav_item.name }"
                                @click="active_nav = nav_item.name">
                                <component :is="nav_item.icon" class="w-8 h-8 sm:w-6 sm:h-6 sm:mr-2"></component>
                                <span class="hidden sm:inline">{{ nav_item.name }}</span>
                            </li>
                        </ul>
                    </nav>
                    <div class="mt-8">
                        <!-- About -->
                        <Transition :css="false" appear @before-enter="beforeEnter" @enter="enter">
                            <div id="about" v-if="active_nav == 'About'">
                                <PokemonAbout :pokemon="pokemon" :pokemon_specy="pokemon_specy"
                                    :pokemon_encounters="pokemon_encounters" />
                            </div>
                        </Transition>
                        <!-- Stats -->
                        <Transition :css="false" appear @before-enter="beforeEnter" @enter="enter">
                            <div id="stats" v-if="active_nav == 'Stats'">
                                <PokemonStats :stats="pokemon.stats" />
                            </div>
                        </Transition>
                        <!-- Evolution -->
                        <Transition :css="false" appear @before-enter="beforeEnter" @enter="enter">
                            <div id="evolution" v-if="active_nav == 'Evolution'">
                                <PokemonEvolutions :pokemon_evolutions="pokemon_evolution" />
                            </div>
                        </Transition>
                        <!-- Moves -->
                        <Transition :css="false" appear @before-enter="beforeEnter" @enter="enter">
                            <div class="moves" v-if="active_nav == 'Moves'">
                                <PokemonMoves :moves="pokemon.moves" />
                            </div>
                        </Transition>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { usePokemonStore } from '@/stores/PokemonStore'
import { ArrowLeftIcon } from '@heroicons/vue/24/solid';
import { InformationCircleIcon, ChartBarSquareIcon, ChevronDoubleUpIcon, HandRaisedIcon, SpeakerWaveIcon } from '@heroicons/vue/24/outline';
import { capitalize } from 'vue';
import { Pokemon } from '@/data/models/pokemon';
import type { PokemonPageNavigationType } from '@/types/pokemons';
import PokemonStats from '@/components/pokemon/PokemonStats.vue';
import PokemonAbout from '@/components/pokemon/PokemonAbout.vue';
import PokemonEvolutions from '@/components/pokemon/PokemonEvolutions.vue';
import PokemonMoves from '@/components/pokemon/PokemonMoves.vue';
import { PokemonSpecy } from '~/data/models/pokemon-specy';
import gsap from 'gsap';

const { id } = useRoute().params

definePageMeta({
    layout: 'pokemon'
})


// Get pokemon from store
const pokemonStore = usePokemonStore()
const pokemon = ref<Pokemon>()
const pokemon_specy = ref<PokemonSpecy>()
const pokemon_encounters = ref()
const pokemon_evolution = ref()
const previous_pokemon = ref<Pokemon>()
const next_pokemon = ref<Pokemon>()
const background = ref<string>('bg-gray-100')
const isPokemonLoaded = ref<boolean>(false)
const startSwipePokemon = ref<number>(0)
const endSwipePokemon = ref<number>(0)
const router = useRouter();

// Set pokemon and pokemon_specy if pokemonStore is loaded
if (pokemonStore.isLoaded) {
    getPokemonData();
}

// Watch until pokemonStore is loaded, if not already
watch(() => pokemonStore.isLoaded, (isLoaded) => {
    if (isLoaded) {
        getPokemonData();
    }
});

function getPokemonData() {
    pokemon.value = pokemonStore.getPokemonById(Number(id))
    pokemon_specy.value = pokemonStore.getPokemonSpecyById(Number(id))
    pokemon_encounters.value = pokemonStore.getPokemonEncountersById(Number(id))
    pokemon_evolution.value = pokemonStore.getPokemonEvolutionById(Number(id))
    previous_pokemon.value = pokemonStore.getPokemonById(Number(id) - 1)
    next_pokemon.value = pokemonStore.getPokemonById(Number(id) + 1)
    background.value = `bg-${pokemon.value.types[0].name}`;
    isPokemonLoaded.value = true;
}

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

    if (!pokemon.value) return
    const audio = new Audio('/audio/cries/' + pokemon.value.id + '.mp3')
    audio.play()
}

/* Animations */
const beforeEnter = (el: HTMLElement) => {
    gsap.set(el, { opacity: 0 })
}

const enter = (el: HTMLElement, done: () => void) => {
    gsap.to(el, {
        opacity: 1,
        duration: 0.3,
        onComplete: done,
    })
}

const enterMain = (el: HTMLElement, done: () => void) => {
    const container = <HTMLElement>el.querySelector('.pokemon-container')
    const tl = gsap.timeline()
    const title = el.querySelector('h1')
    const types_badges = el.querySelectorAll('.type-badge')
    const pokemon_id = el.querySelector('.pokemon-id')
    const pokemon_specy = el.querySelector('.pokemon-specy')

    let ctx = gsap.context(() => {
        tl
            .from(title, { autoAlpha: 0, x: -10, duration: 0.4 })
            .from(pokemon_id, { autoAlpha: 0, x: 10, duration: 0.4 }, "-=0.4")
            .from(types_badges, { autoAlpha: 0, duration: 0.2, stagger: 0.1 }, "-=0.2")
            .from(pokemon_specy, { autoAlpha: 0, duration: 0.2 }, "-=0.1")
            .call(done)
    }, container)
}

/* Swipe */
const handleTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0]
    startSwipePokemon.value = touch.clientX
}

const handleTouchMove = (e: TouchEvent) => {
    const touch = e.touches[0]
    endSwipePokemon.value = touch.clientX
}

const handleTouchEnd = (e: TouchEvent) => {
    const touch = e.changedTouches[0]
    endSwipePokemon.value = touch.clientX

    const direction = getSwipeDirection()

    if (direction == 'left') {
        if (next_pokemon.value) {
            router.push({ path: `/pokemons/${next_pokemon.value.id.toString()}`})
            
        }
    } else if (direction == 'right') {
        if (previous_pokemon.value) {
            router.push({ path: `/pokemons/${previous_pokemon.value.id.toString()}`})
        }
    }

    resetSwipe()
}

const resetSwipe = () => {
    startSwipePokemon.value = 0
    endSwipePokemon.value = 0
}

/* TODO: Refactoriser ça en composable */
const getSwipeDirection = () => {
    const swipeDistance = endSwipePokemon.value - startSwipePokemon.value
    const swipeDistanceAbs = Math.abs(swipeDistance)

    if (swipeDistanceAbs > 100) {
        if (swipeDistance > 0) {
            console.log('swipe right')
            return 'right'
        } else {
            console.log('swipe left')
            return 'left'
        }
    }

    return null
}

</script>