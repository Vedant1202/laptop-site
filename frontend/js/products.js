
if (checkData('user')) {
  $('#login').addClass('hidden');
} else {
  $('#signout').addClass('hidden');
}

deleteData('laptopDetails');

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
          <div class="row"  style="cursor: pointer;" onclick="setData('laptopDetails', JSON.stringify({'pid': ${prod.pid}})); Nav.assign('laptop-details.html');" style="margin-bottom: 50px;">
            <!-- <div class="laptop-item"> -->
              <div class="col-4">
                <img src="${prod.imgname}" class="laptops" style="width: 70%;">
              </div>
              <div class="col-4">
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
                  <input type="checkbox" name="" value=""><b>Add To Compare</b><br>
                </div>
                <div class="row" style="padding-top:15px ;">
                  <button class="btn-blue" style="padding: 10px; font-size: 20px;" type="button" name="button">Add to Cart</button>
                </div>
              </div>
            <!-- </div> -->
          </div>
          <hr style="margin-bottom: 50px;">
          `
        );
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









//
