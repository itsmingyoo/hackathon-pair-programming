from .db import db, environment, SCHEMA, add_prefix_for_prod
from enum import Enum
from sqlalchemy.schema import ForeignKey

class FriendshipStatus(Enum):
    PENDING = 'pending'
    ACCEPTED = 'accepted'
    REJECTED = 'rejected'

class Friend(db.Model):
    __tablename__ = 'friends_association'  # Explicit table name

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}  # Optional schema for production

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)
    friend_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)
    status = db.Column(db.Enum(FriendshipStatus), nullable=False, default=FriendshipStatus.PENDING)