(function() {
  var width = 640;  
  var height = 0;     

  var streaming = false;

  var video = null;
  var canvas = null;
  var photo = null;
  var startbutton = null;
  var downloadbutton =null;
  
  // var brightBtn;

  var pic_taken;
  var filter_applied = false;

  var filter ='';
  
  

  function startup() {
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    photo = document.getElementById('photo');
    startbutton = document.getElementById('startbutton');
    downloadbutton = document.getElementById('downloadbutton');
   
    bnwBtn = document.getElementById('Bnw');
    InvertBtn = document.getElementById('Invert');
    SepiaBtn = document.getElementById('Sepia');
    NoneBtn = document.getElementById('None');


    var backBtn = document.getElementById('back');
backBtn.addEventListener('click', function(){
    window.location = '../../index.html';
})

    navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(function(stream) {
      video.srcObject = stream;
      video.play();
    })
    .catch(function(err) {
      console.log("An error occurred: " + err);
    });

    video.addEventListener('canplay', function(ev){
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth/width);
      
     
        if (isNaN(height)) {
          height = width / (4/3);
        }
      
        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);

    startbutton.addEventListener('click', function(ev){
      takepicture();
      ev.preventDefault();
    }, false);
    downloadbutton.addEventListener('click', function(ev){
    dl_picture();
    ev.preventDefault();
  },false);


  //belows are filter buttons
    bnwBtn.addEventListener('click',function(){
      filter = 'grayscale(100%)';
     
  
    })

    InvertBtn.addEventListener('click',function(){
      filter = 'invert(100%)';
    })
    SepiaBtn.addEventListener('click',function(){
      filter = 'Sepia(100%)';
    })

    NoneBtn.addEventListener('click',function(){
      filter = '';
    })









    clearphoto();
  }



  function clearphoto() {
    var context = canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  }
  

  function takepicture() {
    var context = canvas.getContext('2d');
    if (width && height) {
      canvas.width = width;
      canvas.height = height;

      context.filter = filter;
      context.drawImage(video, 0, 0, width, height);
  
      var data = canvas.toDataURL('image/png');
      pic_taken = true;
      photo.setAttribute('src', data);
      // downloadpicture(data,"selfie.png");
    } else {
      pic_taken = false;
      clearphoto();
    }
  }
  function dl_picture() {
    var context = canvas.getContext('2d');
    let source;
    if(pic_taken){
      let source = photo.src;
      downloadpicture(source, 'selfie.png');
    }
    
  }

function downloadpicture(dataurl,filename){
  var a = document.createElement("a");
  a.href= dataurl;
  a.setAttribute("download",filename);
  var b= document.createEvent("MouseEvents");
  b.initEvent("click",false,true);
  a.dispatchEvent(b);
  return false;
}
      
  window.addEventListener('load', startup, false);
})();