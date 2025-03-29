<template>
  <div class="w-full flex justify-between">
    <div class="class min-h-screen flex flex-col items-center">
      <div class="w-full max-w-[860px] h-full p-12 pt-24">
        <Button @click="goBack">Voltar</Button>
        <p class="text-xl font-black mb-6 mt-12">Curso {{ courseName }}</p>
        <div class="class-content">
          <p class="text-justify mb-12">Lorem Ipsum</p>
        </div>

        <div class="flex items-center mb-8">
          <Button class="mr-6">Ir para o próximo item</Button>
          <i class="pi pi-check mr-2"></i>
          <p class="font-bold">Concluído</p>
        </div>

        <div class="h-px w-full bg-gray-200 mb-6"></div>
        <div @click="" class="flex items-center cursor-pointer">
          <i class="pi pi-flag mr-2"></i>
          <p class="font-semibold text-sm">Reportar problema</p>
        </div>
      </div>
    </div>

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
              <div class="min-w-12 min-h-12 bg-primary mr-4 rounded-full"></div>
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
                  class="min-w-7 min-h-7 rounded-full bg-primary mr-3 relative z-10"
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
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Button from "@components/ui/button/Button.vue";
import courses from "@/courses.json";

const router = useRouter();
const courseId = router.currentRoute.value.params.id;

const course = courses.find((course) => course.id === courseId);
const courseName = course.name;
const classes = course.classes.map(({ name, id, topics }) => ({
  id,
  name,
  topics: topics.map(({ name, id }) => ({ name, id })),
}));

const goBack = () => router.back();
</script>

<style lang="scss">
.class {
  width: calc(100% - 320px);

  .class-content {
    min-height: calc(100vh - 400px);
  }
}
</style>
