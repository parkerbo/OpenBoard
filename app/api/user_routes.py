from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy.orm import load_only
from app.models import User, db, Task
from operator import itemgetter

from datetime import datetime
today = datetime.now()

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/notepad/<int:id>', methods=['POST'])
@login_required
def updateNotepad(id):
    notepad_content = itemgetter('notepad')(request.json)
    print(notepad_content)
    user = User.query.get(id)
    if user:
        user.notepad = notepad_content
        db.session.commit()
        return "Success"
    else:
        return {'Error': 'User does not exist'}, 400

@user_routes.route('/notepad')
@login_required
def getNotepad():
    userId = current_user.get_id()
    user_notepad = User.query.options(load_only("notepad")).get(userId)
    if user_notepad.notepad:
        return {'content': user_notepad.notepad}
    else:
        return {'content':''}

@user_routes.route('/priorities')
@login_required
def getPriorities():
    userId = current_user.get_id()
    priorities = {
        'upcoming': {},
        'overdue': {},
        'completed': {}
    }
    upcoming_tasks = Task.query.filter(Task.assignee_id == userId).all();
    for task in upcoming_tasks:
        if (task.end_date == None or task.end_date >= today.date()) and not task.completed:
            priorities['upcoming'][task.id] = task.to_dict()
        if (task.end_date != None and task.end_date < today.date() and not task.completed):
            priorities['overdue'][task.id] = task.to_dict()
        if task.completed:
            priorities['completed'][task.id] = task.to_dict()
    return priorities
