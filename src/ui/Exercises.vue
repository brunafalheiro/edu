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
            <p>{{ currentExerciseData.question }}</p>
          </div>
          
          <!-- Question Type Exercise -->
          <div v-if="currentExerciseData.type === 'quiz'">
            <div
              v-for="option in currentExerciseData.options"
              :key="option.id"
              class="flex items-center border bg-white p-3 rounded-lg mt-3 cursor-pointer transition-all duration-300"
              :class="[
                !showFeedback && selectedAnswer === option.id ? 'border-lavender-light bg-lavender-ultralight' : '',
                showFeedback && option.correct ? 'border-green bg-green/10' : '',
                showFeedback && selectedAnswer === option.id && !option.correct ? 'border-red bg-red/10' : ''
              ]"
              @click="selectAnswer(option.id)"
            >
              <div
                class="w-8 h-8 rounded-lg bg-lavender-ultralight flex items-center justify-center"
                :class="[
                  showFeedback && option.correct ? 'bg-green/80' : '',
                  showFeedback && selectedAnswer === option.id && !option.correct ? 'bg-red' : ''
                ]"
              >
                <p class="text-xs font-bold">{{ option.id }}</p>
              </div>

              <p class="ml-4">{{ option.text }}</p>
            </div>

            <div v-if="showFeedback" class="mt-6 py-3 px-4 rounded-lg" :class="isAnswerCorrect ? 'bg-green/10 text-green-dark' : 'bg-red-50 text-red-700'">
              <p class="text-sm font-semibold">{{ isAnswerCorrect ? 'Resposta correta.' : 'Resposta incorreta.' }}</p>
              <p v-if="!isAnswerCorrect" class="text-sm">A resposta correta é: {{ getCorrectAnswer }}</p>
            </div>
          </div>

          <!-- Single Type Exercise -->
          <div v-else-if="currentExerciseData.type === 'single'">
            <div v-if="showAnswer" class="mt-6 bg-white p-4 rounded-lg">
              <div v-for="(item, index) in currentExerciseData.answer" :key="index">
                <p v-if="item.type === 'text'" class="mb-4">{{ item.value }}</p>
                <img v-else-if="item.type === 'image'" :src="getImageUrl(item.value)" class="max-w-full h-auto mb-4" />
              </div>
            </div>
          </div>

          <div class="flex items-center justify-end mt-12">
            <Button 
              v-if="currentExerciseData.type === 'quiz'"
              class="mr-4" 
              :disabled="!selectedAnswer || showFeedback"
              @click="checkAnswer"
            >
              Responder
            </Button>
            <Button 
              v-else-if="currentExerciseData.type === 'single'"
              class="mr-4"
              @click="showAnswer = !showAnswer"
            >
              {{ showAnswer ? 'Ocultar Resposta' : 'Ver Resposta' }}
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
            v-for="index in totalExercises"
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
  import exercises from '@/exercises.json';

  const route = useRoute();
  const router = useRouter();
  const courseId = route.params.courseId;
  const currentExercise = ref(1);
  const selectedAnswer = ref(null);
  const showFeedback = ref(false);
  const isAnswerCorrect = ref(false);
  const showAnswer = ref(false);

  const courseExercises = computed(() => {
    const course = exercises.find(c => c.id === courseId);
    return course ? course.exercises : [];
  });

  const totalExercises = computed(() => courseExercises.value.length);

  const currentExerciseData = computed(() => {
    return courseExercises.value[currentExercise.value - 1] || {};
  });

  const getCorrectAnswer = computed(() => {
    if (currentExerciseData.value.type !== 'quiz') return '';
    const correct = currentExerciseData.value.options?.find(opt => opt.correct);
    return correct ? correct.id : '';
  });

  const selectAnswer = (key) => {
    if (showFeedback.value) return;
    selectedAnswer.value = key;
  };

  const checkAnswer = () => {
    if (!selectedAnswer.value) return;
    const selected = currentExerciseData.value.options?.find(opt => opt.id === selectedAnswer.value);
    isAnswerCorrect.value = selected?.correct || false;
    showFeedback.value = true;
  };

  const goBack = () => router.push("/");
  const goToExercise = (exercise) => {
    if (exercise > totalExercises.value) return;
    currentExercise.value = exercise;
    selectedAnswer.value = null;
    showFeedback.value = false;
    isAnswerCorrect.value = false;
    showAnswer.value = false;
  };

  const getImageUrl = (imageName) => {
    const imageModules = import.meta.glob('@/assets/answers/*.png', { eager: true });
    return imageModules[`/src/assets/answers/${imageName}`].default;
  };
</script>
