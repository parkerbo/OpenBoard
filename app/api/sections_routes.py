from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db, Project, Section, Task
from operator import itemgetter

sections_routes = Blueprint('sections', __name__)


@sections_routes.route('/<int:id>', methods=['POST'])
@login_required
def updateSection(id):
    newSection = request.json
    print(newSection)
    try:
        oldSection = Section.query.get(id);
        oldSection.tasks_order = newSection["tasks_order"]
        db.session.commit()
        return "Successfully updated"
    except AssertionError as message:
        print(str(message))
        return jsonify({"error": str(message)}), 400
