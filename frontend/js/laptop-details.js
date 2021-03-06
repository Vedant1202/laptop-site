
if (checkData('user')) {
  $('#login').addClass('hidden');
} else {
  $('#signout').addClass('hidden');
}

if (!checkData('laptopDetails')) {
  Nav.assign('products.html');
}

$(document).ready(function () {

  if (checkData('user')) {
    fetchCart(getData('user')[1].uid, true);
  }

  setTimeout(function () {
    $.ajax({
      type: "POST",
      url: apiurl + '/product/fetchone.php',
      data: {
        'pid': getData('laptopDetails').pid
      },
      success: function(data) {
        console.log(JSON.parse(data[0]));
        console.log(data.length);
        $('#details').html('');
        for (var i = 0; i < data.length; i++) {
          var prod = JSON.parse(data[i]);
          $('#details').append(
            `
            <div class="row" style="padding:20px;">
              <div class="col-4" align="center" style="margin-left:50px;">
                <div style="margin:20px;">
                  <img src="${prod.imgname}" id="log" width="80%">
                </div>
                <div style="margin-top:50px;">
                  <button class="btn-blue addToCart" style="padding: 10px; font-size: 20px;" onclick="addToCart(this)" id="item-${prod.pid}" type="button" name="button">Add to Cart</button>
                </div>
              </div>
              <div class="col-6" align="left" style="margin-left:30px;">
                <div class="row" style="padding:20px;">
                  <strong style="font-size:38px; ">${prod.name} ${prod.processor} processor ${prod.display} INCH ${prod.storage} TB </strong>
                </div>
                <div class="row">
                  <div class="col-3" style="padding:20px;font-size:20px;" align="center">
                    <b>Warranty : </b>
                  </div>
                  <div class="col-3">
                    ${prod.warranty} Year Warranty
                  </div>
                </div>
                <div class="row">
                  <div class="col-3" style="padding:20px;font-size:20px;" align="center">
                    <b>Highlights :</b>
                  </div>
                  <div class="col-3">
                    <ul>
                      <li style="padding:5px;">${prod.processor} Processor</li>
                      <li style="padding:5px;">${prod.ram} GB DDR4 RAM</li>
                      <li style="padding:5px;">${prod.os}</li>
                    </ul>
                  </div>
                </div>
                <div class="row">
                  <div class="col-3" style="padding:20px;font-size:20px;" align="center">
                    <b>Specifications :</b>
                  </div>
                  <div class="col-3">
                    <ul>
                      <li style="padding:5px;">${prod.processor} Processor</li>
                      <li style="padding:5px;">${prod.display} INCH</li>
                      <li style="padding:5px;">${prod.storage} TB</li>
                      <li style="padding:5px;">${prod.ram} GB DDR4 RAM</li>
                      <li style="padding:5px;">${prod.os}</li>
                      <li style="padding:5px;">${prod.warranty} Year Warranty</li>
                      <li style="padding:5px;">&#8377; ${prod.price}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            `
          );
        }
        if (!checkData('user')) {
          var elems = document.getElementsByClassName('addToCart');
          for (var j = 0; j < elems.length; j++) {
            elems[j].setAttribute('onclick', 'alert("Please log in to add to cart")');
            elems[j].style.backgroundColor = '#729db5';
            elems[j].style.borderColor = '#729db5';
          }
        } else {
          if (checkData('cart')) {
            var pids = getData('cart').pid;
            if (pids.includes(parseInt(JSON.parse(data[0]).pid))) {
              document.getElementById('item-' + JSON.parse(data[0]).pid).style.backgroundColor = '#cc2424';
              document.getElementById('item-' + JSON.parse(data[0]).pid).style.borderColor = '#cc2424';
              document.getElementById('item-' + JSON.parse(data[0]).pid).innerText = 'Remove from Cart';
              document.getElementById('item-' + JSON.parse(data[0]).pid).setAttribute('onclick', 'removeCart(this)');
            }
          }
        }
      },
     error: function(error) {
       console.log(error);
     },
     dataType: 'json',
    });

  }, 1000);

});









//
