$(document).ready(function () {

  $.ajax({
    type: "POST",
    url: apiurl + '/cart/fetch.php',
    data: {
      'uid': getData('user')[1].uid
    },
    success: function(data) {
      console.log('done');
      
    },
   error: function(error) {
     console.log(error);
   },
   dataType: 'json'
  });

});
