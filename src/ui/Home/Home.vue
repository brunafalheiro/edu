<template>
  <p class="home-title">Home</p>
  <Button @click="goToHello">hello</Button>

  <Accordion type="single" class="w-full" collapsible :default-value="defaultValue">
    <AccordionItem v-for="item in accordionItems" :key="item.value" :value="item.value">
      <AccordionTrigger>{{ item.title }}</AccordionTrigger>
      <AccordionContent>
        {{ item.content }}
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>

<script setup>
  import { useRouter } from 'vue-router';
  import Button from '@components/ui/button/Button.vue';
  import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

  const router = useRouter();

  const goToHello = () => { router.push('/hello'); };

  const accordionItems = [
    { value: 'item-1', title: 'Is it accessible?', content: 'Yes. It adheres to the WAI-ARIA design pattern.' },
    { value: 'item-2', title: 'Is it unstyled?', content: 'Yes. It\'s unstyled by default, giving you freedom over the look and feel.' },
    { value: 'item-3', title: 'Can it be animated?', content: 'Yes! You can use the transition prop to configure the animation.' },
  ];
</script>

<style>@import './Home.scss';</style>
