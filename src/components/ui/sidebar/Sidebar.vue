<template>
  <div
    class="w-full max-w-xs bg-slate-100 fixed right-0 h-screen p-4 pt-24 overflow-y-auto"
  >
    <Accordion type="single" class="w-full" collapsible v-model="activeAccordion">
      <AccordionItem
        v-for="(cls, index) in classes"
        :key="cls.id"
        :value="cls.id"
        class="accordion-item relative px-4 mb-3 rounded-3xl border border-slate-900"
      >
        <AccordionTrigger class="text-left">
          <div class="flex items-center mr-2">
            <div
              v-if="isClassCompleted(cls.id)"
              class="bg-red-500 min-w-12 min-h-12 rounded-full flex items-center justify-center mr-4"
            >
              <i class="pi pi-check text-white text-base"></i>
            </div>
            <div v-else class="bg-primary min-w-12 min-h-12 rounded-full mr-4"></div>

            <div>
              <p class="text-xs text-gray-500 font-medium mb-1">Aula {{ index + 1 }}</p>
              <p class="item-name">{{ cls.name }}</p>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div
            v-for="(topic, topicIndex) in cls.topics"
            :key="topic.id"
            class="relative flex items-center py-4 px-3 pl-[10px]"
          >
            <div class="relative flex items-center w-full">
              <div
                v-if="topicIndex !== cls.topics.length - 1"
                class="absolute left-[14px] top-full w-px h-12 border-l-2 border-dashed border-gray-400"
              ></div>

              <div
                v-if="isTopicCompleted(cls.id, topic.id)"
                class="min-w-7 min-h-7 rounded-full mr-3 relative z-10 bg-red-500 flex items-center justify-center"
              >
                <i class="pi pi-check text-white text-xs"></i>
              </div>
              <div
                v-else
                class="min-w-7 min-h-7 rounded-full mr-3 relative z-10 bg-primary"
              ></div>

              <div class="w-full flex justify-between">
                <p class="font-semibold">{{ topic.name }}</p>
                <p class="text-sm text-end min-w-12 text-gray-500">5 min</p>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const props = defineProps({ classes: Array });

const progress = ref({});
const route = useRoute();
const activeAccordion = ref(route.params.classId || null);

const fetchProgress = async () => {
  progress.value = (await window.store.get("progress")) || {};
};

onMounted(fetchProgress);

const isClassCompleted = computed(() => (classId) => {
  return Object.values(progress.value).some(
    ({ currentClass, completed }) => currentClass > parseInt(classId) || completed
  );
});

const courseId = route.params.courseId;
const isTopicCompleted = computed(() => (classId, topicId) => {
  const courseProgress = progress.value[courseId]?.completedContent;
  if (!courseProgress || !courseProgress[classId]) return false;

  return courseProgress[classId].some(
    (topic) => topic.topicId === topicId && topic.completed
  );
});

watch(
  () => route.params.classId,
  (newClassId) => {
    if (newClassId !== activeAccordion.value) {
      activeAccordion.value = newClassId;
    }
  }
);

watch(() => route.params, fetchProgress);
</script>

<style lang="scss">
.accordion-item {
  * {
    &:hover {
      text-decoration: none !important;
    }
  }
}
</style>
