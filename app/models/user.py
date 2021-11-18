from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

project_members_join = db.Table(
   'project_members',
    db.Column("project_id", db.Integer, db.ForeignKey("projects.id"), primary_key=True),
    db.Column("member_id", db.Integer, db.ForeignKey("users.id"), primary_key=True)
    )

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    profile_image = db.Column(db.Text)
    notepad = db.Column(db.Text)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    projects = db.relationship("Project", backref='user_project', cascade="all, delete, delete-orphan")

    project_participants = db.relationship('Project', secondary=project_members_join, lazy="subquery", backref=db.backref('project_members', lazy=True))

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        projects = {}
        for project in self.user_projects:
            projects[project.id] = {
                'project_id': project.id,
                'project_title': project.title,
                'project_color': project.color
            }
        return {
            'id': self.id,
            'fullname': self.full_name,
            'profile_image': self.profile_image,
            'notepad': self.notepad,
            'email': self.email,
            'projects' : projects
        }
