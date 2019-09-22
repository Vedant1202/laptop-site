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
		if (!(username.length > 6)) {
			alert('Enter username greater than 6 characters');
		}
		if (!(password.length > 8)) {
			alert('Enter password greater than 8 characters');
		}
		if (username.length > 6 && password.length > 8) {

			var data = {
				'username': username,
				'password': password
			};

			$.ajax({
				type: "POST",
				url: 'http://localhost:8080/laptop-site/backend/api/auth/login.php',
				data: data,
				success: function(data) {
					console.log('done');
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
		alert('Please enter all the fields')
	}

});






//
