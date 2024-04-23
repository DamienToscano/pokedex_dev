<template>
    <div>
        <ul>
            <li v-for="(stat, index) in formatted_stats" :key="stat.name" :data-index="index"
                class="flex w-full items-center my-2">
                <span class="pokemon_line_title w-48">{{ capitalize(stat.name) }}</span>
                <div class="w-full flex items-center">
                    <p class="mx-4 font-semibold">{{ stat.value }}</p>
                    <div class="bg-gray-100 w-full h-1 rounded">
                        <div class="h-full rounded stat-line" :style="{ width: `${stat.percent}%` }"
                            :class="{ 'bg-fire': stat.value < average_stats, 'bg-grass': stat.value > average_stats, 'bg-electric': stat.value == average_stats }">
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { capitalize } from 'vue';
import type { PokemonStatType } from '@/types/pokemons';
import gsap from 'gsap';

const props = defineProps<{
    stats: PokemonStatType[];
}>()

const formatted_stats = props.stats.map((stat) => {
    return {
        ...stat,
        percent: Math.round((stat.value / 255) * 100),
    };
});

const average_stats = Math.round(formatted_stats.reduce((acc, stat) => {
    return acc + stat.value;
}, 0) / formatted_stats.length);


onMounted(() => {
    const lines = document.querySelectorAll('.stat-line');

    let ctx = gsap.context(() => {
        gsap.from(lines, {
            duration: 0.5,
            width: 0,
            backgroundColor: '#F3F4F6',
            ease: 'power2.out',
            stagger: 0.1,
        });
    }, lines)
})

</script>