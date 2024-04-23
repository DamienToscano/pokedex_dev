<template>
    <div class="flex items-center px-6 py-2 my-8 bg-gray-100 rounded-full">
        <SearchIcon class="mr-4 text-gray-600" />
        <input type="text"
            id="search-bar"
            class="block py-2 pl-3 pr-20 font-semibold text-gray-600 bg-transparent border-0 placeholder:text-gray-400 placeholder:font-semibold focus:border-0 focus:outline-none cursor-text w-full"
            :placeholder="placeholder" :value="modelValue"
            @input="$emit('update:modelValue', ($event?.target as HTMLInputElement)?.value.toLowerCase())">
    </div>
</template>

<script setup lang="ts">
import SearchIcon from '@/components/common/icons/SearchIcon.vue'

defineProps(['modelValue', 'placeholder'])
defineEmits(['update:modelValue'])

</script>