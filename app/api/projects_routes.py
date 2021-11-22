from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy.orm import load_only
from app.models import User, db, Project, Section, Task
from operator import itemgetter

projects_routes = Blueprint('projects', __name__)


@projects_routes.route('/<int:id>')
@login_required
def getProject(id):
    project = Project.query.get(id);

    return project.to_dict()

@projects_routes.route('/edit', methods=['POST'])
@login_required
def editProject():
    projectId, title, description = itemgetter('projectId', 'title', 'description')(request.json)
    project = Project.query.get(projectId);
    if project:
        try:
            project.title = title
            project.description = description
            db.session.commit()
            return project.to_dict()
        except AssertionError as message:
            print(str(message))
            return jsonify({"error": str(message)}), 400
