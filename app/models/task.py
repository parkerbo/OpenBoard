from .db import db


class Task(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    assignee_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    section_id = db.Column(db.Integer, db.ForeignKey("sections.id"), nullable=False)
    status = db.Column(db.String(100))
    priority = db.Column(db.String(100))
    start_date = db.Column(db.Date),
    end_date = db.Column(db.Date),
    completed = db.Column(db.Boolean, default=False, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False)



    def to_dict(self):
        comments = {}
        for comment in self.task_comments:
            comment[comment.id] = {
                'comment_id' : comment.id,
                'user_id' : comment.user_id,
                'comment' : comment.comment,
                'created_at' : comment.created_at,
                'updated_at' : comment.updated_at
            }
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'owner_id': self.owner_id,
            'assignee_id': self.assignee_id,
            'section_id': self.section_id,
            'status' : self.status,
            'priority' : self.priority,
            'start_date': self.start_date,
            'end_date' : self.end_date,
            'completed' : self.completed,
            'comments' : comments,
            'created_at' : self.created_at,
            'updated_at' : self.updated_at
        }
