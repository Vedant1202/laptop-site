$(document).ready(function () {
  if (!checkData('user')) {
    Nav.assign('login.html');
  }

  fetchCart(getData('user')[1].uid);
});


function emptyCart() {
  $.ajax({
    type: "POST",
    url: apiurl + '/cart/empty.php',
    data: {
      'uid': getData('user')[1].uid,
    },
    success: function(data) {
      alert('Order placed succesgfully');
      Nav.assign('products.html');
    },
   error: function(error) {
     console.log(error);
   },
   dataType: 'json'
  });
}




//
