<template>
  <div class="flex items-center">
    <i
      class="pi pi-angle-left text-2xl mr-4 mt-1 cursor-pointer transition-transform duration-300 hover:-translate-x-2"
      @click="backFunction"
    ></i>
    <p v-if="text" class="text-2xl font-black">{{ text }}</p>
  </div>
</template>

<script setup>
  import { defineProps } from 'vue';

  defineProps({ text: String, backFunction: Function });
</script>