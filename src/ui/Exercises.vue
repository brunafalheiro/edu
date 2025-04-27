<template>
  <div class="w-full flex justify-center">
    <div class="w-full max-w-6xl p-12 pt-24">
      <div class="flex items-center mb-4">
        <BackButton :backFunction="goBack"/>
        <p class="text-2xl font-black">Exercícios {{ courseId }}</p>
      </div>

      <div class="w-full flex">
        <div class="w-full bg-gray-50 rounded-lg p-4 mr-4">
          <div class="bg-white p-4 rounded-lg mb-8">
            <p class="">{{ currentExercise }} Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet </p>
          </div>
          
          <div
            v-for="ans in answers"
            :key="ans.key"
            class="flex items-center border bg-white p-3 rounded-lg mt-3 cursor-pointer transition-all duration-300"
            :class="[
              !showFeedback && selectedAnswer === ans.key ? 'border-lavender-light bg-lavender-ultralight' : '',
              showFeedback && ans.correct ? 'border-green bg-green/10' : '',
              showFeedback && selectedAnswer === ans.key && !ans.correct ? 'border-red bg-red/10' : ''
            ]"
            @click="selectAnswer(ans.key)"
          >
            <div
              class="w-8 h-8 rounded-lg bg-lavender-ultralight flex items-center justify-center"
              :class="[
                showFeedback && ans.correct ? 'bg-green/80' : '',
                showFeedback && selectedAnswer === ans.key && !ans.correct ? 'bg-red' : ''
              ]"
            >
              <p class="text-xs font-bold">{{ ans.key }}</p>
            </div>

            <p class="ml-4">{{ ans.text }}</p>
          </div>

          <div v-if="showFeedback" class="mt-6 py-3 px-4 rounded-lg" :class="isAnswerCorrect ? 'bg-green/10 text-green-dark' : 'bg-red-50 text-red-700'">
            <p class="text-sm font-semibold">{{ isAnswerCorrect ? 'Resposta correta.' : 'Resposta incorreta.' }}</p>
            <p v-if="!isAnswerCorrect" class="text-sm">A resposta correta é: {{ getCorrectAnswer }}</p>
          </div>

          <div class="flex items-center justify-end mt-12">
            <Button 
              class="mr-4" 
              :disabled="!selectedAnswer || showFeedback"
              @click="checkAnswer"
            >
              Responder
            </Button>
            <Button 
              @click="goToExercise(currentExercise + 1)"
            >
              Próximo
            </Button>
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
  import { ref, computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import BackButton from '@/components/ui/BackButton.vue';
  import Button from '@components/ui/button/Button.vue';

  const route = useRoute();
  const router = useRouter();
  const courseId = route.params.courseId;
  const currentExercise = ref(1);
  const TOTAL_EXERCISES = 45;
  const selectedAnswer = ref(null);
  const showFeedback = ref(false);
  const isAnswerCorrect = ref(false);

  const answers = [
    { key: 'A', text: 'Lorem ipsum dolor sit amet', correct: true },
    { key: 'B', text: 'Lorem ipsum dolor sit amet' },
    { key: 'C', text: 'Lorem ipsum dolor sit amet' },
    { key: 'D', text: 'Lorem ipsum dolor sit amet' }
  ]

  const getCorrectAnswer = computed(() => {
    const correct = answers.find(ans => ans.correct);
    return correct ? correct.key : '';
  });

  const selectAnswer = (key) => {
    if (showFeedback.value) return;
    selectedAnswer.value = key;
  };

  const checkAnswer = () => {
    if (!selectedAnswer.value) return;
    const selected = answers.find(ans => ans.key === selectedAnswer.value);
    isAnswerCorrect.value = selected?.correct || false;
    showFeedback.value = true;
  };

  const goBack = () => router.push("/");
  const goToExercise = (exercise) => {
    if (exercise > TOTAL_EXERCISES) return;
    currentExercise.value = exercise;
    selectedAnswer.value = null;
    showFeedback.value = false;
    isAnswerCorrect.value = false;
  };
</script>
