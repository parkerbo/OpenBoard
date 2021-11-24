from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy.orm import load_only
from app.models import User, db, Project, Section, Task
from operator import itemgetter
from datetime import datetime

today = datetime.today();

projects_routes = Blueprint('projects', __name__)


@projects_routes.route('/<int:id>')
@login_required
def getProject(id):
    project = Project.query.get(id);

    return project.to_dict()

@projects_routes.route('/', methods=['POST'])
@login_required
def createProject():
    userId = current_user.get_id()
    user=User.query.get(userId)
    projectTitle, projectDescription = itemgetter('projectTitle', 'projectDescription')(request.json)
    project = Project(
        title=projectTitle,
        description=projectDescription,
        owner_id=userId,
        color='#F06A6A',
        icon='fa-project-diagram',
        created_at = today,
        updated_at = today
    )
    db.session.add(project)
    db.session.commit()
    db.session.refresh(project)
    section1 = Section(
        project_id=project.id,
        board_column=0,
        title='Backlog',
        created_at=today,
        updated_at=today)
    section2 = Section(
        project_id=project.id,
        board_column=1,
        title='Open',
        created_at=today,
        updated_at=today)
    section3 = Section(
        project_id=project.id,
        board_column=2,
        title='In Progress',
        created_at=today,
        updated_at=today)
    section4 = Section(
        project_id=project.id,
        board_column=3,
        title='Closed',
        created_at=today,
        updated_at=today)
    db.session.add(section1)
    db.session.add(section2)
    db.session.add(section3)
    db.session.add(section4)

    project.project_members.append(user)

    db.session.commit()

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


@projects_routes.route('/<int:id>/delete')
@login_required
def deleteProject(id):
    project = Project.query.get(id);
    db.session.delete(project)
    db.session.commit()
    
    return {'Message':'Successfully deleted'}
