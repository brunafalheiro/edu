<template>
  <div class="absolute right-[-300px] top-0 w-[280px] h-full bg-white border-l border-slate-200 transition-all duration-300 ease-in-out z-10" :class="{ '!right-0': isVisible }">
    <div class="p-4 h-full overflow-y-auto">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-sm font-medium text-slate-700">Pseudocódigo</h3>
        <button 
          @click="$emit('update:isVisible', false)"
          class="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors duration-200"
        >
          <i class="pi pi-times text-sm"></i>
        </button>
      </div>
      <div class="font-mono">
        <pre
          v-for="(line, index) in pseudocode" :key="index" 
          :class="{ 'text-pink-500 font-medium': currentLine === index }"
          class="text-xs text-slate-600 py-0.5 px-2 whitespace-pre transition-colors duration-200"
        >
          {{ line }}
        </pre>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue';

  const props = defineProps({
    isVisible: Boolean,
    currentLine: Number,
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

  watch(() => props.operation, (newOp) => {
    pseudocode.value = pseudocodeMap[newOp] || [];
  });
</script> 
