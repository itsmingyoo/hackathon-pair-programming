from .db import db, environment, SCHEMA, add_prefix_for_prod

from sqlalchemy.schema import ForeignKey

chat_room_join = db.Table(
    'chatroomjoins',
    db.Model.metadata,
    db.Column('user_1', db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('user_2', db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('room', db.ForeignKey(add_prefix_for_prod('chatrooms.id')), primary_key=True)
)

if environment == "production":
    chat_room_join.schema = SCHEMA
