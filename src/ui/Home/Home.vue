<template>
  <p class="home-title">Home</p>
  <Button @click="goToHello">hello</Button>
</template>

<script setup>
  import { useRouter } from 'vue-router';
  import Button from '@components/ui/button/Button.vue';

  const router = useRouter();

  const goToHello = () => { router.push('/hello'); };
</script>

<style>@import './Home.scss';</style>