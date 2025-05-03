<template>
  <div
    v-if="isVisible"
    class="pseudocode-display absolute right-0 bottom-0 h-full bg-white border border-left-black p-4 max-w-md"
  >
    <div class="text-sm font-medium text-slate-700 mb-2">Pseudocódigo</div>
    <pre class="text-xs font-mono text-slate-600 whitespace-pre-wrap">{{ pseudocode }}</pre>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true
  },
  operation: {
    type: String,
    default: ''
  },
  method: {
    type: String,
    default: 'division'
  }
});

const pseudocode = computed(() => {
  if (!props.operation) return '';

  const methodPseudocode = {
    division: `
function divisionHash(key, tableSize):
    return key % tableSize
`,
    multiplication: `
function multiplicationHash(key, tableSize):
    A = 0.6180339887  # Golden ratio
    return floor(tableSize * ((key * A) % 1))
`,
    midSquare: `
function midSquareHash(key, tableSize):
    squared = key * key
    mid = floor(length(squared) / 2)
    midDigits = substring(squared, mid-1, mid+1)
    return parseInt(midDigits) % tableSize
`,
    folding: `
function foldingHash(key, tableSize):
    keyStr = toString(key)
    sum = 0
    for i = 0 to length(keyStr) step 2:
        part = substring(keyStr, i, i+2)
        sum += parseInt(part)
    return sum % tableSize
`,
    cryptographic: `
function cryptographicHash(key, tableSize):
    hash = 0
    keyStr = toString(key)
    for i = 0 to length(keyStr):
        char = charCodeAt(keyStr, i)
        hash = ((hash << 5) - hash) + char
        hash = hash & hash
    return abs(hash) % tableSize
`,
    universal: `
function universalHash(key, a, b, p, tableSize):
    return ((a * key + b) % p) % tableSize
`,
    perfect: `
function perfectHash(keys, tableSize):
    uniqueHashes = new Set()
    hashTable = new Array(tableSize)
    for key in keys:
        hash = cryptographicHash(key)
        while uniqueHashes.has(hash):
            hash = (hash + 1) % tableSize
        uniqueHashes.add(hash)
        hashTable[hash] = key
    return hashTable
`
  };

  const operationPseudocode = {
    insert: `
function insert(key, value, method):
    hash = ${props.method}Hash(key, tableSize)
    newNode = new Node(key, value)
    if hashTable[hash] is null:
        hashTable[hash] = newNode
    else:
        current = hashTable[hash]
        while current.next is not null:
            current = current.next
        current.next = newNode
`,
    remove: `
function remove(key, method):
    hash = ${props.method}Hash(key, tableSize)
    current = hashTable[hash]
    prev = null
    while current is not null:
        if current.key == key:
            if prev is null:
                hashTable[hash] = current.next
            else:
                prev.next = current.next
            return
        prev = current
        current = current.next
`,
    search: `
function search(key, method):
    hash = ${props.method}Hash(key, tableSize)
    current = hashTable[hash]
    while current is not null:
        if current.key == key:
            return current
        current = current.next
    return null
`
  };

  return methodPseudocode[props.method] + '\n' + operationPseudocode[props.operation];
});
</script>

<style scoped>
.pseudocode-display {
  z-index: 50;
}
</style> 
