from .db import db, environment, SCHEMA, add_prefix_for_prod
from enum import Enum
from sqlalchemy.schema import ForeignKey

class FriendshipStatus(Enum):
    PENDING = 'pending'
    ACCEPTED = 'accepted'
    REJECTED = 'rejected'

class FriendRequest(db.Model):
    __tablename__ = 'friend_requests'  # Explicit table name

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}  # Optional schema for production

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')))
    receiver_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')))
    status = db.Column(db.Enum(FriendshipStatus), nullable=False, default=FriendshipStatus.PENDING)

    def to_dict(self):
        return {
            'id': self.id,
            'sender': self.sender.to_dict(include_relationships=False),
            'receiver': self.receiver.to_dict(include_relationships=False),
            'status': self.status
        }

friends_association = db.Table(
    'friends_association',
    db.Column('user_id', db.Integer, ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('friend_id', db.Integer, ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    # Additional columns if needed (e.g., date_added)
)