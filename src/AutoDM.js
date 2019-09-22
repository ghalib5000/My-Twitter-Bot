

const T = require("./Twit.js");
const my_user_name = require("../config").userName;
const timeout = 1000 * 60 * 5; // timeout to send the message 5 min
var fs = require("fs");
var path = require("path");
var timer = 10000;

var CronJob = require('cron').CronJob;


images = require('./images.js');
var storage = require("firebase/storage");
// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");
//const request = require('request');
fb_auth = "https://glb-twitter-bot.firebaseapp.com/__/auth/handler"

XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;


const download = require('image-downloader');




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

  const database = firebase.database();


  let ref = database.ref();

  function online() {
    console.log("database going online...");
    database.goOnline();
  }
  function offline() {
    setTimeout(function () {
      console.log("database going offline...");
      database.goOffline();
    }, 10000
    );

  }

   function img_downloader(img_number) {
    const options = {
      url: "https://firebasestorage.googleapis.com/v0/b/glb-twitter-bot.appspot.com/o/" + img_number + "?alt=media",

      dest: './'             // Save to /path/to/dest/image.jpg
    }
    
    
    console.log("donwloading image...");
    console.log("url: ",options.url);
    console.log("dest: ",options.dest);
      async function downloadIMG() {
        try {
          const { filename, image } = await download.image(options)
          console.log(filename) // => /path/to/dest/image.jpg
        } catch (e) {
          console.error(e);
          console.log("hi");
        }
      }
      downloadIMG()
  }

  function getFileNameWithoutExtension(filename){
    return filename.split('.').slice(0, -1).join('.');
  }
  //for matching the image in the database
  //if it exsists then get a  new image
  async function image_updater(filename) {
    num = getFileNameWithoutExtension(filename);
    console.log(num)
    v = "i" + num;
    var obj = {};
    obj[v] = num;
    online();
    setTimeout(function () {

      ref.update(obj)
    }, 8000
    );
    // ref.update( {  v : num  })
  }
  async function checkIfImageExists(filename)
   {
    filename = getFileNameWithoutExtension(filename);
    let dbfileName = (await ref.child("i"+filename).once('value')).val();
    return dbfileName==filename;
  }

  async function testFunction() {

    let img =   random_from_array(images).file;
    console.log("img name is : "+img);
    let result = await checkIfImageExists(img); // wait till the promise resolves (*)
    console.log(result);
    while(result)
    {
      console.log("image "+img+" found!, searching for another image...");
      img =  random_from_array(images).file;
      result = await checkIfImageExists(img);
      
    }
    console.log("image not found, preparing to download image...");
    console.log("new name is :"+img);
    img_downloader(img);
    console.log("image downloaded");
    image_updater(img);

    console.log("done...");
    //console.log(result ? "Image exists": "Image doesn't exist"); // "done!"
  }



  console.log("Starting... 🚀🚀🚀");


  //logger();
  //trying();

  /*
setInterval(function()
{
upload_random_image(images);
}, timer    timeout*6
);

*/


//upload_random_image(images);
 //for every sunday at 7:15 :    15 7 * * 0

const job = new CronJob('15 15 * * 0', function() {
	const d = new Date();
  console.log('cron started at :', d);
  upload_random_image(images);
});
job.start();

  function random_from_array(images) {
    return images[Math.floor(Math.random() * images.length)];
  }

  //random image selecting function

  async function upload_random_image(images) {
    online();

    console.log('Opening an image...');

   
    let random_image = random_from_array(images);
    console.log("img name is : "+random_image.file);
    let result = await checkIfImageExists(random_image.file); // wait till the promise resolves (*)
    console.log(result);
    while(result)
    {
      console.log("image "+random_image.file+" found!, searching for another image...");
      
      random_image = random_from_array(images);
      result = await checkIfImageExists(random_image.file);
      
    }
    var image_path = "./"
    console.log("image not found, preparing to download image...");

    console.log("new name is :"+random_image.file);
    img_downloader(random_image.file);

      console.log("image downloaded");

    image_path = "./" +random_image.file ;
    console.log("final path is: " + image_path.toString());
   
  
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
    }}
    );
     
  }, 10000
  );
      setTimeout( function()
      {
      

     console.log("now updating image number on the database");
     image_updater(random_image.file).then(function()
     {  
      console.log("done updating");  
    console.log("removing " + random_image.file)
        fs.unlink('./' + random_image.file, (err) => 
       {
          if (err) {
            console.error(err)
            return
          }
        })  
     }).then(function()
     {
     offline();
    }); 
  
 
}, 20000
);
    
  }
  offline();
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
