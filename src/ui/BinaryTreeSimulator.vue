<template>
  <div class="w-full flex justify-center">
    <div class="w-full max-w-5xl p-12 pt-24">
      <Button class="mb-12" @click="goBack">Voltar</Button>
      <p class="text-2xl font-black">Simulador de Árvores Binárias</p>
    </div>
  </div>
</template>

<script setup>
  import Button from '@components/ui/button/Button.vue'
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const goBack = () => { router.push('/'); };
</script>
