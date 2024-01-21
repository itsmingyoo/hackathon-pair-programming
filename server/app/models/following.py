from .db import db, environment, SCHEMA, add_prefix_for_prod

from sqlalchemy.schema import ForeignKey

follow = db.Table(
    'following',
    db.Model.metadata,
    db.Column('followed_user', db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('follower', db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)
)

if environment == "production":
    follow.schema = SCHEMA