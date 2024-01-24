from .db import db, environment, SCHEMA, add_prefix_for_prod

from sqlalchemy.schema import ForeignKey

class Message(db.Model):
    __tablename__ = "messages"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    message_text = db.Column(db.String, nullable=False)
    created_at = db.Column(db.String, nullable=False)

    sender_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')))
    room_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('chatrooms.id')))

    user = db.relationship('User', back_populates='messages')
    room = db.relationship('ChatRoom', back_populates='messages')

    def to_dict(self):
        data = {
            'id': self.id,
            'message_text': self.message_text,
            'created_at': self.created_at
        }

        return data
