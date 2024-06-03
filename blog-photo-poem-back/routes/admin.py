from flask import Blueprint, jsonify, request
from models import Poem, User, db
from routes.auth import requires_auth  # Asegúrate de que la importación sea correcta
from werkzeug.utils import secure_filename
import os
from config import Config

admin = Blueprint('admin', __name__)

@admin.route('/admin')
@requires_auth
def admin_panel():
    poems = Poem.query.all()
    return jsonify([{'id': p.id, 'title': p.title, 'content': p.content, 'image_url': p.image_url} for p in poems])

@admin.route('/poem', methods=['POST'])
@requires_auth
def add_poem():
    title = request.form['title']
    content = request.form['content']
    image = request.files.get('image')

    if image:
        filename = secure_filename(image.filename)
        image.save(os.path.join(Config.UPLOAD_FOLDER, filename))
        image_url = f"/uploads/{filename.replace(os.sep, '/')}"
    else:
        image_url = None

    new_poem = Poem(title=title, content=content, image_url=image_url)
    db.session.add(new_poem)
    db.session.commit()
    return jsonify({'message': 'Poem added successfully'}), 201

@admin.route('/poem/<int:id>', methods=['PUT'])
@requires_auth
def update_poem(id):
    data = request.get_json()
    poem = Poem.query.get_or_404(id)
    poem.title = data['title']
    poem.content = data['content']
    poem.image_url = data['image_url']
    db.session.commit()
    return jsonify({'message': 'Poem updated successfully'})

@admin.route('/poem/<int:id>', methods=['DELETE'])
@requires_auth
def delete_poem(id):
    poem = Poem.query.get_or_404(id)
    db.session.delete(poem)
    db.session.commit()
    return jsonify({'message': 'Poem deleted successfully'})


@admin.route('/admin/users', methods=['GET'])
@requires_auth
def get_users():
    users = User.query.all()
    return jsonify([{'id': user.id, 'username': user.username, 'role': user.role} for user in users])

@admin.route('/admin/users/<int:id>', methods=['PUT'])
@requires_auth
def update_user(id):
    data = request.get_json()
    user = User.query.get_or_404(id)
    user.role = data['role']
    db.session.commit()
    return jsonify({'message': 'User role updated successfully'})

@admin.route('/admin/users/<int:id>', methods=['DELETE'])
@requires_auth
def delete_user(id):
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully'})