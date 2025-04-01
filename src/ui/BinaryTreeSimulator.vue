<template>
  <div class="w-full flex justify-center">
    <div class="w-full p-12 pt-24" style="height: calc(100vh - 48px)">
      <Button class="mb-12" @click="goBack">Voltar</Button>
      <p class="text-2xl font-black mb-2">Simulador de Árvores Binárias</p>
      <Button @click="clearTree" class="w-40 mb-12">Limpar</Button>

      <div
        class="tree mb-8"
        style="
          border: 1px solid red;
          height: calc(100% - 340px) !important;
          overflow: auto;
        "
      >
        <TreeComponent v-if="tree" :tree="tree" />
      </div>

      <div class="flex items-center justify-center">
        <div class="flex flex-wrap justify-center gap-8 w-fit p-6 rounded-lg bg-gray-50">
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

          <Separator orientation="vertical" class="h-auto" />

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

          <Separator orientation="vertical" class="h-auto" />

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

          <Separator orientation="vertical" class="h-auto" />

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

          <Separator orientation="vertical" class="h-auto" />

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
import { ref } from "vue";
import { Label } from "@/components/ui/label";
import Separator from "@/components/ui/separator/Separator.vue";
import Button from "@components/ui/button/Button.vue";
import TreeComponent from "@/components/ui/TreeComponent/TreeComponent.vue";
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/components/ui/number-field";

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
const goBack = () => router.push("/");
</script>
