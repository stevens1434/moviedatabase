$('#put-form').on('submit', function(e) {
  console.log("________ update button clicked");
  e.preventDefault();
  $.ajax({
    method: 'PUT',
    url: $(this).attr('href'),
    name: name
  }).done(function(data) {
    // get data returned from the PUT route
    console.log("___________ done function in PUT(edit) ajax", data);
    // do stuff when the PUT action is complete
    movie.name.remove();
  });
});
