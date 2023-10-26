<template>
    <footer class="flex flex-col lg:flex-row-reverse items-end gap-4 m-4 bg-transparent text-center">
        <a v-for="item in data"
            class="block w-full font-semibold text-white rounded px-4 py-2 md:w-fit"
            :class="item.color"
            :href="item.link"
            target="_blank">
            {{ item.name }}
        </a>
    </footer>
</template>

<script setup lang="ts">

const data = [
    {
        name: '© By Damien Toscano',
        link: 'https://twitter.com/DamienToscano',
        color: 'bg-dragon'
    },
    {
        name: 'Data - PokeAPI',
        link: 'https://pokeapi.co/',
        color: 'bg-fire'
    },
    {
        name: 'GIFs - Project Pokemon',
        link: 'https://projectpokemon.org/',
        color: 'bg-grass'
    },
    {
        name: 'Inspiration - Dribbble',
        link: 'https://dribbble.com/shots/6540871-Pokedex-App',
        color: 'bg-rock'
    }
]

</script>