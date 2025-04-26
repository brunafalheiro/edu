<template>
  <div class="absolute right-[-400px] top-0 w-[380px] h-full bg-white border-l border-black transition-all duration-300 ease-in-out z-10" :class="{ '!right-0': isVisible }">
    <div class="h-full flex flex-col">
      <div class="px-4 py-2 border-b border-black bg-white">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-semibold text-slate-800">Pseudocódigo</h3>
          <button 
            @click="$emit('update:isVisible', false)"
            class="p-1.5 rounded-lg hover:bg-slate-100 hover:text-slate-600 transition-colors duration-200"
          >
            <i class="pi pi-times text-sm"></i>
          </button>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto mt-4 mr-4">
        <div class="font-mono text-base">
          <div
            v-for="(line, index) in pseudocode" 
            :key="index" 
            class="min-h-[1.8rem] flex items-center hover:bg-slate-50 cursor-default"
            :style="{ paddingLeft: `${getIndentation(line)}rem` }"
          >
            <span class="whitespace-pre text-sm">{{ line.trim() }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  isVisible: Boolean,
  operation: String
});

const pseudocode = ref([]);
const pseudocodeMap = {
  insert: [
    'função inserirNó(árvore, valor)',
    '  se árvore é nula',
    '    retorna novo nó com valor',
    '  se valor < árvore.valor',
    '    árvore.esquerda = inserirNó(árvore.esquerda, valor)',
    '  senão se valor > árvore.valor',
    '    árvore.direita = inserirNó(árvore.direita, valor)',
    '  retorna árvore'
  ],
  remove: [
    'função removerNó(árvore, valor)',
    '  se árvore é nula',
    '    retorna nulo',
    '  se valor < árvore.valor',
    '    árvore.esquerda = removerNó(árvore.esquerda, valor)',
    '  senão se valor > árvore.valor',
    '    árvore.direita = removerNó(árvore.direita, valor)',
    '  senão',
    '    se nó não tem filhos',
    '      retorna nulo',
    '    se nó tem apenas um filho',
    '      retorna o filho',
    '    senão',
    '      encontra menor valor na subárvore direita',
    '      substitui valor do nó',
    '      remove o nó com menor valor',
    '  retorna árvore'
  ],
  search: [
    'função buscarNó(árvore, valor)',
    '  se árvore é nula',
    '    retorna nulo',
    '  se valor == árvore.valor',
    '    retorna árvore',
    '  se valor < árvore.valor',
    '    retorna buscarNó(árvore.esquerda, valor)',
    '  retorna buscarNó(árvore.direita, valor)'
  ]
};

// Função para calcular a indentação baseada no conteúdo da linha
const getIndentation = (line) => {
  const baseIndent = 1; // Indentação base para todas as linhas
  const spaces = line.match(/^\s*/)[0].length;
  return baseIndent + (spaces * 0.5); // Cada nível de indentação adiciona 0.5rem
};

watch(() => props.operation, (newOp) => {
  pseudocode.value = pseudocodeMap[newOp] || [];
});
</script>

<style scoped>
.whitespace-pre {
  white-space: pre;
}
</style> 
