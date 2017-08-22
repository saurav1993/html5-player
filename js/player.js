
  var id = localStorage.getItem("playPresent");
  initAudio(id);
  var i = 0;
  function initAudio(id){
    var thumbnail = localStorage.getItem("thumbnail");
    $(".song-cover").attr("src",thumbnail);
    try{
        var data = JSON.parse(getSongJson(id));
    }catch(err){
      alert("this song cannot be played");
      window.history.back();
    }
    audio = new Audio(data.link);
    audio.vol = 1;
    console.log(data);
    $(".total-duration").text(totalDuration(data.length));
    $("#download").attr("href",data.link);
    $(".album-title").text(data.title);
    $( "#slider" ).slider({
      range: "min",
    });
    $( "#slider" ).slider({
      max: data.length
    });
  }
  function getSongJson(id){
   return $.ajax({
    url: "https://www.youtubeinmp3.com/fetch/?format=JSON&video=https://www.youtube.com/watch?v=" + id +"",
    dataType: 'json',
    async: false,
    }).responseText;
  }
  //play button
  $("#play").click(function(){
    audio.play();
    $("#play").hide();
    $("#pause").show();
    $("#duration").fadeIn(400);
    showDuration();
  });

  function play(){
    audio.play();
    $(".play").children(i).attr("class","fa fa-pause");
    showDuration();
  }

  function pause(){
    audio.pause();
    $(".play").children(i).attr("class","fa fa-play");
  }

  function totalDuration(length){
    s = "";
    m = "";
    s = parseInt(length % 60);
    m = parseInt(length / 60);
    return m + ":" + s;
  }
  function showDuration(){
    $(audio).on("timeupdate",function(){
      //Get minutes and seconds
      var s = parseInt(audio.currentTime % 60);
      var m = parseInt(audio.currentTime / 60);
      $("#duration").text(m);
      if(s<10){
        s = "0" + s;
      }
      $(".current-duration").text(m + ":" + s);
      $( "#slider" ).slider({
        value: audio.currentTime
      });

      // var value = 0 ;
      // if(audio.currentTime > 0){
      //   value = (100/audio.duration) * audio.currentTime;
      // }
      // $("#progress").css("width",value+"%");
    })
  }
  $(".play").click(function(){
    var playStatus = $(".play").children(i).attr("class");
    if(playStatus == "fa fa-pause"){
      pause();
    } else if (playStatus == "fa fa-play") {
      play()
    }
  })

  $( "#slider" ).on( "slide", function( event, ui ) {
      audio.currentTime = $( "#slider" ).slider("value");
  });

$("#back").click(function(){
  window.history.back();
})




// //Pause button
// $("#pause").click(function(){
//   audio.pause();
//   $("#pause").hide();
//   $("#play").show();
// })
// //Stop Button
// $("#stop").click(function(){
//   audio.pause();
//   audio.currentTime = 0;
//   $("#pause").hide();
//   $("#play").show();
//   $("#duration").fadeOut(400);
// })
// //Next Button
//   $("#next").click(function(){
//   audio.pause();
//   var next = $("#playlist li.active").next();
//   if(next.length == 0){
//    next = $("#playlist li:first-child");
//   }
//   initAudio(next);
//   audio.play();
//   showDuration();
// })
// //Prev Button
//   $("#prev").click(function(){
//   audio.pause();
//   var prev = $("#playlist li.active").prev();
//   if(prev.length == 0){
//     prev = $("#playlist li:last-child");
//   }
//   initAudio(prev);
//   audio.play();
//   showDuration();
// })
// //Progress Bar Click
//
//   //get the width
//   var progressbar = $("#progressbar").offset();
//   var width = $("#progressbar").width();
//   $("#progressbar").click(function(evt){
//     var x = evt.pageX - $('#progressbar').offset().left;
//     var percent = x / width * 100;
//     if(audio.currentTime){
//       var duration  = audio.duration;
//       audio.currentTime = duration * (percent/100)
//     }
//   })
// //On audio end
// $(audio).bind("ended", function() {
//     console.log("fired");
//     $("#next").click();
//
// });
// //duration
