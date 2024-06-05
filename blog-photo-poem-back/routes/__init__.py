from flask import Flask
from .admin import admin
from .main import main
from .auth import auth
from config import Config

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    app.config['UPLOAD_FOLDER'] = config_class.UPLOAD_FOLDER
    app.config['SECRET_KEY'] = config_class.SECRET_KEY
    
    app.register_blueprint(admin)
    app.register_blueprint(main)
    app.register_blueprint(auth)

    return app
