<template>
  <div class="w-full min-h-screen">
    <div class="w-full p-6 pt-20 mx-auto" style="height: calc(100vh - 120px)">
      <BackButton class="mb-6" text="Simulador de Hash Tables" :backFunction="goBack" />

      <div class="hash-table-viewer bg-white rounded-xl border border-black mb-8 relative">
        <div v-if="!hashTable" class="flex flex-col items-center justify-center h-full text-slate-400">
          <i class="pi pi-table text-4xl mb-2"></i>
          <p class="text-sm">Nenhuma tabela hash criada. Utilize os controles abaixo para começar.</p>
        </div>
        <div v-else class="p-4">
          <HashTableComponent :hashTable="hashTable" />
        </div>
        
        <PseudocodeDisplay 
          v-model:is-visible="showPseudocode"
          :operation="currentOperation"
          :method="selectedMethod"
        />
        
        <button 
          @click="showPseudocode = !showPseudocode"
          class="absolute right-4 top-4 p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors duration-200"
        >
          <i class="pi pi-code text-sm"></i>
        </button>
      </div>

      <div class="bg-white border border-black rounded-xl shadow-[6px_6px_0_0_#000] p-6 w-fit mx-auto">
        <div class="flex flex-wrap items-end gap-8">
          <div class="flex flex-col gap-1">
            <div class="text-xs font-medium text-slate-500">Método de Hashing</div>
            <select 
              v-model="selectedMethod" 
              class="w-48 p-2 border border-gray-300 rounded-lg bg-white"
            >
              <option value="division">Division Method</option>
              <option value="multiplication">Multiplication Method</option>
              <option value="midSquare">Mid-Square Method</option>
              <option value="folding">Folding Method</option>
              <option value="cryptographic">Cryptographic Hash</option>
              <option value="universal">Universal Hashing</option>
              <option value="perfect">Perfect Hashing</option>
            </select>
          </div>

          <div class="flex flex-col gap-1">
            <div class="text-xs font-medium text-slate-500">Inserir</div>
            <div class="flex items-center gap-2">
              <NumberField v-model="keyToInsert" class="w-24" @keyup.enter="insertKey">
                <NumberFieldContent>
                  <NumberFieldDecrement />
                  <NumberFieldInput />
                  <NumberFieldIncrement />
                </NumberFieldContent>
              </NumberField>
              <Button @click="insertKey" class="w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors duration-200 flex items-center justify-center">
                <i class="pi pi-plus w-4 h-4" />
              </Button>
            </div>
          </div>

          <div class="flex flex-col gap-1">
            <div class="text-xs font-medium text-slate-500">Remover</div>
            <div class="flex items-center gap-2">
              <NumberField v-model="keyToRemove" class="w-24" @keyup.enter="removeKey">
                <NumberFieldContent>
                  <NumberFieldDecrement />
                  <NumberFieldInput />
                  <NumberFieldIncrement />
                </NumberFieldContent>
              </NumberField>
              <Button @click="removeKey" class="w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors duration-200 flex items-center justify-center">
                <i class="pi pi-minus w-4 h-4" />
              </Button>
            </div>
          </div>

          <div class="flex flex-col gap-1">
            <div class="text-xs font-medium text-slate-500">Buscar</div>
            <div class="flex items-center gap-2">
              <NumberField v-model="keyToSearch" class="w-24" @keyup.enter="searchKey">
                <NumberFieldContent>
                  <NumberFieldDecrement />
                  <NumberFieldInput />
                  <NumberFieldIncrement />
                </NumberFieldContent>
              </NumberField>
              <Button @click="searchKey" class="w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors duration-200 flex items-center justify-center">
                <i class="pi pi-search w-4 h-4" />
              </Button>
            </div>
          </div>

          <div class="flex flex-col gap-1">
            <div class="text-xs font-medium text-slate-500">Gerar tabela aleatória</div>
            <div class="flex items-center gap-2">
              <NumberField v-model="tableSize" class="w-24" @keyup.enter="generateRandomTable">
                <NumberFieldContent>
                  <NumberFieldDecrement />
                  <NumberFieldInput />
                  <NumberFieldIncrement />
                </NumberFieldContent>
              </NumberField>
              <Button @click="generateRandomTable" class="w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors duration-200 flex items-center justify-center">
                <Shuffle class="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Button @click="clearTable" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors duration-200 flex items-center justify-center">
            <i class="pi pi-trash w-4 h-4 mr-2" />
            Limpar
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { HashFunctions } from "@tools/hashFunctions.js";
import { ref, watch } from "vue";
import { Shuffle } from 'lucide-vue-next';
import Button from "@components/ui/button/Button.vue";
import HashTableComponent from "@/components/ui/HashTableComponent/HashTableComponent.vue";
import BackButton from "@/components/ui/BackButton.vue";
import PseudocodeDisplay from "@/components/ui/PseudocodeDisplay.vue";
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/components/ui/number-field";

const hashTable = ref(null);
const keyToInsert = ref(null);
const keyToSearch = ref(null);
const keyToRemove = ref(null);
const tableSize = ref(null);
const selectedMethod = ref('division');

const showPseudocode = ref(false);
const currentOperation = ref('');

const insertKey = async () => {
  if (!keyToInsert.value) return;
  currentOperation.value = 'insert';
  
  if (!hashTable.value) {
    hashTable.value = HashFunctions.createHashTable();
  }

  if (selectedMethod.value === 'perfect') {
    const keys = [];
    let current = hashTable.value[0];
    while (current) {
      keys.push(current.key);
      current = current.next;
    }
    keys.push(keyToInsert.value);
    hashTable.value = HashFunctions.perfectHashing(keys);
  } else {
    await HashFunctions.insert(hashTable.value, keyToInsert.value, keyToInsert.value, selectedMethod.value);
  }
};

const removeKey = async () => {
  if (!hashTable.value) return;
  currentOperation.value = 'remove';
  await HashFunctions.remove(hashTable.value, keyToRemove.value, selectedMethod.value);
};

const searchKey = async () => {
  if (!hashTable.value) return;
  currentOperation.value = 'search';
  await HashFunctions.search(hashTable.value, keyToSearch.value, selectedMethod.value);
};

const generateRandomTable = async () => {
  if (tableSize.value < 1 || tableSize.value > 20) return;
  hashTable.value = await HashFunctions.generateRandomHashTable(tableSize.value);
};

const clearTable = () => {
  hashTable.value = null;
  keyToInsert.value = null;
  keyToRemove.value = null;
  keyToSearch.value = null;
  tableSize.value = null;
};

const router = useRouter();
const goBack = () => router.push("/");
</script>

<style scoped lang="scss">
.hash-table-viewer {
  height: calc(100% - 96px);
  overflow: hidden;
}
</style>
