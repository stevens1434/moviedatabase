
//DELETE MOVIE
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



//EDIT MOVIE
// var action = $(this).parent().attr('action')
$('.edit').on('click', function(e) {
  console.log("________in AJAX, update button clicked ", action);
  e.preventDefault();
  // action = $(this).parent().attr('action');
  action = action + "/" + $('[name=editname]').val();
  console.log("___________AJAX 2", action);
  // $('form').attr("action", action)
  $.ajax({
    method: 'PUT',
    //need to pass the text from "name='editname'" into the URL
    url: action
  }).done(function(data) {
    // get data returned from the PUT route
    // console.log("___________.done() in AJAX, data: ", data);
    // do stuff when the PUT action is complete
    movie.name.remove();
     window.location.reload();
  });
});

$('#submit').on('click', function(e) {
  console.log('submit button clicked!!!@@@!!!');
  $('$manyFound').innerhtml = '';
});
