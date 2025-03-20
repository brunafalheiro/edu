<template>
  <ul>
    <li>
      <a href="#" :class="{ visiting: tree.isBeingVisited, found: tree.found }">{{ tree.value }}</a>
      <ul v-if="tree.left || tree.right">
        <li v-if="tree.left">
          <TreeComponent :tree="tree.left" />
        </li>
        <li v-if="tree.right">
          <TreeComponent :tree="tree.right" />
        </li>
      </ul>
    </li>
  </ul>
</template>

<script setup>
  import { defineProps } from 'vue';

  defineProps({ tree: Object });
</script>

<style>@import 'TreeComponent.css'</style>
