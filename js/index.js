
$('body').on('click', '.recent-song', function (){
        var id = $(this).attr("vid");
        var thumbnail = $(this).children('#thumbnail').attr("src");
        localStorage.setItem("playPresent",id);
        localStorage.setItem("thumbnail",thumbnail);
        document.location.href="player.html";
});
$("#prev-btn").hide();
$("#next-btn").hide();
function search(){
  //Get Form input
  $("#recent").html("");
  var q = $("#search-bar").val();

  //Make our get request
  $.get(
    "https://www.googleapis.com/youtube/v3/search",{
        part : 'snippet , id',
        q : q,
        type : 'video',
        key : "AIzaSyCwA8LI3Ps7y76_LWgy7zDUKUwIbKKnpT0",
        maxResults : "10"
      },
        function(data){
          var nextPageToken = data.nextPageToken;
          var prevPageToken = data.prevPageToken;
          $.each(data.items,function(i,item){
            var output = getOutput(item);
            $("#recent").append(output);
          });
          if(prevPageToken){
            $("#prev-btn").show();
            $("#prev-btn").attr("prev",prevPageToken);
            $("#prev-btn").attr("q",q);
          }
          if(nextPageToken){
            $("#next-btn").show();
            $("#next-btn").attr("next",nextPageToken);
            $("#next-btn").attr("q",q);
          }
        }
  )
}
function prev(){
  $("#recent").html("");
  $("#prev-btn").hide();
  $("#next-btn").hide();
  $.get(
    "https://www.googleapis.com/youtube/v3/search",{
        part : 'snippet , id',
        q : $("#prev-btn").attr("q"),
        type : 'video',
        key : "AIzaSyCwA8LI3Ps7y76_LWgy7zDUKUwIbKKnpT0",
        maxResults : "10",
        pageToken : $("#prev-btn").attr("prev")
      },
        function(data){
          var nextPageToken = data.nextPageToken;
          var prevPageToken = data.prevPageToken;
          if(prevPageToken){
            $("#prev-btn").show();
            $("#prev-btn").attr("prev",prevPageToken);
            $("#prev-btn").attr("q",$("#prev-btn").attr("q"));
          }
          if(nextPageToken){
            $("#next-btn").show();
            $("#next-btn").attr("next",nextPageToken);
            $("#next-btn").attr("q",$("#next-btn").attr("q"));
          }
          $.each(data.items,function(i,item){
            var output = getOutput(item);
            $("#recent").append(output);
          });
        }
  )
}
function next(){
  $("#recent").html("");
  $("#prev-btn").hide();
  $("#next-btn").hide();
  $.get(
    "https://www.googleapis.com/youtube/v3/search",{
        part : 'snippet , id',
        q : $("#next-btn").attr("q"),
        type : 'video',
        key : "AIzaSyCwA8LI3Ps7y76_LWgy7zDUKUwIbKKnpT0",
        maxResults : "10",
        pageToken : $("#next-btn").attr("next")
      },
        function(data){
          var nextPageToken = data.nextPageToken;
          var prevPageToken = data.prevPageToken;
          if(prevPageToken){
            $("#prev-btn").show();
            $("#prev-btn").attr("prev",prevPageToken);
            $("#prev-btn").attr("q",$("#next-btn").attr("q"));
          }
          if(nextPageToken){
            $("#next-btn").show();
            $("#next-btn").attr("next",nextPageToken);
            $("#next-btn").attr("q",$("#next-btn").attr("q"));
          }
          $.each(data.items,function(i,item){
            var output = getOutput(item);
            $("#recent").append(output);
          });
        }
  )
}
function getOutput(item){
  var id = item.id.videoId;
  var title = item.snippet.title;
  var description = item.snippet.description;
  var thumb = item.snippet.thumbnails.high.url;
  var channelTitle = item.snippet.channelTitle;
  var videoDate = item.snippet.publishedAt;

  
  //Build our output:
  var output =
  '<div class="recent-song" vid="'+id+'">'+
      '<img id ="thumbnail" src="'+ thumb +'" alt="">'+
      '<div id="info">'+
      '<div id="song-name">'+title+'</div>'+
      '<i id = "play-icon" class="fa fa-angle-right" aria-hidden="true"></i>'+
  '</div>'+
  '<div class="clear-fix"></div>';

  return output;
}
