<template>
  <div class="w-full flex justify-center">
    <div class="w-full max-w-5xl p-12 pt-24">
      <p class="home-title">Home</p>
      <Button @click="goToHello">hello</Button>
      <Button @click="goToLessonInfo('123')">lessonInfo</Button>

      <p class="text-xl font-black mb-6 mt-12">Cursos</p>
      <div v-for="lesson in lessons" key="{{ lesson.id }}" class="h-[60px] w-full flex justify-between items-center bg-gray-100 rounded-lg px-4 py-2 mb-3">
        <div class="flex items-center justify-center">
          <div class="flex items-center justify-center rounded-sm h-11 w-11 bg-neutral-50 mr-4"></div>
          <p class="font-bold">{{ lesson.title }}</p>

        </div>
        <div class="flex items-center justify-center">
          <div class="flex items-center">
            <i class="pi pi-clock mr-2 mt-px"></i>
            <p class="font-semibold mr-12">16 min</p>
          </div>
          <Button class="h-8">Ver curso</Button>
        </div>
      </div>
      
      <p class="text-xl font-black mb-6 mt-12">Ferramentas</p>
      <div v-for="tools in tools" key="{{ tools.id }}" class="h-[60px] w-full flex justify-between items-center bg-gray-100 rounded-lg px-4 py-2 mb-3 cursor-pointer">
        <div class="flex items-center justify-center">
          <div class="flex items-center justify-center rounded-sm h-11 w-11 bg-neutral-50 mr-4"></div>
          <p class="font-bold">{{ tools.title }}</p>
        </div>
        <i class="pi pi-arrow-right text-neutral-400"></i>
      </div>
    </div>
  </div>
  
</template>

<script setup>
  import Button from '@components/ui/button/Button.vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const goToHello = () => { router.push('/hello'); };
  const goToLessonInfo = (id) => { router.push(`/lesson/${id}/info`); };

  const lessons = [
    { id: '123', title: 'Lesson 1' },
    { id: '456', title: 'Lesson 2' },
    { id: '789', title: 'Lesson 3' },
  ];

  const tools = [
    { id: '123', title: 'Ferramenta 1' },
    { id: '456', title: 'Ferramenta 2' },
    { id: '789', title: 'Ferramenta 3' },
  ];
</script>

