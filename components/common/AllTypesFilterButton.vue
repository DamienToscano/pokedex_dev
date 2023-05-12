<template>
    <button class="relative inline-block text-lg group">
        <span
            class="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight transition-colors duration-300 ease-out border-2 rounded-lg group-hover:text-white border-black"
            :class="[{
                'text-black': !active,
                'text-white': active,
                [`bg-black`]: active,
            }]">
            <span class="absolute inset-0 w-full h-full px-5 py-3 rounded-lg" :class="{
                'bg-gray-50': !active,
                [`bg-black`]: active,
            }"></span>
            <span
                class="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 group-hover:-rotate-180 ease bg-black"></span>
            <span class="relative">ALL</span>
        </span>
        <span
            class="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear rounded-lg group-hover:mb-0 group-hover:mr-0 bg-black"></span>
    </button>
</template>

<script setup lang="ts">

defineProps<{
    active: boolean
}>()

</script>