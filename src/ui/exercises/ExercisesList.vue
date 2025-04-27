<template>
  <div class="w-full flex justify-center">
    <div class="w-full max-w-5xl p-12 pt-24">
      <div class="flex items-center mb-4">
        <BackButton :backFunction="goBack"/>
        <p class="text-2xl font-black">Lista de exercícios</p>
      </div>
      
    </div>
  </div>
</template>

<script setup>
  import BackButton from '@/components/ui/BackButton.vue';
  import { useRoute, useRouter } from 'vue-router';

  const route = useRoute();
  const router = useRouter();
  const courseId = route.params.courseId;

  const goBack = () => router.push("/");
</script>
