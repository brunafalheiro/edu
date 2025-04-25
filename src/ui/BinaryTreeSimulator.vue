<template>
  <div class="w-full flex justify-center">
    <div class="w-full p-12 pt-24" style="height: calc(100vh - 48px)">
      <BackButton class="mb-8" text="Simulador de Árvores Binárias" :backFunction="goBack" />

      <div class="tree viewer-container overflow-auto text-center flex justify-center w-full bg-gray-100 rounded-sm cursor-grab mb-6">
        <div ref="zoomContainer" class="zoom-wrapper inline-block cursor-grabbing">
          <TreeComponent v-if="tree" :tree="tree" />
        </div>
      </div>
      <div class="w-full h-12 flex items-center justify-center rounded-sm bg-gray-200">
        <NumberField v-model="nodeToBeAdded" class="w-20 mr-2">
          <NumberFieldContent>
            <NumberFieldDecrement />
            <NumberFieldInput />
            <NumberFieldIncrement />
          </NumberFieldContent>
        </NumberField>
        <Button @click="insertNode" class="w-8 h-8 mr-8">
          <i class="pi pi-plus w-4 h-4"></i>
        </Button>

        <NumberField v-model="nodeToBeRemoved" class="w-20 mr-2">
          <NumberFieldContent>
            <NumberFieldDecrement />
            <NumberFieldInput />
            <NumberFieldIncrement />
          </NumberFieldContent>
        </NumberField>
        <Button @click="removeNode" class="w-8 h-8 mr-8">
          <i class="pi pi-minus w-4 h-4"></i>
        </Button>

        <NumberField v-model="nodeToBeSearched" class="w-20 mr-2">
          <NumberFieldContent>
            <NumberFieldDecrement />
            <NumberFieldInput />
            <NumberFieldIncrement />
          </NumberFieldContent>
        </NumberField>
        <Button @click="searchNode" class="w-8 h-8 mr-8">
          <i class="pi pi-search w-4 h-4"></i>
        </Button>

        <NumberField v-model="nodeAmount" class="w-20 mr-2">
          <NumberFieldContent>
            <NumberFieldDecrement />
            <NumberFieldInput />
            <NumberFieldIncrement />
          </NumberFieldContent>
        </NumberField>

        <Button @click="generateRandomTree" class="w-8 h-8 mr-8">
          <Shuffle class="w-4 h-4" />
        </Button>

        <Button @click="clearTree" class="w-40">Limpar</Button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useRouter } from "vue-router";
  import { TreeFunctions } from "@tools/treeFunctions.js";
  import { ref, watch } from "vue";
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

  const insertNode = () => {
    if (!nodeToBeAdded.value) return;
    if (!tree.value) {
      TreeFunctions.createTree({ treeStore: tree, rootValue: nodeToBeAdded.value });
      return;
    }

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

  // Initialize panzoom on the tree component
  const zoomContainer = ref(null);
  const panzoomInstance = ref(null);

  watch(tree, (newVal) => {
    if (newVal && zoomContainer.value) {
      if (panzoomInstance.value) {
        panzoomInstance.value.dispose();
      }

      panzoomInstance.value = panzoom(zoomContainer.value, {
        smoothScroll: false,
        bounds: false,
        zoomDoubleClickSpeed: 1,
        minZoom: 0.2,
        maxZoom: 2,
      });
    }
  });
</script>

<style scoped lang="scss">
  .viewer-container {
    height: calc(100% - 96px);
    overflow: hidden;
  }
</style>
