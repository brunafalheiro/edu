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
      
      <div class="p-8 bg-gray-100 w-[360px] rounded-lg ml-12">
        <div class="flex items-end mb-12">
          <NumberField v-model="nodeAmount">
            <Label>Quantidade de nós</Label>
            <NumberFieldContent>
              <NumberFieldDecrement />
              <NumberFieldInput />
              <NumberFieldIncrement />
            </NumberFieldContent>
          </NumberField>
          
          <Button @click="generateRandomTree">Gerar árvore</Button>
        </div>

        <div class="flex items-end mb-5">
          <NumberField v-model="rootValue">
            <Label>Valor da raiz</Label>
            <NumberFieldContent>
              <NumberFieldDecrement />
              <NumberFieldInput />
              <NumberFieldIncrement />
            </NumberFieldContent>
          </NumberField>
          <Button @click="setTree">Criar árvore</Button>
        </div>

        <div class="flex items-end mb-5">
          <NumberField v-model="nodeToBeAdded">
            <Label>Valor do nó</Label>
            <NumberFieldContent>
              <NumberFieldDecrement />
              <NumberFieldInput />
              <NumberFieldIncrement />
            </NumberFieldContent>
          </NumberField>

          <Button @click="insertNode">Adicionar Nó</Button>
        </div>
        
        <div class="flex items-end mb-5">
          <NumberField v-model="nodeToBeRemoved">
            <Label>Valor do nó</Label>
            <NumberFieldContent>
              <NumberFieldDecrement />
              <NumberFieldInput />
              <NumberFieldIncrement />
            </NumberFieldContent>
          </NumberField>

          <Button @click="removeNode">Remover Nó</Button>
        </div>

        <div class="flex items-end mb-5">
          <NumberField v-model="nodeToBeSearched">
            <Label>Valor do Nó</Label>
            <NumberFieldContent>
              <NumberFieldDecrement />
              <NumberFieldInput />
              <NumberFieldIncrement />
            </NumberFieldContent>
          </NumberField>

          <Button @click="searchNode">Buscar nó</Button>
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
  import Input from '@/components/ui/input/Input.vue';
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
