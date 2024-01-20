from .db import db, environment, SCHEMA, add_prefix_for_prod

from sqlalchemy.schema import ForeignKey

class ChatRoom(db.Model):
    __tablename__ = "chat_rooms"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    created_at = db.Column(db.Integer, nullable=False)

    user_1 = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("users.id")))
    user_2 = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("users.id")))

    users = db.relationship('User', back_populates='call')

    def to_dict(self):
        data = {
            'id': self.id,
            'created_at': self.created_at
        }

        return data