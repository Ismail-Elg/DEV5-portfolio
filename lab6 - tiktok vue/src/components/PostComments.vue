<script setup>
 import { ref, onMounted } from 'vue';



    onMounted(() => {
        let api_url = "https://lab5-p379.onrender.com/api/v1/messages";
        fetch(api_url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
             

            });

      
   });
</script>

<template>
    <ul>
        <li>{{user}}</li>
        <li>{{text}}</li>
    </ul>
</template>

<style scoped>
  
</style>
