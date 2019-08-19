#!/usr/bin/python
# Application Python Book

import os
import requests
import time

# For production server
from waitress import serve

from flask import Flask, session, render_template, redirect, request, flash, jsonify
from flask_session import Session
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from werkzeug.security import generate_password_hash, check_password_hash

# Custom tools
from login_tool import login_required

app = Flask(__name__)

# Check for environment variable
if not os.getenv("DATABASE_URL"):
	raise RuntimeError("DATABASE_URL is not set")

# If you are making any CSS changes activate these to not save Cache of the page
@app.after_request
def after_request(response):
    #response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    #response.headers["Expires"] = 0
    #response.headers["Pragma"] = "no-cache"
    return response

# Configure session to use filesystem
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Set up database
engine = create_engine(os.getenv("DATABASE_URL"), pool_size=20, max_overflow=0)
db = scoped_session(sessionmaker(bind=engine))

@app.errorhandler(404)
def not_found_page(e):
	return render_template("404.html"), 404

@app.route("/", methods=["GET"])
@login_required
def index():
	"""Show home page Stuff"""

	return render_template("index.html")


@app.route("/search_bar_prediction", methods=["GET", "POST"])
@login_required
def search_bar_prediction():
	"""Find the predictions for the search bar"""
	
	# Get the search bar input
	search_bar_input = str(request.args.get("search_bar"))

	print("SEARCHING PREDICTION: ", search_bar_input)

	prediction_data = []
	isbn_result = None
	title_result = None
	author_result = None

	# Check if theres any data in the search bar
	if search_bar_input:

		# Add wild cards to the data to search for anything that match the elements in the search input
		search_bar_input = "%"+search_bar_input+"%"

		# Searches for ISBN in the Database
		sql_command = """SELECT isbn FROM book_records WHERE isbn LIKE :isbn LIMIT 10"""
		isbn_result = db.execute(sql_command, {"isbn": search_bar_input}).fetchall()

		print("isbn DATABASE RETURNED: ", isbn_result)

		# Add the ISBN numbers to a list
		if isbn_result:

			for alpha in range(len(isbn_result)):

				prediction_data.append({"SEARCH_RESULT": isbn_result[alpha][0]})

		# Searchers for TITLE in the DAtabase
		sql_command = """SELECT title FROM book_records WHERE title LIKE :title LIMIT 10"""
		title_result = db.execute(sql_command, {"title": search_bar_input}).fetchall()

		print("title DATABASE RETURNED: ", title_result)

		# Add the titles to a list
		if title_result:

			for bravo in range(len(title_result)):

				prediction_data.append({"SEARCH_RESULT": title_result[bravo][0]})

		# Searchers for AUTHOR in the DAtabase
		sql_command = """SELECT author FROM book_records WHERE author LIKE :author LIMIT 10"""
		author_result = db.execute(sql_command, {"author": search_bar_input}).fetchall()

		print("author DATABASE RETURNED: ", author_result)

		# Add the authors to a list
		if author_result:

			for charlie in range(len(author_result)):

				prediction_data.append({"SEARCH_RESULT": author_result[charlie][0]})

		print("FINAL RESULT: ", prediction_data)

	# Send the list of predictions to the Javascript in JSON to then make the datalist 
	return jsonify({"PREDICTION_RESULT": prediction_data})


