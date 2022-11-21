<script setup>
 import { ref, reactive, onMounted } from 'vue';


    let messages = reactive({messages: []});

    onMounted(() => {
        let api_url = "https://lab5-p379.onrender.com/api/v1/messages";
        fetch(api_url)
            .then(response => response.json())
            .then(data => {
                messages.messages = data;
            });   
   });

   const addComments = () =>{
    if (document.getElementById("message").value == ""){
        document.getElementById("message").style.border = "2px solid red";
        document.getElementById("message").placeholder = "Missing comment";
    }
    else{
        document.getElementById("message").style.border = "2px solid green";
        document.getElementById("message").placeholder = "Add a comment";
        let api = "https://lab5-p379.onrender.com/api/v1/messages";
    let user = "SpongeBob";
    let text = document.getElementById("message").value;
    let data = {user, text};
    fetch(api, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    messages.messages.push(data);

    document.getElementById("message").value = "";
    }
   }

</script>

<template>
<div class="messages">
<div v-for="message in messages.messages.slice().reverse()" >
    <h3>{{message.user}}</h3>
    <p>{{message.text}}</p>
   </div>
</div>
    <input type="text" id="message" placeholder="Add a comment">
    <button @click.prevent="addComments">Send</button>
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
  font-size: 1.5rem;
  background-color: #00b4d8;
  color: white;
  cursor: pointer;
}
</style>
