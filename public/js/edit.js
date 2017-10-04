

$('.edit').on('click', function(e) {
  // console.log("________in AJAX, update button clicked");
  e.preventDefault();
  action = $(this).parent().attr('action');
  action = action + "/" + $('[name=editname]').val();
  // console.log(action);
  // $('form').attr("action", action)
  $.ajax({
    method: 'PUT',
    //need to pass the text from "name='editname'" into the URL
    url: action
  }).done(function(data) {
    // get data returned from the PUT route
    // console.log("___________.done() in AJAX, data: ", data);
    // do stuff when the PUT action is complete
    // movie.name.remove();
  });
});
