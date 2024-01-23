from .db import db, environment, SCHEMA, add_prefix_for_prod

from sqlalchemy.schema import ForeignKey

from .chatroom_join import chat_room_join

class ChatRoom(db.Model):
    __tablename__ = "chat_rooms"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    created_at = db.Column(db.Integer, nullable=False)

    users = db.relationship('User', secondary=chat_room_join, back_populates='call')
    messages = db.relationship('Message', back_populates='room', cascade="all, delete-orphan")

    def to_dict(self):
        data = {
            'id': self.id,
            'created_at': self.created_at
        }

        return data