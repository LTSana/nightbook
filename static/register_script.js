// Javascript for Register Page

// Check for first name
function check_1() {
	// Show a loading gif
	document.getElementById("first_name_check").innerHTML = "<img src='static/loading_gifs/double_ring.gif' style='width: 5%;'>";
	
	var first_name;
	setTimeout ( function () {
		first_name = $("#first_name").val();
		if (!first_name) {
			document.getElementById("first_name_check").innerHTML = "<span style='color: red;'>Missing First Name</span>";
		} else {
			document.getElementById("first_name_check").innerHTML = "<span style='color: green;'>Looks good!</span>";
		}
	}, 2000)
}

// Check for last name
function check_2() {
	// Show a loading gif
	document.getElementById("last_name_check").innerHTML = "<img src='static/loading_gifs/double_ring.gif' style='width: 5%;'>";
	
	var last_name;
	setTimeout ( function () {
		last_name = $("#last_name").val();
		if (!last_name) {
			document.getElementById("last_name_check").innerHTML = "<span style='color: red;'>Missing Last Name</span>";
		} else {
			document.getElementById("last_name_check").innerHTML = "<span style='color: green;'>Looks good!</span>";
		}
	}, 2000)
}

// Check if username can be used
var typingtimer_username; // timer identifier
function check_3() {
	// Show a loading gif
	document.getElementById("username_check").innerHTML = "<img alt='loading...' src='static/loading_gifs/double_ring.gif' style='width: 5%;'>";
	clearInterval(typingtimer_username) // Clear the countdown
	if ($("#username").val()) {
		typingtimer_username = setTimeout(donetyping_username, 5000); // Start the countdown
	} else {
		document.getElementById("username_check").innerHTML = "<span style='color: red;'>Please choose a unique and valid username.</span>";
	}
	
	function donetyping_username () {
		let parameters = {
			username: $("#username").val()
		}
		var STATUS;
		$.getJSON("/check_username", parameters, function(data) {
			STATUS = data.USERNAME_STATUS;
			if (STATUS == "NOT_GOOD") {
				document.getElementById("username_check").innerHTML = "<span style='color: red;'>Please choose a unique and valid username.</span>";
			} else if (STATUS == "GOOD") {
				document.getElementById("username_check").innerHTML = "<span style='color: green;'>Looks good!</span>";
			} else if (STATUS == "USED") {
				document.getElementById("username_check").innerHTML = "<span style='color: orange;'>Already being used!</span>";
			}
		});
	}
}

// Check if email can be used
// Thank to NonameSL on Overflow for a stop typing timer
//setup before functions
var typingTimer;                //timer identifier
var doneTypingInterval = 5000;  //time in ms (5 seconds)
function check_4() {
	// Show a loading gif
	document.getElementById("email_check").innerHTML = "<img alt='loading...' src='static/loading_gifs/double_ring.gif' style='width: 4%;'>";

	//on keyup, start the countdown
	clearTimeout(typingTimer);
	if ($('#email').val()) {
		typingTimer = setTimeout(doneTyping, doneTypingInterval);
	} else {
		document.getElementById("email_check").innerHTML = "<span style='color: red;'>Please provide a valid email.</span>";
	}

	//user is "finished typing," do something
	function doneTyping () {
		let parameters = {
			email: $("#email").val()
		}
		var STATUS;
		$.getJSON("/check_email", parameters, function(data) {
			STATUS = data.EMAIL_STATUS;
			if (STATUS == "NOT_GOOD") {
				document.getElementById("email_check").innerHTML = "<span style='color: red;'>Please provide a valid email.</span>";
			} else if (STATUS == "GOOD") {
				document.getElementById("email_check").innerHTML = "<span style='color: green;'>Looks good!</span>";
			} else if (STATUS == "USED") {
				document.getElementById("email_check").innerHTML = "<span style='color: orange;'>Already being used!</span>";
			}
		});
	}
}

// Check if password can be used
var typingtimer_password; // timer identifier
function check_5() {
	// Show a loading gif
	document.getElementById("password_check").innerHTML = "<img alt='loading...' src='static/loading_gifs/double_ring.gif' style='width: 5%;'>";
	
	clearInterval(typingtimer_password) // Clear the countdown
	if ($("#password").val() && $("#password").val().length > 7) {
		typingtimer_password = setTimeout(donetyping_password, 500); // Start the countdown
	} else {
		document.getElementById("password_check").innerHTML = "<span style='color: red;'>Please provide a valid password.</span>";
	}
	
	function donetyping_password () {
		document.getElementById("password_check").innerHTML = "<span style='color: green;'>Looks good!</span>";
	}
}

// Check if confirm password matches password
var typingtimer_confirm_password; // timer identifier
function check_6() {
	// Show a loading gif
	document.getElementById("confirm_password_check").innerHTML = "<img alt='loading...' src='static/loading_gifs/double_ring.gif' style='width: 5%;'>";
	
	clearInterval(typingtimer_confirm_password) // Clear the countdown
	if ($("#confirm_password").val() && $("#confirm_password").val().length > 7) {
		typingtimer_confirm_password = setTimeout(donetyping_confirm_password, 500); // Start the countdown
	} else {
		document.getElementById("confirm_password_check").innerHTML = "<span style='color: red;'>Please provide a valid password.</span>";
	}
	
	function donetyping_confirm_password () {

		if ($("#confirm_password").val() == $("#password").val()) {
			document.getElementById("confirm_password_check").innerHTML = "<span style='color: green;'>Looks good!</span>";
		} else {
			document.getElementById("confirm_password_check").innerHTML = "<span style='color: red;'>Password does not match!</span>";
		}
	}
}