@app.route("/search_book", methods=["GET", "POST"])
@login_required
def search_book():
	"""Searches for book information when search button is pressed"""

	# Get the selected search infotmation
	search_bar_input = str(request.args.get("search_bar"))

	print("SEARCH BOOK: ", search_bar_input)

	book_data = []
	data_returned = None
	book_results = None

	# Check if the variable has data
	if search_bar_input:

		# Add wild cards to the data to search for anything that match the elements in the search input
		search_bar_input = "%"+search_bar_input+"%"

		# Searches for book details in the Database
		sql_command = """SELECT * FROM book_records WHERE isbn LIKE :isbn
														  OR
														  title LIKE :title
														  OR
														  author LIKE :author
														  LIMIT 500"""
		data_returned = db.execute(sql_command, {"isbn": search_bar_input,
												 "title": search_bar_input,
												 "author": search_bar_input}).fetchall()

		print("DATABASE RETURNED: ", data_returned)

		# Check if we got any results from the database
		if data_returned:

			for alpha in range(len(data_returned)):

				book_results = None
				api_available = None
				local_count_review_data = None
				local_average_rating = None

				# Get information about the book from GoodReads API
				try:
					book_results = requests.get("https://www.goodreads.com/book/review_counts.json",
												params={"key": "2JuXZrNjr33dMxqSTgkVfA",
												"isbns": data_returned[alpha][1]}).json()
					api_available = True
				except:
					print("Failed to get JSON API from GoodReads")
					api_available = False

				print("API: ", book_results)
				print()

				# Get the average local rating from the Databse
				sql_command = """SELECT AVG(star_rating) FROM review_records WHERE book_id = :book_id_given"""
				local_average_rating = db.execute(sql_command, {"book_id_given": str(data_returned[alpha][0])}).fetchall()

				if not local_average_rating[0][0]:
					local_average_rating = "0"

				print("LOCAL AVERAGE RATING: ", str(local_average_rating[0][0]))
				print()

				# Get the total amount of reviews locally
				sql_command = """SELECT count(*) FROM review_records WHERE book_id = :book_id_given"""
				local_count_review_data = db.execute(sql_command, {"book_id_given": str(data_returned[alpha][0])}).fetchall()

				print("LOCAL COUNT: ", local_count_review_data[0][0])
				print()

				if api_available:
					book_data.append({"book_id": data_returned[alpha][0],
									"isbn": data_returned[alpha][1],
									"title": data_returned[alpha][2],
									"author": data_returned[alpha][3],
									"year": data_returned[alpha][4],
									"local_reviews_count": local_count_review_data[0][0],
									"local_average_rating": round(float(local_average_rating[0][0]), 2),
									"work_ratings_count": book_results["books"][0]["work_ratings_count"],
									"work_reviews_count": book_results["books"][0]["work_reviews_count"],
									"average_online_rating": book_results["books"][0]["average_rating"]})
				else:
					book_data.append({"book_id": data_returned[alpha][0],
									"isbn": data_returned[alpha][1],
									"title": data_returned[alpha][2],
									"author": data_returned[alpha][3],
									"year": data_returned[alpha][4],
									"local_reviews_count": local_count_review_data[0][0],
									"local_average_rating": round(float(local_average_rating[0][0]), 2),
									"work_ratings_count": "0",
									"work_reviews_count": "0",
									"average_online_rating": "0"})

	return jsonify({"BOOK_RESULTS": book_data})


