# config.py
class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///blog.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    UPLOAD_FOLDER = 'uploads'
    SECRET_KEY = 'supersecretkey'  # Clave secreta para las sesiones
    SESSION_TYPE = 'filesystem'
    SESSION_PERMANENT = False  # Las sesiones no son permanentes
    SESSION_USE_SIGNER = True  # Para firmar las cookies de la sesión
    SESSION_COOKIE_HTTPONLY = True  # La cookie de sesión solo es accesible mediante HTTP
    SESSION_COOKIE_SAMESITE = 'Lax'  # Protege la cookie de sesión contra ataques CSRF