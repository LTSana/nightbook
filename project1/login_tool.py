# Used as @login_required
# Thank You to CS50 PSET7 for teaching this

from functools import wraps
from flask import redirect, session, flash

def login_required(f):
	""" Decorate routes to require login. http://flask.pocoo.org/docs/0.12/patterns/viewdecorators/ """

	@wraps(f)
	def decorated_function(*args, **kwargs):
		if session.get("USER_ID") is None:
			flash("Please login!", "error")
			return redirect("/login")
		return f(*args, **kwargs)
	return decorated_function