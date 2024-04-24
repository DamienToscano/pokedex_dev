<template>
    <div class="quizz-container lg:min-h-[80vh]">
        <NuxtLink to="/">
            <ArrowLeftIcon class="w-8 h-8 text-gray-400 hover:text-black" />
        </NuxtLink>
        <h1 class="title-1">Quizz</h1>
        <p class="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4 mt-12">Guess who's the pokemon ?</p>
        <p class="text-lg sm:text-xl text-gray-600 italic">Try a pokemon name and you will have hints to know if you are
            close or
            not to the good one !</p>
        <div class="relative">
            <SearchBar v-model="guess" placeholder="Try a pokemon !!!" class="search-bar" @input="searchPokemon" />
            <div v-if="autocompletePokemons.length"
                class="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 max-h-96 bg-gray-100 overflow-auto mb-4 absolute w-full z-50">
                <template v-for="autocomplete in autocompletePokemons" :key="autocomplete.id">
                    <div v-if="!tries.find((element) => element.pokemon.id === autocomplete.id)"
                        class="cursor-pointer hover:bg-gray-200 transition-colors m-4"
                        @click="selectGuess(autocomplete)">
                        <div class="flex items-center gap-4">
                            <img class="h-16 w-auto border-2 border-black p-2 rounded-lg bg-white"
                                :src="autocomplete.picture" :alt="autocomplete.name" />
                            <p class="font-medium text-xl capitalize">
                                <span v-if="pokemonStore.lang == 'en'">{{ autocomplete.name }}</span>
                                <span v-else-if="pokemonStore.lang == 'fr'">{{ autocomplete.name_fr }}</span>
                            </p>
                        </div>
                    </div>
                </template>
            </div>
        </div>
        <!-- Success button -->
        <div v-if="success" class="flex items-center justify-center gap-4 my-4">
            <button @click="restart"
                class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg">Success !
                Play again</button>
        </div>
        <!-- Guesses -->
        <!-- Mobile view -->
        <div v-if="tries.length" class="flex md:hidden flex-col gap-8 w-full mx-auto">
            <div v-for="pokemon_try in tries"
                class="font-semibold capitalize text-sm flex gap-4 items-center w-full text-white">
                <NuxtLink :to="'/pokemons/' + pokemon_try.pokemon.id" target="_blank">
                    <img class="h-[100px] w-[100px] p-2 rounded-xl bg-gray-100 shadow-lg"
                        :src="pokemon_try.pokemon.picture" :alt="pokemon_try.pokemon.name" />
                </NuxtLink>
                <div class="grid grid-cols-12 gap-2 grow truncate">
                    <div class="col-span-6 px-2 py-1 rounded-lg flex items-center justify-center shadow-lg" :class="{
                'bg-fire': compareTypes(pokemon_try.pokemon.types[0].name, pokemon_try.pokemon.types[1] ? pokemon_try.pokemon.types[1].name : null, 1) == 'fail',
                'bg-electric': compareTypes(pokemon_try.pokemon.types[0].name, pokemon_try.pokemon.types[1] ? pokemon_try.pokemon.types[1].name : null, 1) == 'close',
                'bg-grass': compareTypes(pokemon_try.pokemon.types[0].name, pokemon_try.pokemon.types[1] ? pokemon_try.pokemon.types[1].name : null, 1) == 'success'
            }">{{ pokemon_try.pokemon.types[0].name }}</div>
                    <div class="col-span-6 px-2 py-1 rounded-lg flex items-center justify-center shadow-lg" :class="{
                'bg-fire': compareTypes(pokemon_try.pokemon.types[0].name, pokemon_try.pokemon.types[1] ? pokemon_try.pokemon.types[1].name : null, 2) == 'fail',
                'bg-electric': compareTypes(pokemon_try.pokemon.types[0].name, pokemon_try.pokemon.types[1] ? pokemon_try.pokemon.types[1].name : null, 2) == 'close',
                'bg-grass': compareTypes(pokemon_try.pokemon.types[0].name, pokemon_try.pokemon.types[1] ? pokemon_try.pokemon.types[1].name : null, 2) == 'success'
            }">{{ pokemon_try.pokemon.types[1] ? pokemon_try.pokemon.types[1].name : 'None' }}</div>
                    <!-- Evolution -->
                    <div class="col-span-8 px-2 py-1 rounded-lg flex items-center justify-center shadow-lg" :class="{
                'bg-fire': ['lower', 'upper'].includes(compareEvolution(pokemon_try.evolution_step)),
                'bg-grass': compareEvolution(pokemon_try.evolution_step) == 'success'
            }">
                        <p>
                            <span v-if="compareEvolution(pokemon_try.evolution_step) == 'lower'">&gt</span>
                            <span v-if="compareEvolution(pokemon_try.evolution_step) == 'upper'">&lt</span>
                            Evolution {{ pokemon_try.evolution_step }}
                        </p>
                    </div>
                    <!-- Color -->
                    <div class="col-span-4 px-2 py-1 rounded-lg flex items-center justify-center shadow-lg" :class="{
                'bg-fire': pokemon_try.specy.color !== pokemonToGuess.specy.color,
                'bg-grass': pokemon_try.specy.color == pokemonToGuess.specy.color
            }">{{ pokemon_try.specy.color }}</div>
                    <!-- Habitat -->
                    <div class="col-span-4 px-2 py-1 rounded-lg flex items-center justify-center shadow-lg text-xs"
                        :class="{
                'bg-fire': pokemon_try.specy.habitat !== pokemonToGuess.specy.habitat,
                'bg-grass': pokemon_try.specy.habitat == pokemonToGuess.specy.habitat
            }">{{ pokemon_try.specy.habitat }}</div>
                    <!-- Height -->
                    <div class="col-span-4 px-2 py-1 rounded-lg flex gap-1 items-center justify-center shadow-lg lowercase"
                        :class="{
                'bg-fire': ['lower', 'upper'].includes(compareHeight(pokemon_try.pokemon.height)),
                'bg-grass': compareHeight(pokemon_try.pokemon.height) == 'success'
            }">
                        <p>
                            <span v-if="compareHeight(pokemon_try.pokemon.height) == 'lower'">&gt</span>
                            <span v-if="compareHeight(pokemon_try.pokemon.height) == 'upper'">&lt</span>
                            {{ pokemon_try.pokemon.height / 10 }}m
                        </p>
                    </div>
                    <!-- Weight -->
                    <div class="col-span-4 px-2 py-1 rounded-lg flex gap-1 items-center justify-center shadow-lg relative lowercase"
                        :class="{
                'bg-fire': ['lower', 'upper'].includes(compareWeight(pokemon_try.pokemon.weight)),
                'bg-grass': compareWeight(pokemon_try.pokemon.weight) == 'success'
            }">
                        <p>
                            <span v-if="compareWeight(pokemon_try.pokemon.weight) == 'lower'">&gt</span>
                            <span v-if="compareWeight(pokemon_try.pokemon.weight) == 'upper'">&lt</span>
                            {{ pokemon_try.pokemon.weight / 10 }} kg
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Desktop view -->
        <div v-if="tries.length" class="hidden md:flex flex-col gap-4 w-fit mx-auto">
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
            <div v-for="pokemon_try in tries" class="flex gap-4 font-semibold capitalize text-white">
                <NuxtLink :to="'/pokemons/' + pokemon_try.pokemon.id" target="_blank">
                    <img class="h-20 w-auto p-2 rounded-xl bg-gray-100 shadow-lg" :src="pokemon_try.pokemon.picture"
                        :alt="pokemon_try.pokemon.name" />
                </NuxtLink>
                <div class="h-20 w-20 p-2 rounded-lg flex items-center justify-center shadow-lg" :class="{
                'bg-fire': compareTypes(pokemon_try.pokemon.types[0].name, pokemon_try.pokemon.types[1] ? pokemon_try.pokemon.types[1].name : null, 1) == 'fail',
                'bg-electric': compareTypes(pokemon_try.pokemon.types[0].name, pokemon_try.pokemon.types[1] ? pokemon_try.pokemon.types[1].name : null, 1) == 'close',
                'bg-grass': compareTypes(pokemon_try.pokemon.types[0].name, pokemon_try.pokemon.types[1] ? pokemon_try.pokemon.types[1].name : null, 1) == 'success'
            }">{{ pokemon_try.pokemon.types[0].name }}</div>
                <div class="h-20 w-20 p-2 rounded-lg flex items-center justify-center shadow-lg" :class="{
                'bg-fire': compareTypes(pokemon_try.pokemon.types[0].name, pokemon_try.pokemon.types[1] ? pokemon_try.pokemon.types[1].name : null, 2) == 'fail',
                'bg-electric': compareTypes(pokemon_try.pokemon.types[0].name, pokemon_try.pokemon.types[1] ? pokemon_try.pokemon.types[1].name : null, 2) == 'close',
                'bg-grass': compareTypes(pokemon_try.pokemon.types[0].name, pokemon_try.pokemon.types[1] ? pokemon_try.pokemon.types[1].name : null, 2) == 'success'
            }">{{ pokemon_try.pokemon.types[1] ? pokemon_try.pokemon.types[1].name : 'None' }}</div>
                <!-- Evolution -->
                <div class="h-20 w-24 p-2 rounded-lg flex flex-col items-center justify-center shadow-lg lowercase"
                    :class="{
                'bg-fire': ['lower', 'upper'].includes(compareEvolution(pokemon_try.evolution_step)),
                'bg-grass': compareEvolution(pokemon_try.evolution_step) == 'success'
            }">
                    <p>
                        <span v-if="compareEvolution(pokemon_try.evolution_step) == 'lower'">&gt</span>
                        <span v-if="compareEvolution(pokemon_try.evolution_step) == 'upper'">&lt</span>
                        {{ pokemon_try.evolution_step }}
                    </p>
                </div>
                <!-- Habitat -->
                <div class="h-20 w-20 p-2 rounded-lg flex items-center justify-center shadow-lg text-sm" :class="{
                'bg-fire': pokemon_try.specy.habitat !== pokemonToGuess.specy.habitat,
                'bg-grass': pokemon_try.specy.habitat == pokemonToGuess.specy.habitat
            }">{{ pokemon_try.specy.habitat }}</div>
                <!-- Color -->
                <div class="h-20 w-20 p-2 rounded-lg flex items-center justify-center shadow-lg" :class="{
                'bg-fire': pokemon_try.specy.color !== pokemonToGuess.specy.color,
                'bg-grass': pokemon_try.specy.color == pokemonToGuess.specy.color
            }">{{ pokemon_try.specy.color }}</div>
                <!-- Height -->
                <div class="h-20 w-24 p-2 rounded-lg flex flex-col items-center justify-center shadow-lg lowercase"
                    :class="{
                'bg-fire': ['lower', 'upper'].includes(compareHeight(pokemon_try.pokemon.height)),
                'bg-grass': compareHeight(pokemon_try.pokemon.height) == 'success'
            }">
                    <p>
                        <span v-if="compareHeight(pokemon_try.pokemon.height) == 'lower'">&gt</span>
                        <span v-if="compareHeight(pokemon_try.pokemon.height) == 'upper'">&lt</span>
                        {{ pokemon_try.pokemon.height / 10 }}m
                    </p>
                </div>
                <!-- Weight -->
                <div class="h-20 w-24 p-2 rounded-lg flex flex-col items-center justify-center shadow-lg lowercase"
                    :class="{
                'bg-fire': ['lower', 'upper'].includes(compareWeight(pokemon_try.pokemon.weight)),
                'bg-grass': compareWeight(pokemon_try.pokemon.weight) == 'success'
            }">
                    <p>
                        <span v-if="compareWeight(pokemon_try.pokemon.weight) == 'lower'">&gt</span>
                        <span v-if="compareWeight(pokemon_try.pokemon.weight) == 'upper'">&lt</span>
                        {{ pokemon_try.pokemon.weight / 10 }}kg
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArrowLeftIcon } from '@heroicons/vue/24/solid'
import SearchBar from '@/components/common/SearchBar.vue'
import { usePokemonStore } from '@/stores/PokemonStore';
import { Pokemon } from '@/data/models/pokemon';
import { PokemonSpecy } from '@/data/models/pokemon-specy';
import type { PokemonQuizzType } from '@/types/pokemons'

