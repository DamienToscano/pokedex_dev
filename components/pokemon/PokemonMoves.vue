<template>
    <div>
        <ul v-if="moves && complete_moves" class="mb-6">
            <template v-for="move in complete_moves" :key="move.name" >
                <!-- Display it only if description is defined -->
                <MoveCard v-if="move.description" :move="move" class="mt-8" />
            </template>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { PokemonMoveType } from '~/types/pokemons';
import { usePokemonStore } from '@/stores/PokemonStore'
import MoveCard from '@/components/move/MoveCard.vue'

const pokemonStore = usePokemonStore()

const props = defineProps<{
    moves: PokemonMoveType[];
}>()

const complete_moves = computed(() => {
    return props.moves.map(move => {
        let detailed_move = pokemonStore.getPokemonMoveById(move.id)
        return {
            ...move,
            ...detailed_move
        }
    })
})
</script>