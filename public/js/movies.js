

  $('#delete-link').on('click', function(e) {
    console.log("________ delete link clicked");
    e.preventDefault();
    $.ajax({
      // url: '/movies',
      url: $(this).attr('href'),
      method: 'DELETE'
    }).done(function(data) {
      // get data returned from the DELETE route
      console.log("___________ done function in DELETE ajax", data);
      // do stuff when the DELETE action is complete
      movie.name.remove();
    });
  });
// /movies/<%= movie.id %>
