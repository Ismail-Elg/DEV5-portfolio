<script setup>
 import { ref, onMounted } from 'vue';

 let username = ref('');
 let description = ref('');

    onMounted(() => {
      // let api_url = "https://app.fakejson.com/q/Dt6soyE2?token=J8LA1-xpV4FBoiU5vS0n4Q";
      let api_url = "https://toktik-lab6.netlify.app/tiktok.json";
        fetch(api_url)
            .then(response => response.json())
            .then(data => {
                username.value = data.videos[0].username;
                description.value = data.videos[0].description;
        
            });

      
   });
</script>

<template>
  <div class="post-details">
    <h3>{{username}}</h3>
    <p>{{description}}</p>
   </div>
</template>