var loginButton = document.getElementById("loginButton");
var registerButton = document.getElementById("registerButton");

loginButton.onclick = function() {
	document.querySelector("#flipper").classList.toggle("flip");
};

registerButton.onclick = function() {
	document.querySelector("#flipper").classList.toggle("flip");
};

$('#login').click(function () {
	// alert('hi');

	var username = $('#username').val().trim();
	var password = $('#password').val().trim();

	if (username && password) {
		if ((username.length <= 6)) {
			alert('Enter username greater than 6 characters');
		}
		if ((password.length <= 8)) {
			alert('Enter password greater than 8 characters');
		}
		if (username.length > 6 && password.length > 8) {

			var data = {
				'username': username,
				'password': password
			};

			$.ajax({
				type: "POST",
				url: apiurl + '/auth/login.php',
				data: data,
				success: function(data) {
					// console.log('done');
					console.log(data);
					if (data[1].login) {
						Nav.assign('products.html');
						setData('user', JSON.stringify(data));
					} else {
						alert('Wrong user credentials');
					}
					// Nav.assign('home.html')
				},
			 error: function(error) {
				 console.log(error);
			 },
			 dataType: 'json'
			});
		}
	} else {
		alert('Please enter all the fields');
	}

});


$('#signup').click(function () {
	// alert('hi');

	var username = $('#uname').val().trim(),
			fname = $('#fname').val().trim(),
			lname = $('#lname').val().trim(),
			// phno = $('#phno').val().trim(),
	 		password = $('#passwd').val().trim();


	if (username && password && fname && lname) {
		if (username.length <= 6) {
			alert('Enter username greater than 6 characters');
		}
		if (password.length <= 8) {
			alert('Enter password greater than 8 characters');
		}
		if (username.length > 6 && password.length > 8) {

			var data = {
				'username': username,
				'password': password,
				// 'phno': phno,
				'fname': fname,
				'lname': lname
			};

			$.ajax({
				type: "POST",
				url: apiurl + '/user/add.php',
				data: data,
				success: function(data) {
					console.log('done');
					window.location.reload();
					// setData('user', JSON.stringify(data));
					// Nav.assign('home.html')
				},
			 error: function(error) {
				 console.log(error);
			 },
			 dataType: 'json'
			});
		}

	} else {
		alert('Please enter all the fields');
	}

});






//
