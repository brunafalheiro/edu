<template>
  <div class="w-full min-h-screen">
    <div class="w-full p-6 pt-20 mx-auto" style="height: calc(100vh - 120px)">
      <BackButton class="mb-6" text="Simulador de Hash Tables" :backFunction="goBack" />
    </div>
  </div>
</template>

<script setup>
  import BackButton from "@/components/ui/BackButton.vue";
  import { useRouter } from "vue-router";

  const router = useRouter();
  const goBack = () => router.push("/");
</script>
