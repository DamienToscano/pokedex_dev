<template>
    <div class="quizz-container">
        <NuxtLink to="/">
            <ArrowLeftIcon class="w-8 h-8 text-gray-400 hover:text-black" />
        </NuxtLink>
        <h1 class="title-1">Quizz</h1>
        <p class="text-3xl font-semibold text-gray-800 mb-4 mt-12">Guess who's the pokemon ?</p>
        <p class="text-xl text-gray-600 italic">Try a pokemon name and you will have hints to know if you are close or
            not to the good one !</p>
        <SearchBar v-model="guess" placeholder="Try a pokemon !!!" class="search-bar" @input="searchPokemon" />
        <div v-if="autocompletePokemons.length"
            class="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 max-h-96 bg-gray-100 overflow-auto p-4">
            <div v-for="autocomplete in autocompletePokemons" :key="autocomplete.id"
                class="cursor-pointer hover:bg-gray-200 transition-colors" @click="selectGuess(autocomplete)">
                <div class="flex items-center gap-4">
                    <img class="h-16 w-auto border-2 border-black p-2 rounded-lg bg-white" :src="autocomplete.picture"
                        :alt="autocomplete.name" />
                    <p class="font-medium text-xl capitalize">
                        <span v-if="pokemonStore.lang == 'en'">{{ autocomplete.name }}</span>
                        <span v-else-if="pokemonStore.lang == 'fr'">{{ autocomplete.name_fr }}</span>
                    </p>
                </div>

            </div>
        </div>
        <!-- Success button -->
        <div v-if="success" class="flex items-center justify-center gap-4 my-4">
            <button @click="restart"
                class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg">Success !
                Play again</button>
        </div>
        <!-- Guesses -->
        <!-- TODO: Add responsive on tries -->
        <div v-if="tries.length" class="flex flex-col gap-4 w-fit mx-auto overflow-auto">
            <div class="flex gap-4 font-medium text-center">
                <div class="w-20">Pokemon</div>
                <div class="w-20">Type 1</div>
                <div class="w-20">Type 2</div>
                <div class="w-20">Evolution</div>
                <div class="w-20">Habitat</div>
                <div class="w-20">Color</div>
                <div class="w-20">Height</div>
                <div class="w-20">Weight</div>
            </div>
            <div v-for="pokemon_try in tries" class="flex gap-4 font-medium capitalize">
                <NuxtLink :to="'/pokemons/' + pokemon_try.pokemon.id" target="_blank">
                <img class="h-20 w-auto border-2 border-black p-2 rounded-lg bg-white"
                    :src="pokemon_try.pokemon.picture" :alt="pokemon_try.pokemon.name" />
                </NuxtLink>
                <div class="h-20 w-20 border-2 border-black p-2 rounded-lg flex items-center justify-center" :class="{
            'bg-red-300': compareTypes(pokemon_try.pokemon.types[0].name, pokemon_try.pokemon.types[1] ? pokemon_try.pokemon.types[1].name : null, 1) == 'fail',
            'bg-yellow-300': compareTypes(pokemon_try.pokemon.types[0].name, pokemon_try.pokemon.types[1] ? pokemon_try.pokemon.types[1].name : null, 1) == 'close',
            'bg-green-300': compareTypes(pokemon_try.pokemon.types[0].name, pokemon_try.pokemon.types[1] ? pokemon_try.pokemon.types[1].name : null, 1) == 'success'
        }">{{ pokemon_try.pokemon.types[0].name }}</div>
                <div class="h-20 w-20 border-2 border-black p-2 rounded-lg flex items-center justify-center" :class="{
            'bg-red-300': compareTypes(pokemon_try.pokemon.types[0].name, pokemon_try.pokemon.types[1] ? pokemon_try.pokemon.types[1].name : null, 2) == 'fail',
            'bg-yellow-300': compareTypes(pokemon_try.pokemon.types[0].name, pokemon_try.pokemon.types[1] ? pokemon_try.pokemon.types[1].name : null, 2) == 'close',
            'bg-green-300': compareTypes(pokemon_try.pokemon.types[0].name, pokemon_try.pokemon.types[1] ? pokemon_try.pokemon.types[1].name : null, 2) == 'success'
        }">{{ pokemon_try.pokemon.types[1] ? pokemon_try.pokemon.types[1].name : 'None' }}</div>
                <div class="h-20 w-20 border-2 border-black p-2 rounded-lg flex items-center justify-center" :class="{
            'bg-red-300': pokemon_try.evolution_step !== pokemonToGuess.evolution_step,
            'bg-green-300': pokemon_try.evolution_step == pokemonToGuess.evolution_step
        }">{{ pokemon_try.evolution_step }}</div>
                <div class="h-20 w-20 border-2 border-black p-2 rounded-lg flex items-center justify-center text-sm"
                    :class="{
            'bg-red-300': pokemon_try.specy.habitat !== pokemonToGuess.specy.habitat,
            'bg-green-300': pokemon_try.specy.habitat == pokemonToGuess.specy.habitat
        }">{{ pokemon_try.specy.habitat }}</div>
                <!-- Color -->
                <div class="h-20 w-20 border-2 border-black p-2 rounded-lg flex items-center justify-center text-sm"
                    :class="{
            'bg-red-300': pokemon_try.specy.color !== pokemonToGuess.specy.color,
            'bg-green-300': pokemon_try.specy.color == pokemonToGuess.specy.color
        }">{{ pokemon_try.specy.color }}</div>
                <!-- Height -->
                <div class="h-20 w-20 border-2 border-black p-2 rounded-lg flex flex-col items-center justify-center text-sm"
                    :class="{
            'bg-red-300': ['lower', 'upper'].includes(compareHeight(pokemon_try.pokemon.height)),
            'bg-green-300': compareHeight(pokemon_try.pokemon.height) == 'success'
        }">
                    <p>{{ pokemon_try.pokemon.height * 10 }} cm</p>
                    <div>
                        <ArrowDownIcon v-if="compareHeight(pokemon_try.pokemon.height) == 'lower'" class="w-6 h-6" />
                        <ArrowUpIcon v-else-if="compareHeight(pokemon_try.pokemon.height) == 'upper'"
                            class="w-6 h-6 " />
                    </div>
                </div>
                <!-- Weight -->
                <div class="h-20 w-20 border-2 border-black p-2 rounded-lg flex flex-col items-center justify-center text-sm"
                    :class="{
            'bg-red-300': ['lower', 'upper'].includes(compareWeight(pokemon_try.pokemon.weight)),
            'bg-green-300': compareWeight(pokemon_try.pokemon.weight) == 'success'
        }">
                    <p>{{ pokemon_try.pokemon.weight / 10 }} kg</p>
                    <div>
                        <ArrowDownIcon v-if="compareWeight(pokemon_try.pokemon.weight) == 'lower'" class="w-6 h-6" />
                        <ArrowUpIcon v-else-if="compareWeight(pokemon_try.pokemon.weight) == 'upper'"
                            class="w-6 h-6 " />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArrowLeftIcon, ArrowDownIcon, ArrowUpIcon } from '@heroicons/vue/24/solid'
