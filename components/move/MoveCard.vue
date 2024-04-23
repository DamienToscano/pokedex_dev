<template>
    <li class="border-2 rounded-lg p-8 relative shadow-sm" :class="`shadow-${move.type}/80 border-${move.type}`">
        <component :is="component" :class="`fill-${move.type}`" class="h-24 w-24 absolute bottom-0 right-0 m-4"></component>
        <div class="w-4/5 relative">
            <div class="flex flex-wrap items-center space-y-2">
                <p class="py-2 px-4 w-fit rounded-lg font-semibold text-lg text-white" :class="`bg-${move.type}`">{{
                    capitalize(move.name) }}
                </p>
                <p v-if="move.level" class="ml-2 font-semibold text-lg" :class="`text-${move.type}`">Lvl. {{ move.level }}
                </p>
            </div>
            <p class="mt-4">{{ move.description }}</p>
            <div class="flex flex-wrap gap-4 mt-4">
                <template v-for="info in infos" :key="info.name">
                    <p v-if="info.visible" class="bg-gray-200 py-1 px-2 rounded text-sm sm:text-base">
                        <span class="font-bold">{{ info.name }}</span> {{ info.value }}
                    </p>
                </template>
            </div>
        </div>
    </li>
</template>

<script setup lang="ts">
import { capitalize } from 'vue';
import { Move } from '~/data/models/move';
import type { PokemonMoveDetailType } from '~/types/pokemons';

const props = defineProps<{
    move: PokemonMoveDetailType | Move;
}>()

const component = defineAsyncComponent(() => import(`@/components/type/icons/${capitalize(props.move.type)}Icon.vue`))

const infos = [
    {
        'name': 'Power',
        'value': props.move.power,
        'visible': props.move.power > 0
    },
    {
        'name': 'Accuracy',
        'value': props.move.accuracy,
        'visible': props.move.accuracy > 0
    },
    {
        'name': 'PP',
        'value': props.move.pp,
        'visible': true
    },
    {
        'name': 'Priority',
        'value': props.move.priority,
        'visible': true
    },
    {
        'name': 'Type',
        'value': capitalize(props.move.damage_class),
        'visible': true
    },
    {
        'name': 'Target',
        'value': capitalize(props.move.target.replaceAll('-', ' ')),
        'visible': true
    }
]
</script>