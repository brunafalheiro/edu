<template>
  <div class="w-full flex justify-center">
    <div class="w-full max-w-5xl p-12 pt-24">
      <Button class="mb-12" @click="goBack">Voltar</Button>
      <div class="flex items-center mb-3">
        <div class="flex items-center justify-center rounded-sm h-12 w-12 bg-gray-100 mr-6"></div>
        <p class="text-2xl font-black">Lesson Screen</p>
      </div>
      <p class="mb-9">Lorem ipsum dolor sit amet consectetur. Natoque viverra tempor mauris blandit in vel nulla nulla. Netus tellus ut sit praesent massa id est. Ac feugiat odio diam in. Mi iaculis ut dui duis amet sed a lorem faucibus.</p>
      <Button class="mb-12">Começar</Button>

      <p class="text-2xl font-black mb-6">Conteúdo</p>

      <div class="p-4 bg-gray-100 rounded-lg mb-12">
        <Accordion type="single" class="w-full" collapsible :default-value="defaultValue">
          <AccordionItem v-for="item in accordionItems" :key="item.value" :value="item.value">
            <AccordionTrigger>{{ item.title }}</AccordionTrigger>
            <AccordionContent>
              {{ item.content }}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  </div>
</template>

<script setup>
  import Button from '@components/ui/button/Button.vue'
  import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
  import { useRouter } from 'vue-router';

  const accordionItems = [
    { value: 'item-1', title: 'Is it accessible?', content: 'Yes. It adheres to the WAI-ARIA design pattern.' },
    { value: 'item-2', title: 'Is it unstyled?', content: 'Yes. It\'s unstyled by default, giving you freedom over the look and feel.' },
    { value: 'item-3', title: 'Can it be animated?', content: 'Yes! You can use the transition prop to configure the animation.' },
  ];

  const router = useRouter();
  const goBack = () => { router.push('/'); };
</script>