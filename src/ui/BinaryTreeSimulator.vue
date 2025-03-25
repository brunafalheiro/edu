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
        <div class="flex mb-5">
          <Input type="number" placeholder="Nó" v-model="rootValue" class="w-full mr-4"></Input>
          <Button @click="setTree" class="w-[96px]">Criar árvore</Button>
        </div>

        <div class="flex mb-5">
          <Input type="number" placeholder="Nó" v-model="nodeValue" class="w-full mr-4"></Input>
          <Button @click="insertNode" class="w-[96px]">Adicionar Nó</Button>
        </div>

        <div class="flex mb-5">
          <Input type="number" placeholder="Nó" v-model="nodeToBeSearched" class="w-full mr-4"></Input>
          <Button @click="searchNode" class="w-[96px]">Buscar nó</Button>
        </div>
        
        <div class="flex mb-12">
          <Input type="number" placeholder="Qt Nós" v-model="nodeAmount" class="w-full mr-4"></Input>
          <Button @click="generateRandomTree" class="w-[96px]">Gerar árvore aleatória</Button>
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

  let tree = ref(null);
  let nodeValue = ref(null);
  let rootValue = ref(null);
  let nodeToBeSearched = ref(null);
  let nodeAmount = ref(null);

  const setTree = () => {
    tree.value = TreeFunctions.createTree(rootValue.value);
    console.log(tree.value);
  };

  const insertNode = () => {
    if (!tree.value) {
      console.log('Árvore não criada');
      return;
    }
    TreeFunctions.insertNode(tree.value, nodeValue.value);
  };

  const searchNode = async () => {
    if (!tree.value) {
      console.log('Árvore não criada');
      return;
    }

    const searchedNode = await TreeFunctions.searchNode(tree.value, nodeToBeSearched.value);
    console.log(searchedNode);
  };

  const generateRandomTree = () => {
    tree.value = TreeFunctions.generateRandomTree(nodeAmount.value);
  };

  const clearTree = () => {
    tree.value = null;
    nodeValue.value = null;
    rootValue.value = null;
    nodeToBeSearched.value = null;
    nodeAmount.value = null;
  };

  const router = useRouter();
  const goBack = () => { router.push('/'); };
</script>
