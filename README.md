# Project 1
# nightbook
CS50W Project 1 Book

Will be developing a book review WebApp.
API being used "https://www.goodreads.com/book/review_counts.json"

Feel Free to look at the code

The WebApp requires a user to be registered to use it. If you don't have a account first register.

All images used in the App are my own, avoiding copyright issues, the only thing used that isn't mine is the gif loading icon by loading.io used in all the pages that require the user to wait for something to happen.

## How to setup the App
1. Install Python 3 or higher
2. Open Command Prompt
3. Run: ```cd ``` + the path to the program. Example( "cd Documents\projects\project1" )
4. Run: ```pip install -r requirements.txt```
5. Run: ```set FLASK_APP=application.py```
6. Run: ```set FLASK_ENV=development```
7. Run: ```set FLASK_DEBUG=1```
8. Run: ```set DATABASE_URL=``` + add the URI or URL of your Database here. If you don't have one go to [Heroku](https://dashboard.heroku.com/) and get one. If you using a local Database change the code in application.py to work with your local Database.
9. Run: ```python import.py``` You will be prompt with options to make tables that are required by the App and an option to import all the book.csv info to the Databse.
8. Run: ```python -m flask run``` or ```python application.py```

*If you followed the instructions everything should run well

## Login Page
Nothing special here, controls to login to the WebApp, if you are not login and try to access the WebApp it'll kick you out to this page (login page).

## Register Page
You are required to have an account to use the App.
Here you will need to provide.
1. Full name
2. A unique username
3. E-mail ( OPTIONAL )
4. Password

The system will check if everything "Looks good" and allow you to register. If something isn't right it'll not allow you to register. Read the "alert" to see what is wrong.

## Home Page
On this page there be a search bar waiting for you.
As the user enters inputs there will be a Javascript waiting for the user to stop typing, when the user stops typing it'll send the input to the server where we'll search the Database for any prediction matches to show the user if his trying to type a specific thing.
When the user presses the "Search" button, a Javascript will send the input to the server where it'll search for every possible match to the input and send back all the required information and display it on the users screen as cards, I limited it to 500 to avoid overloading the page. The cards contain the Title, author, year, isbn, amount of online rate, average rate, local average rate, amount of online reviews, amount of local reviews and an option to go to the book page.

## Book Page
The book page display information on the online ratings and local ratings.
The page doesn't have a background. It's display the books ID number in our Databse at the top left coner.
The page consistes of the title, author, year, isbn, amount of online ratings, amount of online reviews, amount of local retings, amount of local reviews, average online rate, local average rate and details of local reviews with thier opinions.
Each user can only review a book once, if they feel like changing their review they have to delete it and make a new one.

## API page
The API page displays the information my Database has of the books including local ratings.

# What I learnt

* How to make selective rating items.
* Prevent overflow of inputs to the server from javascript.
* Better SCSS use.
* Datalisting.
* Better SQL use.
* Better use of the URL to get data.
* Better Javascript use.
* Error handles.
* How to read CSV format and importing it to the Dabase.
* Better understanding of API uses.
* Good password hashing

Web Programming with Python and JavaScript
