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

      <div v-if="ongoingCourses?.length" class="w-full mb-16">
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
      <div class="mb-16">
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
            <Button class="h-8" @click="goToCourseInfo(course.id)">Ver curso</Button
            >
          </div>
        </div>
      </div>

      <p class="text-xl font-black mb-6">Ferramentas</p>
      <div class="flex flex-wrap gap-8 justify-center">
        <SimulatorCard
          title="Árvores Binárias"
          description="Simulador de árvores binárias"
          icon="https://techvidvan.com/tutorials/wp-content/uploads/sites/2/2021/07/Binary-Trees-in-C-normal-image01.jpg"
          :clickFunction="() => redirectTo('binary-tree-simulator')"
        />
        <SimulatorCard
          title="Tabelas Hash"
          description="Simulador de tabelas hash"
          icon="https://khalilstemmler.com/img/blog/data-structures/hash-tables/hash-table.png"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import Button from "@components/ui/button/Button.vue";
import courses from "@/courses.json";
import SimulatorCard from "@components/ui/SimulatorCard.vue";
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
const redirectTo = (path) => router.push(`/${path}`);

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
