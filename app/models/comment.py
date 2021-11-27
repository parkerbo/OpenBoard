from .db import db

task_comments_join = db.Table(
   'task_comments',
    db.Column("task_id", db.Integer, db.ForeignKey("tasks.id"), primary_key=True),
    db.Column("comment_id", db.Integer, db.ForeignKey("comments.id"), primary_key=True)
    )

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    comment = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False)

    task_comments = db.relationship('Task', secondary=task_comments_join, lazy="subquery", backref=db.backref('task_comments', lazy=True))

    owner = db.relationship("User", backref='owner', primaryjoin='Comment.user_id==User.id', lazy=True)

    def to_dict(self):

        return {
            'id': self.id,
            'owner': self.owner.to_dict(),
            'comment': self.comment,
            'created_at' : self.created_at,
            'updated_at' : self.updated_at
        }
