
if (checkData('user')) {
  $('#login').addClass('hidden');
} else {
  $('#signout').addClass('hidden');
}

deleteData('laptopDetails');
deleteData('compare');


$(document).ready(function () {
  if (checkData('user')) {
    fetchCart(getData('user')[1].uid, true);
  }

  setTimeout(function () {

      $.ajax({
        type: "POST",
        url: apiurl + '/product/fetchall.php',
        data: '',
        success: function(data) {
          console.log(JSON.parse(data[0]));
          console.log(data.length);
          $('#productsDiv').html('');
          for (var i = 0; i < data.length; i++) {
            var prod = JSON.parse(data[i]);
            $('#productsDiv').append(
              `
              <div class="row" style="margin-bottom: 50px;">
                <!-- <div class="laptop-item"> -->
                  <div class="col-4">
                    <img src="${prod.imgname}" class="laptops" style="width: 70%;">
                  </div>
                  <div class="col-4" style="cursor: pointer;" onclick="setData('laptopDetails', JSON.stringify({'pid': ${prod.pid}})); Nav.assign('laptop-details.html');">
                    <strong>${prod.name}</strong>
                    <ul>
                      <li style="padding-bottom:10px;">${prod.processor} Processor</li>
                      <li style="padding-bottom:10px;">${prod.ram} GB DDR4 RAM</li>
                      <li style="padding-bottom:10px;">${prod.os}</li>
                    </ul>
                  </div>
                  <div class="col-2">
                    <strong>&#8377; ${prod.price}</strong><br>
                    <div class="row" style="padding-top:20px;">
                      <input type="checkbox" class="compare" onchange="changeCheck();" id="${prod.pid}"><b>Add To Compare</b><br>
                    </div>
                    <div class="row" style="padding-top:15px ;">
                      <button class="btn-blue addToCart" style="padding: 10px; font-size: 20px;" type="button" id="item-${prod.pid}" onclick="addToCart(this);" name="button">Add to Cart</button>
                    </div>
                  </div>
                <!-- </div> -->
              </div>
              <hr style="margin-bottom: 50px;">
              `
            );
          }
          if (!checkData('user')) {
            var elems = document.getElementsByClassName('addToCart');
            for (var j = 0; j < elems.length; j++) {
              // elems[j].setAttribute('disabled', '');
              elems[j].setAttribute('onclick', 'alert("Please log in to add to cart")');
              elems[j].style.backgroundColor = '#729db5';
              elems[j].style.borderColor = '#729db5';
            }
          } else {
            if (checkData('cart')) {
              var pids = getData('cart').pid;
              var elems = document.getElementsByClassName('addToCart');
              for (var c = 0; c < elems.length; c++) {
                console.log('cart pid: ' + elems[c].id.split('-')[1]);
                console.log(pids);
                console.log(pids.includes(parseInt(elems[c].id.split('-')[1])));
                if (pids.includes(parseInt(elems[c].id.split('-')[1]))) {
                  document.getElementById(elems[c].id).style.backgroundColor = '#cc2424';
                  document.getElementById(elems[c].id).style.borderColor = '#cc2424';
                  document.getElementById(elems[c].id).innerText = 'Remove from Cart';
                  document.getElementById(elems[c].id).setAttribute('onclick', 'removeCart(this)');
                }
              }
            }
          }
        },
       error: function(error) {
         console.log(error);
       },
       dataType: 'json',
       processData: false,
       contentType: false
      });
  }, 1500);

});


function changeCheck() {
  if ($('.compare:checked').length == 2) {
    setData('compare', JSON.stringify({'pid1': $('.compare:checked')[0].id, 'pid2': $('.compare:checked')[1].id}));
    Nav.assign('compare.html');
  }
}


