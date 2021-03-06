from google.appengine.ext import db

class Course(db.Model):
    courseID = db.IntegerProperty() # Unique ID used only by the application for mapping.

    name = db.StringProperty() #Human-readable course name.

    department = db.StringProperty()   # e.g. EECS
    number = db.IntegerProperty() # e.g. 393
    section = db.IntegerProperty() # e.g. 100

    year = db.IntegerProperty() # e.g. 2017
    term = db.StringProperty() # Spring, Summer, Fall, etc.