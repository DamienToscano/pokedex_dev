<template>
    <div v-if="loading || fake_loading"
        class="z-40 w-screen min-h-screen bg-white absolute top-0 left-0 uppercase font-bold text-4xl text-gray-400 flex">
        <div class="m-auto flex flex-wrap items-center text-center px-24 h-full">
            <p>I'm going to catch them all, be right back soon</p>
            <img src="@/assets/images/pokemon-loader.gif" alt="Loader gif showing all pokemons one after the other" class="mx-auto">
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePokemonStore } from '@/stores/PokemonStore'
import { storeToRefs } from 'pinia';
const pokemonStore = usePokemonStore();
const { loading } = storeToRefs(pokemonStore);

// Only make the loader if the loading of the store is not finished
const fake_loading = ref<Boolean>(false);
fake_loading.value = loading.value;

// Fake the loading for 1,5 seconds
onMounted(() => {
    setTimeout(() => {
        fake_loading.value = false;
    }, 1500);
});

</script>