@app.route("/book_details/<int:book_id>", methods=["GET", "POST"])
@login_required
def book_details(book_id):
	"""Displays all online/local reviews of the book"""

	print("DISPLAYING: ", book_id)

	book_data = []
	book_data_review = []

	data_returned = None
	book_results = None
	online_rating_image = None
	local_rating_image = None
	api_available = None
	local_average_rating = None
	local_count_review_data = None
	username_not_allowed = False

	# Searches for book details in the Database
	sql_command = """SELECT * FROM book_records WHERE book_id = :book_id"""
	data_returned = db.execute(sql_command, {"book_id": book_id}).fetchall()

	print("DATABASE RETURNED: ", data_returned)

	try:
		book_results = requests.get("https://www.goodreads.com/book/review_counts.json",
									params={"key": "2JuXZrNjr33dMxqSTgkVfA",
									"isbns": data_returned[0][1]}).json()
		api_available = True
	except:
		print("Failed to get JSON API from GoodReads")
		api_available = False

	print("API: ", book_results)

	sql_command = """SELECT AVG(star_rating) FROM review_records WHERE book_id = :book_id_given"""
	local_average_rating = db.execute(sql_command, {"book_id_given": str(data_returned[0][0])}).fetchall()

	if not local_average_rating[0][0]:
		local_average_rating = "0"

	print("LOCAL AVERAGE RATING: ", str(local_average_rating[0][0]))
	print()

	sql_command = """SELECT count(*) FROM review_records WHERE book_id = :book_id_given"""
	local_count_review_data = db.execute(sql_command, {"book_id_given": str(data_returned[0][0])}).fetchall()

	print("LOCAL COUNT: ", local_count_review_data[0][0])
	print()

	if 	api_available:
		if book_results["books"][0]["average_rating"] == "0.00":
			online_rating_image = "/static/book_star_images/zero_star_books.png"
		elif book_results["books"][0]["average_rating"] > "0.00" and book_results["books"][0]["average_rating"] < "1.00":
			online_rating_image = "/static/book_star_images/half_star_books.png"
		elif book_results["books"][0]["average_rating"] == "1.00":
			online_rating_image = "/static/book_star_images/one_star_books.png"
		elif book_results["books"][0]["average_rating"] > "1.00" and book_results["books"][0]["average_rating"] < "2.00":
			online_rating_image = "/static/book_star_images/one_half_star_books.png"
		elif book_results["books"][0]["average_rating"] == "2.00":
			online_rating_image = "/static/book_star_images/two_star_books.png"
		elif book_results["books"][0]["average_rating"] > "2.00" and book_results["books"][0]["average_rating"] < "3.00":
			online_rating_image = "/static/book_star_images/two_half_star_books.png"
		elif book_results["books"][0]["average_rating"] == "3.00":
			online_rating_image = "/static/book_star_images/three_star_books.png"
		elif book_results["books"][0]["average_rating"] > "3.00" and book_results["books"][0]["average_rating"] < "4.00":
			online_rating_image = "/static/book_star_images/three_half_star_books.png"
		elif book_results["books"][0]["average_rating"] == "4.00":
			online_rating_image = "/static/book_star_images/four_star_books.png"
		elif book_results["books"][0]["average_rating"] > "4.00" and book_results["books"][0]["average_rating"] < "5.00":
			online_rating_image = "/static/book_star_images/four_half_star_books.png"
		elif book_results["books"][0]["average_rating"] == "5.00":
			online_rating_image = "/static/book_star_images/five_star_books.png"

		if str(local_average_rating[0][0]) == "0":
			local_rating_image = "/static/book_star_images/zero_star_books.png"
		elif str(local_average_rating[0][0]) > "0.0" and str(local_average_rating[0][0]) < "1.0":
			local_rating_image = "/static/book_star_images/half_star_books.png"
		elif str(local_average_rating[0][0]) == "1.0":
			local_rating_image = "/static/book_star_images/one_star_books.png"
		elif str(local_average_rating[0][0]) > "1.0" and str(local_average_rating[0][0]) < "2.0":
			local_rating_image = "/static/book_star_images/one_half_star_books.png"
		elif str(local_average_rating[0][0]) == "2.0":
			local_rating_image = "/static/book_star_images/two_star_books.png"
		elif str(local_average_rating[0][0]) > "2.0" and str(local_average_rating[0][0]) < "3.0":
			local_rating_image = "/static/book_star_images/two_half_star_books.png"
		elif str(local_average_rating[0][0]) == "3.0":
			local_rating_image = "/static/book_star_images/three_star_books.png"
		elif str(local_average_rating[0][0]) > "3.0" and str(local_average_rating[0][0]) < "4.0":
			local_rating_image = "/static/book_star_images/three_half_star_books.png"
		elif str(local_average_rating[0][0]) == "4.0":
			local_rating_image = "/static/book_star_images/four_star_books.png"
		elif str(local_average_rating[0][0]) > "4.0" and str(local_average_rating[0][0]) < "5.0":
			local_rating_image = "/static/book_star_images/four_half_star_books.png"
		elif str(local_average_rating[0][0]) == "5.0":
			local_rating_image = "/static/book_star_images/five_star_books.png"
		
		book_data.append({"book_id": data_returned[0][0],
							"isbn": data_returned[0][1],
							"title": data_returned[0][2],
							"author": data_returned[0][3],
							"year": data_returned[0][4],
							"local_reviews_count": local_count_review_data[0][0],
							"local_average_rating": round(float(local_average_rating[0][0]), 2),
							"work_ratings_count": book_results["books"][0]["work_ratings_count"],
							"work_reviews_count": book_results["books"][0]["work_reviews_count"],
							"average_online_rating": book_results["books"][0]["average_rating"],
							"image_online_rating": online_rating_image,
							"image_local_rating": local_rating_image})
	else:

		if str(local_average_rating[0][0]) == "0":
			local_rating_image = "/static/book_star_images/zero_star_books.png"
		elif str(local_average_rating[0][0]) > "0.0" and str(local_average_rating[0][0]) < "1.0":
			local_rating_image = "/static/book_star_images/half_star_books.png"
		elif str(local_average_rating[0][0]) == "1.0":
			local_rating_image = "/static/book_star_images/one_star_books.png"
		elif str(local_average_rating[0][0]) > "1.0" and str(local_average_rating[0][0]) < "2.0":
			local_rating_image = "/static/book_star_images/one_half_star_books.png"
		elif str(local_average_rating[0][0]) == "2.0":
			local_rating_image = "/static/book_star_images/two_star_books.png"
		elif str(local_average_rating[0][0]) > "2.0" and str(local_average_rating[0][0]) < "3.0":
			local_rating_image = "/static/book_star_images/two_half_star_books.png"
		elif str(local_average_rating[0][0]) == "3.0":
			local_rating_image = "/static/book_star_images/three_star_books.png"
		elif str(local_average_rating[0][0]) > "3.0" and str(local_average_rating[0][0]) < "4.0":
			local_rating_image = "/static/book_star_images/three_half_star_books.png"
		elif str(local_average_rating[0][0]) == "4.0":
			local_rating_image = "/static/book_star_images/four_star_books.png"
		elif str(local_average_rating[0][0]) > "4.0" and str(local_average_rating[0][0]) < "5.0":
			local_rating_image = "/static/book_star_images/four_half_star_books.png"
		elif str(local_average_rating[0][0]) == "5.0":
			local_rating_image = "/static/book_star_images/five_star_books.png"

		book_data.append({"book_id": data_returned[0][0],
							"isbn": data_returned[0][1],
							"title": data_returned[0][2],
							"author": data_returned[0][3],
							"year": data_returned[0][4],
							"local_reviews_count": local_count_review_data[0][0],
							"local_average_rating": round(float(local_average_rating[0][0]), 2),
							"work_ratings_count": "0",
							"work_reviews_count": "0",
							"average_online_rating": "0",
							"image_online_rating": "/static/book_star_images/zero_star_books.png",
							"image_local_rating": local_rating_image})

	sql_command = """SELECT * FROM review_records WHERE book_id = :book_id"""
	data_reviews_result = db.execute(sql_command, {"book_id": str(book_id)}).fetchall()

	for alpha in range(len(data_reviews_result)):

		if str(data_reviews_result[alpha][2]) == "0.0":
			rating_image = "/static/book_star_images/zero_star_books.png"
		elif str(data_reviews_result[alpha][2]) == "0.5":
			rating_image = "/static/book_star_images/half_star_books.png"
		elif str(data_reviews_result[alpha][2]) == "1.0":
			rating_image = "/static/book_star_images/one_star_books.png"
		elif str(data_reviews_result[alpha][2]) == "1.5":
			rating_image = "/static/book_star_images/one_half_star_books.png"
		elif str(data_reviews_result[alpha][2]) == "2.0":
			rating_image = "/static/book_star_images/two_star_books.png"
		elif str(data_reviews_result[alpha][2]) == "2.5":
			rating_image = "/static/book_star_images/two_half_star_books.png"
		elif str(data_reviews_result[alpha][2]) == "3.0":
			rating_image = "/static/book_star_images/three_star_books.png"
		elif str(data_reviews_result[alpha][2]) == "3.5":
			rating_image = "/static/book_star_images/three_half_star_books.png"
		elif str(data_reviews_result[alpha][2]) == "4.0":
			rating_image = "/static/book_star_images/four_star_books.png"
		elif str(data_reviews_result[alpha][2]) == "4.5":
			rating_image = "/static/book_star_images/four_half_star_books.png"
		elif str(data_reviews_result[alpha][2]) == "5.0":
			rating_image = "/static/book_star_images/five_star_books.png"

		book_data_review.append({"review_id": data_reviews_result[alpha][0],
								 "comment_details": data_reviews_result[alpha][1],
								 "star_rating": data_reviews_result[alpha][2],
								 "username": data_reviews_result[alpha][3],
								 "book_id": data_reviews_result[alpha][4],
								 "user_id": int(data_reviews_result[alpha][5]),
								 "rating_image": rating_image})

		if int(data_reviews_result[alpha][5]) == session["USER_ID"]:
			username_not_allowed = True

	return render_template("book_information.html", book_id=book_id,
													book_data=book_data,
													book_data_review=book_data_review,
													username_not_allowed=username_not_allowed)


