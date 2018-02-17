// var testData = ["https://pbs.twimg.com/media/DWHAIDDXkAEeQbn.jpg","https://pbs.twimg.com/media/DWGXjT5XkAAcjxw.jpg","https://pbs.twimg.com/media/DWGQpqcXcAAgSTy.png","https://pbs.twimg.com/media/DWDQuL1XcAEAUOG.jpg","https://pbs.twimg.com/media/DWACttvXkAENcH6.jpg","https://pbs.twimg.com/media/DWAB6o8UMAIYElL.jpg","https://pbs.twimg.com/media/DV2zt88VQAE-M7H.jpg","https://pbs.twimg.com/media/DV7i5_iXUAA99sj.jpg","https://pbs.twimg.com/ext_tw_video_thumb/963450626771423232/pu/img/V1WOoj7ksIalS4An.jpg","https://pbs.twimg.com/media/DV39dRlUQAALoEp.jpg","https://pbs.twimg.com/ext_tw_video_thumb/963156874563432449/pu/img/LVOnTmj0VrgFlKox.jpg","https://pbs.twimg.com/media/DV3ZgAEWsAA2z9j.jpg","https://pbs.twimg.com/media/DV2KN-vX4AALRJ3.jpg","https://pbs.twimg.com/tweet_video_thumb/DVzhBusU0AANWxn.jpg","https://pbs.twimg.com/media/DVpKNFPX0AET63h.jpg"];
// var testData = ["https://pbs.twimg.com/media/DWHAIDDXkAEeQbn.jpg"];
var data = [];
var myFloatingImages = [];
var bgcolor = 51;

var colorH = 0;
var colorS = 100;
var colorB = 100;

var smallWindow = 800;

var showDrawing = false;

console.log(data.length);


class floatingImage{

constructor(thisImage, x, y) {
  this.thisImage = thisImage;
  this.x = x;
  this.y = y;
  
  this.xdirection = 1;
  this.ydirection = 1;
  
  if ( windowWidth < smallWindow ) {
    
    this.xspeed = random(5,15) * 0.3;
    this.yspeed = random(5,15) * 0.3;
    
  } else {
  
    this.xspeed = random(5,30) * 0.3;
    this.yspeed = random(5,30) * 0.3;
    
  }
  
}

display(){
  
  if ( windowWidth < smallWindow ) {

    image(this.thisImage, this.x, this.y, this.thisImage.width/6, this.thisImage.height/6);
    
  } else {
  
    image(this.thisImage, this.x, this.y, this.thisImage.width/3, this.thisImage.height/3);
    
  }

}

move(){

  this.x = this.x + (this.xspeed * this.xdirection);
  this.y = this.y + (this.yspeed * this.ydirection);

}

}

      // START p5.js

    function setup() {
       
      createCanvas(windowWidth, windowHeight);
      
        if (showDrawing){
      
        data.map(function(thisImage){
              
          var thisImage = loadImage(thisImage);
          
          var halfWidth = thisImage.width/2;
          var halfHeight = thisImage.height/2;
          
          var maxWidth = windowWidth-halfWidth;
          var maxHeight = windowHeight-halfHeight;
          
          var buffer = 10;
          
          // var x = random(halfWidth+10, maxWidth-10);
          // var y = random(halfHeight+10, maxHeight-10);
          
          var x = windowWidth/2;
          var y = windowHeight/2;
          
          var thisImage = new floatingImage(thisImage, x, y); 
          
          myFloatingImages.push(thisImage);
          
        });
        }
      
      console.log(myFloatingImages);
      
      imageMode(CENTER);
      colorMode(HSB, 100);
  
      
    }

    function draw() {

        if ( data.length != 0 && showDrawing == true ){
          background(colorH, colorS, colorB);
          
          
          for(var i=0;i<myFloatingImages.length;i++){
            
            myFloatingImages[i].display();
            myFloatingImages[i].move();

            // Ugh
            var maxX = windowWidth - myFloatingImages[i].thisImage.width/6;
            var maxY = windowHeight - myFloatingImages[i].thisImage.height/6;

            var minX = myFloatingImages[i].thisImage.width/6;
            var minY = myFloatingImages[i].thisImage.height/6;

            if ( windowWidth < smallWindow ) {
              
              if (myFloatingImages[i].x > windowWidth || myFloatingImages[i].x < 0) {

                myFloatingImages[i].xdirection *= -1;

              }

              if (myFloatingImages[i].y > windowHeight || myFloatingImages[i].y < 0) {

                myFloatingImages[i].ydirection *= -1;

              }
            
            
            } else {

              if (myFloatingImages[i].x > maxX || myFloatingImages[i].x < minX) {

                myFloatingImages[i].xdirection *= -1;

              }

              if (myFloatingImages[i].y > maxY || myFloatingImages[i].y < minY) {

                myFloatingImages[i].ydirection *= -1;

              }
            
            }
            
          } // end of For Loop
          
          
        } // end of if data.length = 0

      
        if( colorH > 100 ){
          
          colorH=0;
          
        } else if ( data.length != 0) {
          
          colorH+=0.1;
        
        }
      
    } 

    // why would a person resize their window.. because they hate me
    function windowResized() {
      
      resizeCanvas(windowWidth, windowHeight);
      for(var i=0;i<myFloatingImages.length;i++){
       
          // reset x and y to middle of screen to avoid crazy shaking because they are caught on the edge of monitor
          myFloatingImages[i].x = windowWidth/2;
          myFloatingImages[i].y = windowHeight/2;
        
      }
      
      
    }



$(function() {
  
  $('#start').focus();
  
  $('#start').click(function(){
  
    $('#welcome').hide();
    $('#searchBar').focus();
  
  });
  
  $('#error_close').click(function(){
  
    $('#error_wrapper').hide();
    $('#searchBar').focus();
  
  });
  
  $('form').submit(function(event) {
    $('#content').html('');
    event.preventDefault();
    
    // STOP ALL SHENANIGANS
    var username = $('input').val().replace(/ /g, '_').replace(/[^a-zA-Z0-9_]+/g,'');
    
    console.log('/mediafrom/' + username);
    
    $.get('/mediafrom/' + username, function(item){
      
       if ( item != 'error' ) {
      
        data = [];
        myFloatingImages = [];
        // Updated Input Field with 
        $('input').val(username);
        showDrawing = true;

        // Cycle through all of the image urls
        item.map(function(media) {

          console.log(media);
          // $('<img src="' + media + '" >').appendTo('#content');
          //$('#linkToTweet').html('<a href="https://twitter.com/' + tweet.user.screen_name + '/status/' + tweet.id_str + '">link to tweet</a>');
          data.push(media);

        });
    
      console.log('total of ' + data.length + 'images');
      setup();
         
       } else {
         
         $('#error_message').html('No images from @' + username + '. Try @CoolDogPics or @archillect');
         $('#error_wrapper').show();
         $('#error_close').focus();
      
       }
    
      
    });
    
    
    
  });

  

  

});