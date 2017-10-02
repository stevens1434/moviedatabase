<script
  src="https://code.jquery.com/jquery-3.2.1.min.js"
  integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
  crossorigin="anonymous"></script>

<script>
var express = require('express');
var app = express();
app.use('/search/results', require('/results'));
// var length = dbAndApi.movieList.length;
var oneFound = $('#oneFound');
var manyFound = $('#manyFound');
var noneFound = $('#noneFound');
  $('#grabData').on('click', function() {
    if (dbAndApi.movieList === 1) {
      console.log("one movie was found");
      oneFound.show();
    } else if (dbAndApi.movieList > 1) {
      console.log("more than one movie was found");
      $(manyFound).show();
    } else {
      console.log("no movies found")
      noneFound.show();
    }
    console.log("______ Pull IMDB Movie Data was clicked");
  });

  $('#selectFilmButton').on('click', function() {
    console.log("______ Select This Film was clicked");
  });

</script>


<style>
#oneFound {
    display: none;
}
#manyFound {
    display: none;
}
#noneFound {
    display: none;
}
</style>
