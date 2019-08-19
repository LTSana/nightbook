// Javascript for book information page

var book_1_half;
var book_1_full;
var book_2_half;
var book_2_full;
var book_3_half;
var book_3_full;
var book_4_half;
var book_4_full;
var book_5_half;
var book_5_full;

// Change the empty left half book to yellow
function left_star_1_hot() {
	if (!book_1_half) {
		document.getElementById("left_star_1").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book.png' alt='select_star'>";
		document.getElementById("right_star_1").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book_empty.png' alt='select_star'>";
		document.getElementById("left_star_2").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book_empty.png' alt='select_star'>";
		document.getElementById("right_star_2").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book_empty.png' alt='select_star'>";
		document.getElementById("left_star_3").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book_empty.png' alt='select_star'>";
		document.getElementById("right_star_3").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book_empty.png' alt='select_star'>";
		document.getElementById("left_star_4").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book_empty.png' alt='select_star'>";
		document.getElementById("right_star_4").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book_empty.png' alt='select_star'>";
		document.getElementById("left_star_5").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book_empty.png' alt='select_star'>";
		document.getElementById("right_star_5").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book_empty.png' alt='select_star'>";

		book_1_half = true;
		book_1_full = false;
		book_2_half = false;
		book_2_full = false;
		book_3_half = false;
		book_3_full = false;
		book_4_half = false;
		book_4_full = false;
		book_5_half = false;
		book_5_full = false;

		// Change the value of the book_rate_couter
		document.getElementById("book_rate_selected").value = "0.5";
	}
}

// Change the empty right half book to yellow
function right_star_1_hot() {
	if (!book_1_full) {
		document.getElementById("left_star_1").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book.png' alt='select_star'>";
		document.getElementById("right_star_1").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book.png' alt='select_star'>";
		document.getElementById("left_star_2").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book_empty.png' alt='select_star'>";
		document.getElementById("right_star_2").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book_empty.png' alt='select_star'>";
		document.getElementById("left_star_3").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book_empty.png' alt='select_star'>";
		document.getElementById("right_star_3").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book_empty.png' alt='select_star'>";
		document.getElementById("left_star_4").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book_empty.png' alt='select_star'>";
		document.getElementById("right_star_4").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book_empty.png' alt='select_star'>";
		document.getElementById("left_star_5").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book_empty.png' alt='select_star'>";
		document.getElementById("right_star_5").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book_empty.png' alt='select_star'>";

		book_1_half = false;
		book_1_full = true;
		book_2_half = false;
		book_2_full = false;
		book_3_half = false;
		book_3_full = false;
		book_4_half = false;
		book_4_full = false;
		book_5_half = false;
		book_5_full = false;

		// Change the value of the book_rate_couter
		document.getElementById("book_rate_selected").value = "1";
	}
}

// Change the empty left half book to yellow
function left_star_2_hot() {
	if (!book_2_half) {
		document.getElementById("left_star_1").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book.png' alt='select_star'>";
		document.getElementById("right_star_1").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book.png' alt='select_star'>";
		document.getElementById("left_star_2").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book.png' alt='select_star'>";
		document.getElementById("right_star_2").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book_empty.png' alt='select_star'>";
		document.getElementById("left_star_3").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book_empty.png' alt='select_star'>";
		document.getElementById("right_star_3").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book_empty.png' alt='select_star'>";
		document.getElementById("left_star_4").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book_empty.png' alt='select_star'>";
		document.getElementById("right_star_4").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book_empty.png' alt='select_star'>";
		document.getElementById("left_star_5").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book_empty.png' alt='select_star'>";
		document.getElementById("right_star_5").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book_empty.png' alt='select_star'>";

		book_1_half = false;
		book_1_full = false;
		book_2_half = true;
		book_2_full = false;
		book_3_half = false;
		book_3_full = false;
		book_4_half = false;
		book_4_full = false;
		book_5_half = false;
		book_5_full = false;

		// Change the value of the book_rate_couter
		document.getElementById("book_rate_selected").value = "1.5";
	}
}

