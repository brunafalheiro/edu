<template>
  <div>
    <p>Hello World</p>
    <Button @click="goBack">voltar</Button>
  </div>
</template>

<script setup lang="ts">
  import Button from '@/components/ui/button/Button.vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const goBack = () => { router.back(); };
</script>

<style setup></style>
