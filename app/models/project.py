from .db import db


class Project(db.Model):
    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    color = db.Column(db.String(100), nullable=False, default='blue')
    icon = db.Column(db.String(255), nullable=False, default= 'fa-project-diagram')
    created_at = db.Column(db.DateTime(timezone=True), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False)

    sections = db.relationship("Section", backref='section',cascade="all, delete, delete-orphan", lazy=True)


    def to_dict(self):
        project_members = {}
        for member in self.project_members:
            project_members[member.id] = {
                'member_id' : member.id,
                'member_name': member.full_name
            }
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'owner_id': self.owner_id,
            'project_members': project_members,
            'sections': self.sections,
            'color' : self.color,
            'icon' : self.icon,
            'created_at' : self.created_at,
            'updated_at' : self.updated_at
        }
