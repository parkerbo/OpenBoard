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