import SearchBar from '@/components/common/SearchBar.vue'
import { usePokemonStore } from '@/stores/PokemonStore';
import { Pokemon } from '@/data/models/pokemon';
import { PokemonSpecy } from '@/data/models/pokemon-specy';

const pokemonStore = usePokemonStore();
const { getPokemonForQuiz, getPokemonsByName } = pokemonStore;

const guess = ref<string>('');
const pokemonToGuess = getPokemonForQuiz(Math.floor(Math.random() * 151));
console.log(pokemonToGuess);
const autocompletePokemons = ref<Pokemon[]>([]);
const tries = ref<Array<{ pokemon: Pokemon, specy: PokemonSpecy, evolution_step: number }>>([]);
const success = ref<boolean>(false);

onMounted(() => {
    const input = document.getElementById('search-bar') as HTMLInputElement;
    input.focus();
});

// Listen to event update model value
const searchPokemon = () => {
    if (guess.value.length < 1) {
        autocompletePokemons.value = [];
        return;
    }
    autocompletePokemons.value = getPokemonsByName(guess.value);
}

const selectGuess = (pokemon: Pokemon) => {
    const data = getPokemonForQuiz(pokemon.id);

    tries.value.unshift(data);
    guess.value = '';
    autocompletePokemons.value = [];
    if (pokemon.id === pokemonToGuess.pokemon.id) {
        success.value = true;
    }

    // Refocus on input
    const input = document.getElementById('search-bar') as HTMLInputElement;
    input.focus();
}

const restart = () => {
    tries.value = [];
    success.value = false;
    pokemonToGuess.pokemon = getPokemonForQuiz(Math.floor(Math.random() * 151)).pokemon;
}

const compareTypes = (type1: string, type2: string | null, type_to_compare: number) => {
    if (type_to_compare === 1) {
        if (type1 === pokemonToGuess.pokemon.types[0].name) {
            return 'success';
        }
        else if (pokemonToGuess.pokemon.types[1] && type1 === pokemonToGuess.pokemon.types[1].name) {
            return 'close';
        }
        else {
            return 'fail';
        }
    }

    if (type_to_compare === 2) {
        if (type2 == pokemonToGuess.pokemon.types[1]?.name) {
            return 'success';
        }
        else if (type2 === pokemonToGuess.pokemon.types[0].name) {
            return 'close';
        }
        else {
            return 'fail';
        }
    }
}

const compareHeight = (height: number) => {
    if (height < pokemonToGuess.pokemon.height) {
        return 'upper';
    }
    else if (height > pokemonToGuess.pokemon.height) {
        return 'lower';
    }
    else {
        return 'success';
    }
}

const compareWeight = (weight: number) => {
    if (weight < pokemonToGuess.pokemon.weight) {
        return 'lower';
    }
    else if (weight > pokemonToGuess.pokemon.weight) {
        return 'upper';
    }
    else {
        return 'success';
    }
}
</script>