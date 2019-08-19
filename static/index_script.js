// SCript for Index page

// Search the Database for prediction to put in the datalist
var typingtimer_prediction;
function check_prediction_search() {

	clearInterval(typingtimer_prediction);
	if ($("#search_bar").val()) {
		typingtimer_prediction = setTimeout(donetyping_prediction, 1000);
	}

	function donetyping_prediction() {
		let parameters = {
			search_bar : $("#search_bar").val()
		}
		$.getJSON("/search_bar_prediction", parameters, function(data) {
			var i = 0;
			var items_for_options;
			for (i = 0; i < data.PREDICTION_RESULT.length; i++) {
				
				if (!items_for_options) {
					items_for_options = "<option value=\'"+ data.PREDICTION_RESULT[i].SEARCH_RESULT +"\'></option>";
				} else {
					items_for_options += "<option value=\'"+ data.PREDICTION_RESULT[i].SEARCH_RESULT +"\'></option>"
				}
			}
			document.getElementById("list_book").innerHTML = items_for_options
		})
	}
}

// Search the Database for book details
var typingtimer_search;
function search_bar_click() {
	// Show a loading gif
	document.getElementById("book_results").innerHTML = "<img alt='loading...' id='loading_gif' src='static/loading_gifs/double_ring.gif'>";

	clearInterval(typingtimer_search);
	if ($("#search_bar").val()) {
		typingtimer_search = setTimeout(donetyping_search, 1000);
	}

	function donetyping_search() {
		let parameters = {
			search_bar : $("#search_bar").val()
		}
		$.getJSON("/search_book", parameters, function(data) {
			var i = 0;
			var items_for_book;
			for (i = 0; i < data.BOOK_RESULTS.length; i++) {
				
				if (!items_for_book) {

					if (data.BOOK_RESULTS[i].average_online_rating == "0.0") {
						online_rating_image = "static/book_star_images/zero_star_books.png"
					} else if (data.BOOK_RESULTS[i].average_online_rating > "0"
							   && data.BOOK_RESULTS[i].average_online_rating < "1") {
						online_rating_image = "static/book_star_images/half_star_books.png"
					} else if (data.BOOK_RESULTS[i].average_online_rating == "1.00") {
						online_rating_image = "static/book_star_images/one_star_books.png"
					} else if (data.BOOK_RESULTS[i].average_online_rating > "1"
							   && data.BOOK_RESULTS[i].average_online_rating < "2") {
						online_rating_image = "static/book_star_images/one_half_star_books.png"
					} else if (data.BOOK_RESULTS[i].average_online_rating == "2.00") {
						online_rating_image = "static/book_star_images/two_star_books.png"
					} else if (data.BOOK_RESULTS[i].average_online_rating > "2"
							   && data.BOOK_RESULTS[i].average_online_rating < "3") {
						online_rating_image = "static/book_star_images/two_half_star_books.png"
					} else if (data.BOOK_RESULTS[i].average_online_rating == "3.00") {
						online_rating_image = "static/book_star_images/three_star_books.png"
					} else if (data.BOOK_RESULTS[i].average_online_rating > "3"
							   && data.BOOK_RESULTS[i].average_online_rating < "4") {
						online_rating_image = "static/book_star_images/three_half_star_books.png"
					} else if (data.BOOK_RESULTS[i].average_online_rating == "4.00") {
						online_rating_image = "static/book_star_images/four_star_books.png"
					} else if (data.BOOK_RESULTS[i].average_online_rating > "4"
							   && data.BOOK_RESULTS[i].average_online_rating < "5") {
						online_rating_image = "static/book_star_images/four_half_star_books.png"
					} else if (data.BOOK_RESULTS[i].average_online_rating == "5.00") {
						online_rating_image = "static/book_star_images/five_star_books.png"
					}

					if (data.BOOK_RESULTS[i].local_average_rating == "0.0" | !data.BOOK_RESULTS[i].local_average_rating) {
						local_rating_image = "static/book_star_images/zero_star_books.png"
					} else if (data.BOOK_RESULTS[i].local_average_rating > "0"
							   && data.BOOK_RESULTS[i].local_average_rating < "1") {
						local_rating_image = "static/book_star_images/half_star_books.png"
					} else if (data.BOOK_RESULTS[i].local_average_rating == "1.0") {
						local_rating_image = "static/book_star_images/one_star_books.png"
					} else if (data.BOOK_RESULTS[i].local_average_rating > "1"
							   && data.BOOK_RESULTS[i].local_average_rating < "2") {
						local_rating_image = "static/book_star_images/one_half_star_books.png"
					} else if (data.BOOK_RESULTS[i].local_average_rating == "2.0") {
						local_rating_image = "static/book_star_images/two_star_books.png"
					} else if (data.BOOK_RESULTS[i].local_average_rating > "2"
							   && data.BOOK_RESULTS[i].local_average_rating < "3") {
						local_rating_image = "static/book_star_images/two_half_star_books.png"
					} else if (data.BOOK_RESULTS[i].local_average_rating == "3.0") {
						local_rating_image = "static/book_star_images/three_star_books.png"
					} else if (data.BOOK_RESULTS[i].local_average_rating > "3"
							   && data.BOOK_RESULTS[i].local_average_rating < "4") {
						local_rating_image = "static/book_star_images/three_half_star_books.png"
					} else if (data.BOOK_RESULTS[i].local_average_rating == "4.0") {
						local_rating_image = "static/book_star_images/four_star_books.png"
					} else if (data.BOOK_RESULTS[i].local_average_rating > "4"
							   && data.BOOK_RESULTS[i].local_average_rating < "5") {
						local_rating_image = "static/book_star_images/four_half_star_books.png"
					} else if (data.BOOK_RESULTS[i].local_average_rating == "5.0") {
						local_rating_image = "static/book_star_images/five_star_books.png"
					}

					items_for_book = "<div class='card'> \
										<div class='card-body'> \
											<h5 class='card-title'>Title: "+ data.BOOK_RESULTS[i].title +"</h5> \
											<ul class='list-unstyled'> \
												<li class='card-text'>Author: "+ data.BOOK_RESULTS[i].author +"</li> \
												<li class='card-text'>Year: "+ data.BOOK_RESULTS[i].year +"</li> \
												<li class='card-text'>ISBN: "+ data.BOOK_RESULTS[i].isbn +"</li> \
												<li class='card-text'>Online rates: "+ data.BOOK_RESULTS[i].work_ratings_count +"</li> \
											</ul> \
											<img src='"+ online_rating_image +"' style='width: 80%;' id='online_stars'> \
											<label for='online_stars'>Average online rate: "+ data.BOOK_RESULTS[i].average_online_rating +"</label> \
											<img src='"+ local_rating_image +"' style='width: 80%;' id='local_stars'> \
											<label for='local_stars'>Average local rate: "+ data.BOOK_RESULTS[i].local_average_rating +"</label> \
											<br> \
											<ul class='list-unstyled'> \
												<li class='card-text'>Online Reviews: "+ data.BOOK_RESULTS[i].work_reviews_count +"</li> \
												<li class='card-text'>Local Reviews: "+ data.BOOK_RESULTS[i].local_reviews_count +"</li> \
											</ul> \
											<a href='book_details/"+ data.BOOK_RESULTS[i].book_id +"'><button id='review_button' class='btn btn-primary'>View Reviews</button></a> \
										</div> \
									</div>"
				} else {
					if (data.BOOK_RESULTS[i].average_online_rating == "0.0") {
						online_rating_image = "static/book_star_images/zero_star_books.png"
					} else if (data.BOOK_RESULTS[i].average_online_rating > "0"
							   && data.BOOK_RESULTS[i].average_online_rating < "1") {
						online_rating_image = "static/book_star_images/half_star_books.png"
					} else if (data.BOOK_RESULTS[i].average_online_rating == "1.00") {
						online_rating_image = "static/book_star_images/one_star_books.png"
					} else if (data.BOOK_RESULTS[i].average_online_rating > "1"
							   && data.BOOK_RESULTS[i].average_online_rating < "2") {
						online_rating_image = "static/book_star_images/one_half_star_books.png"
					} else if (data.BOOK_RESULTS[i].average_online_rating == "2.00") {
						online_rating_image = "static/book_star_images/two_star_books.png"
					} else if (data.BOOK_RESULTS[i].average_online_rating > "2"
							   && data.BOOK_RESULTS[i].average_online_rating < "3") {
						online_rating_image = "static/book_star_images/two_half_star_books.png"
					} else if (data.BOOK_RESULTS[i].average_online_rating == "3.00") {
						online_rating_image = "static/book_star_images/three_star_books.png"
					} else if (data.BOOK_RESULTS[i].average_online_rating > "3"
							   && data.BOOK_RESULTS[i].average_online_rating < "4") {
						online_rating_image = "static/book_star_images/three_half_star_books.png"
					} else if (data.BOOK_RESULTS[i].average_online_rating == "4.00") {
						online_rating_image = "static/book_star_images/four_star_books.png"
					} else if (data.BOOK_RESULTS[i].average_online_rating > "4"
							   && data.BOOK_RESULTS[i].average_online_rating < "5") {
						online_rating_image = "static/book_star_images/four_half_star_books.png"
					} else if (data.BOOK_RESULTS[i].average_online_rating == "5.00") {
						online_rating_image = "static/book_star_images/five_star_books.png"
					}

					if (data.BOOK_RESULTS[i].local_average_rating == "0.0" | !data.BOOK_RESULTS[i].local_average_rating) {
						local_rating_image = "static/book_star_images/zero_star_books.png"
					} else if (data.BOOK_RESULTS[i].local_average_rating > "0"
							   && data.BOOK_RESULTS[i].local_average_rating < "1") {
						local_rating_image = "static/book_star_images/half_star_books.png"
					} else if (data.BOOK_RESULTS[i].local_average_rating == "1.0") {
						local_rating_image = "static/book_star_images/one_star_books.png"
					} else if (data.BOOK_RESULTS[i].local_average_rating > "1"
							   && data.BOOK_RESULTS[i].local_average_rating < "2") {
						local_rating_image = "static/book_star_images/one_half_star_books.png"
					} else if (data.BOOK_RESULTS[i].local_average_rating == "2.0") {
						local_rating_image = "static/book_star_images/two_star_books.png"
					} else if (data.BOOK_RESULTS[i].local_average_rating > "2"
							   && data.BOOK_RESULTS[i].local_average_rating < "3") {
						local_rating_image = "static/book_star_images/two_half_star_books.png"
					} else if (data.BOOK_RESULTS[i].local_average_rating == "3.0") {
						local_rating_image = "static/book_star_images/three_star_books.png"
					} else if (data.BOOK_RESULTS[i].local_average_rating > "3"
							   && data.BOOK_RESULTS[i].local_average_rating < "4") {
						local_rating_image = "static/book_star_images/three_half_star_books.png"
					} else if (data.BOOK_RESULTS[i].local_average_rating == "4.0") {
						local_rating_image = "static/book_star_images/four_star_books.png"
					} else if (data.BOOK_RESULTS[i].local_average_rating > "4"
							   && data.BOOK_RESULTS[i].local_average_rating < "5") {
						local_rating_image = "static/book_star_images/four_half_star_books.png"
					} else if (data.BOOK_RESULTS[i].local_average_rating == "5.0") {
						local_rating_image = "static/book_star_images/five_star_books.png"
					}

					items_for_book += "<div class='card'> \
										<div class='card-body'> \
											<h5 class='card-title'>Title: "+ data.BOOK_RESULTS[i].title +"</h5> \
											<ul class='list-unstyled'> \
												<li class='card-text'>Author: "+ data.BOOK_RESULTS[i].author +"</li> \
												<li class='card-text'>Year: "+ data.BOOK_RESULTS[i].year +"</li> \
												<li class='card-text'>ISBN: "+ data.BOOK_RESULTS[i].isbn +"</li> \
												<li class='card-text'>Online rates: "+ data.BOOK_RESULTS[i].work_ratings_count +"</li> \
											</ul> \
											<img src='"+ online_rating_image +"' style='width: 80%;' id='online_stars'> \
											<label for='online_stars'>Average online rate: "+ data.BOOK_RESULTS[i].average_online_rating +"</label> \
											<img src='"+ local_rating_image +"' style='width: 80%;' id='local_stars'> \
											<label for='local_stars'>Average local rate: "+ data.BOOK_RESULTS[i].local_average_rating +"</label> \
											<br> \
											<ul class='list-unstyled'> \
												<li class='card-text'>Online Reviews: "+ data.BOOK_RESULTS[i].work_reviews_count +"</li> \
												<li class='card-text'>Local Reviews: "+ data.BOOK_RESULTS[i].local_reviews_count +"</li> \
											</ul> \
											<a href='book_details/"+ data.BOOK_RESULTS[i].book_id +"'><button id='review_button' class='btn btn-primary'>View Reviews</button></a> \
										</div> \
									</div>"
				}
			}
			if (data.BOOK_RESULTS.length == 0) {
				items_for_book = "<div class='alert alert-dark' role='alert'>Sorry we don't have any records of that book.</div>"
			}
			document.getElementById("book_results").innerHTML = items_for_book
		})
	}
}