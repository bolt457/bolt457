document.getElementById('add-image-form').addEventListener('submit', (e) => {
    e.preventDefault();  
    const imageFile = document.getElementById('image-upload').files[0];  
    const reader = new FileReader();

    reader.onload = function(event) {
        const imgElement = document.createElement('img');  
        imgElement.src = event.target.result;  
        imgElement.width = 200;  
        document.getElementById('stars-container').appendChild(imgElement);  
    };

    reader.readAsDataURL(imageFile);  
});

document.getElementById('add-video-form').addEventListener('submit', (e) => {
    e.preventDefault();  
    const videoFile = document.getElementById('video-upload').files[0];  
    const reader = new FileReader();

    reader.onload = function(event) {
        const videoElement = document.createElement('video');  
        videoElement.src = event.target.result;  
        videoElement.controls = true;  
        document.getElementById('stars-container').appendChild(videoElement);  
    };

    reader.readAsDataURL(videoFile);  
});
