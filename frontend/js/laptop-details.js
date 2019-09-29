
if (checkData('user')) {
  $('#login').addClass('hidden');
} else {
  $('#signout').addClass('hidden');
}


$(document).ready(function () {

  $.ajax({
    type: "POST",
    url: apiurl + '/product/fetchone.php',
    data: '',
    success: function(data) {
      console.log(JSON.parse(data[0]));
      console.log(data.length);
      for (var i = 0; i < data.length; i++) {
        var prod = JSON.parse(data[i]);
        $('#productsDiv').append(
          `
          <div class="row" style="padding:20px;">
            <div class="col-4" align="center" style="background:#ededed; margin-left:50px;">
              <div style="margin:20px;">
                <img src="../resources/img/laptops/brands/dell.png" width="80%">
              </div>
              <div style="margin-top:50px;">
                <button class="btn-blue" style="padding: 10px; font-size: 20px;" type="button" name="button">Add to Cart</button>
              </div>
            </div>
            <div class="col-6" align="left" style="margin-left:30px;">
              <div class="row" style="padding:20px;">
                <strong style="font-size:38px; ">Dell inspiron i5 processor 15.6 INCH 1TB </strong>
              </div>
              <div class="row">
                <div class="col-3" style="padding:20px;font-size:20px;" align="center">
                  <b>Warranty : </b>
                </div>
                <div class="col-3">
                  1 Year Warranty
                </div>
              </div>
              <div class="row">
                <div class="col-3" style="padding:20px;font-size:20px;" align="center">
                  <b>Highlights :</b>
                </div>
                <div class="col-3">
                  <ul>
                    <li style="padding:5px;">i5 Processor</li>
                    <li style="padding:5px;">8GB DDR4 RAM</li>
                    <li style="padding:5px;">Windows 10 Home</li>
                  </ul>
                </div>
              </div>
              <div class="row">
                <div class="col-3" style="padding:20px;font-size:20px;" align="center">
                  <b>Specifications :</b>
                </div>
                <div class="col-3">
                  <ul>
                    <li style="padding:5px;">i5 Processor</li>
                    <li style="padding:5px;">15.6 INCH</li>
                    <li style="padding:5px;">2TB</li>
                    <li style="padding:5px;">8GB DDR4 RAM</li>
                    <li style="padding:5px;">Windows 10 Home</li>
                    <li style="padding:5px;">1 Year Warranty</li>
                    <li style="padding:5px;">&#8377;49900</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
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
