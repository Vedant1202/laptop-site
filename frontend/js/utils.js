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

//
