
if (checkData('user')) {
  $('#login').addClass('hidden');
} else {
  $('#signout').addClass('hidden');
}

deleteData('laptopDetails');

$(document).ready(function () {

  fetchCart(getData('user')[1].uid, true);

  $.ajax({
    type: "POST",
    url: apiurl + '/product/compare.php',
    data: getData('compare'),
    success: function(data) {
      console.log(JSON.parse(data[0]));
      var laptop1 = JSON.parse(data[0]);
      var laptop2 = JSON.parse(data[1]);

      $('#compareDiv').append(
        `
          <table>
            <tr>
              <th></th>
              <td><img src="${laptop1.imgname}" width="80%"></td>
              <td><img src="${laptop2.imgname}" width="80%"></td>
            </tr>
            <tr>
              <th>Model Name</th>
              <td>
                ${laptop1.name}
              </td>
              <td>
              ${laptop2.name}
              </td>
            </tr>
            <tr>
              <th>Display Size</th>
              <td>${laptop1.display} Inch</td>
              <td>${laptop2.display} Inch</td>
            </tr>
            <tr>
              <th>Storage</th>
              <td>${laptop1.storage} TB</td>
              <td>${laptop2.storage} TB</td>
            </tr>
            <tr>
              <th>RAM</th>
              <td>${laptop1.ram} GB DDR4</td>
              <td>${laptop2.ram} GB DDR3</td>
            </tr>
            <tr>
              <th>OS</th>
              <td>${laptop1.os}</td>
              <td>${laptop2.os}</td>
            </tr>
            <tr>
              <th>Warranty</th>
              <td>${laptop1.warranty} Year</td>
              <td>${laptop2.warranty} Year</td>
            </tr>
            <tr>
              <th>Price</th>
              <td>&#8377; ${laptop1.price}</td>
              <td>&#8377; ${laptop2.price}</td>
            </tr>
          </table>
        `
      );
    },
   error: function(error) {
     console.log(error);
   },
   dataType: 'json',
  });

});









//
