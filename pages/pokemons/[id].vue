<template>
    <Transition appear :css="false">
        <div v-if="pokemon && pokemon_specy && isPokemonLoaded"
            class="w-screen min-h-screen before:w-60 before:h-60 before:bg-gradient-to-r before:from-white/50 before:to-white/5 before:absolute before:-top-14 before:-left-28 before:rounded-3xl before:rotate-[60deg] transition-colors duration-1000 pokemon-container"
            :class="background">
            <!-- TODO: add images on the bacground representing the type of the pokemon, leaf, water drop ... -->
            <div class="container p-2 pb-12 mx-auto">
                <!-- Pokemon part -->
                <div class="relative px-6 pt-6 text-white md:px-12 md:pt-12" @touchstart="handlePokemonTouchStart"
                    @touchmove="handlePokemonTouchMove" @touchend="handlePokemonTouchEnd">
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
                            :alt="`Picture of ${pokemon.name}`" :data-type="pokemon.types[0].name">
                        <!-- Previous pokemon -->
                        <NuxtLink v-if="previous_pokemon" :to="`/pokemons/${previous_pokemon.id}`">
                            <img class="absolute w-auto transition-all h-36 sm:h-44 md:h-52 -left-40 sm:-left-48 md:-left-60 top-12 brightness-0 contrast-50 opacity-70 hover:opacity-100 previous-pokemon-picture"
                                :src="previous_pokemon.picture" :alt="`Picture of ${previous_pokemon.name}`"
                                :data-type="previous_pokemon.types[0].name">
                        </NuxtLink>
                        <!-- Next pokemon -->
                        <NuxtLink v-if="next_pokemon" :to="`/pokemons/${next_pokemon.id}`">
                            <img class="absolute w-auto transition-all h-36 sm:h-44 md:h-52 -right-40 sm:-right-48 md:-right-60 top-12 brightness-0 contrast-50 opacity-70 hover:opacity-100 next-pokemon-picture"
                                :src="next_pokemon.picture" :alt="`Picture of ${next_pokemon.name}`"
                                :data-type="next_pokemon.types[0].name">
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
                    <div class="mt-8" @touchstart="handleInfosTouchStart" @touchmove="handleInfosTouchMove"
                        @touchend="handleInfosTouchEnd">
                        <!-- About -->
                        <div id="about" v-if="active_nav == 'About'">
                            <PokemonAbout :pokemon="pokemon" :pokemon_specy="pokemon_specy"
                                :pokemon_encounters="pokemon_encounters" />
                        </div>
                        <!-- Stats -->
                        <div id="stats" v-if="active_nav == 'Stats'">
                            <PokemonStats :stats="pokemon.stats" />
                        </div>
                        <!-- Evolution -->
                        <div id="evolution" v-if="active_nav == 'Evolution'">
                            <PokemonEvolutions :pokemon_evolutions="pokemon_evolution" />
                        </div>
                        <!-- Moves -->
                        <div class="moves" v-if="active_nav == 'Moves'">
                            <PokemonMoves :moves="pokemon.moves" />
                        </div>
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
    layout: 'pokemon',
    pageTransition: {
        name: 'slide-right',
        mode: 'out-in',
        onBeforeEnter(el) {
            const pageTransitionName = useRoute().meta.pageTransition.name
            const previous_pokemon_picture = el.querySelector('.previous-pokemon-picture')
            const next_pokemon_picture = el.querySelector('.next-pokemon-picture')

            if (pageTransitionName == 'slide-left') {
                const previous_pokemon_type = previous_pokemon_picture?.dataset.type
                gsap.set(el, { backgroundColor: getTypeColor(previous_pokemon_type) })

            } else if (pageTransitionName == 'slide-right') {
                const next_pokemon_type = next_pokemon_picture?.dataset.type
                gsap.set(el, { backgroundColor: getTypeColor(next_pokemon_type) })
            }
        },
        onEnter(el, done) {
            const tl = gsap.timeline()
            const title = el.querySelector('h1')
            const types_badges = el.querySelectorAll('.type-badge')
            const pokemon_id = el.querySelector('.pokemon-id')
            const pokemon_specy = el.querySelector('.pokemon-specy')
            const pokemon_picture = el.querySelector('.pokemon-picture')
            const current_pokemon_type = pokemon_picture?.dataset.type
            const pageTransitionName = useRoute().meta.pageTransition.name

            // Move pokemon pictures
            if (pageTransitionName == 'slide-left') {
                gsap.from(pokemon_picture, { 
                    x: 200,
                    scale: 0.6,
                    opacity: 0,
                    duration: 0.2,
                    ease: 'power2.inOut'
                })
            } else if (pageTransitionName == 'slide-right') {
                gsap.from(pokemon_picture, { 
                    x: -200,
                    scale: 0.6,
                    opacity: 0,
                    duration: 0.2,
                    ease: 'power2.inOut'
                })
            }

            // Set animations
            let ctx = gsap.context(() => {
                tl
                    .to(el, { backgroundColor: getTypeColor(current_pokemon_type), duration: 0.1 })
                    .from(title, { autoAlpha: 0, x: -10, duration: 0.4 }, 0)
                    .from(pokemon_id, { autoAlpha: 0, x: 10, duration: 0.4 }, "-=0.4")
                    .from(types_badges, { autoAlpha: 0, duration: 0.2, stagger: 0.1 }, "-=0.2")
                    .from(pokemon_specy, { autoAlpha: 0, duration: 0.2 }, "-=0.1")
                    .call(done)
            }, el)


            // TEST: Si jamais je ne trouve pas satisfaction ce jeu d'opacité est bien 
            // Set pokemon picture to opacity 1
            // gsap.to(pokemon_picture, { opacity: 1, duration: 0.5 })

            done()
        },
        /* If I remove the onLeave, the navigation is not fluid anymore */
        onLeave(el, done) {

            done()

            // https://stackoverflow.com/questions/46504338/vue-js-js-animation-hooks-with-gsap-leave-animation-not-working
        },
    },
    middleware(to, from) {
        to.meta.pageTransition.name = +to.params.id > +from.params.id ? 'slide-left' : 'slide-right'
    }
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
const startSwipeInfos = ref<number>(0)
const endSwipeInfos = ref<number>(0)
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

