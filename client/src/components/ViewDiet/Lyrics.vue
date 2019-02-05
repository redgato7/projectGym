<template>
  <panel title="Opis">
    <textarea
      readonly
      v-model="diet.opis"
    ></textarea>
  </panel>
</template>

<script>
export default {
  props: [
    'diet'
  ]
}
</script>

<style scoped>
textarea {
  width: 100%;
  min-height: 400px;
  border: none;
  height: auto;
  border-style: none;
  border-color: transparent;
  overflow: auto;
  padding: 20px;
}
</style>
