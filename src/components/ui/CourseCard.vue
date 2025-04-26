<template>
  <div
    class="border border-black rounded-xl overflow-hidden relative w-full min-w-[280px] max-w-[336px] flex-grow cursor-pointer transform transition duration-300 hover:shadow-xl hover:scale-[1.02] bg-white"
    @click="clickFunction(course.id)"
  >
    <div class="w-full h-48">
      <img 
        :src="courseImagePath" 
        @error="handleImageError"
        class="object-cover w-full h-full"
        :alt="course.name"
      >
    </div>

    <div
      v-if="courseStatus !== 'not_started'"
      :class="[ 
        'absolute top-3 right-3 px-4 py-1.5 rounded-full shadow-sm',
        courseStatus === 'completed' ? 'bg-green-dark text-green' : 'bg-lavender-light text-lavender-dark'
      ]"
    >
      <p class="text-xs font-medium">{{ statusLabel }}</p>
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
const DEFAULT_IMAGE_URL = 'https://i0.wp.com/espaferro.com.br/wp-content/uploads/2024/06/placeholder.png?resize=768%2C512&ssl=1';

const props = defineProps({
  course: Object,
  clickFunction: Function,
});

const courseImagePath = ref('');
const progress = ref({});

// Computed properties
const courseStatus = computed(() => {
  const courseProgress = progress.value[props.course.id];
  if (!courseProgress) return 'not_started';
  return courseProgress.completed ? 'completed' : 'ongoing';
});

const statusLabel = computed(() => 
  courseStatus.value === 'completed' ? 'Finalizado' : 'Em andamento'
);

const courseProgress = computed(() => {
  const courseProgress = progress.value[props.course.id];
  if (!courseProgress) return 0;

  const completedContent = courseProgress.completedContent || {};
  const totalTopics = Object.values(completedContent).reduce((total, topics) => total + topics.length, 0);
  const completedTopics = Object.values(completedContent).reduce((total, topics) => 
    total + topics.filter(topic => topic.completed).length, 0);

  return Math.round((completedTopics / totalTopics) * 100);
});

const courseDuration = computed(() => {
  const totalTopics = props.course.classes.reduce((total, cls) => total + cls.topics.length, 0);
  const totalMinutes = totalTopics * MINUTES_PER_TOPIC;
  const hours = Math.floor(totalMinutes / MINUTES_IN_HOUR);
  const minutes = totalMinutes % MINUTES_IN_HOUR;
  
  return formatDuration(hours, minutes);
});

const formatDuration = (hours, minutes) => {
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}min`;
};

const handleImageError = () => { courseImagePath.value = DEFAULT_IMAGE_URL; };
const fetchProgress = async () => {
  progress.value = (await window.store.get("progress")) || {};
};

onMounted(() => {
  courseImagePath.value = new URL(`../../assets/images/${props.course.id}.png`, import.meta.url).href;
  fetchProgress();
});
</script>
