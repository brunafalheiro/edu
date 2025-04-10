<template>
  <div class="w-full flex justify-between">
    <div
      class="min-h-screen flex flex-col items-center"
      style="width: calc(100% - 320px)"
    >
      <div
        v-if="!isFinishedCourse"
        class="w-full max-w-[860px] h-full p-12 pt-24"
      >
        <Button @click="goToHome">Voltar</Button>
        <p class="text-2xl font-black mt-12 mb-2">{{ currentTopic.name }}</p>
        <p class="text-sm text-gray-500 mb-10">
          Curso {{ course.name }}: {{ currentClassName }}
        </p>
        <div class="mb-10" style="min-height: calc(100vh - 482px)">
          <div v-for="content in currentTopic.content" class="mb-6">
            <p v-if="content.type === 'text'" class="text-justify">
              {{ content.value }}
            </p>
            <img
              v-if="content.type === 'image'"
              :src="content.value"
              class="mx-auto"
            />
          </div>
        </div>

        <div class="flex items-center mb-8">
          <Button @click="goToNextTopic" class="mr-6"
            >Ir para o próximo item</Button
          >
          <div v-if="isTopicCompleted" class="flex items-center">
            <i class="pi pi-check mr-2"></i>
            <p class="font-bold">Concluído</p>
          </div>
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

// Routing
const router = useRouter();
const route = useRoute();

// Reactive state
const course = ref(null);
const classes = ref([]);
const classesSkeleton = ref([]);
const topicsFromClass = ref([]);
const currentTopic = ref(null);
const currentClassName = ref(null);
const isFinishedCourse = ref(false);
const isTopicCompleted = ref(false);

// Utility functions
const isCourseCompleted = (completedContent) => {
  return Object.values(completedContent).every((topics) =>
    topics.every((topic) => topic.completed)
  );
};

const updateTopicStatus = async () => {
  const { courseId, classId, topicId } = route.params;
  const progress = await window.store.get("progress");
  const completedContent = progress?.[courseId]?.completedContent || {};
  const topics = completedContent[classId];

  if (!topics) return;
  const topic = topics[topicId - 1];
  isTopicCompleted.value = topic ? topic.completed : false;
};

const getFirstIncomplete = (completedContent) => {
  const sortedClassIds = Object.keys(completedContent).sort(
    (a, b) => Number(a) - Number(b)
  );

  for (const classId of sortedClassIds) {
    const topics = completedContent[classId];
    const firstIncompleteIndex = topics.findIndex((t) => !t.completed);

    if (firstIncompleteIndex !== -1) {
      return {
        firstIncompleteClass: Number(classId),
        firstIncompleteTopic: firstIncompleteIndex + 1,
      };
    }
  }

  return null;
};

// Navigation
const goToHome = () => router.push("/");

const goToNextTopic = async () => {
  const { courseId, classId, topicId } = route.params;
  const progress = (await window.store.get("progress")) || {};
  const courseProgress = progress[courseId] || {};

  const currentClassIndex = parseInt(classId);
  const currentTopicIndex = parseInt(topicId);

  const isLastTopicFromClass =
    currentTopicIndex === topicsFromClass.value.length;
  const isLastClassFromCourse = currentClassIndex === classes.value.length;
  const isLastTopicFromCourse = isLastClassFromCourse && isLastTopicFromClass;

  const completedContent = courseProgress.completedContent || {};
  const courseCompleted = isCourseCompleted(completedContent);

  // Mark current topic as completed
  completedContent[classId][currentTopicIndex - 1].completed = true;

  if (courseCompleted) {
    isFinishedCourse.value = true;
    courseProgress.completed = true;
    await window.store.set("progress", progress);
    return;
  }

  if (isLastTopicFromCourse) {
    const next = getFirstIncomplete(completedContent);
    if (next) {
      courseProgress.currentClass = next.firstIncompleteClass;
      courseProgress.currentTopic = next.firstIncompleteTopic;
      await window.store.set("progress", progress);
      router.push(
        `/course/${courseId}/${next.firstIncompleteClass}/${next.firstIncompleteTopic}`
      );
    }

    await window.store.set("progress", progress);
    return;
  }

  const nextClassId = isLastTopicFromClass
    ? currentClassIndex + 1
    : currentClassIndex;
  const nextTopicId = isLastTopicFromClass ? 1 : currentTopicIndex + 1;

  courseProgress.currentClass = nextClassId;
  courseProgress.currentTopic = nextTopicId;

  await window.store.set("progress", progress);
  router.push(`/course/${courseId}/${nextClassId}/${nextTopicId}`);
};

// Course loading
const loadCourseData = () => {
  const { courseId, classId, topicId } = route.params;

  const selectedCourse = courses.find((c) => c.id === courseId);
  if (!selectedCourse) return;

  course.value = selectedCourse;
  classes.value = selectedCourse.classes;

  const selectedClass = classes.value.find((c) => c.id === classId);
  topicsFromClass.value = selectedClass?.topics || [];
  currentClassName.value = selectedClass?.name || null;

  currentTopic.value =
    topicsFromClass.value.find((t) => t.id === topicId) || null;

  classesSkeleton.value = classes.value.map(({ id, name, topics }) => ({
    id,
    name,
    topics: topics.map(({ id, name }) => ({ id, name })),
  }));
};

// Watch for route changes
watch(
  () => route.params,
  async () => {
    loadCourseData();
    await updateTopicStatus();
  },
  { deep: true }
);

// Initial load
loadCourseData();
</script>
