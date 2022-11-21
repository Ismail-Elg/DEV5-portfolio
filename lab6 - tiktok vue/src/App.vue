<script setup>
import VideoPlayer from './components/VideoPlayer.vue';
import PostDetails from './components/PostDetails.vue';
import PostComments from './components/PostComments.vue';
</script>

<template>
<div class="container">
  <div class="video"> <video-player></video-player></div>
  <div class="title"> <post-details></post-details></div>
  <div class="comments"><post-comments></post-comments></div>
</div>
</template>

<style scoped>
.container {  display: grid;
  grid-template-columns: 8fr 4fr;
  grid-template-rows: 1fr 4fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    "video title"
    "video comments";
}
.video { grid-area: video; }

.title { grid-area: title;  padding: 10%; border-bottom: 1px solid rgba(128, 128, 128, 0.35);}

.comments { grid-area: comments; padding: 10%; }
</style>
