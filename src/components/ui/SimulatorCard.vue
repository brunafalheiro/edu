<template>
  <div
    @click="props.clickFunction"
    class="relative w-full h-[80px] bg-white rounded-xl p-4 cursor-pointer overflow-hidden group border border-gray-200 hover:border-primary hover:shadow-lg hover:shadow-primary/5 hover:scale-[1.01] transition-all duration-300 ease-in-out"
  >
    <div class="flex items-center justify-between h-full">
      <div class="flex items-center gap-4">
        <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/5 text-primary group-hover:bg-primary/20 transition-colors duration-300">
          <i :class="['pi', props.icon, 'text-lg']"></i>
        </div>
        <div class="flex flex-col">
          <p class="font-semibold text-gray-800 group-hover:text-primary transition-colors duration-200">
            {{ props.title }}
          </p>
          <p v-if="props.description" class="text-sm text-gray-500 mt-0.5 line-clamp-1">
            {{ props.description }}
          </p>
        </div>
      </div>
      <div class="text-gray-400 group-hover:text-primary transition-colors duration-300">
        <i class="pi pi-arrow-right"></i>
      </div>
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