@app.route("/submit_review/<int:book_id>", methods=["POST"])
@login_required
def submit_review(book_id):
	"""Submit reviews from users to the Database"""

	print("Submiting review for book ID: ", book_id)

	# Get the comment and selected stars the user inputed
	comment_details = str(request.form.get("comment_box"))
	stars_give = float(request.form.get("book_rate_selected"))

	print("Comment: ", comment_details)
	print("Stars: ", stars_give)

	# Check if the user already has a review for this book
	sql_command = """SELECT * FROM review_records WHERE user_id = :user_id AND book_id = :book_id"""
	data_result = db.execute(sql_command, {"user_id": str(session["USER_ID"]),
										   "book_id": str(book_id)}).fetchall()

	# Check for any data
	if not data_result:

		# Insert the comment and star rating of the user to the Database
		sql_command = """INSERT INTO review_records(comment_details, star_rating, username, book_id, user_id)
									VALUES(:comment_details, :star_rating, :username, :book_id, :user_id)"""
		db.execute(sql_command, {"comment_details":comment_details,
								"star_rating": stars_give,
								"username": session["USERNAME"],
								"book_id": book_id,
								"user_id": session["USER_ID"]})
		db.commit()
		flash("Succefully Rated!", "success")
	else:
		flash("Sorry you can only have 1 review per book.")

	return redirect("/book_details/"+str(book_id))

