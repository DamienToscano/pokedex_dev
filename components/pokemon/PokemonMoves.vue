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
import type { PokemonMoveType } from '~/types/pokemons';
import { usePokemonStore } from '@/stores/PokemonStore'
import MoveCard from '@/components/move/MoveCard.vue'
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)

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
    gsap.utils.toArray('.move-card').forEach((move_card) => {
        gsap.from(move_card, {
            y: 100,
            opacity: 0,
            scale: 0.9,
            duration: 0.2,
            scrollTrigger: {
                trigger: move_card,
                start: 'top-=50 100%',
                // markers: true,
                toggleActions: 'play none none reverse',
            }
        })
    })
})
</script>