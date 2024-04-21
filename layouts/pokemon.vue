<template>
    <div>
        <header>
            <div class="absolute top-0 right-0 mt-4 sm:m-8 z-50 flex flex-col items-center">
                <NuxtLink :to="'/'">
                    <img src="@/assets/images/pokeball.png" alt="Pokeball icon"
                        class="w-12 sm:w-16 h-12 sm:h-16 hover:rotate-180 transition-transform">
                </NuxtLink>
                <div class="flex gap-3 text-gray-200">
                    <p class="cursor-pointer" @click="pokemonStore.changeLang('en')"
                        :class="{ 'font-bold': pokemonStore.lang === 'en' }">
                        EN
                    </p>
                    <p class="cursor-pointer" @click="pokemonStore.changeLang('fr')"
                        :class="{ 'font-bold': pokemonStore.lang === 'fr' }">
                        FR
                    </p>
                </div>
            </div>
        </header>
        <div class="relative overflow-hidden">
            <Loader />
            <div class="">
                <slot />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Loader from '@/components/loader/Loader.vue';
import { usePokemonStore } from '@/stores/PokemonStore';
const pokemonStore = usePokemonStore();
</script>