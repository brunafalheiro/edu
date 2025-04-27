<template>
  <div class="w-full min-h-[180px] flex items-end justify-end rounded-lg border border-black relative p-6 mb-12 position-relative overflow-hidden">
    <img src="@/assets/images/edu.png" class="absolute h-72 -top-7 -left-4">
    <div class="max-w-xl w-full flex gap-4">
      <div class="h-24 w-full border border-black rounded-lg flex items-center p-6">
        <p class="text-5xl font-black mr-4">{{ completedCourses }}</p>
        <p class="text-sm font-medium">Cursos finalizados</p>
      </div>
      <div class="h-24 w-full border border-black rounded-lg flex items-center p-6">
        <p class="text-5xl font-black mr-4">{{ ongoingCourses }}</p>
        <p class="text-sm font-medium">Cursos em andamento</p>
      </div>
      <div class="h-24 w-full border border-black rounded-lg flex items-center p-6">
        <p class="text-5xl font-black mr-4">{{ totalTimeStudied }}</p>
        <p class="text-sm font-medium">Tempo estudado</p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { TimeUtils } from "@/utils/timeUtils";
  import { ref } from "vue";

  defineProps({
    completedCourses: Number,
    ongoingCourses: Number,
  });

  const getProgress = async () => {
    const progress = (await window.store.get("progress")) || {};
    return progress;
  };

  const totalTimeStudied = ref('Carregando...');
  const loadTotalTimeStudied = async () => {
    const progress = await getProgress();
    const totalTime = TimeUtils.calculateTotalTimeStudied(progress);
    totalTimeStudied.value = TimeUtils.formatDuration(totalTime);
  }

  loadTotalTimeStudied();
</script> 