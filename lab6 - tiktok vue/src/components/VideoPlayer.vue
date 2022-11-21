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

.video-container{
    background-color: black;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    padding: 10%;
    position: relative;
}
.video-container video{
    
    height: 100%;
    object-fit: cover;

}
.controls{
    position: absolute;
   
    top: 50%;
    right: 0%;
    width: 40px;
    height: 40px;
    background-color: gray;
    transform: translate(-50%, -50%);
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    cursor: pointer;


}
.controls a{
    text-decoration: none;
    color: white;
    font-size: 2rem;
   
}
</style>

