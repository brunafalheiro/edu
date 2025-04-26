<template>
  <div class="w-fit flex bg-gray-100 rounded-full p-1 mb-4">
    <button 
      v-for="filter in filters" 
      :key="filter.value"
      @click="$emit('filter-change', filter.value)"
      :class="[
        'px-4 py-1 rounded-full text-sm transition-colors',
        selectedFilter === filter.value 
          ? 'bg-white text-black shadow-sm' 
          : 'text-gray-500 hover:text-gray-700'
      ]"
    >
      {{ filter.label }}
    </button>
  </div>
</template>

<script setup>
  defineProps({
    filters: Array,
    selectedFilter: String
  });

  defineEmits(['filter-change']);
</script>