function searchLaptop(keyword) {
  if (keyword.trim()) {
    data = {
      'key': keyword.trim()
    };

    $.ajax({
      type: "POST",
      url: apiurl + '/product/fetchsearch.php',
      data: data,
      success: function(data) {
        $('#productsDiv').html('');
        if (data.length > 0) {
          for (var i = 0; i < data.length; i++) {
            var prod = JSON.parse(data[i]);
            $('#productsDiv').append(
              `
              <div class="row" style="margin-bottom: 50px;">
                <!-- <div class="laptop-item"> -->
                  <div class="col-4">
                    <img src="${prod.imgname}" class="laptops" style="width: 70%;">
                  </div>
                  <div class="col-4" style="cursor: pointer;" onclick="setData('laptopDetails', JSON.stringify({'pid': ${prod.pid}})); Nav.assign('laptop-details.html');">
                    <strong>${prod.name}</strong>
                    <ul>
                      <li style="padding-bottom:10px;">${prod.processor} Processor</li>
                      <li style="padding-bottom:10px;">${prod.ram} GB DDR4 RAM</li>
                      <li style="padding-bottom:10px;">${prod.os}</li>
                    </ul>
                  </div>
                  <div class="col-2">
                    <strong>&#8377; ${prod.price}</strong><br>
                    <div class="row" style="padding-top:20px;">
                      <input type="checkbox" class="compare" onchange="changeCheck();" id="${prod.pid}"><b>Add To Compare</b><br>
                    </div>
                    <div class="row" style="padding-top:15px ;">
                      <button class="btn-blue addToCart" style="padding: 10px; font-size: 20px;" type="button" id="item-${prod.pid}" onclick="addToCart(this);" name="button">Add to Cart</button>
                    </div>
                  </div>
                <!-- </div> -->
              </div>
              <hr style="margin-bottom: 50px;">
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
              var elems = document.getElementsByClassName('addToCart');
              for (var c = 0; c < elems.length; c++) {
                console.log('cart pid: ' + elems[c].id);
                console.log('cart pid: ' + elems[c].id.split('-')[1]);
                console.log(pids);
                console.log(pids.includes(parseInt(elems[c].id.split('-')[1])));
                if (pids.includes(parseInt(elems[c].id.split('-')[1]))) {
                  document.getElementById(elems[c].id).style.backgroundColor = '#cc2424';
                  document.getElementById(elems[c].id).style.borderColor = '#cc2424';
                  document.getElementById(elems[c].id).innerText = 'Remove from Cart';
                  document.getElementById(elems[c].id).setAttribute('onclick', 'removeCart(this)');
                }
              }
            }
          }
        } else {
          console.log(data);
          $('#productsDiv').html('<div align="center"> No products to show </div>');
        }
      },
     error: function(error) {
       console.log(error);
     },
     dataType: 'json',
    });

  } else {
    $.ajax({
      type: "POST",
      url: apiurl + '/product/fetchall.php',
      data: '',
      success: function(data) {
        $('#productsDiv').html('');
        for (var i = 0; i < data.length; i++) {
          var prod = JSON.parse(data[i]);
          $('#productsDiv').append(
            `
            <div class="row" style="margin-bottom: 50px;">
              <!-- <div class="laptop-item"> -->
                <div class="col-4" id="dep">
                  <img src="${prod.imgname}" id="log" class="laptops" style="width: 70%;">
                </div>
                <div class="col-4" style="cursor: pointer;" onclick="setData('laptopDetails', JSON.stringify({'pid': ${prod.pid}})); Nav.assign('laptop-details.html');">
                  <strong>${prod.name}</strong>
                  <ul>
                    <li style="padding-bottom:10px;">${prod.processor} Processor</li>
                    <li style="padding-bottom:10px;">${prod.ram} GB DDR4 RAM</li>
                    <li style="padding-bottom:10px;">${prod.os}</li>
                  </ul>
                </div>
                <div class="col-2" id="dep">
                  <strong>&#8377; ${prod.price}</strong><br>
                  <div class="row" style="padding-top:20px;">
                    <input type="checkbox" class="compare" onchange="changeCheck();" id="${prod.pid}"><b>Add To Compare</b><br>
                  </div>
                  <div class="row" style="padding-top:15px ;">
                    <button class="btn-blue addToCart" style="padding: 10px; font-size: 20px;" id="item-${prod.pid}" onclick="addToCart(this);" type="button" name="button">Add to Cart</button>
                  </div>
                </div>
              <!-- </div> -->
            </div>
            <hr style="margin-bottom: 50px;">
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
            var elems = document.getElementsByClassName('addToCart');
            for (var c = 0; c < elems.length; c++) {
              console.log('cart pid: ' + elems[c].id.split('-')[1]);
              console.log(pids);
              console.log(pids.includes(parseInt(elems[c].id.split('-')[1])));
              if (pids.includes(parseInt(elems[c].id.split('-')[1]))) {
                document.getElementById(elems[c].id).style.backgroundColor = '#cc2424';
                document.getElementById(elems[c].id).style.borderColor = '#cc2424';
                document.getElementById(elems[c].id).innerText = 'Remove from Cart';
                document.getElementById(elems[c].id).setAttribute('onclick', 'removeCart(this)');
              }
            }
          }
        }
    },
     error: function(error) {
       console.log(error);
     },
     dataType: 'json',
     processData: false,
     contentType: false
    });
  }
}




//
