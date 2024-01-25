from .db import db, environment, SCHEMA, add_prefix_for_prod

from sqlalchemy.schema import ForeignKey

class ChatRoom(db.Model):
    __tablename__ = "chatrooms"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    created_at = db.Column(db.Integer, nullable=False)

    user_1_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')))
    user_2_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')))

    user_1 = db.relationship('User', foreign_keys=[user_1_id])
    user_2 = db.relationship('User', foreign_keys=[user_2_id])

    messages = db.relationship('Message', back_populates='room', cascade="all, delete-orphan")

    def to_dict(self):
        data = {
            'id': self.id,
            'created_at': self.created_at,
            'user_1_id': self.user_1_id,
            'user_2_id': self.user_2_id
        }

        return data