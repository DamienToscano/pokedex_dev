<template>
    <div v-if="moves" class="moves-container">
        <NuxtLink to="/">
            <ArrowLeftIcon class="w-8 h-8 text-gray-400 hover:text-black" />
        </NuxtLink>
        <h1 class="title-1">Moves</h1>
        <SearchBar v-model="search" placeholder="Search a move !!!" class="search-bar" />
        <h2 class="title-2">Choose a type</h2>
        <div class="flex pb-6 mt-4 mb-6 overflow-auto flex-nowrap gap-x-4 snap-x">
            <AllTypesFilterButton @click="filter = ''" :active="filter == ''" class="snap-start filter-button" />
            <TypeFilterButton v-for="pokemon_type in types" :key="pokemon_type" :type="pokemon_type"
                @click="filter = pokemon_type" :active="filter == pokemon_type" class="snap-start filter-button" />
        </div>
        <div class="moves-list">
            <ul class="grid grid-cols-1 gap-8 lg:grid-cols-2 2xl:grid-cols-3">
                <template v-for="move in moves" :key="move.id">
                    <MoveCard v-if="move.description && (filter === '' || move.type === filter) && move.name.includes(search)" :move="move" class="move-card" />
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
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)

const filter = ref<string>('');
const search = ref<string>('');

const pokemonStore = usePokemonStore()
const { moves, types } = storeToRefs(pokemonStore);

onMounted(() => {
    const container = <HTMLElement>document.querySelector('.moves-container')
    const tl = gsap.timeline()
    const title = <HTMLElement>container.querySelector('h1')
    const search_bar = <HTMLElement>container.querySelector('.search-bar')
    const type_title = <HTMLElement>container.querySelector('h2')
    const filter_buttons = container.querySelectorAll('.filter-button')
    const move_list = <HTMLElement>container.querySelector('.moves-list')

    gsap.utils.toArray('.move-card').forEach((move_card) => {
        gsap.from(move_card, {
            y: 100,
            opacity: 0,
            scale: 0.9,
            duration: 0.2,
            scrollTrigger: {
                trigger: move_card,
                start: 'top 100%',
                // markers: true,
                toggleActions: 'play none none reverse',
            }
        })
    })

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
            .from(move_list, {
                duration: 0.4,
                autoAlpha: 0,
                ease: 'power2.out',
            }, 0.6)
    }, container)
})
</script>