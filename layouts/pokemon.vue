<template>
    <div>
        <header>
            <NuxtLink :to="'/'">
                <img src="@/assets/images/pokeball.png" alt="Pokeball icon"
                    class="absolute top-0 right-0 m-8 w-16 h-16 z-50  hover:rotate-180 transition-transform">
            </NuxtLink>
        </header>
        <div class="relative overflow-hidden">
            <Loader />
            <div class="">
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