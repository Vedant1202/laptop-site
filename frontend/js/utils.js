// GLOBAL VARIABLES
apiurl = 'https://www.laptop-site.ml/laptop-site/backend/api';
// var apiurl = 'http://localhost:8080/laptop-site/backend/api';


//Navigation functions

var Nav = /** @class */ (function() {
    function Nav() {}
    Nav.assign = function(url) {
        window.location.assign(url);
    };
    Nav.replace = function(url) {
        window.location.replace(url);
    };
    Nav.back = function () {
      window.history.back();
    };
    Nav.open = function(url) {
        window.open(url, '_blank', 'location=no');
    };
    Nav.close = function() {
        window.close();
    };
    return Nav;
}());


//Cache storage Functions

function setData(cname, cvalue) {
    window.localStorage.setItem(cname, JSON.stringify(cvalue));
}

function getData(cname) {
    return JSON.parse(JSON.parse(window.localStorage.getItem(cname)));
}

function checkData(cname) {
    var user = getData(cname);
    if (user != null) {
        return true;
    } else {
        return false;
    }
}

function deleteData(cname) {
    window.localStorage.removeItem(cname);
}

function signout() {
  deleteData('user');
  alert('Signed out successfully');
  window.location.reload();
}


function addToCart(elem) {

  $.ajax({
    type: "POST",
    url: apiurl + '/cart/add.php',
    data: {
      'pid': elem.id.split('-')[1],
      'uid': getData('user')[1].uid,
    },
    success: function(data) {
      // console.log(data);
      alert('Added to cart');
      window.location.reload();
    },
   error: function(error) {
     console.log(error);
   },
   dataType: 'json',
  });

}

function fetchCart(uid, justPid=false) {
  $.ajax({
    type: "POST",
    url: apiurl + '/cart/fetch.php',
    data: {
      'uid': uid
    },
    success: function(data) {
      console.log('done');
      if (justPid) {
        var arr = [];
        for (var i = 0; i < data.length; i++) {
          arr.push(parseInt(JSON.parse(data[i]).pid));
        }
        setData('cart', JSON.stringify({'pid': arr}));
      } else {
        var totalAmt = 0;
        $('#cart-items').html('');
        if (data.length > 0) {
          for (var j = 0; j < data.length; j++) {
            var item = JSON.parse(data[j]);
            totalAmt = totalAmt + parseInt(item.price);
            $('#cart-items').append(`
              <div class="row" style="padding-bottom:10px;">
                <div class="col-4">
                  <img src="${item.imgname}" style="width:190px; height:150px; padding:30px;">
                </div>
                <div class="col-6" style=" padding-top:25px; margin-left:20px;">
                  <div class="row">
                    <strong style="font-size:15px;">${item.name} ${item.ram} GB ${item.os}</strong>
                  </div>
                  <div class="row" style="margin-top:25px;">
                    <strong style="font-size:18px;">&#8377; ${item.price}</strong>
                  </div>
                  <div class="row">
                    <a onclick="removeCart(this);" style="padding-top:25px; text-decoration:none; color: red;" id="remove-${item.pid}">Remove</a>
                  </div>
                </div>
              </div>
              <hr style="padding:1px;">
            `);

          }
          $('#price').html('&#8377; ' + totalAmt);
          $('#payable').html('&#8377; ' + totalAmt);
        } else {
          $('#cart-items .container').html('<h2>No items in cart</h2>');
          document.getElementById('order').setAttribute('disabled', '');
          document.getElementById('order').style.backgroundColor = '#729db5';
          document.getElementById('order').style.borderColor = '#729db5';
          $('#price').html('&#8377; ' + 0);
          $('#payable').html('&#8377; ' + 0);
        }
      }
      // window.location.reload();
      // setData('user', JSON.stringify(data));
      // Nav.assign('home.html')
    },
   error: function(error) {
     console.log(error);
   },
   dataType: 'json'
  });
}

function removeCart(elem) {
  $.ajax({
    type: "POST",
    url: apiurl + '/cart/remove.php',
    data: {
      'uid': getData('user')[1].uid,
      'pid': elem.id.split('-')[1]
    },
    success: function(data) {
      alert('Removed from cart');
      window.location.reload();
    },
   error: function(error) {
     console.log(error);
   },
   dataType: 'json'
  });
}

$(document).ready(function () {
  if (checkData('user')) {
    $('#login').addClass('hidden');
  } else {
    $('#cart').addClass('hidden');
    $('#signout').addClass('hidden');
  }
});

//
