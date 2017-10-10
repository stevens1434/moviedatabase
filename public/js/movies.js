//DELETE MOVIE
  $('#delete-link').on('click', function(e) {
    console.log("________ delete link clicked");
    console.log("++++url: ", $(this).attr('href'));
    e.preventDefault();
    $.ajax({
      // url: '/movies',
      method: 'DELETE',
      url: $(this).attr('href')
    }).done(function() {
      // get data returned from the DELETE route
      // console.log("___________3 url in DELETE in ajax: ", url);
      // do stuff when the DELETE action is complete
      // res.render('/');
      window.location=document.referrer;
    });
  });

//EDIT MOVIE
$('#editmovie').on('click', function(e) {
  console.log("AJAX ACTION 1 ______: ", action);
  e.preventDefault();
  // action = $(this).parent().attr('action');
  action = action + "/" + $('[name=editname]').val();
  // console.log("___________AJAX 2", action);
  $.ajax({
    method: 'PUT',
    //need to pass the text from "name='editname'" into the URL
    url: action
  }).done(function(data) {
    // get data returned from the PUT route
    // console.log("___________.done() in AJAX, data: ", data);
    setTimeout(function() {
      window.location.reload();
    }, 1);
  });
});
$('#submit').on('click', function(e) {
  console.log('submit button clicked!!!@@@!!!');
  $('.clear').empty();
});

var reLoad = function () {
  jQuery(window).load(function() {
      reload = true;
      console.log("reload: load", reload);
      setTimeout(function() {
        window.location.reload();
      }, 1000);
  });
};

if ($('loading') === "PAGE LOADING...") {
  window.location.reload();
} else {
  console.log("page loaded");
}
