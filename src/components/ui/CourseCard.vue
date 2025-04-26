<template>
  <div
    class="rounded-xl overflow-hidden relative w-full min-w-[280px] max-w-[360px] flex-grow cursor-pointer transform transition duration-300 hover:shadow-xl hover:scale-[1.02] bg-white"
    @click="clickFunction(course.id)"
  >
    <div class="w-full h-48 bg-gray-100 relative">
      <img :src="course.image" class="object-cover w-full h-full">
      <div class="absolute inset-0 bg-gray-100"></div>
    </div>

    <div
      v-if="courseStatus !== 'not_started'"
      :class="[ 
        'absolute top-3 right-3 px-4 py-1.5 text-xs font-semibold rounded-full shadow-sm',
        courseStatus === 'completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
      ]"
    >
      <p>{{ courseStatus === 'completed' ? 'Completado' : 'Em andamento' }}</p>
    </div>

    <div class="p-4">
      <div class="flex justify-between items-start mb-3">
        <h2 class="font-bold text-lg text-gray-800 mr-2 line-clamp-2">{{ course.name }}</h2>
        <span 
          v-if="courseStatus !== 'completed'" 
          class="flex-shrink-0 ml-2 px-2.5 py-1 bg-red-50 text-red-600 text-sm font-semibold rounded-full"
        >
          {{ courseProgress }}%
        </span>
      </div>

      <div class="flex items-center space-x-4 text-sm text-gray-600">
        <div class="flex items-center">
          <i class="pi pi-clock mr-1.5 text-gray-500"></i>
          <p>{{ courseDuration }}</p>
        </div>
        <div class="flex items-center">
          <i class="pi pi-book mr-1.5 text-gray-500"></i>
          <p>{{ course.classes.length }} módulos</p>
        </div>
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
