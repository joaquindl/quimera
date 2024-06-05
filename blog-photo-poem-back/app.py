from flask import Flask
from flask_cors import CORS
from flask_session import Session
from models import db  
from config import Config
from routes import create_app

app = create_app(Config)
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000", "http://127.0.0.1:3000"]}}, supports_credentials=True)
db.init_app(app)
Session(app)

if __name__ == '__main__':
    with app.app_context():
        db.create_all() 
    app.run(debug=True)
