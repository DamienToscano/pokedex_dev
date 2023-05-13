<template>
    <div class="relative overflow-hidden">
        <header>
            <NuxtLink :to="'/'">
                <img src="@/assets/images/pokeball.png" alt="Pokeball icon"
                    class="absolute top-0 right-0 m-4 sm:m-8 w-12 sm:w-16 h-12 sm:h-16 z-50 hover:rotate-180 transition-transform">
            </NuxtLink>
        </header>
        <div class="container mx-auto my-12">
            <Loader />
            <div class="p-4">
                <slot />
            </div>
        </div>

        <footer class="">
        </footer>
    </div>
</template>

<script setup lang="ts">
import { usePokemonStore } from '@/stores/PokemonStore'
import Loader from '@/components/loader/Loader.vue';

const pokemonStore = usePokemonStore();
pokemonStore.fetchData();

</script>