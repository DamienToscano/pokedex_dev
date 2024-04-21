<template>
    <div class="about-container">
        <div>
            <p>{{ pokemon_specy.description }}</p>
            <p>His main color is {{ pokemon_specy.color }} and lives in {{ pokemon_specy.habitat }}.</p>
        </div>
        <div
            class="flex rounded-xl p-4 justify-around mx-0 md:mx-8 my-8 bg-white shadow-[1px_2px_17px_-1px_rgba(56,56,56,0.45)]">
            <div>
                <p class="font-semibold text-gray-500">
                    <ArrowUpTrayIcon class="inline-block w-5 h-5 mr-1" />Height
                </p>
                <p class="mt-1 text-center">{{ pokemon.height * 10 }} cm</p>
            </div>
            <div>
                <p class="font-semibold text-gray-500">
                    <ScaleIcon class="inline-block w-6 h-6 mr-2" />Weight
                </p>
                <p class="mt-1 text-center">{{ pokemon.weight / 10 }} kg</p>
            </div>
        </div>
        <div>
            <h2 class="mb-4 text-xl font-bold text-gray-800">And what more ?</h2>
            <ul>
                <li><span class="pokemon_line_title w-36">Abilities</span>
                    <div class="flex flex-wrap gap-2 mb-2 sm:inline">
                        <span v-for="ability in pokemon.abilities" :key="ability.name" class="pokemon_info_list_item">{{
                            capitalize(ability.name).replaceAll(
                                '-', ' '
                            ) }}</span>
                    </div>
                </li>
                <li><span class="pokemon_line_title w-36">Growth rate</span>
                    {{ capitalize(pokemon_specy.growth_rate) }}</li>
                <li><span class="pokemon_line_title w-36">Capture rate</span>
                    {{ pokemon_specy.capture_rate }}%</li>
                <li><span class="pokemon_line_title w-36">Base hapiness</span>
                    {{ pokemon_specy.base_happiness }}</li>
                <li><span class="pokemon_line_title w-36">Egg groups</span>
                    <span v-for="egg_group in pokemon_specy.egg_groups" :key="egg_group" class="pokemon_info_list_item">{{
                        capitalize(egg_group)
                    }}</span>
                </li>
                <li v-if="pokemon_specy.gendered"><span class="pokemon_line_title w-36">Gender rate</span>
                    <img src="@/assets/images/icons/male-icon.png" alt="Male gender icon" class="inline h-6 mr-1" />{{
                        pokemon_specy.gender_rate_male
                    }}% <img src="@/assets/images/icons/female-icon.png" alt="Female gender icon"
                        class="inline h-6 ml-2 mr-1" />{{
                            pokemon_specy.gender_rate_female }}%
                </li>
                <li v-if="pokemon_encounters.length > 0">
                    <span class="pokemon_line_title w-36">Encounters</span>
                    <div class="flex flex-wrap gap-2">
                        <p v-for="encounter in pokemon_encounters" :key="encounter.id" class="pokemon_info_list_item">{{
                            capitalize(encounter.name).replaceAll(
                                '-', ' '
                            ) }} </p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { capitalize } from 'vue';
import { Pokemon } from '~/data/models/pokemon';
import { PokemonSpecy } from '~/data/models/pokemon-specy';
import { ScaleIcon, ArrowUpTrayIcon } from '@heroicons/vue/24/outline';
import type { PokemonEncounterType } from '@/types/pokemons';
import gsap from 'gsap';

defineProps<{
    pokemon: Pokemon;
    pokemon_specy: PokemonSpecy;
    pokemon_encounters: PokemonEncounterType[];
}>()

onMounted(() => {
    const container = <HTMLElement>document.querySelector('.about-container');

    let ctx = gsap.context(() => {
        gsap.from(container, {
            autoAlpha: 0,
            duration: 1,
            ease: 'power3.out',
        })
    }, container)
})

</script>