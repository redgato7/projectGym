<template>
  <panel title="Uwagi">
    <textarea
      readonly
      v-model="diet.tab"
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
  max-height: auto;
  border-style: none;
  border-color: transparent;
  overflow: auto;
  padding: 20px;
}
</style>
