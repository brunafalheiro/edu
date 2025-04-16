<template>
  <div
    @click="props.clickFunction"
    class="relative w-full min-w-xs max-w-sm h-[384px] bg-white rounded-2xl p-4 cursor-pointer overflow-hidden group shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out"
  >
    <p class="font-bold text-lg mb-5 group-hover:text-primary transition-colors duration-200">
      {{ props.title }}
    </p>
    <div class="h-auto w-full rounded-md overflow-hidden">
      <img :src="props.icon" alt="" class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  description: String,
  icon: String,
  clickFunction: Function,
});
</script>
