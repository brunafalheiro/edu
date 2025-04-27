<template>
  <div class="w-full h-[180px] rounded-lg border border-black relative p-6 mb-12">
    <div class="max-w-md w-full flex absolute right-6 bottom-6">
      <div class="h-24 w-full border border-black rounded-lg flex items-center p-6 mr-4">
        <p class="text-5xl font-black mr-4">{{ completedCourses }}</p>
        <p class="text-sm font-medium">Cursos finalizados</p>
      </div>
      <div class="h-24 w-full border border-black rounded-lg flex items-center p-6">
        <p class="text-5xl font-black mr-4">{{ ongoingCourses }}</p>
        <p class="text-sm font-medium">Cursos em andamento</p>
      </div>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    completedCourses: Number,
    ongoingCourses: Number
  });
</script> 