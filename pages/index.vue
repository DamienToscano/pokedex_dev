<template>
    <div>
        <h1 class="title-1 mt-12">Welcome to the pokedev</h1>
        <div class="grid sm:grid-cols-2 gap-6 sm:gap-8">
            <MenuCard v-for="item in menu" :key="item.name" :name="item.name" :link="item.link" :bg_color="item.bg_color" :shadow_color="item.shadow_color" />
        </div>
            <PokemonRandomCard class="mt-6 sm:mt-8" />
    </div>
</template>

<script setup lang="ts">
import MenuCard from '@/components/menu/MenuCard.vue'
import PokemonRandomCard from '@/components/menu/PokemonRandomCard.vue'

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
]
</script>