<template>
    <div class="abilities-container">
        <NuxtLink to="/">
            <ArrowLeftIcon class="w-8 h-8 text-gray-400 hover:text-black" />
        </NuxtLink>
        <h1 class="title-1">Abilities</h1>
        <SearchBar v-model="search" placeholder="Search an ability !!!" class="search-bar" />
        <div class="flex flex-wrap justify-center gap-8 bg-white abilities-list">
            <ul class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                <template v-for="abilitiy in abilities" :key="abilitiy.id">
                    <AbilityCard v-if="abilitiy.name.includes(search)" :ability="abilitiy" />
                </template>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArrowLeftIcon } from '@heroicons/vue/24/solid'
import { usePokemonStore } from '@/stores/PokemonStore'
import { storeToRefs } from 'pinia';
import SearchBar from '@/components/common/SearchBar.vue'
import AbilityCard from '@/components/ability/AbilityCard.vue'
import gsap from 'gsap'

const search = ref<string>('');

const pokemonStore = usePokemonStore()
const { abilities } = storeToRefs(pokemonStore);

onMounted(() => {
    const container = <HTMLElement>document.querySelector('.abilities-container')
    const tl = gsap.timeline()
    const title = <HTMLElement>container.querySelector('h1')
    const search_bar = <HTMLElement>container.querySelector('.search-bar')
    const abilities_list = <HTMLElement>container.querySelector('.abilities-list')

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
            .from(abilities_list, {
                duration: 0.4,
                autoAlpha: 0,
                ease: 'power2.out',
            }, '-=0.3')
    }, container)
})
</script>