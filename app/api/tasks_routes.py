from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db, Project, Section, Task
from operator import itemgetter
import sqlalchemy

tasks_routes = Blueprint('tasks', __name__)


@tasks_routes.route('/<int:id>', methods=['POST'])
@login_required
def updateTask(id):
    title, description,end_date,assignee,priority,status = itemgetter('title', 'description','end_date','assignee','priority','status')(request.json)
    try:
        task = Task.query.get(id)
        task.title = title
        task.description = description
        task.end_date = end_date
        # task.assignee = assignee
        if priority == "---":
            task.priority = sqlalchemy.null()
        else:
            task.priority = priority
        if status == "---":
            task.status = sqlalchemy.null()
        else:
            task.status = status

        db.session.commit()
        return {'Message':"Success"}
    except AssertionError as message:
        print(str(message))
        return jsonify({"error": str(message)}), 400

@tasks_routes.route('/<int:id>/delete', methods=['POST'])
@login_required
def deleteTask(id):
    sectionId = itemgetter('sectionId')(request.json)
    print(sectionId)
    try:
        task = Task.query.get(id)
        section = Section.query.get(sectionId)
        newTasksOrder = section.tasks_order
        section.tasks_order = []
        db.session.commit()
        db.session.refresh(section)
        newTasksOrder.remove(id)
        section.tasks_order = newTasksOrder
        db.session.commit()
        db.session.delete(task)
        db.session.commit()
        print("Deleted")
        return {'Message':"Successfully deleted."}
    except AssertionError as message:
        print(str(message))
        return jsonify({"error": str(message)}), 400
