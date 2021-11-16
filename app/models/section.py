from sqlalchemy.orm import backref
from .db import db

class Section(db.Model):
    __tablename__ = 'sections'

    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)
    board_column = db.Column(db.Integer, nullable=False, default=0)
    title = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False)

    tasks = db.relationship("Task", backref='task_section', cascade="all, delete", lazy=True)