@app.route("/api/<string:isbn_number>", methods=["GET", "POST"])
@login_required
def api(isbn_number):
	"""SHow the JSON info returned by the ISBN"""

	print("API book ISBN: ", isbn_number)

	# Get information for the ISBN being inputed in the URL
	sql_command = """SELECT * FROM book_records WHERE isbn = :isbn_number"""
	book_data = db.execute(sql_command, {"isbn_number":isbn_number}).fetchall()

	if book_data:

		# Display the information we have on that book on the page as JSON
		print("Book found")
		sql_command = """SELECT AVG(star_rating) FROM review_records WHERE book_id = :book_id"""
		local_average_rating = db.execute(sql_command, {"book_id": str(book_data[0][0])}).fetchall()

		if not local_average_rating[0][0]:
			local_average_rating = "0"

		sql_command = """SELECT count(*) FROM review_records WHERE book_id = :book_id"""
		local_count_review_data = db.execute(sql_command, {"book_id": str(book_data[0][0])}).fetchall()

		return jsonify({"title": book_data[0][2],
						"author": book_data[0][3],
						"year": book_data[0][4],
						"isbn": book_data[0][1],
						"review_count": local_count_review_data[0][0],
						"average_score": local_average_rating[0][0]})
	else:
		return render_template("404.html"), 404


@app.route("/del_review/<int:review_id>/<int:book_id>", methods=["POST"])
@login_required
def del_review(review_id, book_id):
	"""Used to Delete the review of users"""

	print("DELETING REVIEW: ", review_id)

	sql_command = """SELECT * FROM review_records WHERE reviews_id = :review_id"""
	data_result = db.execute(sql_command, {"review_id": review_id}).fetchall()

	if data_result:

		if int(data_result[0][5]) == session["USER_ID"]:
			sql_command = """DELETE FROM review_records WHERE reviews_id = :review_id"""
			db.execute(sql_command, {"review_id": review_id})
			db.commit()

			flash("Successfully deleted review.", "success")
		else:
			flash("Sorry that is not your review. You can't delete it!", "error")
	else:
		flash("Sorry that review doesn't exist we couldn't delete it.", "error")

	return redirect("/book_details/"+str(book_id))


@app.route("/login", methods=["GET", "POST"])
def login():
	"""Login Page"""

	if request.method == "POST":
		
		session.clear()

		# Get input from the page
		username = str(request.form.get("username"))
		password = str(request.form.get("password"))

		sql_command = """SELECT user_id, password FROM users WHERE username = :username OR email = :username"""
		data_result = db.execute(sql_command, {"username": username}).fetchall()

		# Check if the password matches
		if len(data_result) == 1 and check_password_hash(data_result[0][1], str(password)):
			session["USER_ID"] = data_result[0][0]
			session["USERNAME"] = str(username)
			print("Successfully Login!")
			flash("Successfully Login!", "success")
			return redirect("/")
		else:
			print("Invalid username or password!")
			flash("Invalid username or password!", "error")
			return redirect("/login")

	return render_template("login.html")


@app.route("/logout", methods=["GET"])
@login_required
def logout():
	"""Clear session"""

	# Clear user session
	session.clear()
	flash("Successfully Logged out!", "success")
	return redirect("/login")


