<template>
    <div class="evolution-container">
        <h2 class="text-xl font-bold text-gray-800 mb-4">Evolution chain</h2>
        <div class="sm:mx-8">
            <template v-for="evolution in pokemon_evolutions" v-if="pokemon_evolutions.length > 1">
                <div v-if="evolution.trigger && evolution.base_pokemon" class="flex items-center justify-between my-4 evolution-line">
                    <NuxtLink :to="`/pokemons/${evolution.base_pokemon.id}`">
                        <div class="relative text-center font-semibold group">
                            <img src="@/assets/images/pokeball_dark.svg" alt="Pokeball icon"
                                class="absolute top-1 left-1 opacity-80 w-11/12 h-auto group-hover:rotate-45 transition">
                            <img :src="`https://projectpokemon.org/images/normal-sprite/${evolution.base_pokemon.name.replace('-', '_')}.gif`" :alt="`Picture of ${evolution.base_pokemon.name}`"
                                class="relative max-h-24 w-auto group-hover:drop-shadow-md">
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
                            <img :src="`https://projectpokemon.org/images/normal-sprite/${evolution.name.replace('-', '_')}.gif`" :alt="`Picture of ${evolution.name}`"
                                class="relative max-h-24 w-auto group-hover:drop-shadow-md">
                            <p>{{ capitalize(evolution.name) }}</p>
                        </div>
                    </NuxtLink>
                </div>
            </template>
        </div>
        <p v-if="has_no_evolution">This pokemon has no evolution !</p>
    </div>
</template>

<script setup lang="ts">
import { capitalize } from 'vue';
import type { PokemonEvolutionType } from '~/types/pokemons';
import { ArrowRightIcon } from '@heroicons/vue/24/solid';
import gsap from 'gsap';

const props = defineProps<{
    pokemon_evolutions: PokemonEvolutionType[];
}>()

const has_no_evolution = computed(() => {

    if (props.pokemon_evolutions.length <= 1) {
        return true
    }

    let flag = true
    props.pokemon_evolutions.forEach((evolution) => {
        if (evolution.base_pokemon) {
            flag = false
        }
    })

    return flag
})

onMounted(() => {
    if (has_no_evolution.value) {
        return
    }

    const container = <HTMLElement>document.querySelector('.evolution-container');
    const lines = document.querySelectorAll('.evolution-line');

    let ctx = gsap.context(() => {
        gsap.from(lines, {
            duration: 1,
            opacity: 0,
            ease: 'power2.out',
            stagger: 0.2,
        });
    }, container)
})

</script>