<template>
  <div class="w-full flex justify-between">
    <div class="sidebar flex items-center justify-center">
      <div class="w-full max-w-[860px] p-12 pt-24">
        <Button @click="goBack">Voltar</Button>
        <p class="text-xl font-black mb-6 mt-12">Curso {{ courseName }}</p>
        <p class="text-justify mb-12">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam placerat eget lacus
          et luctus. Nam auctor, felis vel facilisis tincidunt, lectus enim euismod nunc,
          nec pretium lorem lorem vel tortor. Integer arcu lorem, gravida eu euismod quis,
          congue at libero. Nullam facilisis, lectus vel efficitur scelerisque, nisl nibh
          sodales urna, quis imperdiet ligula neque et metus. Fusce quis leo et mi
          molestie eleifend ac at enim. Donec et metus quis augue imperdiet accumsan.
          Donec vel nisi a augue condimentum fringilla. Vestibulum ut orci finibus,
          porttitor mauris ut, tincidunt augue. Morbi vulputate massa non felis faucibus
          maximus. Curabitur feugiat, nibh eget cursus hendrerit, orci leo facilisis
          massa, eu maximus odio mi sit amet lorem. Sed faucibus, dolor eu scelerisque
          ullamcorper, mauris purus blandit arcu, ac egestas neque tellus sed nunc. Ut nec
          convallis urna, sed accumsan ex. Suspendisse cursus, libero sed rhoncus
          imperdiet, ipsum ipsum vehicula arcu, viverra pretium purus nunc sit amet
          libero. Aliquam quis quam ac leo tincidunt convallis vel sed est. Suspendisse
          dictum ex dui. Quisque suscipit eros tellus, id molestie sapien aliquam sed.
          Praesent faucibus mattis suscipit. Sed eu tincidunt dui, nec maximus dolor. Ut
          in ultricies nibh. Donec consectetur fermentum enim eu dictum. Quisque vitae
          diam eu purus congue tempus vitae at nisi. Cras lobortis dolor sit amet elit
          pretium, quis vulputate lacus sollicitudin. Nulla accumsan at nisl sit amet
          laoreet. Fusce pretium ante massa, nec facilisis eros blandit quis. Vestibulum
          egestas turpis ornare augue semper, vitae interdum nibh accumsan. In hac
          habitasse platea dictumst. Duis lacinia purus viverra felis fringilla, efficitur
          molestie ante gravida. Cras dapibus risus metus, vel vehicula justo condimentum
          non. Maecenas pharetra turpis nisi, et consequat elit iaculis ullamcorper. Morbi
          ut dui mauris. Etiam sed enim et lacus euismod fermentum sed non nisi. Aenean ac
          egestas lorem, a posuere lectus. Cras tempor id dui vitae luctus. Vestibulum
          fermentum libero non mauris egestas, at rutrum felis tempus. Sed rutrum non
          tortor in commodo. Donec mollis dolor orci, sed malesuada neque sodales sit
          amet. Phasellus vestibulum, metus eu lobortis mollis, justo tortor gravida
          lectus, sed fermentum elit massa eu est. Curabitur neque lorem, blandit quis
          sapien eu, vehicula vestibulum risus. Integer dapibus consequat lacus at
          porttitor. Sed tristique eu sapien vel tincidunt. Nunc mattis nec eros sed
          ornare. Quisque vitae dui nec risus euismod suscipit vitae ac nunc. Mauris sed
          rutrum orci. Vivamus sagittis nulla in imperdiet sollicitudin. Suspendisse et
          nulla dui. Curabitur eget sodales urna, feugiat dignissim nisi. Duis non rutrum
          ligula. Mauris fermentum fermentum purus non finibus. Donec eget ex vel nisi
          consectetur consequat a et risus. Etiam vel congue risus. Cras vel dignissim
          enim, a vehicula elit. Morbi leo ex, cursus eget porta a, sollicitudin sit amet
          velit. Etiam fringilla sollicitudin ultrices. Aliquam scelerisque lacus sit amet
          sem condimentum imperdiet. Nullam id nisi turpis. Phasellus sit amet sem ac
          turpis ornare eleifend. Vestibulum viverra purus semper eleifend sollicitudin.
          Quisque finibus enim nec faucibus finibus. Proin vulputate efficitur sapien, ac
          accumsan purus. In velit lorem, lacinia at leo sit amet, congue suscipit eros.
          Ut sem dolor, tempus in commodo nec, cursus et felis.
        </p>

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
          class="relative py-3 px-4 mb-3 rounded-3xl border border-slate-900"
        >
          <AccordionTrigger class="text-left">
            <div class="flex items-center mr-2">
              <div class="min-w-12 min-h-12 bg-primary mr-4 rounded-full"></div>
              <div>
                <p class="text-xs text-gray-500 font-medium">Aula {{ index + 1 }}</p>
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
console.log(classes);

const goBack = () => {
  router.back();
};
</script>

<style lang="scss">
.sidebar {
  width: calc(100% - 320px);
}
</style>
