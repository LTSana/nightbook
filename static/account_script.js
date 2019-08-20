// Javascript for account page

// Check if password can be used
var typingtimer_password; // timer identifier
function check_1() {
	// Show a loading gif
	document.getElementById("password_check").innerHTML = "<img alt='loading...' src='static/loading_gifs/double_ring.gif' style='width: 5%;'>";
	
	clearInterval(typingtimer_password) // Clear the countdown
	if ($("#new_password").val() && $("#new_password").val().length > 7) {
		typingtimer_password = setTimeout(donetyping_password, 1000); // Start the countdown
	} else {
		document.getElementById("password_check").innerHTML = "<span style='color: red;'>Please provide a valid password.</span>";
	}
	
	function donetyping_password () {
		document.getElementById("password_check").innerHTML = "<span style='color: green;'>Looks good!</span>";
	}
}

// Check if confirm password matches password
var typingtimer_confirm_password; // timer identifier
function check_2() {
	// Show a loading gif
	document.getElementById("confirm_password_check").innerHTML = "<img alt='loading...' src='static/loading_gifs/double_ring.gif' style='width: 5%;'>";
	
	clearInterval(typingtimer_confirm_password) // Clear the countdown
	if ($("#confirm_password").val() && $("#confirm_password").val().length > 7) {
		typingtimer_confirm_password = setTimeout(donetyping_confirm_password, 1000); // Start the countdown
	} else {
		document.getElementById("confirm_password_check").innerHTML = "<span style='color: red;'>Please provide a valid password.</span>";
	}
	
	function donetyping_confirm_password () {

		if ($("#confirm_password").val() == $("#new_password").val()) {
			document.getElementById("confirm_password_check").innerHTML = "<span style='color: green;'>Looks good!</span>";
		} else {
			document.getElementById("confirm_password_check").innerHTML = "<span style='color: red;'>Password does not match!</span>";
		}
	}
}