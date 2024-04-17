from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# Create the Flask application instance
app = Flask(__name__)
app.config.from_object('config.Config')

# Initialize the SQLAlchemy extension
db = SQLAlchemy(app)

# Import routes module
from app import routes