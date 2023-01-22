<script setup lang="ts">
import { ref } from "vue";
import MInput from "./components/MInput.vue";

const text = ref("");
</script>

<template>
  {{ text }}
  <div style="width: 20rem">
    <MInput v-model="text" label-place-holder="teste" />
    <MInput v-model="text" place-holder="teste" />
  </div>
</template>

<style scoped></style>
