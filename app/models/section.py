from sqlalchemy.orm import backref
from .db import db

class Section(db.Model):
    __tablename__ = 'sections'

    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)
    board_column = db.Column(db.Integer, nullable=False, default=0)
    tasks_order = db.Column(db.ARRAY(db.Integer), nullable=False, default=[])
    title = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False)

    projects = db.relationship("Project", backref='project_sections', cascade="all, delete", lazy=True)

    def to_dict(self):
        tasks = {task.id:task.to_dict() for task in self.section_tasks}
        return{
            'id': self.id,
            'project_id': self.project_id,
            'board_column': self.board_column,
            'tasks_order': self.tasks_order,
            'title': self.title,
            'tasks': tasks,
            'created_at' : self.created_at,
            'updated_at' : self.updated_at
        }
