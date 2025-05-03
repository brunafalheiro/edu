<template>
  <div class="w-full min-h-screen">
    <div class="w-full p-6 pt-20 mx-auto" style="height: calc(100vh - 120px)">
      <BackButton class="mb-6" text="Simulador de Hash Tables" :backFunction="goBack" />

      <div v-if="loadFactor" class="text-sm text-slate-600 mb-1 text-end">
        Fator de Carga: {{ loadFactor.toFixed(2) }}
      </div>
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
                    'bg-lavender-50': collisionMethod === 'open' ? slot !== null : slot?.length > 0,
                    'ring-1 ring-lavender': isSearchedValue && (collisionMethod === 'open' ? slot === valueToSearch : slot.includes(valueToSearch))
                  }">
                <div class="text-xs text-slate-500 mb-1 whitespace-nowrap">Índice {{ index }}</div>
                <div v-if="collisionMethod === 'open' || collisionMethod === 'none'" class="font-medium">
                  {{ slot !== null ? slot : '-' }}
                </div>
                <div v-else class="font-medium">
                  <div v-if="slot.length === 0">-</div>
                  <div v-else class="flex flex-col gap-1">
                    <div v-for="(value, i) in slot" :key="i" 
                         :class="{ 'text-lavender-600': isSearchedValue && value === valueToSearch }">
                      {{ value }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="flex flex-wrap w-full items-center justify-center my-8">
        <div class="bg-white border border-black shadow-[6px_6px_0_0_#000] rounded-xl p-6 w-fit mb-8 mr-4 min-w-fit">
          <div class="flex flex-wrap items-end gap-6">
            <div class="flex flex-col gap-1">
              <div class="text-xs font-medium text-slate-500">Tamanho</div>
              <NumberField v-model="newTableSize" 
                class="w-24 rounded-lg border border-slate-300" 
                :class="{ 
                  'ring-1 ring-red-500': showValidation && (!newTableSize || newTableSize < 1),
                  'opacity-50 cursor-not-allowed': !!hashTable
                }"
                :disabled="!!hashTable"
                @keyup.enter="initializeTable"
              >
                <NumberFieldContent>
                  <NumberFieldDecrement />
                  <NumberFieldInput />
                  <NumberFieldIncrement />
                </NumberFieldContent>
              </NumberField>
            </div>

            <div class="flex flex-col gap-1">
              <div class="text-xs font-medium text-slate-500">Função Hash</div>
              <select v-model="hashFunction" 
                class="w-48 h-9 rounded-lg border border-slate-300 px-3 text-sm"
                :class="{ 
                  'ring-1 ring-red-500': showValidation && !hashFunction,
                  'opacity-50 cursor-not-allowed': !!hashTable
                }"
                :disabled="!!hashTable"
              >
                <option value="" disabled>Selecione uma função</option>
                <option value="division">Método da Divisão</option>
                <option value="folding">Método da Dobra</option>
                <option value="multiplication">Método da Multiplicação</option>
              </select>
            </div>

            <div class="flex flex-col gap-1">
              <div class="text-xs font-medium text-slate-500">Método de Colisão</div>
              <select v-model="collisionMethod" 
                      class="w-48 h-9 rounded-lg border border-slate-300 px-3 text-sm"
                      :disabled="!!hashTable"
                      :class="{ 
                        'opacity-50 cursor-not-allowed': !!hashTable,
                        'ring-1 ring-red-500': showValidation && !collisionMethod
                      }">
                <option value="" disabled>Selecione um método</option>
                <option value="none">Sem Colisão</option>
                <option value="chaining">Encadeamento</option>
                <option value="open-linear">Endereçamento Aberto (Linear)</option>
                <option value="open-quadratic">Endereçamento Aberto (Quadrático)</option>
                <option value="open-double">Endereçamento Aberto (Duplo)</option>
              </select>
            </div>

            <Button
              @click="initializeTable" 
              class="h-9 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors duration-200 flex items-center justify-center"
              :disabled="!!hashTable"
            >
              Criar tabela
            </Button>
          </div>
        </div>

        <div class="bg-white border border-black shadow-[6px_6px_0_0_#000] rounded-xl p-6 w-fit mb-8 min-w-fit">
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
  import { ref, computed } from "vue";
  import { useRouter } from "vue-router";
  import { HashTableFunctions } from "@/tools/hashTableFunctions";

  const router = useRouter();
  const goBack = () => router.push("/");

  const tableSize = ref(null);
  const newTableSize = ref(null);
  const hashTable = ref(null);
  const valueToInsert = ref(null);
  const valueToSearch = ref(null);
  const hashFunction = ref('');
  const collisionMethod = ref('');
  const isSearchedValue = ref(false);
  const showValidation = ref(false);

  const loadFactor = computed(() => {
    if (!hashTable.value) return 0;
    return HashTableFunctions.getLoadFactor(hashTable.value, getCollisionType());
  });

  const getCollisionType = () => {
    if (collisionMethod.value === 'none') return 'none';
    return collisionMethod.value.startsWith('open') ? 'open' : 'chaining';
  };

  const getProbingMethod = () => {
    if (!collisionMethod.value.startsWith('open')) return 'linear';
    return collisionMethod.value.split('-')[1];
  };

  const validateInputs = () => {
    showValidation.value = true;
    return newTableSize.value && newTableSize.value > 0 && hashFunction.value && collisionMethod.value;
  };

  const initializeTable = () => {
    if (!validateInputs()) return;
    tableSize.value = newTableSize.value;
    hashTable.value = HashTableFunctions.createTable(tableSize.value, getCollisionType());
    showValidation.value = false;
  };

  const insertValue = () => {
    if (!hashTable.value || valueToInsert.value === null) return;
    HashTableFunctions.insert(
      hashTable.value, 
      valueToInsert.value, 
      hashFunction.value, 
      getCollisionType(),
      getProbingMethod()
    );
  };

  const searchValue = () => {
    if (!hashTable.value || valueToSearch.value === null) return;
    isSearchedValue.value = true;
    const found = HashTableFunctions.search(
      hashTable.value, 
      valueToSearch.value, 
      hashFunction.value, 
      getCollisionType(),
      getProbingMethod()
    );
    
    setTimeout(() => { isSearchedValue.value = false; }, 1000);
    return found;
  };

  const clearTable = () => {
    hashTable.value = null;
    valueToInsert.value = null;
    valueToSearch.value = null;
    tableSize.value = null;
    newTableSize.value = null;
    hashFunction.value = '';
    collisionMethod.value = '';
    showValidation.value = false;
  };
</script>

<style scoped>
  .bg-lavender-50 { background-color: #f5f3ff; }
  .ring-lavender-300 { --tw-ring-color: #c4b5fd; }
</style>
