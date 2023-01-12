

const ACCESS_TOKEN = "LIHMDFF4XAXPDO3J72DG46LV666I6SIL"
const CLIENT_TOKEN = "LIHMDFF4XAXPDO3J72DG46LV666I6SIL"
const axios = require("axios")

const Wit = require('node-wit').Wit;
const client = new Wit({accessToken: ACCESS_TOKEN});

async function sendAudioToWit(audioFile) {
    // Set the API endpoint and your access token
    const apiEndpoint = 'https://api.wit.ai/speech';
    const accessToken = 'YOUR_ACCESS_TOKEN';
  
    // Set the headers for the API request
    const headers = {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'audio/mpeg3',
    };
  
    // Set the body of the request to be the audio file
    const body = new FormData();
    body.append('file', audioFile);
  
    // Send the audio data to the Wit.ai API
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: headers,
      body: body,
    });
  
    // Print the transcript of the speech in the audio
    console.log(await response.json().text);
  }



  function witCall(){
    axios.get(`https://api.wit.ai/message?q=${encodeURIComponent("What is the temperature in here?")}`, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`
    }
  })
  .then(response => {
    // Do something with the response
    console.log(response.data);
  })
  .catch(error => {
    // Handle error
    console.log("Inside Error")
    console.error(error);
  });
  }