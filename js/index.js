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
        key : "AIzaSyCwA8LI3Ps7y76_LWgy7zDUKUwIbKKnpT0"},
        function(data){
          var nextPageToken = data.nextPageToken;
          var prevPageToken = data.prevPageToken;
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
  '<div class="recent-song">'+
      '<img id ="thumbnail" src="'+ thumb +'" alt="">'+
      '<div id="info">'+
      '<div id="song-name">'+title+'</div>'+
      '<i id = "play-icon" class="fa fa-angle-right" aria-hidden="true"></i>'+
  '</div>'+
  '<div class="clear-fix"></div>';

  return output;
}