from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.api.auth_routes import login
from app.models import User, db, Project, Section, Task, Comment
from operator import itemgetter
import sqlalchemy
from datetime import datetime
today = datetime.now()

comments_routes = Blueprint('comments', __name__)

@comments_routes.route('/<int:id>', methods=['POST'])
@login_required
def editComment(id):
    comment = Comment.query.get(id)
    newComment = itemgetter('newComment')(request.json)
    try:
        comment.comment = newComment
        comment.updated_at = today
        db.session.commit()
        db.session.refresh(comment)

        return comment.to_dict()
    except AssertionError as message:
        print(str(message))
        return jsonify({"error": str(message)}), 400

@comments_routes.route('/<int:id>/delete')
@login_required
def deleteComment(id):
    comment = Comment.query.get(id)
    try:
        db.session.delete(comment)
        db.session.commit()

        return {'Message':'Deleted comment successfully'}
    except AssertionError as message:
        print(str(message))
        return jsonify({"error": str(message)}), 400
