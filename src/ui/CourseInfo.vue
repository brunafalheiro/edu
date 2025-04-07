<template>
  <div class="w-full flex justify-center">
    <div class="w-full max-w-5xl p-12 pt-24">
      <Button class="mb-12" @click="goBack">Voltar</Button>
      <div class="flex items-center mb-3">
        <div
          class="flex items-center justify-center rounded-sm h-12 w-12 bg-gray-100 mr-6"
        ></div>
        <p class="text-2xl font-black">{{ course.name }}</p>
      </div>
      <p class="mb-9">{{ course.description }}</p>

      <Button v-if="!isOngoingCourse" @click="startCourse" class="mb-12">
        Começar
      </Button>
      <Button v-else @click="goToClass" class="mb-12">Continuar</Button>

      <p class="text-xl font-black mb-6">Conteúdo</p>
      <div class="p-4 bg-gray-100 rounded-lg mb-12">
        <Accordion type="single" class="w-full" collapsible>
          <AccordionItem
            v-for="item in accordionItems"
            :key="item.value"
            :value="item.value.toString()"
          >
            <AccordionTrigger>{{ item.name }}</AccordionTrigger>
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import courses from "@/courses.json";
import Button from "@components/ui/button/Button.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const courseId = router.currentRoute.value.params.courseId;
const course = courses.find((course) => course.id === courseId);

const accordionItems = course.classes.map((item, index) => ({
  value: index,
  name: item.name,
  content: item.description,
}));

const goBack = () => router.push("/");

const isOngoingCourse = ref(false);
const coursesProgress = ref({});

const checkCourseStatus = async () => {
  coursesProgress.value = (await window.store.get("progress")) || {};
  const course = coursesProgress.value[courseId];
  isOngoingCourse.value = course ? !course.completed : false;
};

checkCourseStatus();

const startCourse = async () => {
  const progress = (await window.store.get("progress")) || {};
  const classId = 1;
  const topicId = 1;

  const completedContent = {};
  course.classes.forEach((classItem) => {
    completedContent[classItem.id] = classItem.topics.map((topic) => ({
      topicId: topic.id,
      completed: false,
    }));
  });

  progress[courseId] = {
    currentClass: 1,
    currentTopic: 1,
    completed: false,
    completedContent,
  };

  await window.store.set("progress", progress);
  router.push(`/course/${courseId}/${classId}/${topicId}`);
};

const goToClass = async () => {
  const progress = (await window.store.get("progress")) || {};
  const currentProgress = progress[courseId];
  const classId = currentProgress.currentClass;
  const topicId = currentProgress.currentTopic;

  router.push(`/course/${courseId}/${classId}/${topicId}`);
};
</script>
