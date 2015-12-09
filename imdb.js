(function(){

  $(init);

  function init()
  {
    $("#searchMovie").click(searchMovie);

    var movieTitle=$("#movieTitle");
    var tbody=$("#container"); //table.find("tbody");
    var template=$("#template").clone();

    function searchMovie()
    {
      var title=movieTitle.val();

      $.ajax({
        url:"http://www.myapifilms.com/imdb?title="+title+"&format=JSONP&aka=0&business=0&seasons=0&seasonYear=0&technical=0&filter=N&exactFilter=0&limit=3&forceYear=0&lang=en-us&actors=N&biography=0&trailer=0&uniqueName=0&filmography=0&bornDied=0&starSign=0&actorActress=0&actorTrivia=0&movieTrivia=0&awards=0&moviePhotos=N&movieVideos=N&similarMovies=0&adultSearch=0",
        dataType:"jsonp",
        success: renderMoviesWithTemplate
      });

    }

    function renderMoviesWithTemplate(movies)
    {
      console.log(movies);

      tbody.empty();

      for(m in movies)
      {
        var movie=movies[m];
        var title=movie.title;
        var plot=movie.plot;
        var posterUrl=movie.urlPoster;
        var imdbUrl=movie.urlIMDB;

        var tr=template.clone();

        tr.find(".link")
          .attr("href",imdbUrl)
          .html(title);

        tr.find(".plot")
          .html(plot);

        tr.find(".poster")
          .attr("src",posterUrl);

        tbody.append(tr);
      }
    }

    function renderMovies(movies)
    {
      console.log(movies);
      for(m in movies)
      {
        var movie=movies[m];
        var title=movie.title;
        var plot=movie.simplePlot;
        var posterUrl=movie.urlPoster;
        var imdbUrl=movie.urlIMDB;
      }

    }
  }

})();
