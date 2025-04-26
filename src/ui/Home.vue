<template>
  <div class="w-full flex justify-center">
    <div class="w-full max-w-6xl p-12 pt-24">
      <div class="w-full h-[180px] bg-gray-100 rounded-lg relative p-6 mb-12">
        <div class="max-w-md w-full flex absolute right-6 bottom-6">
          <div
            class="h-24 w-full bg-white rounded-lg flex items-center p-6 mr-4"
          >
            <p class="text-5xl font-black mr-4">{{ completedCoursesAmount }}</p>
            <p class="text-sm font-medium">Cursos completos</p>
          </div>
          <div class="h-24 w-full bg-white rounded-lg flex items-center p-6">
            <p class="text-5xl font-black mr-4">{{ ongoingCoursesAmount }}</p>
            <p class="text-sm font-medium">Cursos em andamento</p>
          </div>
        </div>
      </div>

      <div class="w-fit flex bg-gray-100 rounded-full p-1 mb-4">
        <button 
          v-for="filter in filters" 
          :key="filter.value"
          @click="selectedFilter = filter.value"
          :class="[
            'px-4 py-1 rounded-full text-sm transition-colors',
            selectedFilter === filter.value 
              ? 'bg-white text-black shadow-sm' 
              : 'text-gray-500 hover:text-gray-700'
          ]"
        >
          {{ filter.label }}
        </button>
      </div>

      <div class="flex flex-wrap gap-6 mb-16">
        <CourseCard
          v-for="course in filteredCourses"
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
          image="https://techvidvan.com/tutorials/wp-content/uploads/sites/2/2021/07/Binary-Trees-in-C-normal-image01.jpg"
          :clickFunction="() => redirectTo('binary-tree-simulator')"
        />
        <SimulatorCard
          title="Tabelas Hash"
          description="Simulador de tabelas hash"
          image="https://khalilstemmler.com/img/blog/data-structures/hash-tables/hash-table.png"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import courses from "@/courses.json";
import SimulatorCard from "@components/ui/SimulatorCard.vue";
import CourseCard from "@components/ui/CourseCard.vue";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const completedCoursesAmount = ref(0);
const ongoingCoursesAmount = ref(0);
const ongoingCourses = ref([]);
const router = useRouter();

const filters = [
  { label: 'Todos os cursos', value: 'all' },
  { label: 'Em andamento', value: 'ongoing' },
  { label: 'Completos', value: 'completed' }
];

const selectedFilter = ref('all');

const filteredCourses = computed(() => {
  if (selectedFilter.value === 'all') return courses;
  
  return courses.filter(course => {
    const isOngoing = ongoingCourses.value.find(c => c.id === course.id) !== undefined;
    if (selectedFilter.value === 'ongoing') return isOngoing;
    if (selectedFilter.value === 'completed') return !isOngoing && completedCoursesAmount.value > 0;
    return true;
  });
});

const goToCourseInfo = (courseId) => router.push(`/course/${courseId}/info`);
const redirectTo = (path) => router.push(`/${path}`);

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
        currentTopic,
        currentClass,
      };
    })
    .filter(Boolean);
};

// Initialize data
loadCoursesData();
</script>
