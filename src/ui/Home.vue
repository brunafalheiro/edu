<template>
  <div class="w-full flex justify-center">
    <div class="w-full max-w-5xl p-12 pt-24">
      <div class="w-full h-[180px] bg-gray-100 rounded-lg relative p-6 mb-6">
        <div class="max-w-md w-full flex absolute right-6 bottom-6">
          <div
            class="h-24 w-full bg-white rounded-lg flex items-center p-6 mr-4"
          >
            <p class="text-5xl font-black mr-4">{{ completedCoursesAmount }}</p>
            <p class="text-sm font-medium">Cursos completados</p>
          </div>
          <div class="h-24 w-full bg-white rounded-lg flex items-center p-6">
            <p class="text-5xl font-black mr-4">{{ ongoingCoursesAmount }}</p>
            <p class="text-sm font-medium">Cursos em andamento</p>
          </div>
        </div>
      </div>

      <div v-if="ongoingCourses?.length" class="w-full mb-12">
        <Carousel>
          <CarouselPrevious />
          <CarouselContent>
            <CarouselItem v-for="course in ongoingCourses">
              <div
                class="h-16 w-full flex justify-between items-center bg-gray-100 rounded-lg px-4 py-2"
              >
                <div class="flex items-center justify-center">
                  <div
                    class="flex items-center justify-center rounded-sm h-11 w-11 bg-neutral-50 mr-4"
                  >
                    <img :src="getIcon(course.icon)" alt="" />
                  </div>
                  <p class="font-bold">{{ course.name }}</p>
                </div>
                <Button
                  class="h-8"
                  @click="
                    goToCourse(
                      course.id,
                      course.currentClass,
                      course.currentTopic
                    )
                  "
                  >Continuar</Button
                >
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselNext />
        </Carousel>
      </div>

      <p class="text-xl font-black mb-4">Cursos</p>
      <div class="mb-12">
        <div
          v-for="course in courses"
          key="{{ course.id }}"
          class="h-16 w-full flex justify-between items-center bg-gray-100 rounded-lg px-4 py-2 mb-4"
        >
          <div class="flex items-center justify-center">
            <div
              class="flex items-center justify-center rounded-sm h-11 w-11 bg-neutral-50 mr-4"
            >
              <img :src="getIcon(course.icon)" alt="" />
            </div>
            <p class="font-bold">{{ course.name }}</p>
          </div>
          <div class="flex items-center justify-center">
            <div class="flex items-center">
              <i class="pi pi-clock mr-2 mt-[2px]"></i>
              <p class="font-semibold mr-12">16min</p>
            </div>
            <Button class="h-8" @click="goToCourseInfo(course.id)"
              >Ver curso</Button
            >
          </div>
        </div>
      </div>

      <p class="text-xl font-black mb-4">Ferramentas</p>
      <div
        @click="goToBinaryTreeSimulator"
        class="h-16 w-full flex justify-between items-center bg-gray-100 rounded-lg pl-4 pr-6 py-2 mb-3 cursor-pointer group"
      >
        <div class="flex items-center justify-center">
          <div
            class="flex items-center justify-center rounded-sm h-11 w-11 bg-neutral-50 mr-4"
          >
            <img src="@assets/icons/iconBinaryTree.svg" alt="" />
          </div>
          <p class="font-bold">Simulação de Árvore Binária</p>
        </div>
        <i
          class="pi pi-arrow-right text-neutral-400 transition-transform duration-300 group-hover:translate-x-2"
        ></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import Button from "@components/ui/button/Button.vue";
import courses from "@/courses.json";
import { ref } from "vue";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const completedCoursesAmount = ref(0);
const ongoingCoursesAmount = ref(0);
const ongoingCourses = ref([]);

const router = useRouter();
const goToCourseInfo = (courseId) => router.push(`/course/${courseId}/info`);
const goToCourse = (courseId, classId, topicId) =>
  router.push(`/course/${courseId}/${classId}/${topicId}`);
const goToBinaryTreeSimulator = () => router.push("/binary-tree-simulator");

const icons = import.meta.glob("@/assets/icons/*.svg", { eager: true });
const getIcon = (iconName) =>
  icons[`/src/assets/icons/${iconName}.svg`]?.default || "";

const loadCoursesData = async () => {
  const progress = (await window.store.get("progress")) ?? {};
  const courseProgress = Object.entries(progress);

  let completed = 0;
  let ongoing = 0;

  courseProgress.forEach(([_, data]) => {
    data.completed ? completed++ : ongoing++;
  });

  completedCoursesAmount.value = completed;
  ongoingCoursesAmount.value = ongoing;

  ongoingCourses.value = courseProgress
    .filter(([_, data]) => !data.completed)
    .map(([courseId, data]) => {
      const course = courses.find((c) => c.id === courseId);
      if (!course) return null;

      const { currentTopic, currentClass } = data;

      return {
        id: course.id,
        name: course.name,
        icon: course.icon,
        currentTopic,
        currentClass,
      };
    })
    .filter(Boolean);
};

loadCoursesData();
</script>
