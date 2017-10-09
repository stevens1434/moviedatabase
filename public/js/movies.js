
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
      console.log("___________ done function in DELETE ajax");
      // do stuff when the DELETE action is complete
      window.location=document.referrer;
    });
  });



//EDIT MOVIE
$('.edit').on('click', function(e) {
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
  // console.log("_____dbAndApi: ", dbAndApi);
  // dbAndApi = {};
  // dbAndApi.length = 0;
  // imdbResults = [];
  // imdbResults.length = 0;
  // console.log("_____dbAndApi: ", dbAndApi);
  // console.log("readystate: ", document.readyState);
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

// $(document).ready(function() {
//   jQuery(window).load(function() {
//     $('.clear').empty();
//   });
// });


// var loaded = false;
//
//  if (document.readyState === complete) {
//    console.log("readyState complete");
//    reLoad();
//  } else {
//    reLoad();
//    console.log("things worked");
//    }
