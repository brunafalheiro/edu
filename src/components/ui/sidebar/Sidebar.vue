<template>
  <div
    class="w-full max-w-xs bg-slate-100 fixed right-0 h-screen p-4 pt-24 overflow-y-auto"
  >
    <Accordion type="single" class="w-full" collapsible :default-value="defaultValue">
      <AccordionItem
        v-for="(cls, index) in classes"
        :key="cls.id"
        :value="cls.name"
        class="relative px-4 mb-3 rounded-3xl border border-slate-900"
      >
        <AccordionTrigger class="text-left">
          <div class="flex items-center mr-2">
            <div
              class="min-w-12 min-h-12 rounded-full mr-4"
              :class="isClassCompleted(cls.id) ? 'bg-red-500' : 'bg-primary'"
            ></div>
            <div>
              <p class="text-xs text-gray-500 font-medium mb-1">Aula {{ index + 1 }}</p>
              <p>{{ cls.name }}</p>
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
                class="min-w-7 min-h-7 rounded-full mr-3 relative z-10"
                :class="isTopicCompleted(cls.id, topic.id) ? 'bg-red-500' : 'bg-primary'"
              ></div>
              <div class="w-full flex justify-between">
                <p class="font-semibold">{{ topic.name }}</p>
                <p class="text-sm text-gray-500">5 min</p>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const props = defineProps({ classes: Array });
const progress = ref({});

const loadProgress = async () => {
  progress.value = (await window.store.get("progress")) || {};
};

const isClassCompleted = (classId) => {
  return Object.values(progress.value).some(
    (p) => p.currentClass > parseInt(classId) || p.completed
  );
};

const isTopicCompleted = (classId, topicId) => {
  return Object.values(progress.value).some(
    (p) =>
      p.currentClass > parseInt(classId) ||
      (p.currentClass === parseInt(classId) && p.currentTopic >= parseInt(topicId))
  );
};

onMounted(loadProgress);

watch(progress, async () => {
  progress.value = (await window.store.get("progress")) || {};
});
</script>
