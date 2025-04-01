<template>
  <div class="w-full flex justify-between">
    <div
      class="min-h-screen flex flex-col items-center"
      style="width: calc(100% - 320px)"
    >
      <div class="w-full max-w-[860px] h-full p-12 pt-24">
        <Button @click="goBack">Voltar</Button>
        <p class="text-2xl font-black mt-12 mb-2">{{ currentTopic.name }}</p>
        <p class="text-sm text-gray-500 mb-10">Curso {{ courseName }}</p>
        <div class="mb-10" style="min-height: calc(100vh - 482px)">
          <div v-for="content in currentTopic.content" class="mb-6">
            <p v-if="content.type === 'text'" class="text-justify">{{ content.value }}</p>
            <img v-if="content.type === 'image'" :src="content.value" class="mx-auto" />
          </div>
        </div>

        <div class="flex items-center mb-8">
          <Button class="mr-6">Ir para o próximo item</Button>
          <i class="pi pi-check mr-2"></i>
          <p class="font-bold">Concluído</p>
        </div>

        <div class="h-px w-full bg-gray-200 mb-6"></div>
        <div @click="" class="flex items-center cursor-pointer">
          <i class="pi pi-flag mr-2"></i>
          <p class="font-semibold text-sm">Reportar problema</p>
        </div>
      </div>
    </div>
    <Sidebar :classes="classes" />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import Sidebar from "@components/ui/sidebar/Sidebar.vue";
import Button from "@components/ui/button/Button.vue";
import courses from "@/courses.json";

const router = useRouter();
const routerParams = router.currentRoute.value.params;
const { courseId, classId, topicId } = routerParams;

const course = courses.find((course) => course.id === courseId);
const courseName = course.name;
const classes = course.classes.map(({ name, id, topics }) => ({
  id,
  name,
  topics: topics.map(({ name, id }) => ({ name, id })),
}));

const currentTopic = course.classes
  .find((classItem) => classItem.id === classId)
  .topics.find((topic) => topic.id === topicId);

const goBack = () => router.back();
</script>
