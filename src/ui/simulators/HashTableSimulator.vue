<template>
  <div class="w-full min-h-screen">
    <div class="w-full p-6 pt-20 mx-auto" style="height: calc(100vh - 120px)">
      <BackButton class="mb-6" text="Simulador de Hash Tables" :backFunction="goBack" />

      <div class="bg-white border border-black shadow-[6px_6px_0_0_#000] rounded-xl w-full mx-auto" style="height: calc(100% - 120px)">
        <div v-if="!hashTable" class="flex flex-col items-center justify-center h-full text-gray-400">
          <i class="pi pi-table text-4xl mb-2"></i>
          <p class="text-sm">Nenhuma tabela hash criada. Defina o tamanho da tabela para começar.</p>
        </div>
        <div v-else class="overflow-y-auto h-full">
          <div class="p-6">
            <div class="grid gap-4" :style="{ 
              gridTemplateColumns: `repeat(auto-fill, minmax(120px, 1fr))`,
              gridAutoRows: 'minmax(80px, auto)'
            }">
              <div v-for="(slot, index) in hashTable" :key="index" 
                  class="border border-slate-300 rounded-lg p-4 text-center min-h-[80px] flex flex-col justify-center relative"
                  :class="{ 
                    'bg-lavender-50': slot !== null,
                    'ring-1 ring-lavender': isSearchedValue && slot === valueToSearch
                  }">
                <div class="text-xs text-slate-500 mb-1 whitespace-nowrap">Índice {{ index }}</div>
                <div class="font-medium">{{ slot !== null ? slot : '-' }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="flex w-full items-center justify-center my-8">
        <div class="bg-white border border-black shadow-[6px_6px_0_0_#000] rounded-xl p-6 w-fit mb-8 mr-4">
          <div class="flex flex-wrap items-end gap-8">
            <div class="flex flex-col gap-1">
              <div class="text-xs font-medium text-slate-500">Tamanho da Tabela</div>
              <div class="flex items-center gap-2">
                <NumberField v-model="newTableSize" class="w-24" @keyup.enter="initializeTable">
                  <NumberFieldContent>
                    <NumberFieldDecrement />
                    <NumberFieldInput />
                    <NumberFieldIncrement />
                  </NumberFieldContent>
                </NumberField>
                <Button @click="initializeTable" class="w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors duration-200 flex items-center justify-center">
                  <i class="pi pi-check w-4 h-4" />
                </Button>
              </div>
            </div>

            <div class="flex flex-col gap-1">
              <div class="text-xs font-medium text-slate-500">Função Hash</div>
              <select v-model="hashFunction" class="w-48 h-9 rounded-lg border border-slate-300 px-3 text-sm">
                <option value="division">Método da Divisão</option>
                <option value="folding">Método da Dobra</option>
                <option value="multiplication">Método da Multiplicação</option>
              </select>
            </div>
          </div>
        </div>

        <div class="bg-white border border-black shadow-[6px_6px_0_0_#000] rounded-xl p-6 w-fit mb-8">
          <div class="flex flex-wrap items-end gap-8">
            <div class="flex flex-col gap-1">
              <div class="text-xs font-medium text-slate-500">Inserir Valor</div>
              <div class="flex items-center gap-2">
                <NumberField v-model="valueToInsert" class="w-24" @keyup.enter="insertValue">
                  <NumberFieldContent>
                    <NumberFieldDecrement />
                    <NumberFieldInput />
                    <NumberFieldIncrement />
                  </NumberFieldContent>
                </NumberField>
                <Button @click="insertValue" class="w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors duration-200 flex items-center justify-center">
                  <i class="pi pi-plus w-4 h-4" />
                </Button>
              </div>
            </div>

            <div class="flex flex-col gap-1">
              <div class="text-xs font-medium text-slate-500">Buscar Valor</div>
              <div class="flex items-center gap-2">
                <NumberField v-model="valueToSearch" class="w-24" @keyup.enter="searchValue">
                  <NumberFieldContent>
                    <NumberFieldDecrement />
                    <NumberFieldInput />
                    <NumberFieldIncrement />
                  </NumberFieldContent>
                </NumberField>
                <Button @click="searchValue" class="w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors duration-200 flex items-center justify-center">
                  <i class="pi pi-search w-4 h-4" />
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
  </div>
</template>

<script setup>
  import BackButton from "@/components/ui/BackButton.vue";
  import {
    NumberField,
    NumberFieldContent,
    NumberFieldDecrement,
    NumberFieldIncrement,
    NumberFieldInput,
  } from "@/components/ui/number-field";
  import Button from "@components/ui/button/Button.vue";
  import { ref } from "vue";
  import { useRouter } from "vue-router";

  const router = useRouter();
  const goBack = () => router.push("/");

  const tableSize = ref(null);
  const newTableSize = ref(null);
  const hashTable = ref(null);
  const valueToInsert = ref(null);
  const valueToSearch = ref(null);
  const hashFunction = ref('division');
  const isSearchedValue = ref(false);

  const initializeTable = () => {
    if (!newTableSize.value || newTableSize.value < 1) return;
    tableSize.value = newTableSize.value;
    hashTable.value = Array(tableSize.value).fill(null);
  };

  const hash = (value) => {
    switch (hashFunction.value) {
      case 'division':
        return value % tableSize.value;
      case 'folding':
        return String(value).split('').reduce((sum, digit) => sum + parseInt(digit), 0) % tableSize.value;
      case 'multiplication':
        const A = 0.6180339887;
        return Math.floor(tableSize.value * ((value * A) % 1));
      default:
        return 0;
    }
  };

  const insertValue = () => {
    if (!hashTable.value || valueToInsert.value === null) return;
    const index = hash(valueToInsert.value);
    hashTable.value[index] = valueToInsert.value;
  };

  const searchValue = () => {
    if (!hashTable.value || valueToSearch.value === null) return;
    isSearchedValue.value = true;
    const index = hash(valueToSearch.value);
    const found = hashTable.value[index] === valueToSearch.value;
    
    setTimeout(() => { isSearchedValue.value = false; }, 1000);
    return found;
  };

  const clearTable = () => {
    hashTable.value = null;
    valueToInsert.value = null;
    valueToSearch.value = null;
    tableSize.value = null;
    newTableSize.value = null;
  };
</script>

<style scoped>
  .bg-lavender-50 { background-color: #f5f3ff; }
  .ring-lavender-300 { --tw-ring-color: #c4b5fd; }
</style>
