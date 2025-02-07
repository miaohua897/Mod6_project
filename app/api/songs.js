fetch('/api/songs/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "title":"Eye of the Tiger",
        "audio_url":"https://testbucketbymiaohua.s3.us-west-1.amazonaws.com/91c8dd721bf749859843d00904452354.mp3",
        "duration":"3",
        "lyrics":"Risin' up, back on the street",
      "genre":"Rock",
      "release_year":1982,
      "image_url":"https://testbucketbymiaohua.s3.us-west-1.amazonaws.com/3b41e0933d2b41d8b313bf92d0917c4c.jpg"
    }) 
  }).then(response => response.json())  
  .then(data => console.log(data))   
  .catch(error => console.error('Error:', error));  

  fetch('/api/songs/1', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())  
  .then(data => console.log(data))    
  .catch(error => console.error('Error:', error));  

  fetch('/api/songs/2', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "title":"Eye of the Tigvghcgal",
        "audio_url":"https://testbucketbymiaohua.s3.us-west-1.amazonaws.com/91c8dd721bf749859843d00904452354.mp3",
        "duration":"3",
        "lyrics":"Risin' up, back on the street",
      "genre":"Rock",
      "release_year":1982,
      "image_url":"https://testbucketbymiaohua.s3.us-west-1.amazonaws.com/3b41e0933d2b41d8b313bf92d0917c4c.jpg"
    }) 
  }).then(response => response.json())  
  .then(data => console.log(data))    
  .catch(error => console.error('Error:', error)); 


  fetch('/api/songs/current').then(response => response.json())  
  .then(data => console.log(data))  
  .catch(error => console.error('Error:', error)); 