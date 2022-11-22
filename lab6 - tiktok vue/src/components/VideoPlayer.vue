<script setup>
 import { ref, reactive, onMounted } from 'vue';

 let src = ref('');
 let videos = reactive({videos: []});
 let animation = ref('u--slideDown');

    onMounted(() => {
        // let api_url = "https://app.fakejson.com/q/Dt6soyE2?token=J8LA1-xpV4FBoiU5vS0n4Q";
        let api_url = "https://toktik-lab6.netlify.app/tiktok.json";
        fetch(api_url)
            .then(response => response.json())
            .then(data => {
                src.value = data.videos[0].video;
                videos.videos = data.videos;
            });
   });
   
   const nextVideo = () => {

        animation.value = 'u--slideUp';
        setTimeout(() => {
            animation.value = 'u--slideUp';
        }, 1000);
        src.value = videos.videos[1].video;
       
   }





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

