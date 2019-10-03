
if (checkData('user')) {
  $('#login').addClass('hidden');
} else {
  $('#signout').addClass('hidden');
}

deleteData('laptopDetails');
deleteData('compare');

$(document).ready(function () {

  $.ajax({
    type: "POST",
    url: apiurl + '/product/fetchall.php',
    data: '',
    success: function(data) {
      console.log(JSON.parse(data[0]));
      console.log(data.length);
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
                  <button class="btn-blue addToCart" style="padding: 10px; font-size: 20px;" type="button" id="${prod.pid}" onclick="addToCart();" name="button">Add to Cart</button>
                </div>
              </div>
            <!-- </div> -->
          </div>
          <hr style="margin-bottom: 50px;">
          `
        );
      }
      if (checkData('user')) {
        $('.addToCart').attr('disabled', '');
      }
    },
   error: function(error) {
     console.log(error);
   },
   dataType: 'json',
   processData: false,
   contentType: false
  });

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
                      <button class="btn-blue addToCart" style="padding: 10px; font-size: 20px;" type="button" id="${prod.pid}" onclick="addToCart();" name="button">Add to Cart</button>
                    </div>
                  </div>
                <!-- </div> -->
              </div>
              <hr style="margin-bottom: 50px;">
              `
            );
          }
          if (checkData('user')) {
            $('.addToCart').attr('disabled', '');
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
                    <button class="btn-blue addToCart" style="padding: 10px; font-size: 20px;" id="${prod.pid}" onclick="addToCart();" type="button" name="button">Add to Cart</button>
                  </div>
                </div>
              <!-- </div> -->
            </div>
            <hr style="margin-bottom: 50px;">
            `
          );
        }
        if (checkData('user')) {
          $('.addToCart').attr('disabled', '');
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


function addToCart(elem) {

  $.ajax({
    type: "POST",
    url: apiurl + '/cart/add.php',
    data: {
      'pid': elem.id,
      'uid':
    },
    success: function(data) {
      console.log(data.length);
    },
   error: function(error) {
     console.log(error);
   },
   dataType: 'json',
   processData: false,
   contentType: false
  });

}



//
