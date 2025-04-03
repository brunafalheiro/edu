<template>
  <div class="w-full flex justify-between">
    <div
      class="min-h-screen flex flex-col items-center"
      style="width: calc(100% - 320px)"
    >
      <div v-if="!isFinishedCourse" class="w-full max-w-[860px] h-full p-12 pt-24">
        <Button @click="goBack">Voltar</Button>
        <p class="text-2xl font-black mt-12 mb-2">{{ currentTopic.name }}</p>
        <p class="text-sm text-gray-500 mb-10">
          Curso {{ course.name }}: {{ currentClassName }}
        </p>
        <div class="mb-10" style="min-height: calc(100vh - 482px)">
          <div v-for="content in currentTopic.content" class="mb-6">
            <p v-if="content.type === 'text'" class="text-justify">{{ content.value }}</p>
            <img v-if="content.type === 'image'" :src="content.value" class="mx-auto" />
          </div>
        </div>

        <div class="flex items-center mb-8">
          <Button @click="goToNextTopic" class="mr-6">Ir para o próximo item</Button>
          <i class="pi pi-check mr-2"></i>
          <p class="font-bold">Concluído</p>
        </div>

        <div class="h-px w-full bg-gray-200 mb-6"></div>
        <div @click="" class="flex items-center cursor-pointer">
          <i class="pi pi-flag mr-2"></i>
          <p class="font-semibold text-sm">Reportar problema</p>
        </div>
      </div>
      <div v-else>
        <p>Finalizado</p>
        <Button @click="goToHome" class="mr-6">Ir para o menu</Button>
      </div>
    </div>
    <Sidebar :classes="classesSkeleton" />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import Sidebar from "@components/ui/sidebar/Sidebar.vue";
import Button from "@components/ui/button/Button.vue";
import courses from "@/courses.json";

const route = useRoute();
const course = ref(null);
const classes = ref([]);
const topicsFromClass = ref([]);
const currentTopic = ref(null);
const currentClassName = ref(null);
const classesSkeleton = ref([]);
const isFinishedCourse = ref(false);

const loadCourseData = () => {
  const { courseId, classId, topicId } = route.params;

  const currentCourse = courses.find((course) => course.id === courseId);
  if (!currentCourse) return;

  course.value = currentCourse;
  classes.value = currentCourse.classes;
  topicsFromClass.value = classes.value.find((c) => c.id === classId)?.topics || [];
  currentClassName.value = classes.value.find((c) => c.id === classId)?.name || null;
  currentTopic.value = topicsFromClass.value.find((t) => t.id === topicId) || null;
};

loadCourseData();
classesSkeleton.value = classes.value.map(({ name, id, topics }) => ({
  id,
  name,
  topics: topics.map(({ name, id }) => ({ name, id })),
}));

// Watch to params to update the course data when the route changes
watch(() => route.params, loadCourseData, { deep: true });

const router = useRouter();
const goBack = () => router.back();
const goToNextTopic = async () => {
  const { courseId, classId, topicId } = route.params;

  const isLastTopicFromClass = topicId == topicsFromClass.value.length;
  const isLastClass = classId == classes.value[classes.value.length - 1].id;
  const isLastTopicFromCourse = isLastClass && isLastTopicFromClass;
  const progress = (await window.store.get("progress")) || {};

  if (isLastTopicFromCourse) {
    progress[courseId].completed = true;
    progress[courseId].completedContent[classId][topicId - 1].completed = true;
    isFinishedCourse.value = true;
    await window.store.set("progress", progress);
    return;
  }

  let nextClassId = parseInt(classId);
  let nextTopicId = parseInt(topicId);

  if (isLastTopicFromClass) {
    nextTopicId = 1;
    nextClassId += 1;
  } else nextTopicId += 1;

  progress[courseId].currentClass = nextClassId;
  progress[courseId].currentTopic = nextTopicId;
  progress[courseId].completedContent[classId][topicId - 1].completed = true;

  await window.store.set("progress", progress);
  router.push(`/course/${courseId}/${nextClassId}/${nextTopicId}`);
};

const goToHome = () => router.push("/");
</script>
