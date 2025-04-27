<template>
  <div 
    class="absolute top-0 w-[380px] h-full bg-white border-l border-black transition-all duration-300 ease-in-out z-10 cursor-default"
    :class="isVisible ? 'right-0' : '-right-[400px]'"
  >
    <div class="h-full flex flex-col">
      <div class="px-4 py-2 border-b border-black bg-white">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-semibold text-slate-800">Pseudocódigo</h3>
          <button 
            @click="$emit('update:isVisible', false)"
            class="p-1.5 rounded-lg hover:bg-slate-100 hover:text-slate-600 transition-colors duration-200"
          >
            <i class="pi pi-times text-sm" />
          </button>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto mt-4 mr-4">
        <pre class="font-mono text-base">
          <code class="language-javascript">
            <div
              v-for="(line, index) in pseudocode" 
              class="min-h-[1.8rem] flex items-center hover:bg-slate-50 cursor-default"
              :key="index" 
              :style="'padding-left: ' + getIndentation(line) + 'rem'"
            >
              <span class="whitespace-pre text-sm" v-html="highlightLine(line)"></span>
            </div>
          </code>
        </pre>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue';
  import hljs from 'highlight.js/lib/core';
  import javascript from 'highlight.js/lib/languages/javascript';
  import 'highlight.js/styles/github.css';

  hljs.registerLanguage('javascript', javascript);

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

  const getIndentation = (line) => {
    const baseIndent = 1;
    const spaces = line.match(/^\s*/)[0].length;
    return baseIndent + (spaces * 0.5);
  };

  const highlightLine = (line) => {
    const jsLine = line
      .replace(/função/g, 'function')
      .replace(/se/g, 'if')
      .replace(/senão/g, 'else')
      .replace(/retorna/g, 'return')
      .replace(/é nula/g, '=== null')
      .replace(/==/g, '===');
    
    return hljs.highlight(jsLine, { language: 'javascript' }).value;
  };

  watch(() => props.operation, (newOp) => {
    pseudocode.value = pseudocodeMap[newOp] || [];
  });
</script>

<style scoped>
  .whitespace-pre { white-space: pre; }

  :deep(.hljs) {
    background: transparent;
    padding: 0;
  }

  :deep(.hljs-keyword) { color: #d73a49; }
  :deep(.hljs-string) { color: #032f62; }
  :deep(.hljs-number) { color: #005cc5; }
  :deep(.hljs-operator) { color: #d73a49; }
</style> 