// Change the empty right half book to yellow
function right_star_2_hot() {
	if (!book_2_full) {
		document.getElementById("left_star_1").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book.png' alt='select_star'>";
		document.getElementById("right_star_1").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book.png' alt='select_star'>";
		document.getElementById("left_star_2").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book.png' alt='select_star'>";
		document.getElementById("right_star_2").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book.png' alt='select_star'>";
		document.getElementById("left_star_3").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book_empty.png' alt='select_star'>";
		document.getElementById("right_star_3").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book_empty.png' alt='select_star'>";
		document.getElementById("left_star_4").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book_empty.png' alt='select_star'>";
		document.getElementById("right_star_4").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book_empty.png' alt='select_star'>";
		document.getElementById("left_star_5").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book_empty.png' alt='select_star'>";
		document.getElementById("right_star_5").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book_empty.png' alt='select_star'>";

		book_1_half = false;
		book_1_full = false;
		book_2_half = false;
		book_2_full = true;
		book_3_half = false;
		book_3_full = false;
		book_4_half = false;
		book_4_full = false;
		book_5_half = false;
		book_5_full = false;

		// Change the value of the book_rate_couter
		document.getElementById("book_rate_selected").value = "2";
	}
}

// Change the empty left half book to yellow
function left_star_3_hot() {
	if (!book_3_half) {
		document.getElementById("left_star_1").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book.png' alt='select_star'>";
		document.getElementById("right_star_1").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book.png' alt='select_star'>";
		document.getElementById("left_star_2").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book.png' alt='select_star'>";
		document.getElementById("right_star_2").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book.png' alt='select_star'>";
		document.getElementById("left_star_3").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book.png' alt='select_star'>";
		document.getElementById("right_star_3").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book_empty.png' alt='select_star'>";
		document.getElementById("left_star_4").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book_empty.png' alt='select_star'>";
		document.getElementById("right_star_4").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book_empty.png' alt='select_star'>";
		document.getElementById("left_star_5").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book_empty.png' alt='select_star'>";
		document.getElementById("right_star_5").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book_empty.png' alt='select_star'>";

		book_1_half = false;
		book_1_full = false;
		book_2_half = false;
		book_2_full = false;
		book_3_half = true;
		book_3_full = false;
		book_4_half = false;
		book_4_full = false;
		book_5_half = false;
		book_5_full = false;

		// Change the value of the book_rate_couter
		document.getElementById("book_rate_selected").value = "2.5";
	}
}

// Change the empty right half book to yellow
function right_star_3_hot() {
	if (!book_3_full) {
		document.getElementById("left_star_1").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book.png' alt='select_star'>";
		document.getElementById("right_star_1").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book.png' alt='select_star'>";
		document.getElementById("left_star_2").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book.png' alt='select_star'>";
		document.getElementById("right_star_2").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book.png' alt='select_star'>";
		document.getElementById("left_star_3").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book.png' alt='select_star'>";
		document.getElementById("right_star_3").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book.png' alt='select_star'>";
		document.getElementById("left_star_4").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book_empty.png' alt='select_star'>";
		document.getElementById("right_star_4").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book_empty.png' alt='select_star'>";
		document.getElementById("left_star_5").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book_empty.png' alt='select_star'>";
		document.getElementById("right_star_5").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book_empty.png' alt='select_star'>";

		book_1_half = false;
		book_1_full = false;
		book_2_half = false;
		book_2_full = false;
		book_3_half = false;
		book_3_full = true;
		book_4_half = false;
		book_4_full = false;
		book_5_half = false;
		book_5_full = false;

		// Change the value of the book_rate_couter
		document.getElementById("book_rate_selected").value = "3";
	}
}

// Change the empty left half book to yellow
function left_star_4_hot() {
	if (!book_4_half) {
		document.getElementById("left_star_1").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book.png' alt='select_star'>";
		document.getElementById("right_star_1").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book.png' alt='select_star'>";
		document.getElementById("left_star_2").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book.png' alt='select_star'>";
		document.getElementById("right_star_2").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book.png' alt='select_star'>";
		document.getElementById("left_star_3").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book.png' alt='select_star'>";
		document.getElementById("right_star_3").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book.png' alt='select_star'>";
		document.getElementById("left_star_4").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book.png' alt='select_star'>";
		document.getElementById("right_star_4").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book_empty.png' alt='select_star'>";
		document.getElementById("left_star_5").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book_empty.png' alt='select_star'>";
		document.getElementById("right_star_5").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book_empty.png' alt='select_star'>";

		book_1_half = false;
		book_1_full = false;
		book_2_half = false;
		book_2_full = false;
		book_3_half = false;
		book_3_full = false;
		book_4_half = true;
		book_4_full = false;
		book_5_half = false;
		book_5_full = false;

		// Change the value of the book_rate_couter
		document.getElementById("book_rate_selected").value = "3.5";
	}
}