@app.route("/register", methods=["GET", "POST"])
def register():
	"""Page for registering"""

	if request.method == "POST":
		
		# Get input from form
		username = str(request.form.get("username"))
		first_name = str(request.form.get("first_name"))
		last_name = str(request.form.get("last_name"))
		email = str(request.form.get("email"))

		# Check if password match confirm password
		if str(request.form.get("password")) == str(request.form.get("confirm_password")):
			password = generate_password_hash(str(request.form.get("password")), salt_length=512)
		else:
			print("Password and Confirm Password don't match!")
			flash("Password and Confirm Password don't match!", "error")
			return redirect("/register")

		# Check if all required fields present
		#----------------------------------------
		if not username:
			print("Missing username!")
			flash("Missing username!", "error")
			return redirect("/register")
		elif not password:
			print("Missing password!")
			flash("Missing password!", "error")
			return redirect("/register")
		elif not first_name:
			print("Missing first name!")
			flash("Missing first name!", "error")
			return redirect("/register")
		elif not last_name:
			print("Missing last name!")
			flash("Missing last name!", "error")
			return redirect("/register")
		elif not email:
			email = "NOT_AVAILABLE"
		#----------------------------------------

		# Check if username isn't in use already to prevent duplicates
		sql_command = """SELECT * FROM users WHERE username = :username"""
		data_username_result = db.execute(sql_command, {"username":username}).fetchall()

		# Check if email isn't in use already to prevent duplicates
		sql_command = """SELECT * FROM users WHERE email = :email"""
		data_email_result = db.execute(sql_command, {"email":email}).fetchall()

		if data_username_result:
			print("username already in use.")
			flash("username already in use.", "error")
			return redirect("/register")
		elif data_email_result:
			print("email already in use.")
			flash("email already in use.", "error")
			return redirect("/register")
		else:

			# Insert new user into Database
			sql_command = """INSERT INTO users(username, password, first_name, last_name, email)
										VALUES(:username, :password, :first_name, :last_name, :email)"""
			db.execute(sql_command, {"username":username,
									"password":password,
									"first_name":first_name,
									"last_name":last_name,
									"email":email})
			db.commit()
			
			print("Successfully Registered!")
			flash("Successfully Registered! Please Login", "success")

			return redirect("/login")

	return render_template("register.html")


@app.route("/check_username", methods=["GET", "POST"])
def check_username():
	"""Check the Username"""
	time.sleep(3)
	username = str(request.args.get("username"))

	print("USERNAME: ", username)

	# Prevent spaces
	if len(username.split(" ")) > 1 or len(username.split("\'")) > 1 or len(username.split("\"")) > 1:
		print("Username contains spaces or banned symbols!")
		return jsonify({"USERNAME_STATUS": "NOT_GOOD"})
	elif username:
		
		time.sleep(1)
		sql_command = """SELECT username FROM users WHERE username = :username"""
		data_result = db.execute(sql_command, {"username":username}).fetchall()

		if data_result:
			print("Username already in use.")
			return jsonify({"USERNAME_STATUS": "USED"})
		else:
			print("Username GOOD")
			return jsonify({"USERNAME_STATUS": "GOOD"})
	else:
		print("No username")
		return jsonify({"USERNAME_STATUS": "NOT_GOOD"})


@app.route("/check_email", methods=["GET", "POST"])
def check_email():
	"""Check the Email"""

	email = str(request.args.get("email"))

	print("Email: ", email)

	# Prevent spaces
	if len(email.split(" ")) > 1 or len(email.split("\"")) > 1:
		print("Email contains spaces or banned symbols!")
		return jsonify({"EMAIL_STATUS": "NOT_GOOD"})
	if email:

		sql_command = """SELECT email FROM users WHERE email = :email"""
		data_result = db.execute(sql_command, {"email":email}).fetchall()

		if data_result:
			print("Email already in use.")
			return jsonify({"EMAIL_STATUS": "USED"})
		else:
			print("Email GOOD")
			return jsonify({"EMAIL_STATUS": "GOOD"})
	else:
		print("No email")
		return jsonify({"EMAIL_STATUS": "NOT_GOOD"})


@app.route("/account", methods=["GET"])
@login_required
def account():
	"""SHOW ACCOUNT DETAILS"""

	account_details = []

	sql_command = """SELECT username, first_name, last_name, email FROM users WHERE user_id = :user_id"""
	data_result = db.execute(sql_command, {"user_id": session["USER_ID"]}).fetchall()

	sql_command = """SELECT count(*) FROM review_records WHERE user_id = :user_id"""
	count_data_result = db.execute(sql_command, {"user_id": str(session["USER_ID"])}).fetchall()

	sql_command = """SELECT AVG(star_rating) FROM review_records WHERE user_id = :user_id"""
	avg_rating_data_result = db.execute(sql_command, {"user_id": str(session["USER_ID"])}).fetchall()

	account_details.append({"username": data_result[0][0],
							"first_name": data_result[0][1],
							"last_name": data_result[0][2],
							"email": data_result[0][3],
							"review_count": count_data_result[0][0],
							"average_rating": round(avg_rating_data_result[0][0], 2)})

	return render_template("account.html", account_details=account_details)


if __name__ == "__main__":
	server(app)
