<template>
    <li class="relative p-8 overflow-hidden border rounded-lg shadow-md">
        <h2 class="px-4 py-2 mb-4 text-xl font-semibold text-white bg-gray-400 rounded-md w-fit">{{
            ability.name.toUpperCase() }}</h2>
        <p class="mb-2 font-medium">{{ ability.description }}</p>
        <p class="w-4/5 italic text-gray-600">{{ ability.effect }}</p>
        <BoltIcon class="absolute text-gray-600 -bottom-4 -right-4 w-28 h-28 opacity-10" />
    </li>
</template>

<script setup lang="ts">
import { Ability } from '@/data/models/ability'
import { BoltIcon } from '@heroicons/vue/24/outline';

defineProps<{
    ability: Ability;
}>()
</script>