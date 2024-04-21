<template>
    <div class="home-container">
        <h1 class="title-1 mt-4 sm:mt-12">Welcome to the pokedev</h1>
        <div class="grid sm:grid-cols-2 gap-6 sm:gap-8">
            <MenuCard v-for="item in menu" :key="item.name" :name="item.name" :link="item.link"
                :bg_color="item.bg_color" :shadow_color="item.shadow_color" class="menu-card" />
        </div>
        <PokemonRandomCard class="mt-6 sm:mt-8 random-card" />
    </div>
</template>

<script setup lang="ts">
import MenuCard from '@/components/menu/MenuCard.vue'
import PokemonRandomCard from '@/components/menu/PokemonRandomCard.vue'
import gsap from 'gsap'

type MenuType = {
    name: string,
    link: string,
    bg_color: string,
    shadow_color: string,
}
const menu: MenuType[] = [
    { name: 'Pokemons', link: 'pokemons', bg_color: 'bg-grass', shadow_color: 'shadow-grass/80' },
    { name: 'Moves', link: 'moves', bg_color: 'bg-fighting', shadow_color: 'shadow-fighting/80' },
    { name: 'Abilities', link: 'abilities', bg_color: 'bg-water', shadow_color: 'shadow-water/80' },
    { name: 'Items', link: 'items', bg_color: 'bg-electric', shadow_color: 'shadow-electric/80' },
    { name: 'Quizz', link: 'quizz', bg_color: 'bg-poison', shadow_color: 'shadow-poison/80' },
]

onMounted(() => {
    const container = <HTMLElement>document.querySelector('.home-container')
    const tl = gsap.timeline()
    const title = <HTMLElement>document.querySelector('h1')
    const cards = document.querySelectorAll('.menu-card')
    const random_card = <HTMLElement>document.querySelector('.random-card')

    let ctx = gsap.context(() => {
        tl
            .from(title, {
                duration: 0.8,
                autoAlpha: 0,
                ease: 'power2.out',
            })
            .from(cards, {
                duration: 0.5,
                autoAlpha: 0,
                ease: 'power2.out',
                stagger: 0.1,
            }, 0)
            .from(random_card, {
                duration: 0.5,
                autoAlpha: 0,
                ease: 'power2.out',
            }, '-=0.3')
    }, container)
})

</script>