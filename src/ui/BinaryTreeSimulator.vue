<template>
  <div class="w-full flex justify-center">
    <div class="w-full p-12 pt-24" style="height: calc(100vh - 48px)">
      <Button class="mb-12" @click="goBack">Voltar</Button>
      <p class="text-2xl font-black mb-2">Simulador de Árvores Binárias</p>
      <Button @click="clearTree" class="w-40 mb-12">Limpar</Button>
      <div class="tree mb-8 viewer-container relative w-full">
        <div
          ref="zoomContainer"
          class="zoom-wrapper inline-block cursor-grabbing"
        >
          <TreeComponent v-if="tree" :tree="tree" />
        </div>
        <div class="absolute right-0">
          <div class="flex flex-col items-start">
            <p class="font-semibold mb-4 text-center">Gerar árvore aleatória</p>
            <div class="flex items-end w-min">
              <NumberField v-model="nodeAmount" class="mr-4">
                <Label class="text-sm">Qt de nós</Label>
                <NumberFieldContent>
                  <NumberFieldDecrement />
                  <NumberFieldInput />
                  <NumberFieldIncrement />
                </NumberFieldContent>
              </NumberField>
              <Button @click="generateRandomTree" class="w-40">Gerar</Button>
            </div>
          </div>


          <div class="flex flex-col items-start">
            <p class="font-semibold mb-4 text-center">Criar árvore</p>
            <div class="flex items-end w-min">
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
          </div>


          <div class="flex flex-col items-start">
            <p class="font-semibold mb-4 text-center">Adicionar nó</p>
            <div class="flex items-end w-min">
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
          </div>


          <div class="flex flex-col items-start">
            <p class="font-semibold mb-4 text-center">Remover nó</p>
            <div class="flex items-end w-min">
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
          </div>


          <div class="flex flex-col items-start">
            <p class="font-semibold mb-4 text-center">Buscar nó</p>
            <div class="flex items-end w-min">
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { TreeFunctions } from "@tools/treeFunctions.js";
import { ref, watch } from "vue";
import { Label } from "@/components/ui/label";
import Separator from "@/components/ui/separator/Separator.vue";
import Button from "@components/ui/button/Button.vue";
import TreeComponent from "@/components/ui/TreeComponent/TreeComponent.vue";
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
const rootValue = ref(null);
const nodeToBeSearched = ref(null);
const nodeToBeRemoved = ref(null);
const nodeAmount = ref(null);

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
  height: calc(100% - 160px);
  overflow: hidden;
  background: #f9f9f9;

  .zoom-wrapper:active {
    cursor: grabbing;
  }
}
</style>