/* Swipe pokemons */
const handlePokemonTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0]
    startSwipePokemon.value = touch.clientX
}

const handlePokemonTouchMove = (e: TouchEvent) => {
    const touch = e.touches[0]
    endSwipePokemon.value = touch.clientX
}

const handlePokemonTouchEnd = (e: TouchEvent) => {
    const touch = e.changedTouches[0]
    endSwipePokemon.value = touch.clientX

    const direction = getSwipeDirection(startSwipePokemon.value, endSwipePokemon.value)

    if (direction == 'left') {
        if (next_pokemon.value) {
            router.push({ path: `/pokemons/${next_pokemon.value.id.toString()}` })

        }
    } else if (direction == 'right') {
        if (previous_pokemon.value) {
            router.push({ path: `/pokemons/${previous_pokemon.value.id.toString()}` })
        }
    }

    resetSwipePokemon()
}

const resetSwipePokemon = () => {
    startSwipePokemon.value = 0
    endSwipePokemon.value = 0
}

// Swipe information tabs
const handleInfosTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0]
    startSwipeInfos.value = touch.clientX
}

const handleInfosTouchMove = (e: TouchEvent) => {
    const touch = e.touches[0]
    endSwipeInfos.value = touch.clientX
}

const handleInfosTouchEnd = (e: TouchEvent) => {
    const touch = e.changedTouches[0]
    endSwipeInfos.value = touch.clientX

    const direction = getSwipeDirection(startSwipeInfos.value, endSwipeInfos.value)
    const index = nav.findIndex((item) => item.name == active_nav.value)

    if (direction == 'left') {
        if (index < nav.length - 1) {
            active_nav.value = nav[index + 1].name
        }
    } else if (direction == 'right') {
        if (index > 0) {
            active_nav.value = nav[index - 1].name
        }
    }

    resetSwipeInfos()
}

const resetSwipeInfos = () => {
    startSwipeInfos.value = 0
    endSwipeInfos.value = 0
}

</script>