<template>
  <div class="hash-table-container">
    <div class="hash-table">
      <div v-for="(bucket, index) in hashTable" :key="index" class="bucket">
        <div class="bucket-index">{{ index }}</div>
        <div class="bucket-content">
          <div v-if="!bucket" class="empty-slot">
            <i class="pi pi-circle-off text-slate-300"></i>
          </div>
          <div v-else class="chain">
            <div
              v-for="(node, nodeIndex) in getChainNodes(bucket)"
              :key="nodeIndex"
              class="node"
              :class="{ 
                'visiting': node.isBeingVisited,
                'found': node.found
              }"
            >
              <div class="node-content">
                <span class="key">{{ node.key }}</span>
                <span class="value">{{ node.value }}</span>
              </div>
              <div v-if="node.next" class="chain-arrow">
                <i class="pi pi-arrow-right"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  hashTable: {
    type: Array,
    required: true
  }
});

const getChainNodes = (node) => {
  const nodes = [];
  let current = node;
  while (current) {
    nodes.push(current);
    current = current.next;
  }
  return nodes;
};
</script>

<style lang="scss">
.hash-table-container {
  @apply w-full overflow-auto p-4;
  
  .hash-table {
    @apply grid grid-cols-5 gap-4;
    
    .bucket {
      @apply border border-gray-300 rounded-lg overflow-hidden;
      
      .bucket-index {
        @apply bg-gray-100 text-center py-1 text-sm font-medium border-b border-gray-300;
      }
      
      .bucket-content {
        @apply min-h-[100px] p-2;
        
        .empty-slot {
          @apply h-full flex items-center justify-center;
        }
        
        .chain {
          @apply space-y-2;
          
          .node {
            @apply border border-gray-300 rounded p-2 transition-all duration-500;
            
            &.visiting {
              @apply border-blue-500 bg-blue-50;
            }
            
            &.found {
              @apply border-green-500 bg-green-50;
            }
            
            .node-content {
              @apply flex justify-between items-center;
              
              .key {
                @apply font-medium;
              }
              
              .value {
                @apply text-gray-500;
              }
            }
            
            .chain-arrow {
              @apply text-center text-gray-400;
            }
          }
        }
      }
    }
  }
}
</style> 