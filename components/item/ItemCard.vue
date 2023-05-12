<template>
    <li class="relative p-8 overflow-hidden border rounded-lg shadow-md">
        <p class="absolute top-0 right-0 text-xs m-3 bg-gray-400 text-white font-bold px-2 py-1 rounded">{{ category }}</p>
        <div class="flex flex-wrap gap-4 items-center mt-2">
            <img :src="item.sprite" :alt="`Image of item ${item.name}`" class="w-8 h-8">
            <div class="w-4/5">
                <p class="font-bold text-gray-400">{{ item.name.toUpperCase() }}</p>
                <div v-if="item.cost">
                    <p class="inline font-semibold">{{ item.cost }}</p>
                    <img src="@/assets/images/icons/pokedollar.png" alt="Image of pokedollar" class="h-5 w-auto inline">
                </div>
                <p v-else class="font-medium">Not for sell</p>
                <p>{{ item.description }}</p>
            </div>
        </div>
    </li>
</template>

<script setup lang="ts">
import { Item } from '@/data/models/item'
import { capitalize } from 'vue';

const props = defineProps<{
    item: Item;
}>()

const category = computed(() => capitalize(props.item.category.replaceAll('-', ' ')))
</script>Ê