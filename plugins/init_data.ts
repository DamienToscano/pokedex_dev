import { usePokemonStore } from '@/stores/PokemonStore'

/* Plugins are triggered automatically in the app */
export default defineNuxtPlugin(({ app }) => {
    const pokemonStore = usePokemonStore();
    pokemonStore.handleFetch();
})