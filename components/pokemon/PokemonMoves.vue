<template>
    <div class="moves-container">
        <ul v-if="moves && complete_moves" class="mb-6">
            <template v-for="move in complete_moves" :key="move.name" >
                <!-- Display it only if description is defined -->
                <MoveCard v-if="move.description" :move="move" class="mt-8 move-card" />
            </template>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { PokemonMoveType } from '~/types/pokemons';
import { usePokemonStore } from '@/stores/PokemonStore'
import MoveCard from '@/components/move/MoveCard.vue'
import gsap from 'gsap';

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

onMounted(() => {
    const container = <HTMLElement>document.querySelector('.moves-container')
    const items = document.querySelectorAll('.move-card')

    let ctx = gsap.context(() => {
        gsap.from(items, {
            duration: 1,
            opacity: 0,
            ease: 'power2.out',
            stagger: 0.2,
            /* TODO: Make a scroll trigger */
        });
    }, container)

    /* TODO: Faire une vidéo pour evolution et une vidéo pour les moves */
})
</script>