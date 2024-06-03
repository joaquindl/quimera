# routes/main.py
from flask import Blueprint, jsonify, send_file, current_app
import os
from models import Poem

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
    return jsonify([{'id': p.id, 'title': p.title, 'content': p.content, 'image_url': p.image_url} for p in poems])

@main.route('/poem/<int:id>', methods=['GET'])
def get_poem(id):
    poem = Poem.query.get_or_404(id)
    return jsonify({'id': poem.id, 'title': poem.title, 'content': poem.content, 'image_url': poem.image_url})


