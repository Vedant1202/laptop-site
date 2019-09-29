// GLOBAL VARIABLES
apiurl = 'http://localhost:8080/laptop-site/backend/api';



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





//
