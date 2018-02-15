$(function() {
  console.log('hello world :o');
  
  $('form').submit(function(event) {
    $('ul#content').html('');
    event.preventDefault();
    var username = $('input').val();
    console.log('/following/' + username);
    
    $.get('/following/' + username, function(item){
        
        console.log(item.length);
        item.map(function(tweet) {
          
//             // BLOTTER - Example 2
//             var text = new Blotter.Text(tweet.text, {
//               family : "'EB Garamond', serif",
//               size : 48,
//               fill : "#171717",
//               paddingLeft : 0,
//               paddingRight : 0
//             });

//             var material = new Blotter.LiquidDistortMaterial();

//             // Play with the value for uSpeed. Lower values slow
//             // down animation, while higher values speed it up. At
//             // a speed of 0.0, animation is stopped entirely.
//             material.uniforms.uSpeed.value = 0.25;

//             // Try uncommenting the following line to play with
//             // the "volatility" of the effect. Higher values here will
//             // produce more dramatic changes in the appearance of your
//             // text as it animates, but you will likely want to keep
//             // the value below 1.0.
//             //material.uniforms.uVolatility.value = 0.30;

//             var blotter = new Blotter(material, {
//               texts : text
//             });

//             var elem = document.getElementById("content");
//             var scope = blotter.forText(text);

//             scope.appendTo(elem);
          
          
          $('#content').html(tweet.text);
          $('#linkToTweet').html('<a href="https://twitter.com/' + tweet.user.screen_name + '/status/' + tweet.id_str + '">link to tweet</a>');
          
        });
        
    });
    
  });

});