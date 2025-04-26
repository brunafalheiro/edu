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

      <p class="text-xl font-black mb-4">Cursos</p>
      <div class="flex flex-wrap gap-6 mb-16">
        <CourseCard
          v-for="course in courses"
          :key="course.id"
          :course="course"
          :isOngoing="ongoingCourses.find(c => c.id === course.id) !== undefined"
          :clickFunction="goToCourseInfo"
        />
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
import courses from "@/courses.json";
import SimulatorCard from "@components/ui/SimulatorCard.vue";
import CourseCard from "@components/ui/CourseCard.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const completedCoursesAmount = ref(0);
const ongoingCoursesAmount = ref(0);
const ongoingCourses = ref([]);

const router = useRouter();
const goToCourseInfo = (courseId) => router.push(`/course/${courseId}/info`);
const goToCourse = (courseId, classId, topicId) =>
  router.push(`/course/${courseId}/${classId}/${topicId}`);
const redirectTo = (path) => router.push(`/${path}`);

const MINUTES_PER_TOPIC = 15;
const MINUTES_IN_HOUR = 60;

const formatDuration = (hours, minutes) => {
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}min`;
};

const calculateCourseDuration = (course) => {
  const totalTopics = course.classes.reduce(
    (total, cls) => total + cls.topics.length, 
    0
  );
  
  const totalMinutes = totalTopics * MINUTES_PER_TOPIC;
  const hours = Math.floor(totalMinutes / MINUTES_IN_HOUR);
  const minutes = totalMinutes % MINUTES_IN_HOUR;
  
  return formatDuration(hours, minutes);
};

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
