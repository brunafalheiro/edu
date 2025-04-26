<template>
  <div class="w-full flex justify-center">
    <div class="w-full max-w-6xl p-12 pt-24">
      <CourseStats 
        :completed-courses="completedCoursesAmount"
        :ongoing-courses="ongoingCoursesAmount"
      />

      <CourseFilters
        :filters="FILTERS"
        :selected-filter="selectedFilter"
        @filter-change="selectedFilter = $event"
      />

      <div class="flex flex-wrap gap-6 mb-16">
        <CourseCard
          v-for="course in filteredCourses"
          :key="course.id"
          :course="course"
          :clickFunction="goToCourseInfo"
        />
      </div>

      <ToolsSection :tools="TOOLS" @tool-click="redirectTo" />
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import courses from "@/courses.json";
  import CourseCard from "@/components/ui/CourseCard.vue";
  import CourseStats from "@/components/ui/CourseStats.vue";
  import CourseFilters from "@/components/ui/CourseFilters.vue";
  import ToolsSection from "@/components/ui/ToolsSection.vue";

  const FILTERS = [
    { label: 'Todos os cursos', value: 'all' },
    { label: 'Em andamento', value: 'ongoing' },
    { label: 'Finalizados', value: 'completed' }
  ];

  const TOOLS = [
    {
      title: "Árvores Binárias",
      description: "Simulador de árvores binárias",
      image: "https://techvidvan.com/tutorials/wp-content/uploads/sites/2/2021/07/Binary-Trees-in-C-normal-image01.jpg",
      path: "binary-tree-simulator"
    },
    {
      title: "Tabelas Hash",
      description: "Simulador de tabelas hash",
      image: "https://khalilstemmler.com/img/blog/data-structures/hash-tables/hash-table.png",
      path: "hash-tables"
    }
  ];

  const completedCoursesAmount = ref(0);
  const ongoingCoursesAmount = ref(0);
  const ongoingCourses = ref([]);
  const selectedFilter = ref('all');
  const router = useRouter();

  const filteredCourses = computed(() => {
    if (selectedFilter.value === 'all') return courses;
    return courses.filter(course => {
      const isOngoing = ongoingCourses.value.some(c => c.id === course.id);
      
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

    const stats = courseProgress.reduce((acc, [_, data]) => {
      data.completed ? acc.completed++ : acc.ongoing++;
      return acc;
    }, { completed: 0, ongoing: 0 });

    completedCoursesAmount.value = stats.completed;
    ongoingCoursesAmount.value = stats.ongoing;

    ongoingCourses.value = courseProgress
      .filter(([_, data]) => !data.completed)
      .map(([courseId, data]) => {
        const course = courses.find((c) => c.id === courseId);
        if (!course) return null;

        return {
          id: course.id,
          name: course.name,
          currentTopic: data.currentTopic,
          currentClass: data.currentClass,
        };
      })
      .filter(Boolean);
  };

  onMounted(() => { loadCoursesData() });
</script>
