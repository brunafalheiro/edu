<template>
  <div
    class="rounded-xl overflow-hidden relative w-full min-w-[280px] max-w-[360px] flex-grow cursor-pointer transform transition duration-300 hover:shadow-lg hover:scale-105"
    @click="clickFunction(course.id)"
  >
    <div class="w-full h-40 bg-gray-100">
      <img :src="course.image" class="object-cover">
    </div>

    <div
      v-if="courseStatus !== 'not_started'"
      :class="[ 
        'absolute top-2 right-2 px-3 py-1 text-xs font-bold rounded-full',
        courseStatus === 'completed' ? 'bg-green-200 text-green-800' : 'bg-orange-200 text-orange-800'
      ]"
    >
      <p>{{ courseStatus === 'completed' ? 'Completado' : 'Em andamento' }}</p>
    </div>

    <div class="flex justify-between items-center px-4 my-3">
      <h2 class="font-semibold mr-2">{{ course.name }}</h2>
      <span v-if="courseStatus !== 'completed'" class="text font-bold text-red-500">{{ courseProgress }}%</span>
    </div>

    <div class="flex px-4 pb-3">
      <div class="text-sm text-gray-600 flex items-center mr-4">
        <i class="pi pi-clock mr-1"></i>
        <p>{{ courseDuration }}</p>
      </div>
      <div class="text-sm text-gray-600">
        <p>{{ course.classes.length }} módulos</p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed, ref, onMounted } from 'vue';

  const MINUTES_PER_TOPIC = 10;
  const MINUTES_IN_HOUR = 60;

  const props = defineProps({
    course: Object,
    isOngoing: Boolean,
    clickFunction: Function,
  });

  const progress = ref({});
  const courseStatus = computed(() => {
    const courseProgress = progress.value[props.course.id];
    if (!courseProgress) return 'not_started';
    return courseProgress.completed ? 'completed' : 'ongoing';
  });

  const courseProgress = computed(() => {
    const courseProgress = progress.value[props.course.id];
    if (!courseProgress) return 0;

    const completedContent = courseProgress.completedContent || {};
    const totalTopics = Object.values(completedContent).reduce((total, topics) => total + topics.length, 0);
    const completedTopics = Object.values(completedContent).reduce((total, topics) => 
      total + topics.filter(topic => topic.completed).length, 0);

    return Math.round((completedTopics / totalTopics) * 100);
  });

  const formatDuration = (hours, minutes) => {
    if (minutes === 0) return `${hours}h`;
    return `${hours}h ${minutes}min`;
  };

  const courseDuration = computed(() => {
    const totalTopics = props.course.classes.reduce((total, cls) => total + cls.topics.length, 0);
    
    const totalMinutes = totalTopics * MINUTES_PER_TOPIC;
    const hours = Math.floor(totalMinutes / MINUTES_IN_HOUR);
    const minutes = totalMinutes % MINUTES_IN_HOUR;
    
    return formatDuration(hours, minutes);
  });

  const fetchProgress = async () => {
    progress.value = (await window.store.get("progress")) || {};
  };

  onMounted(fetchProgress);
</script>
