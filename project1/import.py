# Used to import CSV into Database
import os
import csv
import time

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session

# set up database
engine =  create_engine(os.getenv("DATABASE_URL"))
db = scoped_session(sessionmaker(bind=engine))

def book_records():
	# Activate if the 'book_records' Table doesn't exist
	print("CREATING 'book_records' TABLE...")
	sql_command = """CREATE TABLE book_records ( book_id SERIAL PRIMARY KEY,
													isbn VARCHAR NOT NULL,
													title VARCHAR NOT NULL,
													author VARCHAR NOT NULL,
													year INTEGER NOT NULL)"""
	db.execute(sql_command)
	db.commit()
	print("DONE!")
	print()
	time.sleep(3)

def users():
	# Activate if the 'users' Table doesn't exist
	print("CREATING 'users' TABLE...")
	sql_command = """CREATE TABLE users ( user_id SERIAL PRIMARY KEY,
										username VARCHAR NOT NULL,
										password VARCHAR NOT NULL,
										first_name VARCHAR NOT NULL,
										last_name VARCHAR NOT NULL,
										email VARCHAR)"""
	db.execute(sql_command)
	db.commit()
	print("DONE!")
	print()
	time.sleep(3)

def review_records():
	# Activate if the 'review_records' Table doesn't exist
	print("CREATING 'review_records' TABLE...")
	sql_command = """CREATE TABLE review_records ( reviews_id SERIAL PRIMARY KEY,
												comment_details VARCHAR NOT NULL,
												star_rating FLOAT NOT NULL,
												username VARCHAR NOT NULL,
												book_id VARCHAR NOT NULL,
												user_id VARCHAR NOT NULL)"""
	db.execute(sql_command)
	db.commit()
	print("DONE!")
	print()
	time.sleep(3)

def import_books():
	print("IMPORTING ALL BOOK INFO")
	csv_file = open('books.csv')
	csv_reader = csv.reader(csv_file, delimiter=',')
	line_count = 0
	for row in csv_reader:
		if line_count == 0:
			print(row)
			line_count += 1
		else:
			print("BOOK INFO: ", line_count)
			print("Check if book info already in Database...")
			sql_command = """SELECT * FROM book_records WHERE isbn = :isbn"""
			result = db.execute(sql_command, {"isbn": str(row[0])}).fetchall()

			if not result:
				print("Adding book info.")
				print("----------------------------------")
				print("ISBN:", row[0], "\nTitle:", row[1], "\nAuthor:", row[2], "\nYear:", row[3])
				print("----------------------------------")
				sql_command = """INSERT INTO book_records (isbn, title, author, year)
												VALUES (:isbn, :title, :author, :year)"""
				db.execute(sql_command, {"isbn": str(row[0]),
										"title": str(row[1]),
										"author": str(row[2]),
										"year": row[3]})
				db.commit()
			else:
				print("Book info already in Database. Skipping book.")
			line_count += 1

	print("ALL BOOKS IMPORTED!")
	print()
	time.sleep(3)

if __name__ == "__main__":
	while True:
		print("Welcome to Import.")
		print("---------------------------------")
		print("CREATE TABLE 'book_records' - 1")
		print("CREATE TABLE 'users' - 2")
		print("CREATE TABLE 'review_records' - 3")
		print("---------------------------------")
		print("IMPORT 'books.csv' - 4")
		print("---------------------------------")
		print("ALL OPTIONS - 5")
		print("EXIT - 0")
		print()

		# Get user input for the options
		selected_option = int(input("ENTER OPTION:"))
		print()

		# OPTION 1 is to create the 'book_records' table in the Database
		if selected_option == 1:
			book_records()

		# OPTION 2 is to create the 'users' table in the Database
		elif selected_option == 2:
			users()

		# OPTION 3 is to create the 'review_records' table in the Database
		elif selected_option == 3:
			review_records()

		# OPTION 4 is to import the CSV information to the 'book_records' table in the Database
		elif selected_option == 4:
			import_books()

		# OPTION 5 is to do all the above
		elif selected_option == 5:
			book_records()
			users()
			review_records()
			import_books()

		# OPTION 0 is to exit the program
		elif selected_option == 0:
			break

		else:
			print("INVALID INPUT... PLEASE TRY AGAIN.")
			print()