
/*
const T = require("./Twit.js");
const my_user_name = require("../config").userName;
const timeout = 1000 * 60 * 5; // timeout to send the message 5 min
var fs    = require("fs");
var path = require("path");
var timer =10000;


images = require('./images.js');
var  storage = require("firebase/storage");
// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");
//const request = require('request');
fb_auth = "https://glb-twitter-bot.firebaseapp.com/__/auth/handler"

XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;


const download = require('image-downloader');



*/
var firebaseConfig = {

  apiKey: "AIzaSyD0bo-YploXM_K63VwtgANHUZvef4Alwpo",
  authDomain: "glb-twitter-bot.firebaseapp.com",
  databaseURL: "https://glb-twitter-bot.firebaseio.com",
  projectId: "glb-twitter-bot",
  storageBucket: "glb-twitter-bot.appspot.com",
  messagingSenderId: "535840477015",
  appId: "1:535840477015:web:f9f77c632ff84eda"
};




var firebase = require("firebase");

const AutoDM = () => {
console.log("Initializing firebase...");
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

 //var database = firebase.database();


 // THE code that's giving me error
 let ref = firebase.database().ref();


 


function img_downloader(img_number){
const options = {
  url: "https://firebasestorage.googleapis.com/v0/b/glb-twitter-bot.appspot.com/o/"+img_number+"?alt=media",
  
  dest: './img/'                // Save to /path/to/dest/image.jpg
}
  console.log("donwloading image");
  download.image(options)
  .then(({ filename, image }) => {
    console.log('Saved to', filename)  // Saved to /path/to/dest/image.jpg
  })
  .catch((err) => console.error(err));
 
}



//for matching the image in the database
//if it exsists then get a  new image
function image_updater(num)
{
   num = num;
 num = num.substr(0, num.length - 4);
console.log(num)
v = "i"+num;
var obj = {};
obj[v] = num;
ref.update(obj)
   
// ref.update( {  v : num  })

}
function image_checker(num)
{
   num = num;
 num = num.substr(0, num.length - 4);
console.log(num)

ref.child("i"+num).on("value", function(value){
  if (value.val() ==num) {

     console.log("matched "+num) ;
     return "matched"

  } else {
    console.log("not matched "+num);
    return "not matched"
  }
  
  });

} 

  //upload_random_image(images);

/*

{
ref.on("value", function(snapshot) {
   console.log(snapshot.val());

}, function (error) {
   console.log("Error: " + error.code);
});
}
*/
/*

  firebase.database().ref("/Done_Images/hello/img").set({
    img: "6742",
  });


  */


//var defaultStorage = firebase.storage();

// Create a storage reference from our storage service
//var storageRef = defaultStorage.ref();

  // This can be downloaded directly:

  /*
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'blob';
  xhr.onload = function(event) {
    var blob = xhr.response;
  };
  xhr.open('GET', url);
  xhr.send();

}*/

console.log("Starting... 🚀🚀🚀");

/*
img_downloader(random_image.file);
image_path = './img/'+random_image.file;
console.log(image_path);
*/
 
//newmet();
/*
//uploading method
fs.readdir('./img', function(err, files) 
{
  if (err){
   console.log(err);
  }
  else{
    var images = [];
    files.forEach(function(f) {
      images.push(f);
    });

    setInterval(function()
    {
      upload_random_image(images);
    }, 100000
    );
  }
});

*/

       //logger();
       //trying();
       /*
setInterval(function()
{
  upload_random_image(images);
}, timer    timeout*6
);

*/


function random_from_array(images){
  return images[Math.floor(Math.random() * images.length)];
}

//random image selecting function

function upload_random_image(images){
  console.log('Opening an image...');

  var random_image = random_from_array(images);

    while (image_checker(random_image.file)=="matched")
     {
       console.log("image number matched , searching for another image")
      random_image = random_from_array(images);
    } 

    img_downloader(random_image.file);

    var image_path = "./img/"+random_image.file;
     console.log("final path is: "+image_path);


    /*

     setTimeout(function()
     {
    
      b64content = fs.readFileSync(image_path.toString() , { encoding: 'base64' });
  console.log('Uploading an image...');

  T.post('media/upload', { media_data: b64content }, function (err, data, response) {
    if (err){
      console.log('ERROR:');
      console.log(err);
    }
    else{
      console.log('Image uploaded!');
      console.log('Now tweeting it...');

 



    var tweet_text = random_from_array([
          'New picture!',
          'Check this out!',
          'yay',
          'Inspirational',
          'New tweet',
          'Random thought'
        ]) + ' ' + random_image.source;

      T.post('statuses/update', {
        // You can include text with your image as well.             
        // status: 'New picture!', 
        // Or you can pick random text from an array.            
        status: tweet_text,
        media_ids: new Array(data.media_id_string)
      },
        function(err, data, response) {
          if (err){
            console.log('ERROR:');
            console.log(err);
          }
          else{
            console.log('Posted an image!');
          }
        }
      );
    }

  }

 )

}, 100000
);

*/
console.log("now updating image number on the database");

image_updater(random_image.file);
console.log("done updating");

 setTimeout(function()
 {
 
console.log("removing "+random_image.file)
fs.unlink('./img/'+random_image.file , (err) => {
  if (err) {
    console.error(err)
    return
  }

  //file removed
})


 }, 10000
 );

}






/*
  //the main code for auto tweeting
  T.post(
    'statuses/update', { status: 'This is being written by me' }, function(err, data, response) 
    {
    console.log(data)
    //console.log("this is going in here")
    }
  )
*/
};
module.exports = AutoDM;
