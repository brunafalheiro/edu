<template>
  <div class="w-full flex justify-center">
    <div class="w-full max-w-5xl p-12 pt-24">
      <p class="home-title">Homee</p>
      <Button @click="goToHello">hello</Button>

      <p class="text-xl font-black mb-6 mt-12">Cursos</p>
      <div v-for="course in courses" key="{{ course.id }}" class="h-[60px] w-full flex justify-between items-center bg-gray-100 rounded-lg px-4 py-2 mb-3">
        <div class="flex items-center justify-center">
          <div class="flex items-center justify-center rounded-sm h-11 w-11 bg-neutral-50 mr-4">
            <img :src="getIcon(course.icon)" alt="" />
          </div>
          <p class="font-bold">{{ course.name }}</p>

        </div>
        <div class="flex items-center justify-center">
          <div class="flex items-center">
            <i class="pi pi-clock mr-2 mt-px"></i>
            <p class="font-semibold mr-12">16 min</p>
          </div>
          <Button class="h-8" @click="goToCourseInfo(course.id)">Ver curso</Button>
        </div>
      </div>
      
      <p class="text-xl font-black mb-6 mt-12">Ferramentas</p>
      <div @click="goToBinaryTreeSimulator" class="h-[60px] w-full flex justify-between items-center bg-gray-100 rounded-lg pl-4 pr-6 py-2 mb-3 cursor-pointer group">
        <div class="flex items-center justify-center">
          <div class="flex items-center justify-center rounded-sm h-11 w-11 bg-neutral-50 mr-4">
            <img src="@assets/icons/iconBinaryTree.svg" alt="">
          </div>
          <p class="font-bold">Simulação de Árvore Binária</p>
        </div>
        <i class="pi pi-arrow-right text-neutral-400 transition-transform duration-300 group-hover:translate-x-2"></i>
      </div>
    </div>
  </div>
  
</template>

<script setup>
  import Button from '@components/ui/button/Button.vue';
  import { useRouter } from 'vue-router';
  import courses from '@/courses.json';
  
  
  const router = useRouter();
  
  const goToHello = () => { router.push('/hello'); };
  const goToCourseInfo = (courseId) => { router.push(`/course/${courseId}/info`); };
  const goToBinaryTreeSimulator = () => { router.push('/binary-tree-simulator'); };

  const icons = import.meta.glob("@/assets/icons/*.svg", { eager: true });

  const getIcon = (iconName) => {
    return icons[`/src/assets/icons/${iconName}.svg`]?.default || "";
  };
</script>
