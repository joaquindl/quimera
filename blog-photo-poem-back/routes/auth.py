from flask import Blueprint, jsonify, request, session, Response
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
from models import User, db

auth = Blueprint('auth', __name__)

@auth.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')
    new_user = User(username=data['username'], password=hashed_password, role='user')
    db.session.add(new_user)
    db.session.commit()

    # Iniciar sesión automáticamente después del registro
    session['user_id'] = new_user.id
    session['user_role'] = new_user.role

    return jsonify({'message': 'User registered successfully', 'role': new_user.role})

@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if user and check_password_hash(user.password, data['password']):
        session['user_id'] = user.id
        session['user_role'] = user.role
        print("Session data set: ", session['user_id'], session['user_role'])  # Agregar este print para ver la salida en la terminal
        return jsonify({'message': 'Logged in successfully', 'role': user.role})
    return jsonify({'message': 'Invalid credentials'}), 401

@auth.route('/logout', methods=['POST'])
def logout():
    print("Logging out user: ", session.get('user_id'), session.get('user_role'))  # Agregar este print para ver la salida en la terminal
    session.pop('user_id', None)
    session.pop('user_role', None)
    return jsonify({'message': 'Logged out successfully'})

# @auth.route('/check-auth', methods=['GET'])
# def check_auth():
#     user_id = session.get('user_id')
#     user_role = session.get('user_role')
#     print("Checking auth: ", user_id, user_role)  # Agregar este print para ver la salida en la terminal
#     if user_id and user_role:
#         return jsonify({'isAuthenticated': True, 'userRole': user_role})
#     return jsonify({'isAuthenticated': False, 'userRole': None})

def check_auth(username, password):
    user = User.query.filter_by(username=username).first()
    if user and check_password_hash(user.password, password):
        return True
    return False

def authenticate():
    return Response(
        'Could not verify your access level for that URL.\n'
        'You have to login with proper credentials', 401,
        {'WWW-Authenticate': 'Basic realm="Login Required"'})

def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.authorization
        if not auth or not check_auth(auth.username, auth.password):
            return authenticate()
        return f(*args, **kwargs)
    return decorated
