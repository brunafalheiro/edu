<template>
  <div>
    <p class="text-xl font-black mb-6">Ferramentas</p>
    <div class="flex flex-wrap gap-8 justify-center">
      <SimulatorCard
        v-for="tool in tools"
        :key="tool.path"
        :title="tool.title"
        :description="tool.description"
        :image="tool.image"
        :clickFunction="() => $emit('tool-click', tool.path)"
      />
    </div>
  </div>
</template>

<script setup>
  import SimulatorCard from "./SimulatorCard.vue";

  defineProps({
    tools: {
      type: Array,
    }
  });

  defineEmits(['tool-click']);
</script> 