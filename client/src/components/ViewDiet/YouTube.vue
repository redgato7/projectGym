<template>
  <panel title="Video">
    <youtube
      :video-id="youtubeId"
      :player-width="640"
      :player-height="360">
    </youtube>
  </panel>
</template>

<script>
export default {
  props: [
    'youtubeId'
  ]
}
</script>

<style scoped>

</style>
