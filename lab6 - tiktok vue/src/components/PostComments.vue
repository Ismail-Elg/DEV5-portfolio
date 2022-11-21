<script setup>
 import { ref, reactive, onMounted } from 'vue';


 //create reactive list of comments
    let messages = reactive({messages: []});



    onMounted(() => {
        let api_url = "https://lab5-p379.onrender.com/api/v1/messages";
        fetch(api_url)
            .then(response => response.json())
            .then(data => {
                messages.messages = data;
            });   
   });
</script>

<template>
<div class="messages">
   <div v-for="message in messages.messages">
    <h3>{{message.user}}</h3>
    <p>{{message.text}}</p>
   </div>
</div>
<input type="text" v-model="newMessage" @keyup.enter="addMessage">
<button @click="addMessage">Add Message</button>
</template>

<style scoped>
  .messages{
    display: flexbox;
    height: 60vh;
    overflow-y: scroll;
  }
  .messages::-webkit-scrollbar {
  width: 10px;
  border-radius: 15px;
}
.messages::-webkit-scrollbar-track {
  background: #f1f1f1; 
  border-radius: 15px;
}
.messages::-webkit-scrollbar-thumb {
  background: #888; 
  border-radius: 15px;
}
.messages::-webkit-scrollbar-thumb:hover {
  background: #555; 
}


input{
  width: 65%;
  height: 5vh;
  border: none;
  border-radius: 5px;
  padding: 0 10px;
  font-size: 1.5rem;
  margin-top: 20px;
}

button{
  width: 25%;
  height: 5vh;
  border: none;
  border-radius: 5px;
  margin: 0px 20px;
  background-color: #00b4d8;
  color: white;
  cursor: pointer;
}
</style>
