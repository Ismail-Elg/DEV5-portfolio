<script setup>
 
</script>

<template>
   
  <div class="video-container">
    <div class="controls">
    <a @click.prevent="nextVideo" href="#" class="controls__next">⤸</a>    
    </div>
    <video :src="src" autoplay loop muted controls class="u--slideUp" :class="animation">
        Your browser does not support the video tag.
    </video>

  </div>
</template>

<style scoped>

</style>