// Change the empty right half book to yellow
function right_star_4_hot() {
	if (!book_4_full) {
		document.getElementById("left_star_1").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book.png' alt='select_star'>";
		document.getElementById("right_star_1").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book.png' alt='select_star'>";
		document.getElementById("left_star_2").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book.png' alt='select_star'>";
		document.getElementById("right_star_2").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book.png' alt='select_star'>";
		document.getElementById("left_star_3").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book.png' alt='select_star'>";
		document.getElementById("right_star_3").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book.png' alt='select_star'>";
		document.getElementById("left_star_4").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book.png' alt='select_star'>";
		document.getElementById("right_star_4").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book.png' alt='select_star'>";
		document.getElementById("left_star_5").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book_empty.png' alt='select_star'>";
		document.getElementById("right_star_5").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book_empty.png' alt='select_star'>";

		book_1_half = false;
		book_1_full = false;
		book_2_half = false;
		book_2_full = false;
		book_3_half = false;
		book_3_full = false;
		book_4_half = false;
		book_4_full = true;
		book_5_half = false;
		book_5_full = false;

		// Change the value of the book_rate_couter
		document.getElementById("book_rate_selected").value = "4";
	}
}

// Change the empty left half book to yellow
function left_star_5_hot() {
	if (!book_5_half) {
		document.getElementById("left_star_1").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book.png' alt='select_star'>";
		document.getElementById("right_star_1").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book.png' alt='select_star'>";
		document.getElementById("left_star_2").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book.png' alt='select_star'>";
		document.getElementById("right_star_2").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book.png' alt='select_star'>";
		document.getElementById("left_star_3").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book.png' alt='select_star'>";
		document.getElementById("right_star_3").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book.png' alt='select_star'>";
		document.getElementById("left_star_4").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book.png' alt='select_star'>";
		document.getElementById("right_star_4").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book.png' alt='select_star'>";
		document.getElementById("left_star_5").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book.png' alt='select_star'>";
		document.getElementById("right_star_5").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book_empty.png' alt='select_star'>";

		book_1_half = false;
		book_1_full = false;
		book_2_half = false;
		book_2_full = false;
		book_3_half = false;
		book_3_full = false;
		book_4_half = false;
		book_4_full = false;
		book_5_half = true;
		book_5_full = false;

		// Change the value of the book_rate_couter
		document.getElementById("book_rate_selected").value = "4.5";
	}
}

// Change the empty right half book to yellow
function right_star_5_hot() {
	if (!book_5_full) {
		document.getElementById("left_star_1").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book.png' alt='select_star'>";
		document.getElementById("right_star_1").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book.png' alt='select_star'>";
		document.getElementById("left_star_2").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book.png' alt='select_star'>";
		document.getElementById("right_star_2").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book.png' alt='select_star'>";
		document.getElementById("left_star_3").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book.png' alt='select_star'>";
		document.getElementById("right_star_3").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book.png' alt='select_star'>";
		document.getElementById("left_star_4").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book.png' alt='select_star'>";
		document.getElementById("right_star_4").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book.png' alt='select_star'>";
		document.getElementById("left_star_5").innerHTML = "<img id='image_1' src='/static/book_star_images/left_half_book.png' alt='select_star'>";
		document.getElementById("right_star_5").innerHTML = "<img id='image_2' src='/static/book_star_images/right_half_book.png' alt='select_star'>";

		book_1_half = false;
		book_1_full = false;
		book_2_half = false;
		book_2_full = false;
		book_3_half = false;
		book_3_full = false;
		book_4_half = false;
		book_4_full = false;
		book_5_half = false;
		book_5_full = true;
		
		// Change the value of the book_rate_couter
		document.getElementById("book_rate_selected").value = "5";
	}
}