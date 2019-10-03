$(document).ready(function () {
  if (!checkData('user')) {
    Nav.assign('login.html');
  }

  fetchCart(getData('user')[1].uid);
});
