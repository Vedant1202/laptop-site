$('#add').click(function () {
	// alert('hi');

	var name = $('#name').val().trim(),
			display = $('#display').val().trim(),
			storage = $('#storage').val().trim(),
      ram = $('#ram').val().trim(),
      os = $('#os').val().trim(),
      processor = $('#processor').val().trim(),
      warranty = $('#warranty').val().trim(),
      price = $('#price').val().trim();


	if (name && display && storage && processor && ram && os && warranty && price && $('#img')[0].files[0]) {

    var img =  document.getElementById('img').files[0];
    var formdata = new FormData();

    formdata.append('name', name);
    formdata.append('display', display);
    formdata.append('storage', storage);
    formdata.append('ram', ram);
    formdata.append('os', os);
    formdata.append('warranty', warranty);
    formdata.append('price', price);
    formdata.append('processor', processor);
    formdata.append('file', img);

    // console.log(formdata);

		$.ajax({
			
			type: "POST",
			url: apiurl + '/product/add.php',
			data: formdata,
			success: function(data) {
				console.log('done');
				window.location.reload();
				// setData('user', JSON.stringify(data));
				// Nav.assign('home.html')
			},
		 error: function(error) {
			 console.log(error);
		 },
     dataType: 'json',
     processData: false,
     contentType: false
	  });

  } else {
		alert('Please enter all the fields');
	}

});






//
