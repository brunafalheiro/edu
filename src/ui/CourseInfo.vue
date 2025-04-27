<template>
  <div class="w-full flex justify-center">
    <div class="w-full max-w-5xl p-12 pt-24">
      <div class="flex items-center mb-4">
        <BackButton :backFunction="goBack"/>
        <p class="text-2xl font-black">{{ course.name }}</p>
      </div>
      <p class="mb-9">{{ course.description }}</p>

      <Button v-if="!isOngoingCourse" @click="startCourse" class="mb-12">
        Começar
      </Button>
      
      <div v-else class="flex items-center gap-4 mb-12">
        <Button @click="goToClass">Continuar</Button>
        <div class="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
          <i class="pi pi-clock text-sm" />
          <p class="text-sm">{{TimeUtils.formatDuration(TimeUtils.calculateRemainingTime(courseId, coursesProgress))}} restantes</p>
        </div>
      </div>

      <p class="text-xl font-black mb-6">Conteúdo</p>
      <div class="p-4 border border-black rounded-lg mb-12">
        <Accordion type="single" class="w-full" collapsible>
          <AccordionItem
            v-for="item in accordionItems"
            :key="item.value"
            :value="item.value.toString()"
            class="border-gray-600"
          >
            <AccordionTrigger>
              <div class="flex items-center gap-3">
                <span class="w-8 h-8 flex items-center justify-center bg-lavender-ultralight text-lavender-dark rounded-full font-semibold">
                  {{ item.value + 1 }}
                </span>
                <p class="font-semibold text-gray-800">{{ item.name }}</p>
              </div>
            </AccordionTrigger>
            <AccordionContent>{{ item.content }}</AccordionContent>
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
  import BackButton from "@/components/ui/BackButton.vue";
  import courses from "@/courses.json";
  import { TimeUtils } from "@/utils/timeUtils";
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
