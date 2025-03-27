<template>
  <div class="w-full flex justify-center">
    <div class="w-full min-h-screen flex p-12 pt-24">
      <div class="w-full">
        <Button class="mb-12" @click="goBack">Voltar</Button>
        <p class="text-2xl font-black mb-12">Simulador de Árvores Binárias</p>

        <div class="tree-container">
          <div class="tree">
            <TreeComponent v-if="tree" :tree="tree" />
          </div>
        </div>
      </div>
      
      <div class="p-8 bg-gray-50 w-[360px] rounded-lg ml-12">
        <p class="font-semibold mb-2">Gerar árvore aleatória</p>
        <div class="flex items-end mb-8">
          <NumberField v-model="nodeAmount" class="mr-4">
            <Label class="text-sm">Quantidade de nós</Label>
            <NumberFieldContent>
              <NumberFieldDecrement />
              <NumberFieldInput />
              <NumberFieldIncrement />
            </NumberFieldContent>
          </NumberField>
          
          <Button @click="generateRandomTree" class="w-40">Gerar</Button>
        </div>

        <p class="font-semibold mb-2">Criar árvore</p>
        <div class="flex items-end mb-8">
          <NumberField v-model="rootValue" class="mr-4">
            <Label class="text-sm">Valor da raiz</Label>
            <NumberFieldContent>
              <NumberFieldDecrement />
              <NumberFieldInput />
              <NumberFieldIncrement />
            </NumberFieldContent>
          </NumberField>
          <Button @click="setTree" class="w-40">Criar</Button>
        </div>

        <p class="font-semibold mb-2">Adicionar nó</p>
        <div class="flex items-end mb-8">
          <NumberField v-model="nodeToBeAdded" class="mr-4">
            <Label class="text-sm">Valor do nó</Label>
            <NumberFieldContent>
              <NumberFieldDecrement />
              <NumberFieldInput />
              <NumberFieldIncrement />
            </NumberFieldContent>
          </NumberField>

          <Button @click="insertNode" class="w-40">Adicionar</Button>
        </div>
        
        <p class="font-semibold mb-2">Remover nó</p>
        <div class="flex items-end mb-8">
          <NumberField v-model="nodeToBeRemoved" class="mr-4">
            <Label class="text-sm">Valor do nó</Label>
            <NumberFieldContent>
              <NumberFieldDecrement />
              <NumberFieldInput />
              <NumberFieldIncrement />
            </NumberFieldContent>
          </NumberField>

          <Button @click="removeNode" class="w-40">Remover</Button>
        </div>
  
        <p class="font-semibold mb-2">Buscar nó</p>
        <div class="flex items-end mb-12">
          <NumberField v-model="nodeToBeSearched" class="mr-4">
            <Label class="text-sm">Valor do Nó</Label>
            <NumberFieldContent>
              <NumberFieldDecrement />
              <NumberFieldInput />
              <NumberFieldIncrement />
            </NumberFieldContent>
          </NumberField>

          <Button @click="searchNode" class="w-40">Buscar</Button>
        </div>
        
        <Button @click="clearTree" class="w-full">Limpar</Button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router';
  import { TreeFunctions } from '@tools/treeFunctions.js';
  import { ref } from 'vue';
  import Button from '@components/ui/button/Button.vue';
  import TreeComponent from '@/components/ui/TreeComponent/TreeComponent.vue';
  import { Label } from '@/components/ui/label'
  import {
    NumberField,
    NumberFieldContent,
    NumberFieldDecrement,
    NumberFieldIncrement,
    NumberFieldInput,
  } from '@/components/ui/number-field'

  let tree = ref(null);
  let nodeToBeAdded = ref(null);
  let rootValue = ref(null);
  let nodeToBeSearched = ref(null);
  let nodeToBeRemoved = ref(null);
  let nodeAmount = ref(null);

  const setTree = () => {
    tree.value = TreeFunctions.createTree(rootValue.value);
  };

  const insertNode = () => {
    if (!tree.value) return;
    TreeFunctions.insertNode(tree.value, nodeToBeAdded.value);
  };

  const removeNode = () => {
    if (!tree.value) return;
    TreeFunctions.removeNode(tree.value, nodeToBeRemoved.value);
  };

  const searchNode = async () => {
    if (!tree.value) return;
    await TreeFunctions.searchNode(tree.value, nodeToBeSearched.value);
  };

  const generateRandomTree = () => {
    tree.value = TreeFunctions.generateRandomTree(nodeAmount.value);
  };

  const clearTree = () => {
    tree.value = null;
    nodeToBeAdded.value = null;
    nodeToBeRemoved.value = null;
    rootValue.value = null;
    nodeToBeSearched.value = null;
    nodeAmount.value = null;
  };

  const router = useRouter();
  const goBack = () => { router.push('/'); };
</script>
