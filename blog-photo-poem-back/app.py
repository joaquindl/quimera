from flask import Flask, send_file, current_app
from flask_cors import CORS
from models import db
from config import Config
from routes import create_app
import os

app = create_app(Config)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)
db.init_app(app)


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
