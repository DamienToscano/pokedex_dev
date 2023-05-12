<template>
    <div class="flex items-center px-6 py-2 my-8 bg-gray-100 rounded-full w-fit">
        <SearchIcon class="mr-4 text-gray-600" />
        <input type="text"
            class="block py-2 pl-3 pr-20 font-semibold text-gray-600 bg-transparent border-0 placeholder:text-gray-400 placeholder:font-semibold focus:border-0 focus:outline-none cursor-text"
            :placeholder="placeholder" :value="modelValue"
            @input="$emit('update:modelValue', ($event?.target as HTMLInputElement)?.value)">
    </div>
</template>

<script setup lang="ts">
import SearchIcon from '@/components/common/icons/SearchIcon.vue'

defineProps(['modelValue', 'placeholder'])
defineEmits(['update:modelValue'])

</script>