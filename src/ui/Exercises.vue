<template>
  <div class="w-full flex justify-center">
    <div class="w-full max-w-6xl p-12 pt-24">
      <div class="flex items-center mb-4">
        <BackButton :backFunction="goBack"/>
        <p class="text-2xl font-black">Exercícios {{ courseId }}</p>
      </div>

      <div class="w-full flex">
        <div class="w-full bg-gray-50 rounded-lg p-4 mr-4">
          <div class="bg-white p-4 rounded-lg">
            <p class="">{{ currentExercise }} Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet </p>
          </div>
          <div
            v-for="ans in answers"
            class="flex items-center bg-white p-4 rounded-lg mt-4"
            :key="ans.key"
          >
            <div class="w-8 h-8 rounded-lg bg-lavender-ultralight flex items-center justify-center">
              <p class="text-xs font-bold">{{ ans.key }}</p>
            </div>

            <p class="">{{ ans.text }}</p>
          </div>

          <div class="flex items-center justify-end mt-12">
            <Button class="mr-4">Responder</Button>
            <Button @click="goToExercise(currentExercise + 1)">Proximo</Button>
          </div>
        </div>
        
        <div class="w-full max-w-96 h-fit bg-gray-50 rounded-lg p-4 flex flex-wrap gap-2">
          <div
            v-for="index in TOTAL_EXERCISES"
            :key="index"
            class="bg-white border border-gray-600 flex items-center justify-center rounded-lg w-full h-6 max-w-12 cursor-pointer hover:bg-gray-100 transition-all duration-300"
            :class="{ 'border-lavender bg-lavender-ultralight': currentExercise === index }"
            @click="goToExercise(index)"
          >
            <p class="text-center text-xs font-bold">{{ index }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import BackButton from '@/components/ui/BackButton.vue';
  import Button from '@components/ui/button/Button.vue';

  const route = useRoute();
  const router = useRouter();
  const courseId = route.params.courseId;
  const currentExercise = ref(0);
  const TOTAL_EXERCISES = 45;
  const answers = [
    {'A': { 'text': 'Lorem ipsum dolor sit amet', 'correct': true }},
    {'B': { 'text': 'Lorem ipsum dolor sit amet', 'correct': false }},
    {'C': { 'text': 'Lorem ipsum dolor sit amet', 'correct': false }},
    {'D': { 'text': 'Lorem ipsum dolor sit amet', 'correct': false }},
  ]

  const goBack = () => router.push("/");
  const goToExercise = (exercise) => {
    if (exercise > TOTAL_EXERCISES) return;
    currentExercise.value = exercise;
  };
</script>