const pokemonStore = usePokemonStore();
const { getPokemonForQuiz, getPokemonsByName } = pokemonStore;

const guess = ref<string>('');
const pokemonToGuess = ref<PokemonQuizzType>(getPokemonForQuiz(Math.floor(Math.random() * 151)));
console.log(pokemonToGuess.value);
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
    if (pokemon.id === pokemonToGuess.value.pokemon.id) {
        success.value = true;
    }

    // Refocus on input
    const input = document.getElementById('search-bar') as HTMLInputElement;
    input.focus();
}

const restart = () => {
    tries.value = [];
    success.value = false;
    pokemonToGuess.value = getPokemonForQuiz(Math.floor(Math.random() * 151));
    console.log(pokemonToGuess.value);
}

const compareTypes = (type1: string, type2: string | null, type_to_compare: number) => {
    if (type_to_compare === 1) {
        if (type1 === pokemonToGuess.value.pokemon.types[0].name) {
            return 'success';
        }
        else if (pokemonToGuess.value.pokemon.types[1] && type1 === pokemonToGuess.value.pokemon.types[1].name) {
            return 'close';
        }
        else {
            return 'fail';
        }
    }

    if (type_to_compare === 2) {
        if (type2 == pokemonToGuess.value.pokemon.types[1]?.name) {
            return 'success';
        }
        else if (type2 === pokemonToGuess.value.pokemon.types[0].name) {
            return 'close';
        }
        else {
            return 'fail';
        }
    }
}

const compareHeight = (height: number) => {
    if (height < pokemonToGuess.value.pokemon.height) {
        return 'lower';
    }
    else if (height > pokemonToGuess.value.pokemon.height) {
        return 'upper';
    }
    else {
        return 'success';
    }
}

const compareWeight = (weight: number) => {
    if (weight < pokemonToGuess.value.pokemon.weight) {
        return 'lower';
    }
    else if (weight > pokemonToGuess.value.pokemon.weight) {
        return 'upper';
    }
    else {
        return 'success';
    }
}

const compareEvolution = (evolution: number) => {
    if (evolution < pokemonToGuess.value.evolution_step) {
        return 'lower';
    }
    else if (evolution > pokemonToGuess.value.evolution_step) {
        return 'upper';
    }
    else {
        return 'success';
    }
}
</script>