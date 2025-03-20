<template>
  <div class="w-full flex justify-center">
    <div class="w-full max-w-5xl p-12 pt-24">
      <p class="home-title">Home</p>
      <Button @click="goToHello">hello</Button>
      <Button @click="goToLessonInfo('123')">lessonInfo</Button>
    </div>
  </div>
  
</template>

<script setup>
  import Button from '@components/ui/button/Button.vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const goToHello = () => { router.push('/hello'); };
  const goToLessonInfo = (id) => { router.push(`/lesson/${id}/info`); };
</script>

