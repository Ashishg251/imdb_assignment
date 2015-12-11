(function(){

  $(init);

  function init()
  {
    $("#searchActor").click(searchActor);

    var movieActor=$("#movieActor");
    var tbody=$("#container");
    var template=$("#template").clone();
    var moviesId=[];

    function searchActor()
    {
      var actor=movieActor.val();
      $('#loading').show();
      tbody.empty();

      $.ajax({
        url:"http://www.myapifilms.com/imdb?name="+actor+"&format=JSONP&language=en-us&filmography=1&exactFilter=0&limit=1&bornDied=0&starSign=0&uniqueName=0&actorActress=0&actorTrivia=0&actorPhotos=0&actorVideos=0&salary=0&spouses=0&tradeMark=0&personalQuotes=0&starMeter=0",
        dataType:"jsonp",
        success: renderActorsWithTemplate
      });

    }

    function renderActorsWithTemplate(actors)
    {
      movies=actors[0]['filmographies'][0]['filmography'];
      moviesIds=[];
      var d = new Date();
      var n = d.getFullYear();
      counter=0;
      successCounter=0;

      for(var i in movies)
      {
        var year=movies[i].year;
        if(year <= n && counter<15)
        {
          var movieImdbId=movies[i].IMDBId;
          counter+=ajaxCall(movieImdbId);
        }
      }
    }

    function ajaxCall(movieImdbId){
      $.ajax({
        url:"http://www.myapifilms.com/imdb?idIMDB="+movieImdbId+"&format=JSONP&language=en-us&aka=0&business=0&seasons=0&seasonYear=0&technical=0&trailer=0&movieTrivia=0&awards=0&moviePhotos=0&movieVideos=0&actors=0&biography=0&uniqueName=0&filmography=0&bornAndDead=0&starSign=0&actorActress=0&actorTrivia=0&similarMovies=0&originalTitle=0",
        dataType:"jsonp",
        success: function (movieId) {
          moviesIds.push(movieId)
          console.log(movieId);
          successCounter++;
          if(successCounter===15 || successCounter>=counter)
          {
            moviesIds.sort(function(a,b){
              return b.rating-a.rating;
            });
            moviesIds.splice(3,moviesIds.length);
            for(var i in moviesIds)
            {
              var title=moviesIds[i].title;
              var plot=moviesIds[i].plot;
              var posterUrl=moviesIds[i].urlPoster;
              var imdbUrl=moviesIds[i].urlIMDB;
              var about={};
              about["Duration"]=moviesIds[i].runtime[0];
              about["Genres"]=moviesIds[i].genres;
              about["Rating"]=moviesIds[i].rating;
              release_date = moviesIds[i].releaseDate;
              about["ReleaseDate"]=release_date.substring(0,4)+"-"+release_date.substring(4,6)+"-"+release_date.substring(6,8);

              var tr=template.clone();

              tr.find(".link")
                .attr("href",imdbUrl)
                .html(title);

              tr.find(".plot")
                .html(plot)
                .attr("width","500");

              tr.find(".Duration")
                .html("Duration : "+about["Duration"]);

              tr.find(".Rating")
                .html("Rating : "+about["Rating"]);

              tr.find(".ReleaseDate")
                .html("Release Date : "+about["ReleaseDate"]);

              tr.find(".Genres")
                .html("Genres : "+about["Genres"][0]+" "+about["Genres"][1]);

              tr.find(".poster")
                .attr("src",posterUrl);

              tbody.append(tr);
              $('#loading').hide();
            }
          }
        }
      });
      return 1;
    }
  }
})();
