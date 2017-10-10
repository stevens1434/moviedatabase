//DELETE MOVIE
  $('#delete-link').on('click', function(e) {
    console.log("________ delete link clicked");
    e.preventDefault();
    $.ajax({
      // url: '/movies',
      method: 'DELETE',
      url: $(this).attr('href')
    }).done(function(data) {
      // get data returned from the DELETE route
      console.log("___________  DELETE in ajax");
      // do stuff when the DELETE action is complete
      window.location=document.referrer;
    });
  });

//EDIT MOVIE
$('.edit').on('click', function(e) {
  e.preventDefault();
  action = action + "/" + $('[name=editname]').val();
  console.log("_____ action in edit ajax", action)
  $.ajax({
    method: 'PUT',
    url: action
  }).done(function(data) {
    console.log("_____ AJAX EDIT MOVIES");
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

if ($('loading') === PAGE LOADING...) {
  window.location.reload();
} else {
  console.log("page loaded");
}
