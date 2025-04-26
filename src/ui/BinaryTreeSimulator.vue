<template>
  <div class="w-full min-h-screen bg-slate-50">
    <div class="w-full p-6 pt-20 mx-auto" style="height: calc(100vh - 120px)">
      <BackButton class="mb-6" text="Simulador de Árvores Binárias" :backFunction="goBack" />

      <div class="tree viewer-container overflow-auto text-center flex justify-center w-full bg-white rounded-xl shadow-sm cursor-grab mb-8">
        <div v-if="!tree" class="flex flex-col items-center justify-center h-full text-slate-400">
          <i class="pi pi-tree text-4xl mb-2"></i>
          <p class="text-sm">Nenhuma árvore criada. Use os controles abaixo para começar.</p>
        </div>
        <div v-else ref="zoomContainer" class="zoom-wrapper inline-block cursor-grabbing">
          <TreeComponent :tree="tree" />
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm p-6 w-fit mx-auto">
        <div class="flex flex-wrap items-end gap-8">
          <div class="flex flex-col gap-1">
            <div class="text-xs font-medium text-slate-500">Inserir Nó</div>
            <div class="flex items-center gap-2">
              <NumberField v-model="nodeToBeAdded" class="w-24" @keyup.enter="insertNode">
                <NumberFieldContent>
                  <NumberFieldDecrement />
                  <NumberFieldInput />
                  <NumberFieldIncrement />
                </NumberFieldContent>
              </NumberField>
              <Button @click="insertNode" class="w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors duration-200 flex items-center justify-center">
                <i class="pi pi-plus w-4 h-4"></i>
              </Button>
            </div>
          </div>

          <div class="flex flex-col gap-1">
            <div class="text-xs font-medium text-slate-500">Remover Nó</div>
            <div class="flex items-center gap-2">
              <NumberField v-model="nodeToBeRemoved" class="w-24" @keyup.enter="removeNode">
                <NumberFieldContent>
                  <NumberFieldDecrement />
                  <NumberFieldInput />
                  <NumberFieldIncrement />
                </NumberFieldContent>
              </NumberField>
              <Button @click="removeNode" class="w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors duration-200 flex items-center justify-center">
                <i class="pi pi-minus w-4 h-4"></i>
              </Button>
            </div>
          </div>

          <div class="flex flex-col gap-1">
            <div class="text-xs font-medium text-slate-500">Buscar Nó</div>
            <div class="flex items-center gap-2">
              <NumberField v-model="nodeToBeSearched" class="w-24" @keyup.enter="searchNode">
                <NumberFieldContent>
                  <NumberFieldDecrement />
                  <NumberFieldInput />
                  <NumberFieldIncrement />
                </NumberFieldContent>
              </NumberField>
              <Button @click="searchNode" class="w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors duration-200 flex items-center justify-center">
                <i class="pi pi-search w-4 h-4"></i>
              </Button>
            </div>
          </div>

          <div class="flex flex-col gap-1">
            <div class="text-xs font-medium text-slate-500">Gerar Árvore Aleatória</div>
            <div class="flex items-center gap-2">
              <NumberField v-model="nodeAmount" class="w-24" @keyup.enter="generateRandomTree">
                <NumberFieldContent>
                  <NumberFieldDecrement />
                  <NumberFieldInput />
                  <NumberFieldIncrement />
                </NumberFieldContent>
              </NumberField>
              <Button @click="generateRandomTree" class="w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors duration-200 flex items-center justify-center">
                <Shuffle class="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Button @click="clearTree" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors duration-200 flex items-center justify-center">
            <i class="pi pi-trash w-4 h-4 mr-2"></i>
            Limpar
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useRouter } from "vue-router";
  import { TreeFunctions } from "@tools/treeFunctions.js";
  import { ref, watch, onMounted } from "vue";
  import { Shuffle } from 'lucide-vue-next';
  import Button from "@components/ui/button/Button.vue";
  import TreeComponent from "@/components/ui/TreeComponent/TreeComponent.vue";
  import BackButton from "@/components/ui/BackButton.vue";
  import panzoom from "panzoom";
  import {
    NumberField,
    NumberFieldContent,
    NumberFieldDecrement,
    NumberFieldIncrement,
    NumberFieldInput,
  } from "@/components/ui/number-field";

  const tree = ref(null);
  const nodeToBeAdded = ref(null);
  const nodeToBeSearched = ref(null);
  const nodeToBeRemoved = ref(null);
  const nodeAmount = ref(null);

  const insertNode = async () => {
    if (!nodeToBeAdded.value) return;
    if (!tree.value) {
      TreeFunctions.createTree({ treeStore: tree, rootValue: nodeToBeAdded.value });
      return;
    }

    await TreeFunctions.insertNode(tree.value, nodeToBeAdded.value);
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
    if (nodeAmount.value < 1 || nodeAmount.value > 100) return;
    tree.value = TreeFunctions.generateRandomTree(nodeAmount.value);
  };

  const clearTree = () => {
    tree.value = null;
    nodeToBeAdded.value = null;
    nodeToBeRemoved.value = null;
    nodeToBeSearched.value = null;
    nodeAmount.value = null;
  };

  const router = useRouter();
  const goBack = () => router.push("/");

  const zoomContainer = ref(null);
  const panzoomInstance = ref(null);

  const initPanzoom = () => {
    if (panzoomInstance.value) { panzoomInstance.value.dispose(); }

    if (zoomContainer.value) {
      panzoomInstance.value = panzoom(zoomContainer.value, {
        smoothScroll: false,
        bounds: false,
        zoomDoubleClickSpeed: 1,
        minZoom: 0.2,
        maxZoom: 2,
      });
    }
  };

  watch(tree, (newVal) => {
    if (!newVal) return;
    setTimeout(initPanzoom, 0);
  });

  onMounted(() => {
    if (!tree.value) return;
    initPanzoom();
  });
</script>

<style scoped lang="scss">
  .viewer-container {
    height: calc(100% - 96px);
    overflow: hidden;
  }

  .zoom-wrapper { transform-origin: center center; }
</style>
