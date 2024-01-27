from .db import db, environment, SCHEMA, add_prefix_for_prod

from sqlalchemy.schema import ForeignKey

class DirectMessage(db.Model):
    __tablename__ = "direct_messages"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    message_text = db.Column(db.String, nullable=False)
    created_at = db.Column(db.String, nullable=False)

    sender_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')))
    receiver_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')))

    sender = db.relationship('User', foreign_keys=[sender_id])
    receiver = db.relationship('User', foreign_keys=[receiver_id])

    def to_dict(self):
        data = {
            'id': self.id,
            'message_text': self.message_text,
            'created_at': self.created_at
        }

        return data
    