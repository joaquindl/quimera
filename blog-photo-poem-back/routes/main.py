# routes/main.py
from flask import Blueprint, jsonify, send_file, current_app, request, session, redirect
from werkzeug.utils import secure_filename
import os
from models import Poem, User, db
from config import Config
from routes.auth import requires_auth


main = Blueprint('main', __name__)


# Configurar ruta estática para servir archivos de la carpeta 'uploads'
@main.route('/uploads/<path:filename>')
def uploaded_file(filename):
    file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
    absolute_path = os.path.abspath(file_path)
    print(f"Trying to serve file from uploads: {filename}")
    print(f"Absolute path: {absolute_path}")
    if os.path.exists(file_path):
        print(f"File {filename} found in uploads")
        return send_file(absolute_path)
    else:
        print(f"File {filename} NOT found in uploads")
        return "File not found", 404

@main.route('/')
def home():
    poems = Poem.query.all()
    print(session.get('user_id'))
    return jsonify([{
        'id': poem.id, 
        'title': poem.title, 
        'content': poem.content, 
        'image_url': poem.image_url, 
        'author': poem.author.username
    } for poem in poems])
    
    

@main.route('/poem/create', methods=['POST'])
@requires_auth
def add_poem():
    title = request.form['title']
    content = request.form['content']
    image = request.files.get('image')
    author_id = session.get('user_id')
    author = User.query.get(author_id)

    if not author:
        return jsonify({"error": "User not found"}), 404

    if image:
        filename = secure_filename(image.filename)
        image.save(os.path.join(current_app.config['UPLOAD_FOLDER'], filename))
        image_url = f"/uploads/{filename.replace(os.sep, '/')}"
    else:
        image_url = None

    new_poem = Poem(
        title=title, 
        content=content, 
        image_url=image_url,
        author_id=author.id
    )
    db.session.add(new_poem)
    db.session.commit()
    return jsonify({'message': 'Poem added successfully'}), 201

@main.route('/poem/<int:id>', methods=['GET'])
def get_poem(id):
    poem = Poem.query.get_or_404(id)
    return jsonify({'id': poem.id, 'title': poem.title, 'content': poem.content, 'image_url': poem.image_url})


