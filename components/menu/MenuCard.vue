<template>
    <NuxtLink :to="link" class="
            overflow-hidden
            relative
            shadow-md
            px-0
            sm:px-4
            py-5
            sm:py-8
            rounded-xl
            sm:rounded-3xl
            text-white
            font-bold
            text-xl
            sm:text-2xl
            tracking-wider
            before:absolute
            before:w-32
            before:h-32
            before:rounded-full
            before:rotate-45
            before:-top-20
            before:-left-16
            before:bg-white/20
            hover:before:bg-white/40
            before:transition-all"
            :class="`${bg_color} ${shadow_color}`">
        <p class="ml-6 sm:ml-12">{{ name }}</p>
        <img src="@/assets/images/pokeball.svg" alt="Icon of pokeball" class="absolute -right-8 -bottom-6 h-36 w-36">
    </NuxtLink>
</template>

<script setup lang="ts">

defineProps<{
    name: string,
    link: string,
    bg_color: string,
    shadow_color: string,
}>()

</script>