<template>
  <div class="w-full flex justify-center">
    <div class="w-full max-w-5xl p-12 pt-24">
      <Button class="mb-12" @click="goBack">Voltar</Button>
      <div class="flex items-center mb-3">
        <div class="flex items-center justify-center rounded-sm h-12 w-12 bg-gray-100 mr-6"></div>
        <p class="text-2xl font-black">{{ course.name }}</p>
      </div>
      <p class="mb-9">{{ course.description }}</p>
      <Button @click="goToCourse" class="mb-12">Começar</Button>

      <p class="text-xl font-black mb-6">Conteúdo</p>
      <div class="p-4 bg-gray-100 rounded-lg mb-12">
        <Accordion type="single" class="w-full" collapsible :default-value="defaultValue">
          <AccordionItem v-for="item in accordionItems" :key="item.value" :value="item.value">
            <AccordionTrigger>{{ item.title }}</AccordionTrigger>
            <AccordionContent>
              {{ item.content }}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  </div>
</template>

<script setup>
  import Button from '@components/ui/button/Button.vue'
  import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
  import { useRouter } from 'vue-router';
  import courses from '@/courses.json';

  const router = useRouter();
  const courseId = router.currentRoute.value.params.id;
  const course = courses.find(course => course.id === courseId);

  const accordionItems = course.content.map((item, index) => ({
    value: index,
    title: item.title,
    content: item.description,
  }));

  const goBack = () => { router.push('/'); };
  const goToCourse = () => { router.push(`/course/${courseId}`); };
</script>
