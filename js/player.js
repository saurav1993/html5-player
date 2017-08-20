
var vol = 0.5;
//hide pause button
$("#pause").hide();

//Initialize Audio
initAudio($("#playlist li:first-child"));

//Initializer Function
function initAudio(element){

  var song  = element.attr("song");
  var title = element.text();
  var cover = element.attr("cover");
  var artist = element.attr("artist");

  audio = new Audio("songs/" + song)

  if(!audio.currentTime){
    $("#duration").text("0.0");
  }

  $("#audio-player #title").text(title);
  $("#audio-player #artist").text(artist);

  $("#cover").attr("src","img/covers/" + cover);

  $("#playlist li").removeClass("active");
  element.addClass("active");

  audio.volume = vol;
}
//volume
$("#vol").change(function(){
  vol = parseFloat(this.value / 10);
  audio.volume = vol;
})
//play button
$("#play").click(function(){
  audio.play();
  $("#play").hide();
  $("#pause").show();
  $("#duration").fadeIn(400);
  showDuration();
})
//Pause button
$("#pause").click(function(){
  audio.pause();
  $("#pause").hide();
  $("#play").show();
})
//Stop Button
$("#stop").click(function(){
  audio.pause();
  audio.currentTime = 0;
  $("#pause").hide();
  $("#play").show();
  $("#duration").fadeOut(400);
})
//Next Button
  $("#next").click(function(){
  audio.pause();
  var next = $("#playlist li.active").next();
  if(next.length == 0){
   next = $("#playlist li:first-child");
  }
  initAudio(next);
  audio.play();
  showDuration();
})
//Prev Button
  $("#prev").click(function(){
  audio.pause();
  var prev = $("#playlist li.active").prev();
  if(prev.length == 0){
    prev = $("#playlist li:last-child");
  }
  initAudio(prev);
  audio.play();
  showDuration();
})
//Progress Bar Click

  //get the width
  var progressbar = $("#progressbar").offset();
  var width = $("#progressbar").width();
  $("#progressbar").click(function(evt){
    var x = evt.pageX - $('#progressbar').offset().left;
    var percent = x / width * 100;
    if(audio.currentTime){
      var duration  = audio.duration;
      audio.currentTime = duration * (percent/100)
    }
  })
//On audio end
$(audio).bind("ended", function() {
    console.log("fired");
    $("#next").click();

});
//duration
function showDuration(){
  $(audio).on("timeupdate",function(){
    //Get minutes and seconds
    var s = parseInt(audio.currentTime % 60);
    var m = parseInt((audio.currentTime % 60) / 60);
    $("#duration").text(m);
    if(s<10){
      s = "0" + s;
    }
    $("#duration").text(m + "." + s);
    var value = 0 ;
    if(audio.currentTime > 0){
      value = (100/audio.duration) * audio.currentTime;
    }
    $("#progress").css("width",value+"%");
  })
}
